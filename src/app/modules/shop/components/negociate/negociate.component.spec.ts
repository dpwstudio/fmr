import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociateComponent } from './negociate.component';

describe('NegociateComponent', () => {
  let component: NegociateComponent;
  let fixture: ComponentFixture<NegociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegociateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
