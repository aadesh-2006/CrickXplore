package com.crickxplore.config;

import com.crickxplore.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    public static final String DEV_DEFAULT_SECRET = "c2VjdXJlLWRldi1jcmlja3hwbG9yZS1qd3QtYXV0aC1zaWduaW5nLWtleS0yMDI2LXNwZWM=";

    private final SecretKey key;
    private final long jwtExpirationMs;

    public JwtTokenProvider(
            @Value("${crickxplore.jwt.secret}") String secret,
            @Value("${crickxplore.jwt.expiration-ms:86400000}") long jwtExpirationMs) {
        this(secret, jwtExpirationMs, null);
    }

    @Autowired
    public JwtTokenProvider(
            @Value("${crickxplore.jwt.secret}") String secret,
            @Value("${crickxplore.jwt.expiration-ms:86400000}") long jwtExpirationMs,
            @Autowired(required = false) Environment environment) {

        if (secret == null || secret.trim().isEmpty()) {
            throw new IllegalStateException("JWT_SECRET must be configured and cannot be empty.");
        }

        boolean isProduction = false;
        if (environment != null && environment.getActiveProfiles() != null) {
            isProduction = Arrays.stream(environment.getActiveProfiles())
                    .anyMatch(p -> p.equalsIgnoreCase("prod") || p.equalsIgnoreCase("production"));
        }

        if (isProduction) {
            if (secret.equals(DEV_DEFAULT_SECRET)) {
                throw new IllegalStateException("Default development JWT secret is strictly forbidden in production. Provide an explicit JWT_SECRET.");
            }
            if (secret.getBytes(StandardCharsets.UTF_8).length < 32) {
                throw new IllegalStateException("JWT secret must be at least 256 bits (32 bytes) in production.");
            }
        }

        // Ensure key length is at least 256 bits (32 bytes)
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            String paddedSecret = String.format("%-32s", secret).replace(' ', '0');
            keyBytes = paddedSecret.getBytes(StandardCharsets.UTF_8);
        }
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.jwtExpirationMs = jwtExpirationMs;
    }

    /**
     * Generates a signed JWT for an authenticated user.
     * Contains minimum necessary identity claims (userId as subject, username, email).
     */
    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .subject(user.getId())
                .claim("username", user.getUsername())
                .claim("email", user.getEmail())
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }

    /**
     * Extracts user ID (subject) from JWT token.
     */
    public String getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    /**
     * Extracts username claim from JWT token.
     */
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.get("username", String.class);
    }

    /**
     * Validates JWT token signature and expiration.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            logger.warn("Invalid JWT signature: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.warn("JWT token has expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.warn("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.warn("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
