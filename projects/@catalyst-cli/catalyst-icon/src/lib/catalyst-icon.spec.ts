import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalystIcon } from './catalyst-icon';

describe('CatalystIcon', () => {
  let component: CatalystIcon;
  let fixture: ComponentFixture<CatalystIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalystIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalystIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
