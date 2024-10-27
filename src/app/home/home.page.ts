import { AuthenticatorService } from './../services/authenticator.service';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  user: User = {
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

  cambiarSpinner(estado: boolean) {
    this.spinner = estado;
  }

  async validar() {
    try {
      this.cambiarSpinner(true);
      await this.auth.loginBDD(this.user.username, this.user.password);
      this.mensaje = 'Conexión exitosa';

      const navigationExtras: NavigationExtras = {
        state: {
          username: this.user.username,
          password: this.user.password,
        },
      };

      setTimeout(() => {
        this.router.navigate(['/inicio'], navigationExtras);
        this.resetForm();
      }, 3000);
    } catch (error) {
      this.mensaje = 'Error en las credenciales. Por favor, inténtalo de nuevo.';
    } finally {
      this.cambiarSpinner(false);
    }
  }

  private resetForm() {
    this.user.username = '';
    this.user.password = '';
    this.mensaje = '';
  }
}

