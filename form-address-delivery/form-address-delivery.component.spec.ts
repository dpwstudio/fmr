import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddressDeliveryComponent } from './form-address-delivery.component';

describe('FormAddressDeliveryComponent', () => {
  let component: FormAddressDeliveryComponent;
  let fixture: ComponentFixture<FormAddressDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddressDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddressDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
