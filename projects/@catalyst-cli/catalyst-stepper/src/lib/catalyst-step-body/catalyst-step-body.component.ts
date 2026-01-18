import { Component, Input, model } from '@angular/core';

@Component({
  selector: 'app-catalyst-step-body',
  imports: [],
  templateUrl: './catalyst-step-body.component.html',
  styleUrl: './catalyst-step-body.component.scss',
})
export class CatalystStepBodyComponent {
  visible = model(false);
  @Input() value!: number;
  @Input() height = '';
}
