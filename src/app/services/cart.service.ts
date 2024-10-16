import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  private total = new BehaviorSubject<number>(0);
  total$ = this.total.asObservable();

  private isPremiumUser = false; // Estado inicial del usuario

  constructor(private userService: UserService) {
    // Suscribirse a los cambios del estado premium del usuario
    this.userService.isPremium$.subscribe((isPremium) => {
      this.isPremiumUser = isPremium;
      this.updateTotal(); // Recalcular el total cuando cambie el estado premium
    });
  }

  addToCart(product: any) {
    const currentCart = this.cart.value;
    currentCart.push(product);
    this.cart.next(currentCart);
    this.updateTotal();
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart.value.filter(product => product.id !== productId);
    this.cart.next(currentCart);
    this.updateTotal();
  }

  clearCart() {
    this.cart.next([]);
    this.updateTotal();
  }

  getCartItems() {
    return this.cart.value;
  }

  private updateTotal() {
    let totalAmount = this.cart.value.reduce(
      (acc, product) => acc + product.precio,
      0
    );
    if (this.isPremiumUser) {
      totalAmount = totalAmount * 0.9; // Aplicar 10% de descuento
    }
    this.total.next(Number(totalAmount.toFixed(2))); // Actualizar el total
  }
}
