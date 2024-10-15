import { Component, OnInit, ViewChild  } from '@angular/core';
import axios from 'axios';
import { debounceTime } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {
  isPopoverOpen = false;
  isMenuOpen = false;
  carritoProductos:any[] =[];
  total = 0;
  productos: any[] = [
    {
      id: 1,
      nombre: "Aleta Libra",
      precio: "5.30",
      urlImagen: "https://bitworks-multimedia.azurewebsites.net/api/selectos/multimedia/ebec4a6b-2d34-4033-8d9f-103217b281a3/content"
    },
    {
      id: 2,
      nombre: "Alas de pollo",
      precio: "2.19",
      urlImagen: "https://bitworks-multimedia.azurewebsites.net/api/selectos/multimedia/1be958bc-d983-464f-a1b0-612a950d01f3/content"
    },
    {
      id: 3,
      nombre: "Alsado argentino",
      precio: "5.75",
      urlImagen: "https://bitworks-multimedia.azurewebsites.net/api/selectos/multimedia/b754c0b8-8e9a-416c-8ff2-1720774b531c/content"
    },
    {
      id: 4,
      nombre: "Bistec de res",
      precio: "4.10",
      urlImagen: "https://bitworks-multimedia.azurewebsites.net/api/selectos/multimedia/8bd2ef78-5c10-4586-8b07-06dd7a674a19/content"
    },
    {
      id: 5,
      nombre: "Bebida gaseosa Kolashampan 3L",
      precio: "1.10",
      urlImagen: "https://bitworks-multimedia.azurewebsites.net/api/selectos/multimedia/ef11307c-5f07-4183-ab07-b7e81a38f126/content"
    },
    {
      id: 6,
      nombre: "Gaseosa CocaCola 2.5L",
      precio: "2.00",
      urlImagen: "https://bitworks-multimedia.azurewebsites.net/api/selectos/multimedia/386f4d15-1e00-4c61-a5a4-70e5069caccb/content"
    },
    {
      id: 7,
      nombre: "Bebida Coctel Frutas 473 ml V8 Splash",
      precio: "1.00",
      urlImagen: "https://bitworks-multimedia.azurewebsites.net/api/selectos/multimedia/eabfa8a0-0fca-475c-abe5-f1fb245d4422/content"
    },
    {
      id: 8,
      nombre: "Bebida De Naranja La Granja 990 mL",
      precio: "1.25",
      urlImagen: "https://bitworks-multimedia.azurewebsites.net/api/selectos/multimedia/5d4441c2-f811-4436-bb13-a3140c13e734/content"
    },
    // http://127.0.0.1:8000/ToolsData/api/TopProductos Api
  ];

  @ViewChild('popover') popover: any;
  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.carritoProductos = this.cartService.getCartItems();
    // Suscribirse a los cambios del total
    this.cartService.total$.subscribe(total => {
      this.total = total;
    });
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
      const respuesta = await axios.get("http://127.0.0.1:8000/ToolsData/api/TopProductos", { headers });
      this.productos = respuesta.data.data.productos;
      //a;adiendo los productos con mejkores precios a la lista
      console.log(this.productos);
    } catch (error) {
      console.error("Error:", error);
    }
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
    console.log("Tokens:", access_token);
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
