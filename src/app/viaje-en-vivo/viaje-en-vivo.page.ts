import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-viaje-en-vivo',
  templateUrl: './viaje-en-vivo.page.html',
  styleUrls: ['./viaje-en-vivo.page.scss'],
})
export class ViajeEnVivoPage implements OnInit {
  map!: mapboxgl.Map;
  userLocation: [number, number] = [-74.5, 40];  
  origen: string = '';  
  destino: string = ''; 
  numPersonas: number = 1;  
  costoEstimado: string = '';  
  horaViaje: string = '';  

  constructor(private router: Router) { }

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoidmljaGlpbm5uIiwiYSI6ImNtNDdsZmQ5NjA2cDMyaW9pajUzZGUyaGMifQ.MGdCq6h0LVtEgPxlNBdlkw'; 

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = [position.coords.longitude, position.coords.latitude];
          this.initMap();
        },
        (error) => {
          console.error('Error obteniendo la geolocalización', error);
          this.initMap(); 
        }
      );
    } else {
      console.warn('Geolocalización no soportada');
      this.initMap();
    }
  }

  initMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.userLocation,
      zoom: 12
    });

    new mapboxgl.Marker()
      .setLngLat(this.userLocation)
      .addTo(this.map);
  }

  calcularRuta() {
    if (!this.origen || !this.destino) {
      console.error('Por favor ingrese las direcciones de origen y destino.');
      return;
    }

    
    this.geocodeDireccion(this.origen).then((origenCoord) => {
      this.geocodeDireccion(this.destino).then((destinoCoord) => {
        if (origenCoord && destinoCoord) {
          this.dibujarRuta(origenCoord, destinoCoord);
          this.calcularCosto(origenCoord, destinoCoord);
        }
      });
    });
  }

  async geocodeDireccion(direccion: string): Promise<[number, number] | null> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(direccion)}.json?access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const coordinates = data.features?.[0]?.geometry?.coordinates;
      return coordinates ? [coordinates[0], coordinates[1]] : null;
    } catch (error) {
      console.error('Error al geocodificar la dirección:', error);
      return null;
    }
  }

  dibujarRuta(origen: [number, number], destino: [number, number]) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origen[0]},${origen[1]};${destino[0]},${destino[1]}?alternatives=true&geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.routes && data.routes[0]) {
          this.drawRoute(data.routes[0].geometry);
        } else {
          console.error('No se pudo obtener la ruta');
        }
      })
      .catch(error => console.error('Error al obtener la ruta:', error));
  }

  drawRoute(routeGeoJson: any) {
    if (this.map.getSource('route')) {
      const routeSource = this.map.getSource('route') as mapboxgl.GeoJSONSource;
      routeSource.setData(routeGeoJson);
    } else {
      this.map.addSource('route', {
        type: 'geojson',
        data: routeGeoJson
      });

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5
        }
      });
    }
  }

  
  calcularCosto(origen: [number, number], destino: [number, number]) {
    
    const distanciaKm = this.calcularDistancia(origen, destino);  
    const costoPorKm = 100; 
    this.costoEstimado = `${(distanciaKm * costoPorKm).toFixed(2)} CLP`;

    
    const fecha = new Date();
    this.horaViaje = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
  }

  
  calcularDistancia(origen: [number, number], destino: [number, number]): number {
    const R = 6371; 
    const dLat = this.deg2rad(destino[1] - origen[1]);
    const dLon = this.deg2rad(destino[0] - origen[0]);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(origen[1])) * Math.cos(this.deg2rad(destino[1])) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;
    return distancia;
  }

  
  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  
  goBack() {
    this.router.navigate(['/viaje']);
  }
}
