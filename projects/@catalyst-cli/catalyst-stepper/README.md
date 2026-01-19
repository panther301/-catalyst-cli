# @catalyst-cli/catalyst-stepper

A flexible and customizable stepper component for Angular applications. Built with modern Angular features (Signals, Standalone Components). This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Installation

```bash
npm i @catalyst-cli/catalyst-stepper
```

## Demo

[Click here for live demo](https://panther301.github.io/-catalyst-cli/stepper)

## Features

- **Standalone Component**: Easy to import and use.
- **Orientation Support**: Supports both horizontal and vertical layouts.
- **Header Customization**: Flexible header alignment (row or column).
- **Signals Support**: Built with modern Angular Signals.
- **Custom Content**: Transcluded content for each step body.

## Usage

### 1. Import the Component

Import `CatalystStepperComponent` and related models in your component:

```typescript
import { Component } from '@angular/core';
import {
  CatalystStepperComponent,
  CatalystStepBodyComponent,
} from '@catalyst-cli/catalyst-stepper';
import {
  StepperMenu,
  IStepperOptions,
  OrientationType,
  HeaderType,
} from '@catalyst-cli/catalyst-stepper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CatalystStepperComponent, CatalystStepBodyComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Define menu items for the stepper
  menu: StepperMenu[] = [
    { label: 'Step 1', description: 'Personal Info' },
    { label: 'Step 2', description: 'Address' },
    { label: 'Step 3', description: 'Confirmation' },
  ];

  // Configure stepper options
  options: IStepperOptions = {
    orientation: 'horizontal', // or 'vertical'
    header: 'column', // or 'row'
  };

  currentStep = 0;

  onStepChange(index: number) {
    console.log('Step changed to:', index);
    this.currentStep = index;
  }
}
```

### 2. Use in Template

```html
<app-catalyst-stepper
  [itemMenu]="menu"
  [options]="options"
  [(activeStep)]="currentStep"
  (onStepChange)="onStepChange($event)"
>
  <!-- Content for Step 1 (Index 0) -->
  <app-catalyst-step-body [value]="0">
    <h3>Personal Information</h3>
    <p>Please enter your details...</p>
  </app-catalyst-step-body>

  <!-- Content for Step 2 (Index 1) -->
  <app-catalyst-step-body [value]="1">
    <h3>Address Details</h3>
    <p>Shipping address...</p>
  </app-catalyst-step-body>

  <!-- Content for Step 3 (Index 2) -->
  <app-catalyst-step-body [value]="2">
    <h3>Confirm Order</h3>
    <p>Review your order...</p>
  </app-catalyst-step-body>
</app-catalyst-stepper>
```

## API

### CatalystStepperComponent (`<app-catalyst-stepper>`)

| Input        | Type              | Required | Default                                         | Description                                           |
| ------------ | ----------------- | -------- | ----------------------------------------------- | ----------------------------------------------------- |
| `itemMenu`   | `StepperMenu[]`   | **Yes**  | -                                               | Array of step definitions (label, description, etc.). |
| `options`    | `IStepperOptions` | No       | `{ orientation: 'vertical', header: 'column' }` | Configuration for layout and header style.            |
| `activeStep` | `number`          | No       | `0`                                             | Two-way binding for the current active step index.    |
| `height`     | `string`          | No       | `''`                                            | Custom height for the stepper container.              |

| Output         | Type                   | Description                                 |
| -------------- | ---------------------- | ------------------------------------------- |
| `onStepChange` | `EventEmitter<number>` | Emits the index of the newly selected step. |

### CatalystStepBodyComponent (`<app-catalyst-step-body>`)

| Input    | Type     | Required | Description                                  |
| -------- | -------- | -------- | -------------------------------------------- |
| `value`  | `number` | **Yes**  | The step index this body content belongs to. |
| `height` | `string` | No       | Custom height for the body content.          |

### Models

#### StepperMenu

```typescript
interface StepperMenu {
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: string;
}
```

#### IStepperOptions

```typescript
interface IStepperOptions {
  orientation: 'horizontal' | 'vertical'; // OrientationType
  header: 'row' | 'column'; // HeaderType
}
```
