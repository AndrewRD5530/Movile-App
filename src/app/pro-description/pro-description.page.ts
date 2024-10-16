import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-pro-description',
  templateUrl: './pro-description.page.html',
  styleUrls: ['./pro-description.page.scss'],
})
export class ProDescriptionPage implements OnInit {
  products: any[] = [];
  productId!: number;
  carritoProductos:any[] =[];
  nombre: string = '';
  apellido: string = '';
  total = 0;
  isPopoverOpen = false;
  isMenuOpen = false;

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router, private location: Location,
     private cartService: CartService, private cdr: ChangeDetectorRef) {  }
  @ViewChild('popover') popover: any;
  ngOnInit() {
    this.carritoProductos = this.cartService.getCartItems();
    // Suscribirse a los cambios del total
    this.cartService.total$.subscribe(total => {
      this.total = total;
    });
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.productId = +idParam;
        this.getProductDetails(this.productId);
      } else {
        console.error('El parámetro de ID no está presente en la URL.');
      }
    });
    this.cdr.detectChanges();
  }
  async getProductDetails(id: number, ) {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    const json = {
      "productoID": id
    };

    const url = 'http://127.0.0.1:8000/ToolsData/api/filtrar/InformacionByProducto';

    try {
      const response = await axios.post(url, json, { headers });
      console.log(response.data);
      this.products = response.data.data.producto;
    } catch (error) {
      console.error("Error al obtener producto:", error);
    }
  }
  returnPage() {
    this.location.back();
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
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.carritoProductos = this.cartService.getCartItems();
  }
}