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
  createdTrip: { departureTime: string; costPerPerson: number } | null = null; 

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

    this.createdTrip = this.tripService.createTrip(departureTime, costPerPerson);
    console.log('Viaje creado:', this.createdTrip);
  }
}

