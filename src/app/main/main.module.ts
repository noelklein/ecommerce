import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CheckoutModule } from '../checkout/checkout.module';
import { cartReducer } from '../shopping/shared/cart/cart.reducers';
import { productsReducer } from '../shopping/shared/product/product.reducers';
import { INITIAL_STATE } from '../shopping/shared/shopping.state';
import { ShoppingModule } from '../shopping/shopping.module';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavigationComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    ShoppingModule,
    CheckoutModule,
    BrowserModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      { cart: cartReducer, productList: productsReducer },
      { initialState: INITIAL_STATE }
    ),
    RouterModule.forRoot([
      {
        path: 'shopping',
        loadChildren() {
          return ShoppingModule;
        },
      },
      {
        path: 'checkout',
        loadChildren() {
          return CheckoutModule;
        },
      },
      {
        path: 'auth',
        component: PageNotFoundComponent,
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
})
export class MainModule {}
