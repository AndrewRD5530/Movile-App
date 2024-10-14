import { Component, OnInit, ViewChild  } from '@angular/core';
import axios from 'axios';
import { debounceTime } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  isPopoverOpen = false;
  isMenuOpen = false;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  carritoProductos:any[] =[];
  total = 0;
  constructor(private router: Router, private cartService: CartService) { }
  @ViewChild('popover') popover: any;

  ngOnInit() {
    this.GetInfoUsuario();
    this.carritoProductos = this.cartService.getCartItems();
    // Suscribirse a los cambios del total
    this.cartService.total$.subscribe(total => {
      this.total = total;
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
  openPopover(event: any) {
    this.popover.event = event;
    this.isPopoverOpen = true;
  }
  // Cerrar el popover
  closePopover() {
    this.isPopoverOpen = false;
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
    this.isPopoverOpen = false;
  }
}
