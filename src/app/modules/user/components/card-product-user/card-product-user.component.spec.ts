import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductUserComponent } from './card-product-user.component';

describe('CardProductUserComponent', () => {
  let component: CardProductUserComponent;
  let fixture: ComponentFixture<CardProductUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardProductUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProductUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
