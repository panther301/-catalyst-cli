import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalystStepHeadComponent } from './catalyst-step-head.component';

describe('CatalystStepHeadComponent', () => {
  let component: CatalystStepHeadComponent;
  let fixture: ComponentFixture<CatalystStepHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalystStepHeadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalystStepHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
