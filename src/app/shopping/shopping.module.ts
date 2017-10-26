import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { LimitCharsPipe } from '../shared/pipes/limit-chars.pipe';
import { PadLeftPipe } from '../shared/pipes/pad-left.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { CartService } from './shared/cart/cart.service';
import { ProductListService } from './shared/product/product-list.service';
import { ProductsEffects } from './shared/product/product.effects';
import { ProductEndpoint } from './shared/product/product.endpoint';
import {
  ProductResolve,
  ProductsResolve,
} from './shared/product/product.resolve';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductThumbnailComponent,
    ShoppingCartComponent,
    PadLeftPipe,
    LimitCharsPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([ProductsEffects]),
    RouterModule.forChild([
      // routes relative to 'shopping/'
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
        resolve: {
          product: ProductResolve,
        },
      },
      { path: 'cart', component: ShoppingCartComponent },
      {
        path: '',
        component: ProductListComponent,
        resolve: {
          productList: ProductsResolve,
        },
      },
    ]),
  ],
  providers: [
    ProductListService,
    ProductResolve,
    ProductsResolve,
    ProductEndpoint,
  ],
})
export class ShoppingModule {}
