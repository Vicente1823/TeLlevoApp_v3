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
    
    this.router.navigate(['/home']);
  }
}
