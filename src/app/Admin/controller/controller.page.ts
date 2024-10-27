import { Component, OnInit } from '@angular/core';
import { ApiTeLlevoAppService } from 'src/app/api-te-llevo-app.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {

  users: any[] = [];
  constructor(private api: ApiTeLlevoAppService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    this.api.getUsers().subscribe(
      (data) => {
        this.users = data
        console.log(this.users)
      },
      (error) => {
        console.log("Error en la conexion:" + error)
      });
  }
  modificarUsuario(id: any) {

  }
  eliminarUsuario(id: any) {

  }
}
