import { AuthenticatorService } from './../services/authenticator.service';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  user = {
    username: '',
    password: '',
  };
  
  mensaje = '';
  spinner = false;

  constructor(
    private router: Router,
    private animationController: AnimationController,
    private auth: AuthenticatorService,
  ) {}

  ngAfterContentInit() {
    this.animarLogin();
  }

  animarLogin() {
    const loginIcon = document.querySelector('.login img') as HTMLElement;

    const animacion = this.animationController
      .create()
      .addElement(loginIcon)
      .duration(4000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, opacity: '1', width: '200px', height: '200px' },
        { offset: 0.5, opacity: '0.5', width: '150px', height: '150px' },
        { offset: 1, opacity: '1', width: '200px', height: '200px' },
      ]);
    animacion.play();
  }

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  async validar() {
    this.mensaje = ''; // Limpiar mensaje anterior
    this.cambiarSpinner(); // Iniciar spinner

    try {
      const res = await this.auth.loginBDD(this.user.username, this.user.password);
      this.mensaje = 'Conexión exitosa';

      let navigationExtras: NavigationExtras = {
        state: {
          username: this.user.username,
        },
      };

      setTimeout(() => {
        this.router.navigate(['/inicio'], navigationExtras);
        this.cambiarSpinner(); // Detener spinner
      }, 3000);

    } catch (error) {
      console.error('Error de autenticación:', error); // Log para depuración
      this.mensaje = 'Error en las credenciales'; // Mostrar mensaje de error
      this.cambiarSpinner(); // Detener spinner
    }
  }
}


