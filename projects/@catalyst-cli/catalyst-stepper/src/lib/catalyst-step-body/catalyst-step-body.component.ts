import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catalyst-step-body',
  imports: [],
  templateUrl: './catalyst-step-body.component.html',
  styleUrl: './catalyst-step-body.component.scss',
})
export class CatalystStepBodyComponent {
  @Input() visible = false;
  @Input() value!: number;
  @Input() height = '';
}
