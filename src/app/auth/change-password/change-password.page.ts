import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  oldPassword: string = ''; // Asegúrate de capturar la contraseña antigua
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  cambiarContraseña() {
    if (this.newPassword !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }
    
    // Asegúrate de pasar la contraseña antigua y la nueva
    this.authService.changePassword(this.oldPassword, this.newPassword).subscribe(
      response => {
        console.log('Contraseña cambiada con éxito:', response);
        this.router.navigate(['/home']); // Redirigir a la página de inicio
      },
      error => {
        console.error('Error al cambiar la contraseña:', error);
      }
    );
  }
}
