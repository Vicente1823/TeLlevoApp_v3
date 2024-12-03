import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  users: any[] = [];
  selectedUser: any = {  
    username: '',
    nombre: '',
    apellidos: '',
    edad: null,
    nivelEducacional: '',
    fechaNacimiento: '', 
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  editUser(user: any) {
    this.selectedUser = { ...user }; 
  }

  updateUser() {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
        this.loadUsers();  
        this.selectedUser = null;  
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']); 
  }

  navigateToHome() {
    this.router.navigate(['/home']);  
  }
}
