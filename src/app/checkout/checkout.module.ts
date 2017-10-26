import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { CustomerModule } from '../customer/customer.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutEffects } from './shared/checkout.effects';
import { CheckoutEndpoint } from './shared/checkout.endpoint';
import { CheckoutService } from './shared/checkout.service';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CustomerModule,
    HttpModule,
    FormsModule,
    EffectsModule.forFeature([CheckoutEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutComponent,
      },
    ]),
  ],
  providers: [CheckoutEndpoint, CheckoutService],
})
export class CheckoutModule {}
