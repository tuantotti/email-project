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
        try{
            smtpServer.startServer(getPort(), getBindAddress());
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    private static int getPort() {
        return 6525;
    }

    private static InetAddress getBindAddress() throws UnknownHostException {
        return InetAddress.getByName("127.0.0.1");
    }
}
