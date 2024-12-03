import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./Access/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Access/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./auth/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'viaje',
    loadChildren: () => import('./viaje/viaje.module').then(m => m.ViajePageModule)
  },
  {
    path: 'viaje-en-vivo',
    loadChildren: () => import('./viaje-en-vivo/viaje-en-vivo.module').then( m => m.ViajeEnVivoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
