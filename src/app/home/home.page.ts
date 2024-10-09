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

  constructor(private router: Router, private animationController: AnimationController) { }

  ngAfterContentInit() {
    this.animarLogin();
  }

  animarLogin() {
    
    const loginIcon = document.querySelector(".login img") as HTMLElement;
    
    const animacion = this.animationController.create()
      .addElement(loginIcon)
      .duration(4000)
      .iterations(Infinity)
     
      .keyframes([
        { offset: 0, opacity: '1', width: "200px", height: "200px" },
        { offset: 0.5, opacity: '0.5', width: "150px", height: "150px" },
        { offset: 1, opacity: '1', width: "200px", height: "200px" }
      ]);
    animacion.play();
  }

  
  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  validar() {
    if (this.user.username.length !== 0) {
      if (this.user.password.length !== 0) {
  
        this.mensaje = 'Conexión exitosa';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        this.cambiarSpinner();
        
        setTimeout(() => {
          this.router.navigate(['/inicio'], navigationExtras); 
          this.mensaje = "";
        }, 3000);
      } else {
        console.log('Contraseña vacía');
        this.mensaje = 'Contraseña vacía';
       
      }
    } else {
      console.log('Usuario vacío');
      this.mensaje = 'Usuario vacío';
    
    }
  }
}
