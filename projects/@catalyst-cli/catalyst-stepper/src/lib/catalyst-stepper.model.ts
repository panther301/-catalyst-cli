/**
 * Model definitions for @catalyst-cli/catalyst-stepper
 */
export type Header = 'row' | 'column';
export type Orientation = 'horizontal' | 'vertical';

export interface IStepperOptions {
  orientation: Orientation;
  header: Header;
}

export interface StepperMenu {
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: string;
}

export enum HeaderType {
  ROW = 'row',
  COLUMN = 'column',
  DEFAULT = 'column',
}

export enum OrientationType {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  DEFAULT = 'vertical',
}
