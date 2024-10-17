import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  total = 0;
  carritoProductos: any[] = [];
  isPremiumUser: boolean = false;
  UserStatus: string = '';
  isPremium:  string = '';
  constructor(private router: Router, private cartService: CartService, private userService: UserService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.carritoProductos = items;
    });

    // Suscribirse a los cambios del total
    this.cartService.total$.subscribe(total => {
      this.total = total;
    });
    this.userService.isPremium$.subscribe((isPremium) => {
      this.isPremiumUser = isPremium; // Actualizar la variable en la interfaz
      this.UserStatus = this.userService.getPremiumStatus() ? 'premium' : 'común';
    });
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

  clearCart() {
    this.cartService.clearCart();
  }
}
