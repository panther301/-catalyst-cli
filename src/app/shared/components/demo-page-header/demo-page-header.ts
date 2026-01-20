import { Component, input } from '@angular/core';

@Component({
  selector: 'app-demo-page-header',
  imports: [],
  templateUrl: './demo-page-header.html',
  styleUrl: './demo-page-header.scss',
})
export class DemoPageHeader {
  title = input.required<string>();
}
