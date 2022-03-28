import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesBoxComponent } from './cookies-box.component';

describe('CookiesBoxComponent', () => {
  let component: CookiesBoxComponent;
  let fixture: ComponentFixture<CookiesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
