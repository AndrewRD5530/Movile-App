import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carritoProductos: any[] = [];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.carritoProductos = items;
    });
  }
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
