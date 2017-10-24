import { Action } from '@ngrx/store';

import { dehydrate } from '../../../shared/dehydrate';
import { Cart } from '../models/cart';
import { CartState } from '../shopping.state';
import {
  AddProductAction,
  CartActionType,
  RemoveAllItemsOfProductAction,
  RemoveProductAction,
} from './cart.actions';

export function cartReducer(cartState: CartState, action: Action): CartState {
  let cart;
  switch (action.type) {
    case CartActionType.AddProductToCard:
      cart = new Cart(cartState);
      cart.add((action as AddProductAction).payload);
      return dehydrate<CartState>(cart);

    case CartActionType.RemoveProductFromCard:
      cart = new Cart(cartState);
      cart.remove((action as RemoveProductAction).payload);
      return dehydrate<CartState>(cart);

    case CartActionType.RemoveAllItemsOfProductFromCard:
      cart = new Cart(cartState);
      cart.removeAllItems((action as RemoveAllItemsOfProductAction).payload);
      return dehydrate<CartState>(cart);

    default:
      return cartState;
  }
}
