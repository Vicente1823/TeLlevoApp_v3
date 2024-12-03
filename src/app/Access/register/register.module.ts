import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageRoutingModule } from './register-routing.module';  // Asegúrate de importar el módulo de rutas

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterPageRoutingModule   // Agregado el módulo de rutas
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
