import type { AuthResponse, UserProfile, RegisterCredentials, LoginCredentials } from '../../types/auth.ts';

const TOKEN_KEY = 'crickxplore_jwt_token';
const BACKEND_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:8080'
  : ''; // Relative in production / reverse proxy

class AuthClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.token = localStorage.getItem(TOKEN_KEY);
      } catch {
        this.token = null;
      }
    }
  }

  public getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      try {
        this.token = localStorage.getItem(TOKEN_KEY);
      } catch {
        this.token = null;
      }
    }
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(TOKEN_KEY, token);
      } catch {
        // Ignore localStorage errors
      }
    }
  }

  public clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(TOKEN_KEY);
      } catch {
        // Ignore localStorage errors
      }
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BACKEND_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `Authentication request failed (${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // If not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return (await response.json()) as T;
  }

  /**
   * Registers a new user account with Spring Boot backend
   */
  public async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: credentials.username.trim(),
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  /**
   * Logs in an existing user with Spring Boot backend
   */
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  /**
   * Fetches the currently authenticated user profile
   */
  public async getCurrentUser(): Promise<UserProfile | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      return await this.request<UserProfile>('/api/auth/me', {
        method: 'GET',
      });
    } catch {
      // Invalid/expired token -> clear
      this.clearToken();
      return null;
    }
  }

  /**
   * Logs out the user by clearing token
   */
  public logout(): void {
    this.clearToken();
  }
}

export const authClient = new AuthClient();
