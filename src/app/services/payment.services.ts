import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  iniciarPago() {
    return this.http.post('http://127.0.0.1:8100/iniciar_pago/', {});
  }

 
  confirmarPago(token: string) {
    return this.http.get(`http://127.0.0.1:8100/confirmacion_pago/?token_ws=${token}`);
  }
}
