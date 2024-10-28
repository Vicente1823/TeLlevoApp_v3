import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private trips: { departureTime: string; costPerPerson: number }[] = [];

  constructor() {}

  createTrip(departureTime: string, costPerPerson: number) {
    const trip = {
      departureTime,
      costPerPerson,
    };
    this.trips.push(trip);
    return trip;
  }

  getTrips() {
    return this.trips;
  }
}
