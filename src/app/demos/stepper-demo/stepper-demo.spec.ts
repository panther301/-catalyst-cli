import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperDemo } from './stepper-demo';

describe('StepperDemo', () => {
  let component: StepperDemo;
  let fixture: ComponentFixture<StepperDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
