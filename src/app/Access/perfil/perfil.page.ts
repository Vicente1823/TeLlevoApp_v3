import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage {
  username: string = 'Usuario Ejemplo';
  nombre: string = '';
  apellidos: string = '';
  edad: number | null = null;
  nivelEducacional: string = '';
  fechaNacimiento: string = '';
  password: string = ''; // Aquí declaramos el password
  isEditing: boolean = false;
  userId: number = 1;  // Este `userId` debe ser correcto y coincidir con el ID del usuario en tu base de datos

  constructor(private userService: UserService, private router: Router) {}

  // Activar el modo de edición
  editProfile() {
    this.isEditing = true;
  }

  // Función para guardar los cambios del perfil
  guardarPerfil() {
    const updatedUser = {
      username: this.username,
      nombre: this.nombre,
      apellidos: this.apellidos,
      edad: this.edad!==null?this.edad:0,
      nivelEducacional: this.nivelEducacional,
      fechaNacimiento: this.fechaNacimiento,
      password: this.password,  // Incluir el password aquí
    };

    // Enviar el `userId` y los datos del usuario al servicio para actualizarlo
    this.userService.updateUser(this.userId, updatedUser).subscribe(
      (response) => {
        console.log('Perfil actualizado:', response);
        this.isEditing = false;  // Salir del modo de edición
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
      }
    );
  }

  // Función para manejar el cambio de fecha
  onFechaChange(event: any) {
    this.fechaNacimiento = event.detail.value;
  }

  // Función para volver a la página de viaje
  goBack() {
    this.router.navigate(['/viaje']);  // Asegúrate de que la ruta esté configurada correctamente
  }
}
