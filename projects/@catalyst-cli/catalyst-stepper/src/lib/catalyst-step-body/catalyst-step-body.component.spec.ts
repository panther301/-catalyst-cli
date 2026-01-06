import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalystStepBodyComponent } from './catalyst-step-body.component';

describe('CatalystStepBodyComponent', () => {
  let component: CatalystStepBodyComponent;
  let fixture: ComponentFixture<CatalystStepBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalystStepBodyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalystStepBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
