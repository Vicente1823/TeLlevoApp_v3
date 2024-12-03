import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViajeEnVivoPage } from './viaje-en-vivo.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeEnVivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViajeEnVivoPageRoutingModule {}
