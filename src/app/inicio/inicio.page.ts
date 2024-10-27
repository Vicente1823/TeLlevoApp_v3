import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../services/trip.services';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  
  departureTime: string = ''; 
  costPerPerson: number = 0; 
  requestedLiveTrip: { departureTime: string; costPerPerson: number } | null = null; 
  createdTrips: { departureTime: string; costPerPerson: number }[] = []; 

  constructor(
    private router: Router,
    private tripService: TripService 
  ) {}

  requestTrip() {
    this.router.navigate(['/request-trip']);
  }

  scheduleTrip() {
    this.router.navigate(['/schedule-trip']);
  }

  createTrip(departureTime: string, costPerPerson: number) {
    const newTrip = this.tripService.createTrip(departureTime, costPerPerson);
    if (newTrip) {
      this.createdTrips.push(newTrip);
      console.log('Viaje creado:', newTrip);
    }
  }

  requestLiveTrip() {
    const liveDepartureTime = '2024-10-30 10:00'; // Ejemplo de horario
    const liveCostPerPerson = 50; // Ejemplo de costo

    this.requestedLiveTrip = this.tripService.createTrip(liveDepartureTime, liveCostPerPerson);
    console.log('Viaje solicitado en vivo:', this.requestedLiveTrip);
  }

  clearLiveTrip() {
    this.requestedLiveTrip = null; // Limpia la información del viaje en vivo
    console.log('Viaje en vivo cancelado.');
  }

  deleteTrip(index: number) {
    if (index >= 0 && index < this.createdTrips.length) {
      this.createdTrips.splice(index, 1); // Elimina el viaje del array
      console.log(`Viaje ${index + 1} eliminado.`);
    }
  }

  goBack() {
    this.router.navigate(['..']); // Navega a la página anterior
  }
}
