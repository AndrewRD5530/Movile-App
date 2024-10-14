import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  total = 0;
  carritoProductos: any[] = [];
  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.carritoProductos = items;
    });

    this.total = this.cartService.getTotalProducts();
  }
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
  async logOut() {
    const access_token = localStorage.getItem('access_token');
    console.log("Tokens:", access_token);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('correo');
    //redireccionar a la página de inicio
    this.router.navigate(['/']);
  }
}
