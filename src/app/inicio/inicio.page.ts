import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(private router: Router) {}

  requestTrip() {
  
    this.router.navigate(['/request-trip']); // Cambia '/request-trip' a la ruta de tu página de solicitar viaje
  }

  scheduleTrip() {
    
    this.router.navigate(['/schedule-trip']); // Cambia '/schedule-trip' a la ruta de tu página de programar viaje
  }
}
