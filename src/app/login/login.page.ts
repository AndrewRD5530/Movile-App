import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  constructor() { }

  ngOnInit() {
  }
  async onSubmit() {
    console.log("Email:", this.email);
    console.log("Contraseña:", this.password);
    // Aquí se puede realizar la validación de la contraseña y enviar la solicitud
    const url = 'http://127.0.0.1:8000/api/usuario/login';
    const Credenciales = {
      "correo": this.email,
      "password": this.password
    };
    try {
      const response = await axios.post(url, Credenciales);
      const respuesta = response.data;
      if (respuesta.data) {
        const tokens = respuesta.data.access;
        const refresh = respuesta.data.refresh;
        const correo = respuesta.data.correo;

        //guardar en local storage
        localStorage.setItem('access_token', tokens);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('correo', correo);

        //redireccionar a la página de inicio
        window.location.href = '/home';
      } else {
        console.log("Error:", respuesta.error);
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  }

}
