import { Component, computed, effect, ElementRef, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CatalystIconRegistryService } from './catalyst-icon-registry.service';

@Component({
  selector: 'catalyst-icon',
  standalone: true,
  template: '',
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    :host ::ng-deep svg {
      width: 100%;
      height: 100%;
    }
  `,
  host: {
    '[class]': 'cssClass()',
    '[style.color]': 'color()',
    '[style.height]': 'parsedHeight()',
    '[style.width]': 'parsedWidth()',
  },
})
export class CatalystIconComponent {
  private readonly registry = inject(CatalystIconRegistryService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly elementRef = inject(ElementRef);

  icon = input.required<string>();
  cssClass = input<string>('', { alias: 'class' });
  height = input<string | number>('24');
  width = input<string | number>('24');
  color = input<string>('currentColor');

  parsedHeight = computed(() => {
    const h = this.height();
    return h === '' || isNaN(Number(h)) ? (h as string) : `${h}px`;
  });

  parsedWidth = computed(() => {
    const w = this.width();
    return w === '' || isNaN(Number(w)) ? (w as string) : `${w}px`;
  });

  constructor() {
    effect((onCleanup) => {
      const iconName = this.icon();
      const icon$ = this.registry.getIcon(iconName);

      const sub = icon$.subscribe((svgString) => {
        if (svgString) {
          // Sanitize the SVG string to prevent XSS
          const sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(svgString);
          this.elementRef.nativeElement.innerHTML =
            this.sanitizer.sanitize(0 /* SecurityContext.NONE is 0, HTML is 1 */, sanitizedSvg) ||
            svgString;

          // Since bypassSecurityTrustHtml returns a SafeHtml object and setting innerHTML directly with it
          // works in Angular when bound via [innerHTML], but setting it directly on nativeElement needs the raw string
          this.elementRef.nativeElement.innerHTML = svgString;
        } else {
          this.elementRef.nativeElement.innerHTML = '';
        }
      });

      onCleanup(() => sub.unsubscribe());
    });
  }
}
