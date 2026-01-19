# @catalyst-cli/catalyst-tab-group

A powerful and flexible generic tab component for Angular applications, built with modern Angular features (Signals, Standalone Components). This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Installation

```bash
npm i @catalyst-cli/catalyst-tab-group
```

## Demo

[Click here for live demo](https://panther301.github.io/-catalyst-cli/tabs)

## Features

- **Standalone Components**: No module imports required.
- **Orientation Support**: Supports both horizontal and vertical tab layouts.
- **Signals Based**: Built using Angular Signals for optimal performance and change detection.
- **Responsive**: Automatic scrolling for overflow tabs with touch support.
- **Customizable**: Full control over styling via CSS classes.
- **Accessible**: Built with ARIA attributes for accessibility.

## Usage

### 1. Import the components

Import `CatalystTabGroup` and `CatalystTabComponent` in your component or module:

```typescript
import { Component } from '@angular/core';
import {
  CatalystTabGroup,
  CatalystTabComponent,
  TabGroupConfig,
} from '@catalyst-cli/catalyst-tab-group';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CatalystTabGroup, CatalystTabComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Optional configuration
  tabConfig: TabGroupConfig = {
    position: 'horizontal', // 'horizontal' | 'vertical'
    taClass: 'my-custom-tab-class', // Custom class for tab container
    coClass: 'my-custom-content-class', // Custom class for content area
  };

  selectedIndex = 0;

  onTabChange(index: number) {
    console.log('Selected tab index:', index);
    this.selectedIndex = index;
  }
}
```

### 2. Use in your template

```html
<catalyst-tab-group
  [tabGroupConfig]="tabConfig"
  [(selectedIndex)]="selectedIndex"
  (selectedIndexChange)="onTabChange($event)"
>
  <catalyst-tab label="First Tab">
    <div class="p-4">
      <h3>First Tab Content</h3>
      <p>This is the content for the first tab.</p>
    </div>
  </catalyst-tab>

  <catalyst-tab label="Second Tab">
    <div class="p-4">
      <h3>Second Tab Content</h3>
      <p>This is the content for the second tab.</p>
    </div>
  </catalyst-tab>
</catalyst-tab-group>
```

You can also use a simple static label:

```html
<catalyst-tab-group>
  <catalyst-tab label="Simple"> Content goes here... </catalyst-tab>
</catalyst-tab-group>
```

## API

### CatalystTabGroup (`<catalyst-tab-group>`)

| Input            | Type             | Default                           | Description                                                      |
| ---------------- | ---------------- | --------------------------------- | ---------------------------------------------------------------- |
| `tabGroupConfig` | `TabGroupConfig` | `{ position: 'horizontal', ... }` | Configuration object for layout and styling.                     |
| `selectedIndex`  | `number`         | `0`                               | The index of the currently active tab. Supports two-way binding. |

### CatalystTabComponent (`<catalyst-tab>`)

| Input   | Type     | Required | Description                                 |
| ------- | -------- | -------- | ------------------------------------------- |
| `label` | `string` | **Yes**  | The label text displayed in the tab header. |

### TabGroupConfig Interface

```typescript
interface TabGroupConfig {
  position: 'horizontal' | 'vertical';
  taClass: string; // Class for the tab header container
  coClass: string; // Class for the tab content container
}
```

## Styling

You can customize the appearance by passing custom classes via `taClass` (for the tab list) and `coClass` (for the content area) in the `tabGroupConfig`.

Example SCSS to override default styles:

```scss
// In your global styles or component styles (if using ::ng-deep)
.my-custom-tab-class {
  background-color: #f5f5f5;

  li.active {
    border-bottom: 2px solid primary-color;
  }
}
```
