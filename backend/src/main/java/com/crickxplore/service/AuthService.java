package com.crickxplore.service;

import com.crickxplore.dto.AuthResponse;
import com.crickxplore.dto.LoginRequest;
import com.crickxplore.dto.RegisterRequest;
import com.crickxplore.dto.UserProfileDto;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserProfileDto getCurrentUser(String userId);
}
