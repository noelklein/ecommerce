import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CartService } from '../../shopping/shared/cart/cart.service';
import { OrderPlacedAction } from './checkout.actions';
import { Order } from './models/order';

@Injectable()
export class CheckoutService {
  constructor(private cartService: CartService, private store: Store<any>) {}

  public placeOrder(order: Order) {
    this.cartService
      .getItems()
      .map(itemsInCart => {
        order.orderDetails = itemsInCart.map(cartItem => {
          return {
            productId: cartItem.product.productId,
            quantity: cartItem.qty,
            price: cartItem.product.price,
          };
        });
      })
      .take(1)
      .subscribe(() => this.store.dispatch(new OrderPlacedAction(order)));
  }
}
