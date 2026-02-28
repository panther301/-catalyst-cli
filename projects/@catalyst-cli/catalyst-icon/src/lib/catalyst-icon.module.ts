import {
  NgModule,
  ModuleWithProviders,
  EnvironmentProviders,
  makeEnvironmentProviders,
} from '@angular/core';
import { CatalystIconComponent } from './catalyst-icon';
import { CatalystIconRegistryService } from './catalyst-icon-registry.service';

/**
 * Modern provider function for configuring the CatalystIconRegistryService
 * in standalone applications (e.g., inside app.config.ts).
 */
export function provideCatalystIcons(): EnvironmentProviders {
  return makeEnvironmentProviders([CatalystIconRegistryService]);
}

/**
 * Traditional NgModule for Catalyst Icons.
 * Useful for older NgModule-based applications to import the component.
 */
@NgModule({
  imports: [CatalystIconComponent],
  exports: [CatalystIconComponent],
})
export class CatalystIconModule {
  static forRoot(): ModuleWithProviders<CatalystIconModule> {
    return {
      ngModule: CatalystIconModule,
      providers: [CatalystIconRegistryService],
    };
  }
}
