import { Injectable } from '@angular/core';
import {
  IWidget,
  IWidgetCreateOptions,
  IWidgetUpdateEvent,
  TWidgetId,
  DEFAULT_WIDGET_CONFIG,
  DEFAULT_WIDGET_CONSTRAINTS,
} from './widget.model';

/**
 * Service for managing widget operations
 * Provides methods for creating, validating, and managing widgets
 */
@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  /**
   * Creates a widget with default values
   * @param id - Unique identifier for the widget
   * @param options - Optional configuration for the widget
   * @returns A new widget instance with default values applied
   */
  createWidget(id: TWidgetId, options?: IWidgetCreateOptions): IWidget {
    return {
      id,
      left: options?.left ?? 0,
      top: options?.top ?? 0,
      width: options?.width ?? 25,
      height: options?.height ?? 25,
      component: options?.component,
      componentInputs: options?.componentInputs,
      constraints: {
        ...DEFAULT_WIDGET_CONSTRAINTS,
        ...options?.constraints,
      },
      metadata: options?.metadata,
      config: {
        ...DEFAULT_WIDGET_CONFIG,
        ...options?.config,
      },
      visible: true,
      locked: false,
      order: 0,
    };
  }

  /**
   * Validates widget position and size values
   * @param widget - The widget to validate
   * @returns True if the widget is valid, false otherwise
   */
  validateWidget(widget: IWidget): boolean {
    const { left, top, width, height, constraints } = widget;

    // Validate percentage ranges
    if (
      left < 0 ||
      left > 100 ||
      top < 0 ||
      top > 100 ||
      width <= 0 ||
      width > 100 ||
      height <= 0 ||
      height > 100
    ) {
      return false;
    }

    // Validate constraints if provided
    if (constraints) {
      const { minWidth, maxWidth, minHeight, maxHeight } = constraints;
      if (minWidth !== undefined && width < minWidth) return false;
      if (maxWidth !== undefined && width > maxWidth) return false;
      if (minHeight !== undefined && height < minHeight) return false;
      if (maxHeight !== undefined && height > maxHeight) return false;
    }

    // Validate that widget doesn't overflow container
    if (left + width > 100 || top + height > 100) {
      return false;
    }

    return true;
  }

  /**
   * Updates a widget's position and size
   * @param widget - The widget to update
   * @param update - The update event containing new position/size values
   * @returns The updated widget or null if validation fails
   */
  updateWidget(
    widget: IWidget,
    update: IWidgetUpdateEvent
  ): IWidget | null {
    const updatedWidget: IWidget = {
      ...widget,
      left: update.left,
      top: update.top,
      width: update.width,
      height: update.height,
    };

    // Update metadata timestamp if it exists
    if (updatedWidget.metadata) {
      updatedWidget.metadata.updatedAt = new Date().toISOString();
    }

    // Validate the updated widget
    if (!this.validateWidget(updatedWidget)) {
      return null;
    }

    return updatedWidget;
  }

  /**
   * Finds a widget by ID in an array of widgets
   * @param widgets - Array of widgets to search
   * @param id - Widget ID to find
   * @returns The widget if found, undefined otherwise
   */
  findWidgetById(widgets: IWidget[], id: TWidgetId): IWidget | undefined {
    return widgets.find((widget) => widget.id === id);
  }

  /**
   * Removes a widget from an array by ID
   * @param widgets - Array of widgets
   * @param id - Widget ID to remove
   * @returns New array without the specified widget
   */
  removeWidget(widgets: IWidget[], id: TWidgetId): IWidget[] {
    return widgets.filter((widget) => widget.id !== id);
  }

  /**
   * Checks if a widget can be moved based on its constraints
   * @param widget - The widget to check
   * @returns True if the widget can be moved, false otherwise
   */
  canMoveWidget(widget: IWidget): boolean {
    if (widget.locked) return false;
    return widget.constraints?.movable ?? true;
  }

  /**
   * Checks if a widget can be resized based on its constraints
   * @param widget - The widget to check
   * @returns True if the widget can be resized, false otherwise
   */
  canResizeWidget(widget: IWidget): boolean {
    if (widget.locked) return false;
    return widget.constraints?.resizable ?? true;
  }

  /**
   * Checks if a widget can be deleted based on its constraints
   * @param widget - The widget to check
   * @returns True if the widget can be deleted, false otherwise
   */
  canDeleteWidget(widget: IWidget): boolean {
    if (widget.locked) return false;
    return widget.constraints?.deletable ?? true;
  }

  /**
   * Applies constraints to widget dimensions
   * @param widget - The widget to apply constraints to
   * @returns A new widget with constrained dimensions
   */
  applyConstraints(widget: IWidget): IWidget {
    if (!widget.constraints) return widget;

    const { minWidth, maxWidth, minHeight, maxHeight } = widget.constraints;
    let { width, height } = widget;

    if (minWidth !== undefined && width < minWidth) {
      width = minWidth;
    }
    if (maxWidth !== undefined && width > maxWidth) {
      width = maxWidth;
    }
    if (minHeight !== undefined && height < minHeight) {
      height = minHeight;
    }
    if (maxHeight !== undefined && height > maxHeight) {
      height = maxHeight;
    }

    return {
      ...widget,
      width,
      height,
    };
  }
}

