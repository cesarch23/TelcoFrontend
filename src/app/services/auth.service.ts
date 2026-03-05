import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';
import { throwError } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  type: string;
}

export interface DecodedToken {
  sub: string;
  userId: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';  
  private tokenKey = 'access_token';
  private currentUserSubject: BehaviorSubject<DecodedToken | null>;
  public currentUser$: Observable<DecodedToken | null>;

  constructor(private http: HttpClient) {
    const storedToken = this.getToken();
    const user = storedToken ? this.decodeToken(storedToken) : null;
    this.currentUserSubject = new BehaviorSubject<DecodedToken | null>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, { headers }).pipe(
      tap(response => {
        if (response && response.accessToken) {
          this.setToken(response.accessToken);
          const decodedToken = this.decodeToken(response.accessToken);
          this.currentUserSubject.next(decodedToken);
        }
      }),
      catchError(error => {
        console.error('Error de login:', error);
        return throwError(() => new Error('Credenciales inválidas'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    const decoded = this.decodeToken(token);
    if (!decoded) return false;
    
    // Verificar si el token está expirado
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  }

  getCurrentUser(): DecodedToken | null {
    return this.currentUserSubject.value;
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  private decodeToken(token: string): DecodedToken | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const decoded = JSON.parse(atob(parts[1]));
      return decoded;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }
}
