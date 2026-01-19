export type Position = 'vertical' | 'horizontal';

/**
 * Configuration interface for CatalystTabGroup component
 *
 * Defines the layout and styling options for the tab group
 */
export interface TabGroupConfig {
  /**
   * Tab orientation
   * - 'horizontal': Tabs displayed in a row at the top (default)
   * - 'vertical': Tabs displayed in a column on the left
   */
  position: 'horizontal' | 'vertical';

  /**
   * Custom CSS class to apply to the tab container element
   * Use this to customize tab appearance and layout
   */
  taClass: string;

  /**
   * Custom CSS class to apply to the content area element
   * Use this to customize content panel appearance
   */
  coClass: string;
}
