import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { debounceTime } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {
  products: any[] = [];
  isMenuOpen = false; // Estado del menú
  isLoading = false; // Estado de la barra de progreso
  isAlertOpen = false; // Estado de la alerta
  private searchSubject: Subject<string> = new Subject();
  isPopoverOpen = false;
  carritoProductos: any[] = [];
  Usuario = localStorage.getItem('nombre');
  total = 0;
  isPremiumUser: boolean = false;
  UserStatus: string = '';
  isPremium:  string = '';
  constructor(
    private alertController: AlertController,
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {}
  @ViewChild('popover') popover: any;
  ngOnInit() {
    this.searchSubject.pipe(debounceTime(500)).subscribe((searchTerm) => {
      this.getProducts(searchTerm);
    });
    //this.searchProducts(event);
    // Suscribirse a los cambios del total
    this.cartService.total$.subscribe((total) => {
      this.total = total;
    });
    this.cartService.cart$.subscribe(items => {
      this.carritoProductos = items;
    });
    this.userService.isPremium$.subscribe((isPremium) => {
      this.isPremiumUser = isPremium; // Actualizar la variable en la interfaz
      this.UserStatus = this.userService.getPremiumStatus() ? 'premium' : 'común';
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  searchProducts(event: any) {
    const searchTerm = event.target.value.trim();
    //const searchTerm = "soya";
    if (searchTerm) {
      this.isLoading = true; // Mostrar la barra de progreso mientras se busca
      this.searchSubject.next(searchTerm);
    } else {
      this.products = []; // Limpiar los productos si no hay búsqueda
    }
  }

  async getProducts(searchTerm: string) {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    console.log('token:', token);

    const json = {
      keyWord: searchTerm,
    };

    const url = 'http://127.0.0.1:8000/ToolsData/api/SeachProductos';

    try {
      const response = await axios.post(url, json, { headers });
      const productos = response.data.data.productos;

      if (
        productos.length > 0 &&
        productos[0].details === 'producto no encontrado'
      ) {
        await this.showAlert('No se encontraron productos');
      } else {
        this.products = productos.flat();
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      await this.showAlert('Ocurrió un error al buscar productos.');
    } finally {
      this.isLoading = false;
    }
  }

  // Método para mostrar la alerta
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });

    await alert.present();
  }

  openPopover(event: any) {
    this.popover.event = event;
    this.isPopoverOpen = true;
  }
  // Cerrar el popover
  closePopover() {
    this.isPopoverOpen = false;
  }

  // Función para cerrar sesión (reemplazar con la lógica que desees)
  async logOut() {
    const access_token = localStorage.getItem('access_token');
    console.log('Tokens:', access_token);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('correo');
    //redireccionar a la página de inicio
    this.router.navigate(['/']);
    this.isPopoverOpen = false;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.carritoProductos = this.cartService.getCartItems();
  }
}
