import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  contentChildren,
  effect,
  model,
  signal,
  input,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CatalystTabComponent } from './catalyst-tab';
import { TabGroupConfig } from './catalyst-tab-group.model';

// Constants
/** Width of each tab in pixels - must match min-width in SCSS */
const TAB_WIDTH = 120;
/** Screen width below which single-tab scroll behavior is used */
const MOBILE_BREAKPOINT = 360;
/** Debounce delay in milliseconds for window resize events */
const RESIZE_DEBOUNCE_MS = 100;

/**
 * CatalystTabGroup - A flexible tab navigation component with horizontal/vertical layouts
 *
 * Features:
 * - Supports horizontal and vertical tab orientations
 * - Automatic scrolling for overflow tabs
 * - Manual scroll controls (prev/next buttons)
 * - Keyboard navigation (Enter/Space)
 * - ARIA accessibility attributes
 * - Customizable styling via CSS classes
 * - Two-way binding for selected tab index
 *
 * @example
 * ```html
 * <catalyst-tab-group [selectedIndex]="index" [tabGroupConfig]="config">
 *   <catalyst-tab label="First">Content 1</catalyst-tab>
 *   <catalyst-tab label="Second">Content 2</catalyst-tab>
 * </catalyst-tab-group>
 * ```
 */
