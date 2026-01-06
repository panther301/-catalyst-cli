import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalystStepperComponent } from './catalyst-stepper.component';

describe('CatalystStepperComponent', () => {
  let component: CatalystStepperComponent;
  let fixture: ComponentFixture<CatalystStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalystStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalystStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
