package com.smtp.server;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Config {
    @Value("${server.port}")
    private int port;

    @Value("${server.host}")
    private String host;

    private static int staticPort;
    private static String staticHost;

    @PostConstruct
    public void init() {
        staticPort = port;
        staticHost = host;
    }

    public static int getPort() {
        return staticPort;
    }

    public static String getHost() {
        return staticHost;
    }
}