@Component({
  selector: 'catalyst-tab-group',
  standalone: true,
  template: `
    <div [class]="containerClass()" #container>
      @if (isHorizontal()) {
        <span
          class="change-btn prev"
          (click)="scrollTab(-1)"
          [class.hide]="!isScroll()"
          [class.shadow]="atStart()"
        >
          <p>&lsaquo;</p>
        </span>
      }
      <ul [style.transform]="sStyle()" [class.reset-transform]="!isHorizontal()">
        @for (tab of tabs(); track $index) {
          <li
            (click)="selectTab(tab, true)"
            [class.active]="tab.active()"
            role="tab"
            [attr.tabindex]="tab.active() ? 0 : -1"
            [attr.aria-selected]="tab.active()"
            (keydown.enter)="selectTab(tab, true)"
            (keydown.space)="selectTab(tab, true)"
          >
            <span>{{ tab.title() }}</span>
          </li>
        }
      </ul>
      @if (isHorizontal()) {
        <span
          class="change-btn next"
          [class.hide]="!isScroll()"
          [class.shadow]="atEnd()"
          (click)="scrollTab(1)"
        >
          <p>&rsaquo;</p>
        </span>
      }
    </div>
    <div [class]="contentClass()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./catalyst-tab-group.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalystTabGroup implements AfterViewInit {
  /** Reference to the tab container element */
  @ViewChild('container') container!: ElementRef;

  /** Configuration for tab group (position, custom classes) */
  tabGroupConfig = input<TabGroupConfig>({
    position: 'horizontal',
    coClass: '',
    taClass: '',
  });

  /** Two-way binding for selected tab index */
  selectedIndex = model(0);

  /** Content children signal containing all tab components */
  tabs = contentChildren(CatalystTabComponent);

  /** Signal indicating whether scroll is at the start position */
  atStart = signal(true);

  /** Signal indicating whether scroll is at the end position */
  atEnd = signal(false);

  /** Current leftmost visible tab index */
  leftTabIdx = signal(0);

  /** Transform style for scrolling tabs (e.g., translateX(-120px)) */
  sStyle = signal<string>('');

  /** Signal indicating whether tabs require scrolling */
  isScroll = signal(false);

  /** Timeout ID for debounced resize handler */
  private resizeTimeout: ReturnType<typeof setTimeout> | undefined;

  /** Tracks the previously selected index to detect changes */
  private previousSelectedIndex = -1;

  /** Computed signal indicating if tab orientation is horizontal */
  isHorizontal = computed(() => this.tabGroupConfig().position === 'horizontal');

  /** Computed CSS class for tab container based on position and custom class */
  containerClass = computed(() => {
    const { position, taClass } = this.tabGroupConfig();
    const base = position === 'horizontal' ? 'tab-menu' : 'tab-vertical-menu';
    return taClass ? `${base} ${taClass}` : base;
  });

  /** Computed CSS class for content area based on position and custom class */
  contentClass = computed(() => {
    const { position, coClass } = this.tabGroupConfig();
    const base = position === 'vertical' ? 'vertical-content' : '';
    return coClass ? `${base} ${coClass}`.trim() : base;
  });

  /**
   * Constructor - Sets up effects for handling tab selection and resize events
   */
  constructor() {
    // Effect to handle selection changes
    effect(() => {
      const index = this.selectedIndex();
      const tabs = this.tabs();
      if (tabs.length && index < tabs.length) {
        // Only auto-scroll if the index actually changed (user clicked a different tab)
        const shouldAutoScroll = this.previousSelectedIndex !== index;
        this.updateActiveTab(tabs[index], shouldAutoScroll);
        this.previousSelectedIndex = index;
      }
    });

    // Effect for resize checks on tab changes
    effect(() => {
      // triggers on tabs change
      this.tabs();
      // Use setTimeout to allow DOM to settle if needed, or just check
      setTimeout(() => this.onResize(), 0);
    });

    // Effect to handle configuration changes (e.g. orientation switch)
    effect(() => {
      this.tabGroupConfig();
      setTimeout(() => this.onResize(), 0);
    });
  }

  /**
   * Angular lifecycle hook - Performs initial resize calculation after view initialization
   */
  ngAfterViewInit() {
    this.onResize();
  }

  /**
   * Window resize event handler with debouncing to improve performance
   * @param event - Optional resize event
   */
  @HostListener('window:resize', ['$event'])
  onResizeDebounced(event?: Event) {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.onResize(), RESIZE_DEBOUNCE_MS);
  }

  /**
   * Recalculates scroll metrics and updates scroll state when container is resized
   * Handles clamping of scroll position if resize makes current position invalid
   */
  onResize() {
    if (!this.container) return;

    const { visibleTabs, maxLeft, isScrollable } = this.getScrollMetrics();
    this.isScroll.set(isScrollable);

    if (isScrollable) {
      // Clamp current left if resizing made it invalid
      if (this.leftTabIdx() > maxLeft) {
        this.leftTabIdx.set(maxLeft);
        if (this.isHorizontal()) {
          this.sStyle.set(`translateX(${maxLeft * -TAB_WIDTH}px)`);
        }
      }

      this.updateScrollState(this.leftTabIdx(), maxLeft);
    } else {
      // Not scrolling - reset to defaults
      this.leftTabIdx.set(0);
      this.sStyle.set('');
      this.atStart.set(true);
      this.atEnd.set(true);
    }
  }

  /**
   * Handles tab selection when user clicks or uses keyboard to select a tab
   * @param tab - The tab component to select
   * @param click - Whether this selection was triggered by a click/keyboard event
   */
  selectTab(tab: CatalystTabComponent, click = false) {
    const tabs = this.tabs();

    // Update model if clicked
    if (click) {
      const index = tabs.indexOf(tab);
      if (index !== -1) {
        this.selectedIndex.set(index);
      }
    }
  }

  /**
   * Updates the active tab state and optionally auto-scrolls to make it visible
   * @param activeTab - The tab to activate
   * @param shouldAutoScroll - Whether to auto-scroll to show the selected tab (default: false)
   * @private
   */
  private updateActiveTab(activeTab: CatalystTabComponent, shouldAutoScroll = false) {
    const tabs = this.tabs();
    const index = tabs.indexOf(activeTab);

    // Deactivate all and activate selected
    tabs.forEach((t) => t.active.set(false));
    activeTab.active.set(true);

    // Only auto-scroll if explicitly requested (when tab selection changes)
    if (shouldAutoScroll && this.container) {
      const offsetWidth = this.getContainerWidth();
      // On mobile (narrow screens), scroll one tab at a time; on desktop, leave one tab visible for context
      const scrollOffset = offsetWidth < MOBILE_BREAKPOINT ? 0 : 1;
      this.scrollTabLogic(index - this.leftTabIdx() - scrollOffset);
    }
  }

  /**
   * Public method to manually scroll tabs left or right
   * Called by prev/next buttons in the template
   * @param x - Number of tabs to scroll (negative for left, positive for right)
   */
  scrollTab(x: number) {
    // Manual scroll - just scroll the view without changing the selected tab
    this.scrollTabLogic(x);
  }

  /**
   * Core scrolling logic - calculates and applies scroll position
   * @param x - Number of tabs to scroll (can be negative or positive)
   * @private
   */
  private scrollTabLogic(x: number) {
    if (!this.container || !this.isScroll()) return;

    const { maxLeft } = this.getScrollMetrics();

    // Calculate and clamp new position
    const newLeft = Math.max(0, Math.min(this.leftTabIdx() + x, maxLeft));

    // Apply new scroll position
    this.leftTabIdx.set(newLeft);

    if (this.isHorizontal()) {
      this.sStyle.set(`translateX(${newLeft * -TAB_WIDTH}px)`);
    }

    this.updateScrollState(newLeft, maxLeft);
  }

  /**
   * Calculates all scroll-related metrics in one place to avoid duplication
   * @returns Object containing offsetWidth, tabsLength, visibleTabs, maxLeft, and isScrollable
   * @private
   */
  private getScrollMetrics() {
    const offsetWidth = this.getContainerWidth();
    const tabsLength = this.tabs().length;
    const visibleTabs = Math.floor(offsetWidth / TAB_WIDTH);
    const maxLeft = Math.max(0, tabsLength - visibleTabs);
    const isScrollable = this.isHorizontal() && tabsLength * TAB_WIDTH > offsetWidth;

    return { offsetWidth, tabsLength, visibleTabs, maxLeft, isScrollable };
  }

  /**
   * Gets the width of the tab container element
   * @returns Container width in pixels
   * @private
   */
  private getContainerWidth(): number {
    return (this.container.nativeElement as HTMLElement).offsetWidth;
  }

  /**
   * Updates the atStart and atEnd signals based on current scroll position
   * @param currentLeft - Current leftmost visible tab index
   * @param maxLeft - Maximum possible left position
   * @private
   */
  private updateScrollState(currentLeft: number, maxLeft: number) {
    this.atStart.set(currentLeft === 0);
    this.atEnd.set(currentLeft === maxLeft);
  }
}
