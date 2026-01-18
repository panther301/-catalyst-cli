import { Component, signal } from '@angular/core';
import {
  StepperMenu,
  CatalystStepperModule,
  // Alternative: You can also import CatalystStepperModule for module-based usage
  // CatalystStepperModule,
} from '@catalyst-cli/catalyst-stepper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [CatalystStepperModule, CommonModule],
  templateUrl: './stepper-demo.html',
  styleUrl: './stepper-demo.scss',
})
export class StepperDemo {
  horizontalActiveStep = signal<number>(0);
  verticalActiveStep = signal<number>(0);

  horizontalMenu = signal<StepperMenu[]>([
    {
      label: 'SVG Icon',
      description: 'Step with inline SVG icon',
      disabled: false,
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7L12 12L22 7L12 2Z"></path><path d="M2 17L12 22L22 17"></path><path d="M2 12L12 17L22 12"></path></svg>',
    },
    {
      label: 'Emoji Icon',
      description: 'Step with emoji icon',
      disabled: false,
      icon: '🚀',
    },
    {
      label: 'Image Icon',
      description: 'Step with image path',
      disabled: false,
      icon: 'https://api.iconify.design/mdi:check-circle.svg?color=%23667eea',
    },
    {
      label: 'HTML Icon',
      description: 'Step with HTML template',
      disabled: false,
      icon: '<span style="font-weight: bold; color: currentColor;">★</span>',
    },
  ]);

  verticalMenu = signal<StepperMenu[]>([
    {
      label: 'Account Setup',
      description: 'Create your account',
      disabled: false,
      icon: '\\1F60A ',
    },
    {
      label: 'Profile Details',
      description: 'Add your information',
      disabled: false,
      // No icon - will show default counter
    },
    {
      label: 'Verification',
      description: 'Verify your identity',
      disabled: false,
      icon: '✓',
    },
    {
      label: 'Complete',
      description: 'All done!',
      disabled: false,
      icon: '🎉',
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

  goToVerticalNext(): void {
    if (this.verticalActiveStep() < this.verticalMenu().length - 1) {
      this.verticalActiveStep.set(this.verticalActiveStep() + 1);
    }
  }

  goToVerticalPrevious(): void {
    if (this.verticalActiveStep() > 0) {
      this.verticalActiveStep.set(this.verticalActiveStep() - 1);
    }
  }
}
