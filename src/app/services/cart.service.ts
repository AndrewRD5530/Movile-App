import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  constructor() { }

  addToCart(product: any) {
    const currentCart = this.cart.value;
    currentCart.push(product);
    this.cart.next(currentCart);
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart.value.filter(product => product.id !== productId);
    this.cart.next(currentCart);
  }

  clearCart() {
    this.cart.next([]);
  }

  getCartItems() {
    return this.cart.value;
  }
  getTotalProducts(){
    //total de dinero tomado del carrito del campo price
    const total = this.cart.value.reduce((acc, product) => acc + product.precio, 0);
    return total.toFixed(2);
  }
}
