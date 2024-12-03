import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  requestedLiveTrip: any = null;
  departureTime: string = '';
  costPerPerson: number = 0;
  createdTrips: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {

  }

  requestLiveTrip() {
    this.requestedLiveTrip = {
      departureTime: this.departureTime,
      costPerPerson: this.costPerPerson
    };
  }

  createTrip(departureTime: string, costPerPerson: number) {
    const newTrip = {
      departureTime: departureTime,
      costPerPerson: costPerPerson
    };
    this.createdTrips.push(newTrip);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
