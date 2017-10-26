import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { cartReducer } from '../shopping/shared/cart/cart.reducers';
import { CartService } from '../shopping/shared/cart/cart.service';
import { productsReducer } from '../shopping/shared/product/product.reducers';
import { INITIAL_STATE } from '../shopping/shared/shopping.state';
import { LayoutComponent } from './layout/layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [LayoutComponent, NavigationComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      { cart: cartReducer, productList: productsReducer },
      { initialState: INITIAL_STATE }
    ),
    RouterModule.forRoot([
      {
        path: 'shopping',
        loadChildren: 'app/shopping/shopping.module#ShoppingModule',
      },
      {
        path: 'checkout',
        loadChildren: 'app/checkout/checkout.module#CheckoutModule',
      },
      {
        path: '',
        redirectTo: 'shopping',
        pathMatch: 'full',
      },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  bootstrap: [LayoutComponent],
  providers: [CartService],
})
export class MainModule {}
