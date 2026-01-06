import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';

export interface StepperMenu {
  label: string;
  description?: string;
  disabled?: boolean;
}
export type Orientation = 'horizontal' | 'vertical';
@Component({
  selector: 'app-catalyst-step-head',
  imports: [CommonModule],
  templateUrl: './catalyst-step-head.component.html',
  styleUrl: './catalyst-step-head.component.scss',
})
export class CatalystStepHeadComponent {
  itemMenu = input.required<StepperMenu[]>();
  orientation = input<Orientation>('vertical');
  @Output() clickEvent = new EventEmitter<number>();

  @Input() activeStep = 0;
  @Output() activeStepChange = new EventEmitter<number>();

  onClick(index: number, menu: StepperMenu): void {
    if (menu.disabled) return;
    this.activeStep = index;
    this.activeStepChange.emit(index);
    this.clickEvent.emit(index);
  }
}
