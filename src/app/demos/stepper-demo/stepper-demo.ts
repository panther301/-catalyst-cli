import { Component, signal } from '@angular/core';
import {
  CatalystStepperComponent,
  CatalystStepBodyComponent,
  StepperMenu,
  Orientation,
} from '@catalyst-cli/catalyst-stepper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [CatalystStepperComponent, CatalystStepBodyComponent, CommonModule],
  templateUrl: './stepper-demo.html',
  styleUrl: './stepper-demo.scss',
})
export class StepperDemo {
  horizontalActiveStep = signal<number>(0);
  verticalActiveStep = signal<number>(0);

  horizontalMenu = signal<StepperMenu[]>([
    {
      label: 'Step 1',
      description: 'First step description',
      disabled: false,
    },
    {
      label: 'Step 2',
      description: 'Second step description',
      disabled: false,
    },
    {
      label: 'Step 3',
      description: 'Third step description',
      disabled: false,
    },
    {
      label: 'Step 4',
      description: 'Fourth step description',
      disabled: false,
    },
  ]);

  verticalMenu = signal<StepperMenu[]>([
    {
      label: 'Step 1',
      description: 'First step description',
      disabled: false,
    },
    {
      label: 'Step 2',
      description: 'Second step description',
      disabled: false,
    },
    {
      label: 'Step 3',
      description: 'Third step description',
      disabled: false,
    },
    {
      label: 'Step 4',
      description: 'Fourth step description',
      disabled: false,
    },
  ]);

  onHorizontalStepChange(step: number): void {
    this.horizontalActiveStep.set(step);
    console.log('Horizontal step changed to:', step);
  }

  onVerticalStepChange(step: number): void {
    this.verticalActiveStep.set(step);
    console.log('Vertical step changed to:', step);
  }

  goToNext(): void {
    if (this.horizontalActiveStep() < this.horizontalMenu().length - 1) {
      this.horizontalActiveStep.set(this.horizontalActiveStep() + 1);
    }
  }

  goToPrevious(): void {
    if (this.horizontalActiveStep() > 0) {
      this.horizontalActiveStep.set(this.horizontalActiveStep() - 1);
    }
  }
}
