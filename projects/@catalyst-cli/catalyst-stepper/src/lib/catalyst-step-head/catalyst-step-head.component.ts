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
   * Also converts Unicode escape sequences to actual characters
   */
  getSafeHtml(html: string): SafeHtml {
    const converted = this.convertUnicodeToChar(html);
    return this.sanitizer.bypassSecurityTrustHtml(converted);
  }

  /**
   * Convert Unicode escape sequences to actual characters
   * Supports formats: \1F60A, \u1F60A, &#x1F60A;
   */
  convertUnicodeToChar(str: string): string {
    if (!str) return str;

    // Convert \1F60A format (backslash + hex code)
    str = str.replace(/\\([0-9A-Fa-f]{4,6})\s*/g, (match, hex) => {
      return String.fromCodePoint(parseInt(hex, 16));
    });

    // Convert \u1F60A format (backslash + u + hex code)
    str = str.replace(/\\u([0-9A-Fa-f]{4,6})/g, (match, hex) => {
      return String.fromCodePoint(parseInt(hex, 16));
    });

    // Convert &#x1F60A; format (HTML entity)
    str = str.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
      return String.fromCodePoint(parseInt(hex, 16));
    });

    return str;
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
