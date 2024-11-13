import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  requestedLiveTrip: any = null;  // Inicializado con null
  departureTime: string = '';     // Inicializado como string vacío
  costPerPerson: number = 0;      // Inicializado como número
  createdTrips: any[] = [];       // Inicializado como un arreglo vacío
  latitud: number | null = null;  // Inicializado como null
  longitud: number | null = null; // Inicializado como null
  destino: string = '';           // Inicializado como cadena vacía
  direccion: string | null = null; // Dirección para mostrarla en el HTML

  constructor(private router: Router) {}

  ngOnInit() {
    // Llama a la función de geolocalización si es necesario
    this.getGeolocation();
  }

  // Función para obtener la geolocalización
  getGeolocation() {
    Geolocation.getCurrentPosition().then(position => {
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;
      console.log('Latitud:', this.latitud, 'Longitud:', this.longitud);

      // Aquí puedes agregar la lógica para obtener la dirección usando una API de geocodificación (ejemplo Google Maps API)
      this.getAddressFromCoordinates(this.latitud, this.longitud);
    }).catch(err => {
      console.error('Error obteniendo geolocalización:', err);
    });
  }

  // Función para obtener la dirección a partir de las coordenadas
  getAddressFromCoordinates(lat: number, lng: number) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAoQ4FhgwOv5uhUT3Alo4gKUKrE1I0U8Fo`;

    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results[0]) {
          this.direccion = data.results[0].formatted_address; // Aquí guardamos la dirección
        }
      })
      .catch(err => console.error('Error obteniendo la dirección:', err));
  }

  // Solicitar un viaje en vivo
  requestLiveTrip() {
    this.requestedLiveTrip = {
      departureTime: this.departureTime,
      costPerPerson: this.costPerPerson,
      destination: this.destino
    };
  }

  // Crear un nuevo viaje
  createTrip(departureTime: string, costPerPerson: number) {
    const newTrip = {
      departureTime: departureTime,
      costPerPerson: costPerPerson,
      destination: this.destino,
      lat: this.latitud,
      lng: this.longitud
    };

    this.createdTrips.push(newTrip);
    console.log('Nuevo viaje creado:', newTrip);
  }

  // Eliminar un viaje
  deleteTrip(index: number) {
    this.createdTrips.splice(index, 1);
    console.log('Viaje eliminado:', index);
  }

  // Método para navegar hacia la página de inicio (home)
  goBack() {
    console.log('Navegando de regreso a la página de inicio');
    this.router.navigate(['/home']); // Redirige a la ruta '/home'
  }

  // Limpiar los detalles del viaje en vivo
  clearLiveTrip() {
    this.requestedLiveTrip = null;  
    console.log('Viaje en vivo cancelado');
  }
}
