package com.smtp.server.server;

import com.smtp.server.model.FileData;
import com.smtp.server.model.Mail;
import com.smtp.server.model.MailStatus;
import com.smtp.server.service.MailService;
import com.sun.mail.util.BASE64DecoderStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.BodyPart;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Observable;

public final class MailSaver extends Observable {

    private static final Logger LOGGER = LoggerFactory.getLogger(MailSaver.class);

    public void saveEmailAndNotify(String from, String to, InputStream data) {
        Mail emailModel;
        try {
            MimeMessage mimeMessage = toMimeMessage(data);
            emailModel = convertToMail(from, to, mimeMessage);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        LOGGER.info("Send email from {} to {}", from, to);

        synchronized (this) {
            setChanged();
            notifyObservers(emailModel);
        }
    }

    private MimeMessage toMimeMessage(InputStream inputStream) {
        try {
            Session session = Session.getDefaultInstance(System.getProperties());
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
            byte[] inputByte = inputStream.readAllBytes();

            MimeMessage mimeMessage = new MimeMessage(session, new ByteArrayInputStream(inputByte));

            return mimeMessage;
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String getTextFromMimeMultipart(MimeMultipart mimeMultipart) throws Exception {
        String result = "";
        int count = mimeMultipart.getCount();
        for (int i = 0; i < count; i++) {
            BodyPart bodyPart = mimeMultipart.getBodyPart(i);
            if (bodyPart.isMimeType("text/plain")) {
                result = result + bodyPart.getContent();
                break; // without break same text appears twice in my tests
            } else if (bodyPart.isMimeType("text/html")) {
                String html = (String) bodyPart.getContent();
                result = result + html;
            } else if (bodyPart.getContent() instanceof MimeMultipart) {
                result = result + getTextFromMimeMultipart((MimeMultipart) bodyPart.getContent());
            }
        }
        return result;
    }

    private Mail convertToMail(String from, String to, MimeMessage mimeMessage) {
        try {
            Mail emailModel = new Mail();
            emailModel.setFromAddress(from);
            emailModel.setToAddress(to);
            emailModel.setSubject(mimeMessage.getSubject());
            emailModel.setSendDate(mimeMessage.getSentDate());
            emailModel.setReceivedDate(mimeMessage.getReceivedDate());
            emailModel.setSenderStatus(MailStatus.SENT);
            emailModel.setReceiverStatus(MailStatus.INBOX);

            List<FileData> fileDataList = new ArrayList<>();

            if (mimeMessage.isMimeType("text/plain")) {
                emailModel.setBody(mimeMessage.getContent().toString());
            } else if (mimeMessage.isMimeType("multipart/*")) {
                MimeMultipart mimeMultipart = (MimeMultipart) mimeMessage.getContent();
                String body = getTextFromMimeMultipart(mimeMultipart);
                emailModel.setBody(body);
            }

            Multipart mp = (Multipart) mimeMessage.getContent();
            int count = mp.getCount();
            for (int i = 0; i < count; i++) {
                BodyPart bp = mp.getBodyPart(i);
                // get base64 decode of file and save to file system
                if (bp.getContent() instanceof BASE64DecoderStream) {
                    InputStream is = (InputStream) bp.getContent();
                    String fileName = MimeUtility.decodeText(bp.getFileName());
                    int extensionIndex = fileName.lastIndexOf('.');
                    String name = fileName.substring(0, extensionIndex) + "_" + System.currentTimeMillis() + fileName.substring(extensionIndex);
                    String filePath = MailService.getFolderPath() + File.separator + name;
                    File file = new File(filePath);
                    // save file to
                    Files.copy(is, file.toPath(), StandardCopyOption.REPLACE_EXISTING);

                    int separatorIndex = bp.getContentType().indexOf(File.pathSeparator);
                    String contentType = bp.getContentType().substring(0, separatorIndex);

                    // store file properties in db
                    FileData fileData = FileData.builder()
                            .name(name)
                            .type(contentType)
                            .size(file.length())
                            .filePath(filePath)
                            .build();
                    fileDataList.add(fileData);
                }
            }

            emailModel.setFileDataList(fileDataList);
            fileDataList.stream().forEach(fileData -> fileData.setMail(emailModel));
            MailService.save(emailModel);

            return emailModel;
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}