package com.crickxplore.service;

import com.crickxplore.config.JwtTokenProvider;
import com.crickxplore.dto.AuthResponse;
import com.crickxplore.dto.LoginRequest;
import com.crickxplore.dto.RegisterRequest;
import com.crickxplore.dto.UserProfileDto;
import com.crickxplore.exception.DuplicateResourceException;
import com.crickxplore.exception.InvalidCredentialsException;
import com.crickxplore.exception.ResourceNotFoundException;
import com.crickxplore.model.User;
import com.crickxplore.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();
        String cleanUsername = request.getUsername().trim();

        if (userRepository.existsByEmail(cleanEmail)) {
            throw new DuplicateResourceException("An account with email '" + cleanEmail + "' already exists");
        }

        if (userRepository.existsByUsername(cleanUsername)) {
            throw new DuplicateResourceException("Username '" + cleanUsername + "' is already taken");
        }

        // Secure BCrypt password hashing
        String passwordHash = passwordEncoder.encode(request.getPassword());

        User user = new User();
        user.setUsername(cleanUsername);
        user.setEmail(cleanEmail);
        user.setPasswordHash(passwordHash);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());

        User savedUser = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(savedUser);
        UserProfileDto profileDto = mapToProfileDto(savedUser);

        return new AuthResponse(token, profileDto);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user);
        UserProfileDto profileDto = mapToProfileDto(user);

        return new AuthResponse(token, profileDto);
    }

    @Override
    public UserProfileDto getCurrentUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        return mapToProfileDto(user);
    }

    private UserProfileDto mapToProfileDto(User user) {
        return new UserProfileDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }
}
