package server;

import model.EmailModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.Observable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class MailSaver extends Observable {

    private static final Logger LOGGER = LoggerFactory.getLogger(MailSaver.class);

    public void saveEmailAndNotify(String from, String to, InputStream data) {
        String mailContent = convertStreamToString(data);
        LOGGER.info("Send email from {} to {} data {}", from, to, mailContent);

        EmailModel model = new EmailModel();
        model.setFrom(from);
        model.setTo(to);
        model.setSubject(getSubjectFromStr(mailContent));
        model.setEmailStr(mailContent);

        synchronized (this) {
//            String filePath = saveEmailToFile(mailContent);

            model.setReceivedDate(new Date());
//            model.setFilePath(filePath);

            setChanged();
            notifyObservers(model);
        }
    }

    private String convertStreamToString(InputStream is) {
        final long lineNbToStartCopy = 4; // Do not copy the first 4 lines (received part)
        BufferedReader reader = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
        StringBuilder sb = new StringBuilder();

        String line;
        long lineNb = 0;
        try {
            while ((line = reader.readLine()) != null) {
                if (++lineNb > lineNbToStartCopy) {
                    sb.append(line).append('\n');
                }
            }
        } catch (IOException e) {
            LOGGER.error("", e);
        }
        return sb.toString();
    }

    private String getSubjectFromStr(String data) {
        try {
            BufferedReader reader = new BufferedReader(new StringReader(data));

            String line;
            while ((line = reader.readLine()) != null) {
                Matcher matcher = Pattern.compile("^Subject: (.*)$").matcher(line);
                if (matcher.matches()) {
                    return matcher.group(1);
                }
            }
        } catch (IOException e) {
            LOGGER.error("", e);
        }
        return "";
    }

}