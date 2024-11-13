import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {
  isPopoverOpen = false;
  isMenuOpen = false;
  carritoProductos: any[] = [];
  total = 0;
  productos: any[] = [];
  isPremiumUser: boolean = false;
  UserStatus: string = '';
  isPremium:  string = '';
  private apiUrl = environment.apiUrl;

  @ViewChild('popover') popover: any;

  constructor(private router: Router, private cartService: CartService,  private userService: UserService) {}

  ngOnInit() {
    this.ObtenerProducto();
    this.carritoProductos = this.cartService.getCartItems();
    this.cartService.total$.subscribe((total) => {
      this.total = total;
    });
    this.userService.isPremium$.subscribe((isPremium) => {
      this.isPremiumUser = isPremium; // Actualizar la variable en la interfaz
      this.UserStatus = this.userService.getPremiumStatus() ? 'premium' : 'común';
    });
  }

  async ObtenerProducto() {
    const token = localStorage.getItem('access_token');
    console.log('Token:', token);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    try {
      const respuesta = await axios.post(`${this.apiUrl}ToolsData/api/ofertas/productos`, { headers });
      console.log('Respuesta:', respuesta);
      const data = respuesta.data.data.productos;
      this.productos = data.flat();
      console.log(JSON.stringify(this.productos, null, 2));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  openPopover(event: any) {
    this.popover.event = event;
    this.isPopoverOpen = true;
  }

  closePopover() {
    this.isPopoverOpen = false;
  }

  async logOut() {
    const access_token = localStorage.getItem('access_token');
    console.log('Tokens:', access_token);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('correo');
    this.router.navigate(['/']);
    this.isPopoverOpen = false;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.carritoProductos = this.cartService.getCartItems();
  }
}
