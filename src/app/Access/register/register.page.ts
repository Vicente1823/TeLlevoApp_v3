import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  nombre: string = '';
  apellidos: string = '';
  edad: number | null = null; 
  nivelEducacional: string = '';
  fechaNacimiento: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  // Función para registrar al usuario
  register() {
    const userEdad = this.edad !== null ? this.edad : 0;

    const newUser = {
      username: this.username,
      nombre: this.nombre,
      apellidos: this.apellidos,
      edad: userEdad, 
      nivelEducacional: this.nivelEducacional,
      fechaNacimiento: this.fechaNacimiento,
      password: this.password,
    };

    this.userService.registerUser(newUser).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);
        
        // Redirige a la página de inicio (Home) tras el registro exitoso
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
      }
    );
  }

  // Función para redirigir al Home desde el botón en la barra de navegación
  navigateToHome() {
    this.router.navigate(['/home']);  // Redirige a la página de inicio
  }
}
