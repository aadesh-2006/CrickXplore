export interface UserProfile {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  user: UserProfile;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthError {
  status: number;
  message: string;
  errors?: string[];
}
