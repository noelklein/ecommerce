import { CartService } from '../../shopping/shared/cart/cart.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  public numberOfItemsInCart: Observable<number>;
  public totalPriceOfCart: Observable<number>;
  public hasItemsInCart: Observable<boolean>;

  constructor(private cartService: CartService) {
    this.numberOfItemsInCart = cartService.getTotalCount();
    this.totalPriceOfCart = cartService.getTotalAmount();
    this.hasItemsInCart = cartService.isEmpty().map((isEmpty) => !isEmpty);
  }
}
