// src/app/auth/change-password/change-password.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module'; // Verifica esta ruta

import { ChangePasswordPage } from './change-password.page'; // Verifica esta ruta

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule // Este debe ser el módulo de enrutamiento correcto
  ],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {}
