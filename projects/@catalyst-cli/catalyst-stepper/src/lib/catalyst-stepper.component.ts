import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  input,
  model,
  OnChanges,
  Output,
  QueryList,
} from '@angular/core';
import { CatalystStepHeadComponent } from './catalyst-step-head/catalyst-step-head.component';
import { CatalystStepBodyComponent } from './catalyst-step-body/catalyst-step-body.component';
import { CommonModule } from '@angular/common';
import {
  StepperMenu,
  Orientation,
  IStepperOptions,
  OrientationType,
  HeaderType,
} from './catalyst-stepper.model';
@Component({
  selector: 'app-catalyst-stepper',
  imports: [CatalystStepHeadComponent, CommonModule],
  templateUrl: './catalyst-stepper.component.html',
  styleUrl: './catalyst-stepper.component.scss',
})
export class CatalystStepperComponent implements AfterContentInit, OnChanges, AfterViewInit {
  itemMenu = input.required<StepperMenu[]>();
  options = input<IStepperOptions>({
    orientation: OrientationType.DEFAULT,
    header: HeaderType.DEFAULT,
  });
  @ContentChildren(CatalystStepBodyComponent) stepBodies!: QueryList<CatalystStepBodyComponent>;

  height = input<string>('');
  activeStep = model(0);
  @Output() onStepChange = new EventEmitter<number>();

  ngAfterViewInit(): void {
    this.updateActiveBodies();
  }

  ngAfterContentInit() {
    this.updateActiveBodies();
  }

  ngOnChanges(): void {
    this.updateActiveBodies();
  }

  setActiveStep(index: number): void {
    this.activeStep.set(index);
    this.updateActiveBodies();
    this.onStepChange.emit(index);
  }

  private updateActiveBodies(): void {
    if (this.stepBodies)
      this.stepBodies.forEach((body) => {
        body.visible.set(body.value === this.activeStep());
      });
  }
}
