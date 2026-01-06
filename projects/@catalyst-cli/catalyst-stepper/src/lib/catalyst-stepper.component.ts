import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  input,
  OnChanges,
  Output,
  QueryList,
} from '@angular/core';
import {
  CatalystStepHeadComponent,
  Orientation,
} from './catalyst-step-head/catalyst-step-head.component';
import { CatalystStepBodyComponent } from './catalyst-step-body/catalyst-step-body.component';
import { CommonModule } from '@angular/common';

export interface StepperMenu {
  label: string;
  description?: string;
  disabled?: boolean;
}
@Component({
  selector: 'app-catalyst-stepper',
  imports: [CatalystStepHeadComponent, CommonModule],
  templateUrl: './catalyst-stepper.component.html',
  styleUrl: './catalyst-stepper.component.scss',
})
export class CatalystStepperComponent implements AfterContentInit, OnChanges {
  itemMenu = input.required<StepperMenu[]>();
  orientation = input<Orientation>('vertical');
  @ContentChildren(CatalystStepBodyComponent) stepBodies!: QueryList<CatalystStepBodyComponent>;

  height = input<string>('');
  @Input() activeStep = 0;
  @Output() activeStepChange = new EventEmitter<number>();
  @Output() onStepChange = new EventEmitter<number>();

  ngAfterContentInit() {
    this.updateActiveBodies();
  }

  ngOnChanges(): void {
    this.updateActiveBodies();
  }

  setActiveStep(index: number): void {
    this.activeStep = index;
    this.updateActiveBodies();
    this.activeStepChange.emit(index);
    this.onStepChange.emit(index);
  }

  private updateActiveBodies(): void {
    if (this.stepBodies)
      this.stepBodies.forEach((body) => {
        body.visible = body.value === this.activeStep;
      });
  }
}
