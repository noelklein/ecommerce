import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Customer } from '../../customer/shared/models/customer';
import { CheckoutService } from '../shared/checkout.service';
import { Address } from './address/address.component';

export class OrderFormValues {
  customer: Customer;
  billingAddress: Address;
  shippingAddress: Address;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private checkoutFormGroup: FormGroup;

  constructor(private checkoutService: CheckoutService) {
    this.checkoutFormGroup = new FormGroup({
      customer: new FormGroup({
        email: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        phoneNumber: new FormControl(),
      }),
      billingAddress: new FormControl(),
      shippingAddress: new FormControl(),
    });
  }

  public onFormSubmitted() {
    console.log(this.checkoutFormGroup.value);
  }
}
