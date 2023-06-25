package server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.Observable;

public final class MailSaver extends Observable {

    private static final Logger LOGGER = LoggerFactory.getLogger(MailSaver.class);

    public void saveEmailAndNotify(String from, String to, InputStream data) {
        LOGGER.info("Send email from {} to {}", from, to);
    }
}