package com.crickxplore;

import com.crickxplore.config.JwtTokenProvider;
import com.crickxplore.dto.AuthResponse;
import com.crickxplore.dto.LoginRequest;
import com.crickxplore.dto.RegisterRequest;
import com.crickxplore.dto.UserProfileDto;
import com.crickxplore.exception.DuplicateResourceException;
import com.crickxplore.exception.InvalidCredentialsException;
import com.crickxplore.model.User;
import com.crickxplore.repository.UserRepository;
import com.crickxplore.service.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    private AuthServiceImpl authService;

    private final String testJwtSecret = "c2VjdXJlLWNyaWNreHBsb3JlLWp3dC1hdXRoLXNpZ25pbmcta2V5LTIwMjYtc3ByaW5nLWJvb3Q=";

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
        jwtTokenProvider = new JwtTokenProvider(testJwtSecret, 86400000L);
        authService = new AuthServiceImpl(userRepository, passwordEncoder, jwtTokenProvider);
    }

    @Test
    @DisplayName("1. Successful Registration: Hashes password, saves user, returns JWT and user profile")
    void testSuccessfulRegistration() {
        RegisterRequest request = new RegisterRequest("virat_fan", "virat@crickxplore.com", "KohliCentury#18");

        when(userRepository.existsByEmail("virat@crickxplore.com")).thenReturn(false);
        when(userRepository.existsByUsername("virat_fan")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId("usr-12345");
            u.setCreatedAt(Instant.now());
            return u;
        });

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("Bearer", response.getTokenType());
        assertEquals("virat_fan", response.getUser().getUsername());
        assertEquals("virat@crickxplore.com", response.getUser().getEmail());

        // Verify password hashing with ArgumentCaptor
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();

        assertNotEquals("KohliCentury#18", savedUser.getPasswordHash(), "Password MUST NOT be stored in plaintext");
        assertTrue(passwordEncoder.matches("KohliCentury#18", savedUser.getPasswordHash()), "BCrypt hash must match original password");
    }

    @Test
    @DisplayName("2. Duplicate Email Rejected: Throws DuplicateResourceException")
    void testDuplicateEmailRejected() {
        RegisterRequest request = new RegisterRequest("new_user", "existing@crickxplore.com", "Password123!");

        when(userRepository.existsByEmail("existing@crickxplore.com")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> authService.register(request));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("3. Duplicate Username Rejected: Throws DuplicateResourceException")
    void testDuplicateUsernameRejected() {
        RegisterRequest request = new RegisterRequest("existing_username", "newemail@crickxplore.com", "Password123!");

        when(userRepository.existsByEmail("newemail@crickxplore.com")).thenReturn(false);
        when(userRepository.existsByUsername("existing_username")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> authService.register(request));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("4. Password Is Stored Hashed (BCrypt)")
    void testPasswordIsHashedProperly() {
        String rawPassword = "SuperSecureCricketPassword99";
        String encoded = passwordEncoder.encode(rawPassword);

        assertTrue(encoded.startsWith("$2a$") || encoded.startsWith("$2b$"));
        assertTrue(passwordEncoder.matches(rawPassword, encoded));
        assertFalse(passwordEncoder.matches("WrongPassword", encoded));
    }

    @Test
    @DisplayName("5. Successful Login: Validates credentials and returns valid JWT")
    void testSuccessfulLogin() {
        String rawPassword = "CorrectPassword123";
        String hashedPassword = passwordEncoder.encode(rawPassword);

        User mockUser = new User("bumrah_yorker", "bumrah@crickxplore.com", hashedPassword);
        mockUser.setId("usr-9393");
        mockUser.setCreatedAt(Instant.now());

        when(userRepository.findByEmail("bumrah@crickxplore.com")).thenReturn(Optional.of(mockUser));

        LoginRequest request = new LoginRequest("bumrah@crickxplore.com", rawPassword);
        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("bumrah_yorker", response.getUser().getUsername());
        assertEquals("bumrah@crickxplore.com", response.getUser().getEmail());

        // Validate generated JWT
        assertTrue(jwtTokenProvider.validateToken(response.getToken()));
        assertEquals("usr-9393", jwtTokenProvider.getUserIdFromToken(response.getToken()));
    }

    @Test
    @DisplayName("6. Invalid Password Rejected: Throws InvalidCredentialsException")
    void testInvalidPasswordRejected() {
        String hashedPassword = passwordEncoder.encode("RealPassword123");
        User mockUser = new User("pat_captain", "pat@crickxplore.com", hashedPassword);

        when(userRepository.findByEmail("pat@crickxplore.com")).thenReturn(Optional.of(mockUser));

        LoginRequest request = new LoginRequest("pat@crickxplore.com", "WrongPassword456");

        assertThrows(InvalidCredentialsException.class, () -> authService.login(request));
    }

    @Test
    @DisplayName("7. Unknown Email Login Rejected: Throws InvalidCredentialsException")
    void testUnknownEmailRejected() {
        when(userRepository.findByEmail("nonexistent@crickxplore.com")).thenReturn(Optional.empty());

        LoginRequest request = new LoginRequest("nonexistent@crickxplore.com", "AnyPassword");

        assertThrows(InvalidCredentialsException.class, () -> authService.login(request));
    }

    @Test
    @DisplayName("8. Current User /api/auth/me: Resolves UserProfileDto by userId")
    void testGetCurrentUser() {
        User mockUser = new User("rohit_hitman", "rohit@crickxplore.com", "hashedpass");
        mockUser.setId("usr-4545");
        mockUser.setCreatedAt(Instant.now());

        when(userRepository.findById("usr-4545")).thenReturn(Optional.of(mockUser));

        UserProfileDto profile = authService.getCurrentUser("usr-4545");

        assertNotNull(profile);
        assertEquals("usr-4545", profile.getId());
        assertEquals("rohit_hitman", profile.getUsername());
        assertEquals("rohit@crickxplore.com", profile.getEmail());
    }

    @Test
    @DisplayName("9. JWT Validation & Claims Security Check")
    void testJwtTokenGenerationAndClaims() {
        User user = new User("dhoni_finisher", "msd@crickxplore.com", "hash");
        user.setId("usr-0007");

        String token = jwtTokenProvider.generateToken(user);
        assertTrue(jwtTokenProvider.validateToken(token));
        assertEquals("usr-0007", jwtTokenProvider.getUserIdFromToken(token));
        assertEquals("dhoni_finisher", jwtTokenProvider.getUsernameFromToken(token));

        // Tampered token test
        String tamperedToken = token + "tampered";
        assertFalse(jwtTokenProvider.validateToken(tamperedToken), "Tampered JWT must be rejected");
    }

    @Test
    @DisplayName("10. Production Security: Reject blank JWT secret or default dev secret in prod profile")
    void testProductionJwtSecretValidation() {
        org.springframework.mock.env.MockEnvironment prodEnv = new org.springframework.mock.env.MockEnvironment();
        prodEnv.setActiveProfiles("prod");

        // 1. Blank secret must fail
        assertThrows(IllegalStateException.class, () -> new JwtTokenProvider("", 86400000L, prodEnv));

        // 2. Default dev secret in prod must fail
        assertThrows(IllegalStateException.class, () -> new JwtTokenProvider(JwtTokenProvider.DEV_DEFAULT_SECRET, 86400000L, prodEnv));

        // 3. Short secret in prod (<32 bytes) must fail
        assertThrows(IllegalStateException.class, () -> new JwtTokenProvider("short-secret-key", 86400000L, prodEnv));

        // 4. Secure 256-bit secret in prod must succeed
        String validProdSecret = "super-secure-production-jwt-key-with-high-entropy-2026";
        JwtTokenProvider prodProvider = new JwtTokenProvider(validProdSecret, 86400000L, prodEnv);
        assertNotNull(prodProvider);
    }
}
