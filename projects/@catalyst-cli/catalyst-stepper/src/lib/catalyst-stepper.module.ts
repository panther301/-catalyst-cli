import { NgModule, type ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalystStepperComponent } from './catalyst-stepper.component';
import { CatalystStepHeadComponent } from './catalyst-step-head/catalyst-step-head.component';
import { CatalystStepBodyComponent } from './catalyst-step-body/catalyst-step-body.component';

/**
 * Creates and returns the CatalystStepperModule configuration.
 * This function-based approach is compatible with Angular 21+ patterns.
 *
 * @returns ModuleWithProviders containing the stepper module configuration
 *
 * @example
 * ```typescript
 * import { createCatalystStepperModule } from '@catalyst-cli/catalyst-stepper';
 *
 * @NgModule({
 *   imports: [createCatalystStepperModule()],
 *   // ...
 * })
 * export class AppModule {}
 * ```
 */
export function createCatalystStepperModule(): ModuleWithProviders<CatalystStepperModule> {
  return {
    ngModule: CatalystStepperModule,
    providers: [],
  };
}

/**
 * CatalystStepperModule
 *
 * Main module for @catalyst-cli/catalyst-stepper library.
 * Import this module to use the CatalystStepperComponent and related components.
 *
 * This module uses Angular 21's modern patterns with standalone components.
 *
 * @example
 * ```typescript
 * // For standalone components
 * import { CatalystStepperModule } from '@catalyst-cli/catalyst-stepper';
 *
 * @Component({
 *   standalone: true,
 *   imports: [CatalystStepperModule],
 *   // ...
 * })
 * export class MyComponent {}
 * ```
 */
@NgModule({
  imports: [
    CommonModule,
    CatalystStepperComponent, // Import standalone component
    CatalystStepHeadComponent, // Import standalone component
    CatalystStepBodyComponent, // Import standalone component
  ],
  exports: [
    CatalystStepperComponent, // Export component for use in other modules
    CatalystStepHeadComponent, // Export component for use in other modules
    CatalystStepBodyComponent, // Export component for use in other modules
  ],
})
export class CatalystStepperModule {}
