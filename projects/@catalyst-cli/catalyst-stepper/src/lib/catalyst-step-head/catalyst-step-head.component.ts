import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, model, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  StepperMenu,
  Orientation,
  Header,
  HeaderType,
  OrientationType,
} from '../catalyst-stepper.model';
@Component({
  selector: 'app-catalyst-step-head',
  imports: [CommonModule],
  templateUrl: './catalyst-step-head.component.html',
  styleUrl: './catalyst-step-head.component.scss',
})
export class CatalystStepHeadComponent {
  itemMenu = input.required<StepperMenu[]>();
  orientation = input<Orientation>(OrientationType.DEFAULT);
  header = input<Header>(HeaderType.DEFAULT);
  @Output() clickEvent = new EventEmitter<number>();

  activeStep = model(0);
  private sanitizer = inject(DomSanitizer);

  onClick(index: number, menu: StepperMenu): void {
    if (menu.disabled) return;
    this.activeStep.set(index);
    this.clickEvent.emit(index);
  }

  /**
   * Sanitize HTML content to allow SVG and other HTML to render
   */
  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
   * Check if the icon string is an image path/URL
   * Supports: .png, .jpg, .jpeg, .gif, .svg, .webp, .ico
   * Also checks for http/https URLs
   */
  isImagePath(icon: string): boolean {
    if (!icon) return false;

    // Check if it's a URL (starts with http/https or //)
    if (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('//')) {
      return true;
    }

    // Check if it has common image file extensions
    const imageExtensions = /\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/i;
    return imageExtensions.test(icon);
  }
}
