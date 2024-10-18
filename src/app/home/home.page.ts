import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';
import { AlertController, ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {

  productos: any[] = []
  categorias: any[] = []
  isPopoverOpen = false;
  total = 0;
  carritoProductos:any[] =[];
  isPremiumUser: boolean = false;
  UserStatus: string = '';
  isPremium:  string = '';
  IsModalOpenHome: boolean = false;
  mensaje : string = '';
  ischip = false;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  constructor(private router: Router, private cartService: CartService, private modal: ModalController, private userService: UserService, ) { }

  isMenuOpen = false; // Variable para manejar el estado del menú


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alternar el estado del menú
  }
  ngOnInit() {
    this.ObtenerProducto();
    this.ObtenerCategorias();
    this.GetInfoUsuario();
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
  async ObtenerProducto() {
    // definir token bearer para autenticar
    const token = localStorage.getItem('access_token');
    // headers para autenticar
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    try {
      const respuesta = await axios.get("http://127.0.0.1:8000/DataScraping/api/Producto/Listar", { headers });
      this.productos = respuesta.data.data.productos;
      //a;adiendo los productos con mejkores precios a la lista
      console.log(this.productos);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async ObtenerCategorias() {
    // definir token bearer para autenticar
    const token = localStorage.getItem('access_token');
    // headers para autenticar
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    try {
      const respuesta = await axios.get("http://127.0.0.1:8000/DataScraping/api/Categoria/Listar", { headers });

      this.categorias = respuesta.data.data.categorias;
      console.log("categorias",this.categorias);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.carritoProductos = this.cartService.getCartItems();
  }
  async updatePremiunUser() {
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
      this.setOpenModalHome(false);
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
      this.setOpenModalHome(false);
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
  setOpenModalHome(isOpen: boolean) {
    this.IsModalOpenHome = isOpen;
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
 

}
