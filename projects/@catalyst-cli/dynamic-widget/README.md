# @catalyst-cli/dynamic-widget

A powerful Angular library for creating draggable and resizable dynamic widgets with edit mode support. Perfect for building customizable dashboards and widget-based interfaces.

Part of the **Catalyst CLI** product suite - a collection of high-quality Angular and React UI components and libraries.

## Install @catalyst-cli/dynamic-widget

```bash
npm install @catalyst-cli/dynamic-widget
```

## Demo

[Click here for live demo](https://panther301.github.io/ngx-dynamic-widget/)

## Description

`@catalyst-cli/dynamic-widget` provides a flexible widget system where you can create draggable and resizable widgets that can contain any Angular component. Each widget can be positioned and sized independently, with full support for edit mode, constraints, and permissions.

The active edit mode can be toggled using the `isEdit` input. Widgets can be moved, resized, or deleted when in edit mode. You can fully customize widget appearance and behavior using CSS classes and configuration options.

## Use of @catalyst-cli/dynamic-widget

### First import NgxWidgetModule in the root module (AppModule):

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxWidgetModule } from '@catalyst-cli/dynamic-widget';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxWidgetModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### For Standalone Components:

```typescript
import { Component, signal } from '@angular/core';
import { WidgetComponent, WidgetService } from '@catalyst-cli/dynamic-widget';
import { IWidget } from '@catalyst-cli/dynamic-widget';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WidgetComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  widgets = signal<IWidget[]>([]);
  isEditMode = signal(false);

  constructor(private widgetService: WidgetService) {
    this.initializeWidgets();
  }

  private initializeWidgets(): void {
    const widgets = [
      this.widgetService.createWidget(1, {
        left: 0,
        top: 0,
        width: 50,
        height: 40,
        component: YourComponent,
        metadata: {
          title: 'My Widget',
          description: 'Widget description',
        },
      }),
    ];
    this.widgets.set(widgets);
  }

  onWidgetUpdated(event: any): void {
    // Handle widget update
    const currentWidgets = this.widgets();
    const widgetIndex = currentWidgets.findIndex((w) => w.id === event.id);
    if (widgetIndex !== -1) {
      const updatedWidget = this.widgetService.updateWidget(currentWidgets[widgetIndex], event);
      if (updatedWidget) {
        const updatedWidgets = [...currentWidgets];
        updatedWidgets[widgetIndex] = updatedWidget;
        this.widgets.set(updatedWidgets);
      }
    }
  }

  onWidgetDeleted(widgetId: number): void {
    const updatedWidgets = this.widgetService.removeWidget(this.widgets(), widgetId);
    this.widgets.set(updatedWidgets);
  }

  toggleEditMode(): void {
    this.isEditMode.update((value) => !value);
  }
}
```

### How to use in your app.component.html:

```html
<div class="dashboard-container">
  <header class="dashboard-header">
    <h1>My Dashboard</h1>
    <button (click)="toggleEditMode()">{{ isEditMode() ? "Exit Edit Mode" : "Edit Mode" }}</button>
  </header>

  <main class="dashboard-content">
    <catalyst-widget
      [widgets]="widgets()"
      [isEdit]="isEditMode()"
      (widgetUpdated)="onWidgetUpdated($event)"
      (widgetDeleted)="onWidgetDeleted($event)"
    ></catalyst-widget>
  </main>
</div>
```

### Create a Widget Component:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-widget',
  standalone: true,
  template: `
    <div>
      <h3>My Widget Content</h3>
      <p>This is a custom widget component</p>
    </div>
  `,
})
export class MyWidgetComponent {}
```

## Events

The **widgetUpdated** output event is emitted when a widget's position or size changes.

The **widgetDeleted** output event is emitted when a widget is deleted.

## API Reference

### WidgetComponent

#### Inputs

- `widgets: IWidget[]` - Array of widgets to display
- `isEdit: boolean` - Enable/disable edit mode (default: `false`)

#### Outputs

- `widgetUpdated: IWidgetUpdateEvent` - Emitted when a widget's position or size changes
- `widgetDeleted: number` - Emitted when a widget is deleted (widget ID)

### WidgetService

#### Methods

- `createWidget(id: TWidgetId, options?: IWidgetCreateOptions): IWidget` - Create a new widget
- `updateWidget(widget: IWidget, update: IWidgetUpdateEvent): IWidget | null` - Update widget position/size
- `removeWidget(widgets: IWidget[], id: TWidgetId): IWidget[]` - Remove widget from array
- `findWidgetById(widgets: IWidget[], id: TWidgetId): IWidget | undefined` - Find widget by ID
- `validateWidget(widget: IWidget): boolean` - Validate widget properties
- `canMoveWidget(widget: IWidget): boolean` - Check if widget can be moved
- `canResizeWidget(widget: IWidget): boolean` - Check if widget can be resized
- `canDeleteWidget(widget: IWidget): boolean` - Check if widget can be deleted
- `applyConstraints(widget: IWidget): IWidget` - Apply constraints to widget

### Types

- `IWidget` - Main widget interface
- `IWidgetCreateOptions` - Options for creating widgets
- `IWidgetUpdateEvent` - Widget update event payload
- `IWidgetConstraints` - Widget constraints (min/max sizes, permissions)
- `IWidgetMetadata` - Widget metadata (title, description, etc.)
- `IWidgetConfig` - Widget configuration options
- `TWidgetComponent` - Type for widget components
- `TPercentage` - Percentage type (0-100)
- `TWidgetId` - Widget ID type
- `EWidgetDragType` - Enum for drag operation types

## Examples

### Widget with Constraints

```typescript
const widget = this.widgetService.createWidget(1, {
  left: 0,
  top: 0,
  width: 50,
  height: 40,
  component: MyComponent,
  constraints: {
    minWidth: 25,
    maxWidth: 75,
    minHeight: 20,
    maxHeight: 60,
    resizable: true,
    movable: true,
    deletable: true,
  },
});
```

### Widget with Metadata

```typescript
const widget = this.widgetService.createWidget(1, {
  left: 0,
  top: 0,
  width: 50,
  height: 40,
  component: MyComponent,
  metadata: {
    title: 'Sales Dashboard',
    description: 'Monthly sales overview',
    category: 'analytics',
    createdAt: new Date().toISOString(),
  },
});
```

## Styling

The library includes default styles, but you can customize them by overriding CSS classes or using your own styles. Widgets use percentage-based positioning and sizing.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Peer Dependencies

This library requires:

- Angular 18+
- RxJS 7+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## About

Custom Angular Dynamic Widget Library

### Resources

- [GitHub Repository](#) <!-- Add your repo link -->
- [Documentation](#) <!-- Add docs link -->
- [Issues](#) <!-- Add issues link -->

### License

MIT License
