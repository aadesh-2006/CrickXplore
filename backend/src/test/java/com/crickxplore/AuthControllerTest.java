package com.crickxplore;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.crickxplore.config.JwtTokenProvider;
import com.crickxplore.controller.AuthController;
import com.crickxplore.dto.AuthResponse;
import com.crickxplore.dto.LoginRequest;
import com.crickxplore.dto.RegisterRequest;
import com.crickxplore.dto.UserProfileDto;
import com.crickxplore.exception.DuplicateResourceException;
import com.crickxplore.exception.GlobalExceptionHandler;
import com.crickxplore.exception.InvalidCredentialsException;
import com.crickxplore.model.User;
import com.crickxplore.repository.UserRepository;
import com.crickxplore.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.Instant;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AuthService authService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @InjectMocks
    private AuthController authController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .setCustomArgumentResolvers(new AuthenticationPrincipalArgumentResolver())
                .build();
        SecurityContextHolder.clearContext();
    }

    @Test
    @DisplayName("POST /api/auth/register -> 201 Created on valid input")
    void testRegisterEndpointSuccess() throws Exception {
        RegisterRequest request = new RegisterRequest("virat_king", "virat@crickxplore.com", "Password#123");
        UserProfileDto profile = new UserProfileDto("usr-1", "virat_king", "virat@crickxplore.com", Instant.now());
        AuthResponse authResponse = new AuthResponse("mock-jwt-token-123", profile);

        when(authService.register(any(RegisterRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").value("mock-jwt-token-123"))
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.user.username").value("virat_king"))
                .andExpect(jsonPath("$.user.email").value("virat@crickxplore.com"));
    }

    @Test
    @DisplayName("POST /api/auth/register -> 409 Conflict on duplicate email/username")
    void testRegisterDuplicateConflict() throws Exception {
        RegisterRequest request = new RegisterRequest("duplicate_user", "dup@crickxplore.com", "Password#123");

        when(authService.register(any(RegisterRequest.class)))
                .thenThrow(new DuplicateResourceException("An account with email 'dup@crickxplore.com' already exists"));

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409))
                .andExpect(jsonPath("$.message").value("An account with email 'dup@crickxplore.com' already exists"));
    }

    @Test
    @DisplayName("POST /api/auth/register -> 400 Bad Request on invalid email/blank fields")
    void testRegisterValidationFailure() throws Exception {
        RegisterRequest invalidRequest = new RegisterRequest("", "invalid-email", "123"); // short password, blank username

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));
    }

    @Test
    @DisplayName("POST /api/auth/login -> 200 OK on valid credentials")
    void testLoginEndpointSuccess() throws Exception {
        LoginRequest request = new LoginRequest("bumrah@crickxplore.com", "Password#123");
        UserProfileDto profile = new UserProfileDto("usr-2", "bumrah_yorker", "bumrah@crickxplore.com", Instant.now());
        AuthResponse authResponse = new AuthResponse("mock-jwt-token-bumrah", profile);

        when(authService.login(any(LoginRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mock-jwt-token-bumrah"))
                .andExpect(jsonPath("$.user.username").value("bumrah_yorker"));
    }

    @Test
    @DisplayName("POST /api/auth/login -> 401 Unauthorized on invalid credentials")
    void testLoginInvalidCredentials() throws Exception {
        LoginRequest request = new LoginRequest("bumrah@crickxplore.com", "WrongPassword");

        when(authService.login(any(LoginRequest.class)))
                .thenThrow(new InvalidCredentialsException("Invalid email or password"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.message").value("Invalid email or password"));
    }

    @Test
    @DisplayName("GET /api/auth/me -> 401 Unauthorized when no user principal")
    void testGetMeUnauthorizedWhenNullPrincipal() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/auth/me -> 200 OK with authenticated user principal")
    void testGetMeSuccessWithPrincipal() throws Exception {
        User user = new User("virat_king", "virat@crickxplore.com", "hash");
        user.setId("usr-123");
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(auth);

        UserProfileDto profile = new UserProfileDto("usr-123", "virat_king", "virat@crickxplore.com", Instant.now());
        when(authService.getCurrentUser("usr-123")).thenReturn(profile);

        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("usr-123"))
                .andExpect(jsonPath("$.username").value("virat_king"))
                .andExpect(jsonPath("$.email").value("virat@crickxplore.com"));
    }

    @Test
    @DisplayName("GET /api/health -> 200 OK UP")
    void testHealthEndpoint() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"));
    }
}
