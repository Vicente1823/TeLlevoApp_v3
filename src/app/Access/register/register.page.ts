import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    name: '',
    lastName: '',
    number: '',
    email: ''
  };

  constructor(private router: Router) {}

  onRegister() {
    // Redirige a la página especificada
    this.router.navigate(['/next-page']); // Cambia '/next-page' a la ruta de tu página de destino
  }
}
