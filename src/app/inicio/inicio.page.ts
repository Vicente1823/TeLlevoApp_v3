import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerPage } from '../Admin/controller/controller.page';
import { TripService } from '../services/trip.services';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(
    private router: Router,
    private controllerPage: ControllerPage,
    private tripService: TripService 
  ) {}

  requestTrip() {
    this.router.navigate(['/request-trip']);
  }

  scheduleTrip() {
    this.router.navigate(['/schedule-trip']);
  }

  createTrip(departureTime: string, costPerPerson: number) {
   
    const trip = this.tripService.createTrip(departureTime, costPerPerson);
    console.log('Viaje creado:', trip);
  }
}
