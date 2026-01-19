import { Component, signal } from '@angular/core';
import {
  IWidget,
  IWidgetUpdateEvent,
  WidgetComponent,
  WidgetService,
} from '@catalyst-cli/dynamic-widget';
import { CatalystTabGroup, CatalystTabComponent } from '@catalyst-cli/catalyst-tab';
import { CardWidgetComponent } from '../../widgets/card-widget.component';
import { ChartWidgetComponent } from '../../widgets/chart-widget.component';
import { StatsWidgetComponent } from '../../widgets/stats-widget.component';

@Component({
  selector: 'app-dynamic-widget-demo',
  standalone: true,
  imports: [WidgetComponent, CatalystTabGroup, CatalystTabComponent],
  templateUrl: './dynamic-widget-demo.html',
  styleUrl: './dynamic-widget-demo.scss',
})
export class DynamicWidgetDemo {
  // Main demo tabs
  mainIndex = signal(0);
  mainConfig = {
    position: 'horizontal' as const,
    taClass: '',
    coClass: '',
  };

  // Widget demo state
  isEditMode = signal(false);
  widgets = signal<IWidget[]>([]);
  sidePanelOpen = signal(false);
  private nextId = 4;

  // Available widget types
  availableWidgets = [
    {
      id: 'chart',
      name: 'Sales Chart',
      component: ChartWidgetComponent,
      description: 'Monthly sales data visualization',
      category: 'charts',
    },
    {
      id: 'card',
      name: 'User Statistics',
      component: CardWidgetComponent,
      description: 'User statistics and metrics',
      category: 'stats',
    },
    {
      id: 'stats',
      name: 'Key Metrics',
      component: StatsWidgetComponent,
      description: 'Revenue, orders, and customer stats',
      category: 'metrics',
    },
  ];

  constructor(private widgetService: WidgetService) {
    this.initializeWidgets();
  }

  private initializeWidgets(): void {
    const widgets: IWidget[] = [
      this.widgetService.createWidget(1, {
        left: 0,
        top: 0,
        width: 50,
        height: 40,
        component: ChartWidgetComponent,
        metadata: {
          title: 'Sales Chart',
          description: 'Monthly sales data visualization',
          category: 'charts',
          data: { widgetType: 'chart' },
        },
      }),
      this.widgetService.createWidget(2, {
        left: 50,
        top: 0,
        width: 50,
        height: 40,
        component: CardWidgetComponent,
        metadata: {
          title: 'User Statistics',
          description: 'User statistics and metrics',
          category: 'stats',
          data: { widgetType: 'card' },
        },
      }),
      this.widgetService.createWidget(3, {
        left: 0,
        top: 40,
        width: 100,
        height: 30,
        component: StatsWidgetComponent,
        metadata: {
          title: 'Key Metrics',
          description: 'Revenue, orders, and customer stats',
          category: 'metrics',
          data: { widgetType: 'stats' },
        },
      }),
    ];

    this.widgets.set(widgets);
  }

  onWidgetUpdated(event: IWidgetUpdateEvent): void {
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
    const currentWidgets = this.widgets();
    const updatedWidgets = this.widgetService.removeWidget(currentWidgets, widgetId);
    this.widgets.set(updatedWidgets);
  }

  toggleEditMode(): void {
    this.isEditMode.update((value) => !value);
  }

  openSidePanel(): void {
    this.sidePanelOpen.set(true);
    this.isEditMode.set(true); // Enable edit mode when opening panel
  }

  closeSidePanel(): void {
    this.sidePanelOpen.set(false);
  }

  isWidgetDisplayed(widgetType: string): boolean {
    return this.widgets().some((w) => w.metadata?.data?.['widgetType'] === widgetType);
  }

  toggleWidget(widgetType: string): void {
    const isDisplayed = this.isWidgetDisplayed(widgetType);

    if (isDisplayed) {
      // Remove widget
      const widgetToRemove = this.widgets().find(
        (w) => w.metadata?.data?.['widgetType'] === widgetType,
      );
      if (widgetToRemove) {
        this.onWidgetDeleted(widgetToRemove.id);
      }
    } else {
      // Add widget
      const widgetConfig = this.availableWidgets.find((w) => w.id === widgetType);
      if (widgetConfig) {
        const newWidget = this.widgetService.createWidget(this.nextId++, {
          left: Math.random() * 50,
          top: Math.random() * 50,
          width: 33,
          height: 30,
          component: widgetConfig.component,
          metadata: {
            title: widgetConfig.name,
            description: widgetConfig.description,
            category: widgetConfig.category,
            data: { widgetType: widgetConfig.id },
          },
        });
        this.widgets.update((widgets) => [...widgets, newWidget]);
      }
    }
  }

