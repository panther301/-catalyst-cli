import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CatalystTabComponent } from './catalyst-tab';
import { CatalystTabGroup } from './catalyst-tab-group';

/**
 * Factory function to create the CatalystTabModule with providers
 *
 * This is useful for configuring the module with custom providers when needed.
 * Currently returns the module without additional providers.
 *
 * @returns ModuleWithProviders<CatalystTabModule> - The module configuration
 *
 * @example
 * ```typescript
 * @NgModule({
 *   imports: [
 *     createCatalystTabModule()
 *   ]
 * })
 * export class AppModule {}
 * ```
 */
export function createCatalystTabModule(): ModuleWithProviders<CatalystTabModule> {
  return {
    ngModule: CatalystTabModule,
    providers: [],
  };
}

/**
 * CatalystTabModule - NgModule for importing tab components
 *
 * This module provides the CatalystTabGroup and CatalystTabComponent
 * for use in module-based Angular applications.
 *
 * **Note**: As of Angular 14+, these components are standalone and can be
 * imported directly without this module. This NgModule is provided for
 * backwards compatibility with older Angular applications.
 *
 * @example
 * ### Using the NgModule (legacy apps):
 * ```typescript
 * import { CatalystTabModule } from 'catalyst-tab-group';
 *
 * @NgModule({
 *   imports: [CatalystTabModule],
 *   declarations: [AppComponent],
 * })
 * export class AppModule {}
 * ```
 *
 * @example
 * ### Using standalone imports (recommended):
 * ```typescript
 * import { CatalystTabGroup, CatalystTabComponent } from 'catalyst-tab-group';
 *
 * @Component({
 *   selector: 'app-root',
 *   standalone: true,
 *   imports: [CatalystTabGroup, CatalystTabComponent],
 *   template: `
 *     <catalyst-tab-group>
 *       <catalyst-tab label="Tab 1">Content 1</catalyst-tab>
 *     </catalyst-tab-group>
 *   `
 * })
 * export class AppComponent {}
 * ```
 *
 * @deprecated Consider using standalone component imports for new applications
 */
@NgModule({
  declarations: [CatalystTabGroup, CatalystTabComponent],
  imports: [CommonModule],
  exports: [CatalystTabGroup, CatalystTabComponent],
})
export class CatalystTabModule {}
