import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViajeEnVivoPage } from './viaje-en-vivo.page';
import { ViajeEnVivoPageRoutingModule } from './viaje-en-vivo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeEnVivoPageRoutingModule
  ],
  declarations: [ViajeEnVivoPage]
})
export class ViajeEnVivoPageModule {}
