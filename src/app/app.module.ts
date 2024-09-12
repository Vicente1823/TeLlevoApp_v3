import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Configura Ionic
    AppRoutingModule, // Configura las rutas
    MatProgressSpinnerModule // Añade el módulo para el spinner de Material
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Configura la estrategia de reutilización de rutas
    provideAnimationsAsync() // Configura la animación asíncrona
  ],
  bootstrap: [AppComponent], // Arranca la aplicación con AppComponent
})
export class AppModule { }
