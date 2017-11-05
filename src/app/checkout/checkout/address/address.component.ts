import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms/src/directives';
import * as cuid from 'cuid';

export class Address {
  public addressLine1: string;
  public addressLine2: string;
  public city: string;
  public state: string;
  public postalCode: string;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AddressComponent,
      multi: true,
    },
  ],
})
export class AddressComponent implements ControlValueAccessor, Validator {
  private addressFormGroup: FormGroup;
  private uniqueId: string;
  private onChange: Function;
  private isDisabled: boolean;

  constructor() {
    this.uniqueId = cuid();
    this.addressFormGroup = new FormGroup({
      addressLine1: new FormControl(),
      addressLine2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      postalCode: new FormControl('', [Validators.required]),
    });

    this.onChange = () => {};
    this.addressFormGroup.valueChanges.subscribe(changes => {
      this.onChange(changes);
    });
  }

  public getFormControlId(formControlName): string {
    return `${formControlName}_${this.uniqueId}`;
  }

  public writeValue(address: Address): void {
    address = address || ({} as any);
    this.addressFormGroup.patchValue(address);
  }

  public registerOnChange(onChange: Function): void {
    this.onChange = onChange;
  }

  public registerOnTouched(fn: any): void {
    // don't handle touch events
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public validate(): ValidationErrors | null {
    if (this.addressFormGroup.valid) {
      return null;
    }
    return {
      address: 'Address is invalid',
    };
  }
}
