import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isPremium = new BehaviorSubject<boolean>(false); // Estado inicial: no premium
  isPremium$ = this.isPremium.asObservable(); // Observable del estado premium

  constructor() {}

  // Obtener el estado del usuario desde el servidor
  async updateUserStatus() {
    const token = localStorage.getItem('access_token');
    const url = 'http://127.0.0.1:8000/api/usuario/consultar';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const usuarioID = localStorage.getItem('usuarioID');
    const json = { usuarioID };

    try {
      const response = await axios.post(url, json, { headers });
      const respuesta = response.data;

      if (respuesta.data) {
        const isPremiumData = respuesta.data.details.user.isPremium;
        this.isPremium.next(isPremiumData); // Emitir el nuevo estado
      }
    } catch (error) {
      console.error('Error al actualizar estado del usuario:', error);
    }
  }

  // Establecer manualmente el estado premium (si es necesario)
  setPremiumStatus(isPremium: boolean) {
    this.isPremium.next(isPremium); // Emitir el nuevo estado
  }
}
