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
  createdTrips: { departureTime: string; costPerPerson: number }[] = []; // Arreglo para los viajes creados
  requestedLiveTrip: { departureTime: string; costPerPerson: number } | null = null; // Almacenar el viaje solicitado

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
    this.createdTrips.push(newTrip); // Agregar el nuevo viaje al arreglo
    console.log('Viaje creado:', newTrip);
    this.clearInputs(); // Limpiar los campos de entrada después de crear el viaje
  }

  deleteTrip(index: number) {
    this.createdTrips.splice(index, 1); // Eliminar el viaje en la posición del índice
    console.log('Viaje eliminado en el índice:', index);
  }

  // Método para solicitar un viaje en vivo
  requestLiveTrip() {
    if (this.departureTime && this.costPerPerson > 0) {
      this.requestedLiveTrip = {
        departureTime: this.departureTime,
        costPerPerson: this.costPerPerson,
      };
      console.log('Solicitud de viaje en vivo:', this.requestedLiveTrip);
      this.clearInputs(); // Limpiar los campos después de solicitar el viaje
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }

  // Método para limpiar los campos de entrada
  clearInputs() {
    this.departureTime = ''; 
    this.costPerPerson = 0; 
  }

  // Método para volver a la página anterior
  goBack() {
    this.router.navigate(['..']); // Navega a la ruta anterior
  }
}





