// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const payload = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    return this.http.put(`${this.apiUrl}/change-password`, payload);
  }
}
