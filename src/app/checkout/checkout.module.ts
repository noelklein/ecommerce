import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { CustomerModule } from '../customer/customer.module';
import { AddressComponent } from './checkout/address/address.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutEffects } from './shared/checkout.effects';
import { CheckoutEndpoint } from './shared/checkout.endpoint';
import { CheckoutService } from './shared/checkout.service';

@NgModule({
  declarations: [CheckoutComponent, AddressComponent],
  imports: [
    CommonModule,
    CustomerModule,
    HttpModule,
    ReactiveFormsModule,
    NgxErrorsModule,
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
