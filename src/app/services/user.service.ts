import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar un nuevo usuario
  addUser(user: { username: string, nombre: string, apellidos: string, edad: number, nivelEducacional: string, fechaNacimiento: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // Eliminar un usuario
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  // Registrar un nuevo usuario
  registerUser(user: { username: string, nombre: string, apellidos: string, edad: number, nivelEducacional: string, fechaNacimiento: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // Actualizar los datos de un usuario existente
  updateUser(userId: number, user: { username: string, nombre: string, apellidos: string, edad: number, nivelEducacional: string, fechaNacimiento: string, password: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, user); // Usa el userId como parte de la URL para identificar el usuario
  }
}
