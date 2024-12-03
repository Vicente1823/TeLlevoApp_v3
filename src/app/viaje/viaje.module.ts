import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViajeRoutingModule } from './viaje-routing.module';
import { ViajePage } from './viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeRoutingModule
  ],
  declarations: [ViajePage]
})
export class ViajePageModule {}
