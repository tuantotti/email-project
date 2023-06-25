package server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.subethamail.smtp.helper.SimpleMessageListenerAdapter;
import org.subethamail.smtp.server.SMTPServer;

import java.net.InetAddress;

public class SMTPServerHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(SMTPServerHandler.class);
    private final MailSaver mailSaver = new MailSaver();
    private final MailListener myListener = new MailListener(mailSaver);
    private final SMTPServer smtpServer = new SMTPServer(new SimpleMessageListenerAdapter(myListener), new SMTPAuthHandlerFactory());

    public SMTPServerHandler() {
    }

    public void startServer(int port, InetAddress bindAddress) {
        LOGGER.debug("Starting server on port {}", port);
        try {
            smtpServer.setBindAddress(bindAddress);
            smtpServer.setPort(port);
            smtpServer.start();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    public void stopServer() {
        if (smtpServer.isRunning()) {
            LOGGER.debug("Stopping server");
            smtpServer.stop();
        }
    }

    public MailSaver getMailSaver() {
        return mailSaver;
    }

    public SMTPServer getSmtpServer() {
        return smtpServer;
    }
}
