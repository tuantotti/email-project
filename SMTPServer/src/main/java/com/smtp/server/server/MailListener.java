package com.smtp.server.server;

import java.io.IOException;
import java.io.InputStream;
import org.subethamail.smtp.helper.SimpleMessageListener;


public final class MailListener implements SimpleMessageListener {
    private final MailSaver saver;

    public MailListener(MailSaver saver) {
        this.saver = saver;
    }

    public boolean accept(String from, String recipient) {
        return true;
    }

    @Override
    public void deliver(String from, String recipient, InputStream data) throws IOException {
        saver.saveEmailAndNotify(from, recipient, data);
    }
}
