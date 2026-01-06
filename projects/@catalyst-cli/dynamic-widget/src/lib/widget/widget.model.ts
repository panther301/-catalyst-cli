import { Type, Component } from '@angular/core';

/**
 * Type alias for widget component class
 * Represents an Angular component class that can be used within a widget
 * Uses Component base class from Angular core for proper typing
 */
export type TWidgetComponent = Type<Component>;

/**
 * Type alias for percentage values (0-100)
 */
export type TPercentage = number;

/**
 * Type alias for positive integer IDs
 */
export type TWidgetId = number;

/**
 * Enum for widget drag/resize operation types
 */
export enum EWidgetDragType {
  MOVE = 'move',
  RESIZE = 'resize',
  RESIZE_TOP = 'resize-top',
  RESIZE_LEFT = 'resize-left',
  RESIZE_RIGHT = 'resize-right',
  RESIZE_BOTTOM = 'resize-bottom',
  RESIZE_TOP_LEFT = 'resize-top-left',
  RESIZE_TOP_RIGHT = 'resize-top-right',
  RESIZE_BOTTOM_LEFT = 'resize-bottom-left',
  RESIZE_BOTTOM_RIGHT = 'resize-bottom-right',
}

/**
 * Union type for all drag operation types
 */
export type TWidgetDragOperation =
  | EWidgetDragType.MOVE
  | EWidgetDragType.RESIZE
  | EWidgetDragType.RESIZE_TOP
  | EWidgetDragType.RESIZE_LEFT
  | EWidgetDragType.RESIZE_RIGHT
  | EWidgetDragType.RESIZE_BOTTOM
  | EWidgetDragType.RESIZE_TOP_LEFT
  | EWidgetDragType.RESIZE_TOP_RIGHT
  | EWidgetDragType.RESIZE_BOTTOM_LEFT
  | EWidgetDragType.RESIZE_BOTTOM_RIGHT;

/**
 * Widget position and size constraints
 */
export interface IWidgetConstraints {
  /** Minimum width as percentage (0-100) */
  minWidth?: TPercentage;
  /** Maximum width as percentage (0-100) */
  maxWidth?: TPercentage;
  /** Minimum height as percentage (0-100) */
  minHeight?: TPercentage;
  /** Maximum height as percentage (0-100) */
  maxHeight?: TPercentage;
  /** Whether the widget can be resized */
  resizable?: boolean;
  /** Whether the widget can be moved */
  movable?: boolean;
  /** Whether the widget can be deleted */
  deletable?: boolean;
}

/**
 * Widget metadata for additional information
 */
export interface IWidgetMetadata {
  /** Widget title/name */
  title?: string;
  /** Widget description */
  description?: string;
  /** Widget category/type */
  category?: string;
  /** Custom data associated with the widget */
  data?: Record<string, unknown>;
  /** Timestamp when widget was created */
  createdAt?: Date | string;
  /** Timestamp when widget was last updated */
  updatedAt?: Date | string;
  /** User who created the widget */
  createdBy?: string;
  /** User who last updated the widget */
  updatedBy?: string;
}

/**
 * Widget configuration options
 */
export interface IWidgetConfig {
  /** Grid size for snapping (default: 12) */
  gridSize?: number;
  /** Whether to enable grid snapping */
  snapToGrid?: boolean;
  /** Custom CSS class for the widget container */
  containerClass?: string;
  /** Custom CSS class for the widget content */
  contentClass?: string;
  /** Z-index for the widget */
  zIndex?: number;
}

/**
 * Main widget interface representing a draggable and resizable widget
 */
export interface IWidget {
  /** Unique identifier for the widget */
  id: TWidgetId;
  /** Horizontal position as percentage from left (0-100) */
  left: TPercentage;
  /** Vertical position as percentage from top (0-100) */
  top: TPercentage;
  /** Width as percentage (0-100) */
  width: TPercentage;
  /** Height as percentage (0-100) */
  height: TPercentage;
  /** Angular component type to render inside the widget */
  component?: TWidgetComponent;
  /** Component inputs to pass to the dynamic component */
  componentInputs?: Record<string, unknown>;
  /** Widget constraints (min/max sizes, permissions) */
  constraints?: IWidgetConstraints;
  /** Widget metadata (title, description, etc.) */
  metadata?: IWidgetMetadata;
  /** Widget configuration options */
  config?: IWidgetConfig;
  /** Whether the widget is currently visible */
  visible?: boolean;
  /** Whether the widget is currently locked (cannot be moved/resized) */
  locked?: boolean;
  /** Custom order for widget stacking */
  order?: number;
}

/**
 * Widget update event payload
 * Emitted when a widget's position or size changes
 */
export interface IWidgetUpdateEvent {
  /** Widget ID */
  id: TWidgetId;
  /** New horizontal position as percentage */
  left: TPercentage;
  /** New vertical position as percentage */
  top: TPercentage;
  /** New width as percentage */
  width: TPercentage;
  /** New height as percentage */
  height: TPercentage;
  /** Timestamp of the update */
  timestamp?: Date | string;
}

/**
 * Widget creation options
 * Used when creating a new widget
 */
export interface IWidgetCreateOptions {
  /** Initial horizontal position (default: 0) */
  left?: TPercentage;
  /** Initial vertical position (default: 0) */
  top?: TPercentage;
  /** Initial width (default: 25) */
  width?: TPercentage;
  /** Initial height (default: 25) */
  height?: TPercentage;
  /** Component type to render */
  component?: TWidgetComponent;
  /** Component inputs */
  componentInputs?: Record<string, unknown>;
  /** Widget constraints */
  constraints?: IWidgetConstraints;
  /** Widget metadata */
  metadata?: IWidgetMetadata;
  /** Widget configuration */
  config?: IWidgetConfig;
}

/**
 * Default widget configuration values
 */
export const DEFAULT_WIDGET_CONFIG: Required<IWidgetConfig> = {
  gridSize: 12,
  snapToGrid: true,
  containerClass: '',
  contentClass: '',
  zIndex: 1,
};

/**
 * Default widget constraints
 */
export const DEFAULT_WIDGET_CONSTRAINTS: Required<IWidgetConstraints> = {
  minWidth: 5,
  maxWidth: 100,
  minHeight: 5,
  maxHeight: 100,
  resizable: true,
  movable: true,
  deletable: true,
};

