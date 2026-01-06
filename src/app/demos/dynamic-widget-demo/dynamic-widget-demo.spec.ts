import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicWidgetDemo } from './dynamic-widget-demo';

describe('DynamicWidgetDemo', () => {
  let component: DynamicWidgetDemo;
  let fixture: ComponentFixture<DynamicWidgetDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicWidgetDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicWidgetDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
