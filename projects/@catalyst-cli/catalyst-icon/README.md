# @catalyst-cli/catalyst-icon

A powerful and flexible SVG icon component for Angular applications, built with modern Angular features (Signals, Standalone Components). This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Installation

```bash
npm i @catalyst-cli/catalyst-icon
```

## Demo

[Click here for live demo](https://panther301.github.io/-catalyst-cli/icons)

## Features

- **Standalone Components**: No module imports required.
- **Signals Based**: Built using Angular Signals for optimal performance and change detection.
- **Provider API**: Easy initialization through `provideCatalystIcons()`.
- **Flexible Registration**: Register SVG icons via raw strings or remote URLs.
- **Safe HTML**: Automatically sanitizes SVGs against XSS attacks.
- **Dynamic Styling**: Inherits `currentColor` or can be overridden via `color` input or standard CSS.
- **Responsive**: Dynamic `height` and `width` binding.

## Usage

### 1. Provide the Icon Service

In your application config (e.g. `app.config.ts`), provide the `HttpClient` (required for fetching URLs) and the Catalyst Icons service:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideCatalystIcons } from '@catalyst-cli/catalyst-icon';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideCatalystIcons()],
};
```

### 2. Register Icons

Inject `CatalystIconRegistryService` where you initialize your application (like `AppComponent`) to register your SVGs:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CatalystIconRegistryService, CatalystIconComponent } from '@catalyst-cli/catalyst-icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CatalystIconComponent],
  template: `
    <!-- Usage -->
    <catalyst-icon icon="pen"></catalyst-icon>
    <catalyst-icon icon="github" color="#333" height="32" width="32"></catalyst-icon>
  `,
})
export class AppComponent implements OnInit {
  private iconRegistry = inject(CatalystIconRegistryService);

  ngOnInit() {
    this.iconRegistry.registerIcons([
      // Register via SVG string
      {
        name: 'pen',
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>',
      },
      // Register via URL (Local asset or External HTTP)
      {
        name: 'github',
        url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg',
      },
    ]);

    // Or register a single icon programmatically
    // this.iconRegistry.registerIcon('user', '<svg>...</svg>');
    // this.iconRegistry.registerIconUrl('logo', 'assets/logo.svg');
  }
}
```

### 3. Use in your template

```html
<!-- Basic usage (uses defaults: 24x24 px, currentColor) -->
<catalyst-icon icon="pen"></catalyst-icon>

<!-- Custom sizing -->
<catalyst-icon icon="github" height="48" width="48"></catalyst-icon>

<!-- Custom color via Input -->
<catalyst-icon icon="user" color="#ff4757"></catalyst-icon>

<!-- Custom styling via CSS classes -->
<catalyst-icon icon="settings" class="my-custom-icon"></catalyst-icon>
```

## API Reference

### CatalystIconComponent (`<catalyst-icon>`)

| Input    | Type     | Default          | Description                                                     |
| -------- | -------- | ---------------- | --------------------------------------------------------------- |
| `icon`   | `string` | **Required**     | The registered name of the icon to display.                     |
| `color`  | `string` | `'currentColor'` | The color applied to the SVG's fill or stroke via CSS variable. |
| `height` | `string` | `'24'`           | The pixel height of the SVG.                                    |
| `width`  | `string` | `'24'`           | The pixel width of the SVG.                                     |
| `class`  | `string` | `''`             | Custom CSS class applied directly to the internal root element. |

### CatalystIconRegistryService

| Method            | Parameters                                            | Return Type          | Description                                         |
| ----------------- | ----------------------------------------------------- | -------------------- | --------------------------------------------------- |
| `registerIcons`   | `icons: {name: string, svg?: string, url?: string}[]` | `void`               | Batch registers multiple icons via strings or URLs. |
| `registerIcon`    | `name: string, svg: string`                           | `void`               | Registers a single icon from an SVG string.         |
| `registerIconUrl` | `name: string, url: string`                           | `void`               | Registers a single icon by fetching from a URL.     |
| `getIcon`         | `name: string`                                        | `Observable<string>` | Retrieves the safe HTML string for an icon.         |

## Styling

You can style the icon dynamically using the component Inputs (`color`, `height`, `width`) or by targeting it via CSS classes. The inner SVG automatically bridges standard custom CSS variables to match `currentColor` styles.

```scss
// In your global styles or component styles (using ::ng-deep)
::ng-deep .my-custom-icon {
  color: #a020f0 !important; // Overrides the default 'currentColor'
  background-color: #f3e8ff;
  border-radius: 50%;
  padding: 8px;
  height: 48px !important; // Overrides the height input
  width: 48px !important; // Overrides the width input
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(160, 32, 240, 0.4);
  }
}
```
