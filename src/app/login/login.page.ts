import { Component, OnInit , ViewChild } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  isToastOpen: boolean = false;
  IsModalOpen: boolean = false;
  constructor( private router: Router, private toastController: ToastController,) { }
  ngOnInit() {
  }
  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  setOpenModal(isOpen: boolean) {
    this.IsModalOpen = isOpen;

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
        const usuarioID = respuesta.data.usuarioID;
        //guardar en local storage
        console.log("access_token:", tokens);
        localStorage.setItem('access_token', tokens);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('correo', correo);
        localStorage.setItem('usuarioID', usuarioID);
        this.IsModalOpen = false;
        //redireccionar a la página de inicio
        this.router.navigate(['/home']);
      } else {
        const position = 'top';
        const toast = await this.toastController.create({
          message: 'Usuario o contraseña son incorrectos',
          duration: 1500,
          position: position,
          icon: 'warning',
          color: 'danger',
        });
        await toast.present();
        this.IsModalOpen = false;
        this.email = '';
        this.password = '';
        this.nombre = '';
        this.apellido = '';
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      this.IsModalOpen = false;
    }
  }

  async onRegistrar() {
    // Aquí se puede realizar la validación de la contraseña y enviar la solicitud
    const url = 'http://127.0.0.1:8000/api/usuario/crear';
    const Credenciales = {
      "correo": this.email,
      "password": this.password,
      "nombre": this.nombre,
      "apellido": this.apellido
    };
    try {

      const response = await axios.post(url, Credenciales);
      const respuesta = response.data;
      if (respuesta.data.details) {
        console.log("Nuevo ususario usuario:", respuesta.data.details.details);
        // oculatar el modal de ionic
        this.IsModalOpen = false;
        this.email = '';
        this.password = '';
        this.nombre = '';
        this.apellido = '';
        const position = 'top';
        const toast = await this.toastController.create({
          message: 'usuario creado exitosamente',
          duration: 1500,
          position: position,
          icon: 'success',
          color: 'success',
        });
        await toast.present();
      } else {
        console.log("Error:", respuesta.error);
        this.IsModalOpen = false;
        this.email = '';
        this.password = '';
        this.nombre = '';
        this.apellido = '';
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      this.IsModalOpen = false;
      this.email = '';
      this.password = '';
      this.nombre = '';
      this.apellido = '';
    }
  }
}