  addNewWidget(): void {
    const newWidget = this.widgetService.createWidget(this.nextId++, {
      left: 25,
      top: 25,
      width: 25,
      height: 25,
      component: CardWidgetComponent,
      metadata: {
        title: `Widget ${this.nextId}`,
        description: 'New widget',
        category: 'general',
      },
    });

    this.widgets.update((widgets) => [...widgets, newWidget]);
  }

  // Code snippets for Overview tab
  importCode = `import { WidgetComponent, WidgetService } from '@catalyst-cli/dynamic-widget';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  constructor(private widgetService: WidgetService) {}
}`;

  customWidgetCode = `@Component({
  selector: 'app-chart-widget',
  standalone: true,
  template: \`
    <div class="widget-content">
      <h3>Sales Chart</h3>
      <canvas #chart></canvas>
    </div>
  \`,
  styles: [\`.widget-content { padding: 1rem; }\`]
})
export class ChartWidgetComponent {}`;

  initWidgetsCode = `widgets = signal<IWidget[]>([]);

constructor(private widgetService: WidgetService) {
  this.widgets.set([
    this.widgetService.createWidget(1, {
      left: 0,
      top: 0,
      width: 50,
      height: 40,
      component: ChartWidgetComponent,
      metadata: {
        title: 'Sales Chart',
        description: 'Monthly sales data'
      }
    })
  ]);
}`;

  templateCode = `<ngx-widget
  [widgets]="widgets()"
  [isEdit]="isEditMode"
  (widgetUpdated)="onWidgetUpdated($event)"
  (widgetDeleted)="onWidgetDeleted($event)">
</ngx-widget>`;

  // Code snippets for Examples
  dashboardTsCode = `isEditMode = signal(false);
widgets = signal<IWidget[]>([]);

toggleEditMode() {
  this.isEditMode.update(value => !value);
}

onWidgetUpdated(event: IWidgetUpdateEvent) {
  const widgets = this.widgets();
  const index = widgets.findIndex(w => w.id === event.id);
  
  if (index !== -1) {
    const updated = this.widgetService.updateWidget(
      widgets[index], 
      event
    );
    
    if (updated) {
      const newWidgets = [...widgets];
      newWidgets[index] = updated;
      this.widgets.set(newWidgets);
    }
  }
}

onWidgetDeleted(id: number) {
  const updated = this.widgetService.removeWidget(
    this.widgets(),
    id
  );
  this.widgets.set(updated);
}`;

  dashboardHtmlCode = `<button (click)="toggleEditMode()">
  {{ isEditMode() ? 'Exit Edit' : 'Edit' }}
</button>

<ngx-widget
  [widgets]="widgets()"
  [isEdit]="isEditMode()"
  (widgetUpdated)="onWidgetUpdated($event)"
  (widgetDeleted)="onWidgetDeleted($event)">
</ngx-widget>`;

  constraintsCode = `// Widget with size constraints
this.widgetService.createWidget(1, {
  left: 0,
  top: 0,
  width: 50,
  height: 40,
  component: ChartWidgetComponent,
  constraints: {
    minWidth: 25,    // Cannot be smaller than 25%
    maxWidth: 75,    // Cannot be larger than 75%
    minHeight: 20,   // Cannot be shorter than 20%
    resizable: true, // Allow resizing
    movable: true,   // Allow dragging
    deletable: false // Prevent deletion
  }
});

// Locked widget (cannot be moved or resized)
this.widgetService.createWidget(2, {
  left: 50,
  top: 0,
  width: 50,
  height: 40,
  component: StatsWidgetComponent,
  locked: true, // Widget is locked
  constraints: {
    resizable: false,
    movable: false,
    deletable: false
  }
});`;

  interfacesCode = `// Main widget interface
interface IWidget {
  id: number;                      // Unique ID
  left: number;                    // Position from left (0-100%)
  top: number;                     // Position from top (0-100%)
  width: number;                   // Width (0-100%)
  height: number;                  // Height (0-100%)
  component?: Type<Component>;     // Angular component to render
  componentInputs?: Record<string, any>; // Inputs for component
  constraints?: IWidgetConstraints; // Size/permission constraints
  metadata?: IWidgetMetadata;      // Title, description, etc.
  locked?: boolean;                // Prevent editing
  visible?: boolean;               // Show/hide widget
}

// Widget constraints
interface IWidgetConstraints {
  minWidth?: number;    // Min width percentage
  maxWidth?: number;    // Max width percentage
  minHeight?: number;   // Min height percentage
  maxHeight?: number;   // Max height percentage
  resizable?: boolean;  // Allow resizing
  movable?: boolean;    // Allow dragging
  deletable?: boolean;  // Allow deletion
}

// Update event
interface IWidgetUpdateEvent {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
}`;
}
