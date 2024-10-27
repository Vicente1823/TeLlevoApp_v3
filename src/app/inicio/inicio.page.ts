import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerPage } from '../Admin/controller/controller.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(
    private router: Router,
    private controllerPage: ControllerPage 
  ) {}

  requestTrip() {
    this.router.navigate(['/request-trip']);
  }

  scheduleTrip() {
    this.router.navigate(['/schedule-trip']);
  }
}
