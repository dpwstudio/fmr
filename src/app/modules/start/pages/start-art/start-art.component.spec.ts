import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartArtComponent } from './start-art.component';

describe('StartArtComponent', () => {
  let component: StartArtComponent;
  let fixture: ComponentFixture<StartArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartArtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
