import { Component, OnInit, ViewChild, ChangeDetectorRef   } from '@angular/core';
import axios from 'axios';
import { debounceTime } from 'rxjs/operators';
import { AlertController, ModalController  } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  isMenuOpen = false;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  isPremium:  string = '';
  carritoProductos:any[] =[];
  total = 0;
  ischip = false;
  mensaje : string = '';
  IsModalOpen: boolean = false;
  isPremiumUser: boolean = false;
  UserStatus: string = '';
  constructor(private router: Router, private cartService: CartService, private modal: ModalController, private userService: UserService, private cdr: ChangeDetectorRef ) { }
  @ViewChild('popover') popover: any;

  ngOnInit() {
    this.GetInfoUsuario();
    this.carritoProductos = this.cartService.getCartItems();
    // Suscribirse a los cambios del total
    this.cartService.total$.subscribe(total => {
      this.total = total;
    });
    this.userService.isPremium$.subscribe((isPremium) => {
      this.isPremiumUser = isPremium; // Actualizar la variable en la interfaz
      this.UserStatus = this.userService.getPremiumStatus() ? 'premium' : 'común';
    });
  }

  async GetInfoUsuario() {
    const token = localStorage.getItem('access_token');
    const url = 'http://127.0.0.1:8000/api/usuario/consultar';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const usuarioID = localStorage.getItem('usuarioID');
    const json = {
      "usuarioID": usuarioID,
    };
    try {
      const response = await axios.post(url, json, { headers});
      const respuesta = response.data;
      if (respuesta.data) {
        const data = respuesta.data.details.user;
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.email = data.correo;
        const isPremiunData = data.isPremium;
        // Notificar al CartService si es usuario premium y recalcular el total
        await this.userService.updateUserStatus();
        if (isPremiunData === true) {
          this.isPremium = 'Eres un usuario premium';
          this.ischip = true;
        } else {
          this.isPremium = 'Eres un usuario no premium';
          this.ischip = false;
        }
        console.log("Datos:", this.nombre, this.apellido, this.email);
      } else {
        console.log("Error:", respuesta.error);
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async logOut() {
    const access_token = localStorage.getItem('access_token');
    console.log("Tokens:", access_token);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('correo');
    localStorage.removeItem('usuarioID');
    //redireccionar a la página de inicio
    this.router.navigate(['/']);
  }

  async updatePremiunUser() {
    this.setOpenModal(false);
    const token = localStorage.getItem('access_token');
    const url = 'http://127.0.0.1:8000/api/usuario/actualizarToPremium';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const usuarioID = localStorage.getItem('usuarioID');
    const json = {
      "usuarioID": usuarioID,
    };
    try {
     
      await this.GetInfoUsuario();
      this.ischip = true;
      const response = await axios.post(url, json, { headers});
      const respuesta = response.data;
      await this.userService.updateUserStatus();
      if (respuesta.details){
        const mensaje = respuesta.details;
        this.mensaje = mensaje;
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  }
  async degradarPremiunUser() {
    this.setOpenModal(false);
    const token = localStorage.getItem('access_token');
    const url = 'http://127.0.0.1:8000/api/usuario/degradarToNormal';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const usuarioID = localStorage.getItem('usuarioID');
    const json = {
      "usuarioID": usuarioID,
    };
    try {
      await this.GetInfoUsuario();
      this.ischip = false;
      const response = await axios.post(url, json, { headers });
      const respuesta = response.data;
      await this.userService.updateUserStatus();
      if (respuesta.details){
        const mensaje = respuesta.details;
        this.mensaje = mensaje;
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  }
  setOpenModal(isOpen: boolean) {
    this.IsModalOpen = isOpen;
  }
}
