import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
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
    private tripService: TripService,
    private http: HttpClient // Asegúrate de inyectar HttpClient
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
    const liveDepartureTime = '2024-10-30 10:00'; 
    const liveCostPerPerson = 50; 

    this.requestedLiveTrip = this.tripService.createTrip(liveDepartureTime, liveCostPerPerson);
    console.log('Viaje solicitado en vivo:', this.requestedLiveTrip);
  }

  clearLiveTrip() {
    this.requestedLiveTrip = null;
    console.log('Viaje en vivo cancelado.');
  }

  deleteTrip(index: number) {
    if (index >= 0 && index < this.createdTrips.length) {
      this.createdTrips.splice(index, 1);
      console.log(`Viaje ${index + 1} eliminado.`);
    }
  }

  goBack() {
    this.router.navigate(['..']); 
  }

  // Método para iniciar el pago
  iniciarPago() {
    const apiUrl = 'http://localhost:8000/api/iniciar_pago'; // URL de tu API en Django
    const paymentData = {
      buyOrder: 'order12345', // Cambia estos valores según sea necesario
      sessionId: 'session12345',
      amount: this.requestedLiveTrip ? this.requestedLiveTrip.costPerPerson : 0
    };

    this.http.post(apiUrl, paymentData).subscribe((response: any) => {
      if (response && response.url) {
        // Redirigir al usuario a la URL de Transbank para completar el pago
        window.location.href = response.url;
      }
    }, error => {
      console.error('Error al iniciar el pago:', error);
    });
  }
}
