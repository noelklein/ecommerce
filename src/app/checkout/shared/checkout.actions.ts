import { Action } from '@ngrx/store';

import { Order } from './models/order';

export const CheckoutType = {
  OrderPlaced: 'CheckoutAction.OrderPlaced',
  OrderSaved: 'CheckoutAction.OrderSaved',
};

export class OrderPlacedAction implements Action {
  public type = CheckoutType.OrderPlaced;
  constructor(public payload: Order) {}
}

export class OrderSavedAction implements Action {
  public type = CheckoutType.OrderSaved;
  constructor(public payload: Order) {}
}
