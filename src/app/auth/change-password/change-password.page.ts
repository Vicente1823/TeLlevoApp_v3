// src/app/auth/change-password/change-password.page.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }
    
    this.authService.changePassword(this.oldPassword, this.newPassword).subscribe(
      response => {
        console.log('Contraseña cambiada con éxito:', response);
        this.router.navigate(['/profile']); // Redirigir a la página de perfil u otra página
      },
      error => {
        console.error('Error al cambiar la contraseña:', error);
      }
    );
  }
}

