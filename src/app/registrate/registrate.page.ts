import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
})
export class RegistratePage implements OnInit {

  email: string = '';
  password: string = '';
  constructor() { }

  ngOnInit() {
  }

  async onSubmit() {
    console.log("Email:", this.email);
    console.log("Contraseña:", this.password);
    // Aquí se puede realizar la validación de la contraseña y enviar la solicitud
    const url = 'http://127.0.0.1:8000/api/usuario/crear';
    const Credenciales = {
      "correo": this.email,
      "password": this.password
    };
    try {
      const response = await axios.post(url, Credenciales);
      const respuesta = response.data;
      if (respuesta.data.details) {
        console.log("Nuevo ususario usuario:", respuesta.data.details.details);
        //redireccionar a la página de inicio
        window.location.href = '/login';
      } else {
        console.log("Error:", respuesta.error);
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  }
}
