import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  
  connnectionStatus: boolean = false;

  constructor(private storage: StorageService) {}

  loginBDD(user: string, pass: string): Promise<boolean> {
    return this.storage
      .get(user)
      .then((res) => {
        if (res && res.password === pass) {
          this.connnectionStatus = true;
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log('Error en el sistema: ' + error);
        return false;
      });
  }

  login(user: string, pass: string): boolean {
    if (user === 'j.riquelmee' && pass === 'pass1234') {
      this.connnectionStatus = true;
      return true;
    }
    this.connnectionStatus = false;
    return false;
  }

  logout() {
    this.connnectionStatus = false;
  }

  isConected(): boolean {
    return this.connnectionStatus;
  }

  async registrar(user: any): Promise<boolean> {
    return this.storage.set(user.username, user).then((res) => {
      if (res != null) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error('Error al registrar el usuario:', error);
      return false;
    });
  }
}
