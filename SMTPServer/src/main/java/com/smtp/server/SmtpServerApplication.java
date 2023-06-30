package com.smtp.server;

import com.smtp.server.server.SMTPServerHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
@EnableJpaRepositories
public class SmtpServerApplication {
    public static void main(final String[] args) {
        SpringApplication.run(SmtpServerApplication.class, args);
        SMTPServerHandler smtpServer = new SMTPServerHandler();
        try {
            smtpServer.startServer(Config.getPort(), InetAddress.getByName(Config.getHost()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
