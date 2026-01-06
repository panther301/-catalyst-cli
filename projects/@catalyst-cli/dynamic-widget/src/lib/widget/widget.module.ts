import { NgModule, type ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { WidgetService } from './widget.service';

/**
 * Creates and returns the NgxWidgetModule configuration.
 * This function-based approach is compatible with Angular 19+ patterns.
 *
 * @returns ModuleWithProviders containing the widget module configuration
 *
 * @example
 * ```typescript
 * import { createNgxWidgetModule } from 'ngx-dynamic-widget';
 *
 * @NgModule({
 *   imports: [createNgxWidgetModule()],
 *   // ...
 * })
 * export class AppModule {}
 * ```
 */
export function createNgxWidgetModule(): ModuleWithProviders<NgxWidgetModule> {
  return {
    ngModule: NgxWidgetModule,
    providers: [WidgetService],
  };
}

/**
 * NgxWidgetModule
 *
 * Main module for ngx-dynamic-widget library.
 * Import this module to use the WidgetComponent and WidgetService.
 *
 * This module uses Angular 19's modern patterns with standalone components.
 *
 * @example
 * ```typescript
 * // For standalone components
 * import { NgxWidgetModule } from 'ngx-dynamic-widget';
 *
 * @Component({
 *   standalone: true,
 *   imports: [NgxWidgetModule],
 *   // ...
 * })
 * export class MyComponent {}
 * ```
 */
@NgModule({
  imports: [
    CommonModule,
    WidgetComponent, // Import standalone component
  ],
  exports: [
    WidgetComponent, // Export component for use in other modules
  ],
  providers: [
    WidgetService, // Provide service at module level
  ],
})
export class NgxWidgetModule {}
