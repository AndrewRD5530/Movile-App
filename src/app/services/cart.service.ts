import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();
  private total = new BehaviorSubject<number>(0);
  total$ = this.total.asObservable();
  constructor() { }

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
    const totalAmount = this.cart.value.reduce((acc, product) => acc + product.precio, 0);
    this.total.next(totalAmount.toFixed(2));
  }
}
