import { Component, input, model, ChangeDetectionStrategy } from '@angular/core';

/**
 * CatalystTabComponent - Individual tab panel component used within CatalystTabGroup
 *
 * This component represents a single tab with its associated content.
 * It automatically shows/hides its content based on the active state.
 *
 * Features:
 * - Automatic visibility based on active state
 * - Customizable label via the 'label' input
 * - Two-way binding for active state
 * - OnPush change detection for performance
 *
 * @example
 * ```html
 * <catalyst-tab-group>
 *   <catalyst-tab label="Profile">
 *     <p>Profile content here</p>
 *   </catalyst-tab>
 *   <catalyst-tab label="Settings">
 *     <p>Settings content here</p>
 *   </catalyst-tab>
 * </catalyst-tab-group>
 * ```
 */
@Component({
  selector: 'catalyst-tab',
  standalone: true,
  template: `
    @if (active()) {
      <div class="tab-panel" role="tabpanel">
        <ng-content></ng-content>
      </div>
    }
  `,
  styles: ['.tab-panel {padding: 16px;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalystTabComponent {
  /**
   * The label text displayed in the tab header
   * Can be set using either 'title' or 'label' attribute
   */
  title = input.required<string>({ alias: 'label' });

  /**
   * Two-way binding for the active state of this tab
   * When true, the tab content is visible
   */
  active = model(false);
}
