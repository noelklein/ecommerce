import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { Address, AddressComponent } from './address.component';

fdescribe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgxErrorsModule],
      declarations: [AddressComponent, TestHostComponent],
    });
  });

  it('should set values for input fields', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const testComponent: TestHostComponent =
      fixture.debugElement.componentInstance;
    fixture.detectChanges();

    const address: Address = {
      addressLine1: 'line1',
      addressLine2: 'line2',
      city: 'c',
      state: 's',
      postalCode: '',
    };
    testComponent.addressControl.setValue(address);

    const postalCodeInputElment: HTMLInputElement = fixture.debugElement.query(
      By.css('[id^=line2_]')
    ).nativeElement;

    expect(postalCodeInputElment.value).toEqual('line2');
  });

  it('shows validation message', async done => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const testComponent: TestHostComponent =
      fixture.debugElement.componentInstance;
    fixture.detectChanges();

    const postalCodeInputElment = fixture.debugElement.query(
      By.css('[id^=postalCode_]')
    );
    const postalCodeErrorsElement = fixture.debugElement.query(
      By.css('[id^=postalCodeErrors_]')
    );

    expect(testComponent.addressControl.dirty).toBe(false);
    setInputValue(postalCodeInputElment.nativeElement, '01234');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(testComponent.addressControl.dirty).toBe(true);
    expect(postalCodeErrorsElement.nativeElement.hasAttribute('hidden')).toBe(
      true
    );
    expect(testComponent.addressControl.hasError('address')).toBe(false);

    setInputValue(postalCodeInputElment.nativeElement, '');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(postalCodeErrorsElement.nativeElement.hasAttribute('hidden')).toBe(
      false
    );
    expect(testComponent.addressControl.hasError('address')).toBe(true);

    expect(postalCodeErrorsElement.nativeElement.textContent.trim()).toEqual(
      'Postal code is required'
    );

    done();
  });
});

@Component({
  template: '<app-address [formControl]="addressControl"></app-address>',
})
class TestHostComponent {
  public addressControl = new FormControl();
}

function setInputValue(element: HTMLInputElement, value: string) {
  element.value = value;
  element.dispatchEvent(new Event('input'));
  element.dispatchEvent(new Event('keyup'));
  element.dispatchEvent(new Event('blur'));
}
