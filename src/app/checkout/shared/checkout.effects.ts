import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';

import {
  CheckoutType,
  OrderPlacedAction,
  OrderSavedAction,
} from './checkout.actions';
import { CheckoutEndpoint } from './checkout.endpoint';

@Injectable()
export class CheckoutEffects {
  constructor(
    private actions: Actions,
    private checkoutEndpoint: CheckoutEndpoint
  ) {}

  @Effect()
  public saveOrder() {
    return this.actions
      .ofType<OrderPlacedAction>(CheckoutType.OrderPlaced)
      .switchMap(action => this.checkoutEndpoint.saveOrder(action.payload))
      .map(order => new OrderSavedAction(order));
  }
}
