import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartModeComponent } from './start-mode.component';

describe('StartModeComponent', () => {
  let component: StartModeComponent;
  let fixture: ComponentFixture<StartModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
