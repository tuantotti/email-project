package com.email.project.backend.service;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
@Slf4j
public class JwtService {
    @Value("${jwt.secret.key}")
    private String secretKey;

    private final long JWT_EXP_ACCESS = 7 * 3600 * 24 * 1000;
    private final long JWT_EXP_REFRESH = 1000L * 3600 * 24 * 365;

    public String extractUsernameFromToken(String token) {
        String username;
        try {
            Claims claims = parseToken(token);
            username = String.valueOf(claims.getSubject());
        } catch (Exception e) {
            username = null;
            log.error(e.getMessage());
        }
        if (username == null) {
            log.error("Can't extract username with token " + token);
        }
        return username;
    }

    private String generateToken(UserDetails userDetails, long expiration) {
        return generateToken(userDetails.getUsername(), expiration);
    }

    private String generateToken(String username, long expiration) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secretKey.getBytes(StandardCharsets.UTF_8))
                .compact();
    }

    public String generateAccessToken(UserDetails userDetails) {
        return generateToken(userDetails, JWT_EXP_ACCESS);
    }

    public String generateAccessToken(String username) {
        return generateToken(username, JWT_EXP_ACCESS);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails, JWT_EXP_REFRESH);
    }

    public String generateRefreshToken(String username) {
        return generateToken(username, JWT_EXP_REFRESH);
    }

    private Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return false;
    }
}
