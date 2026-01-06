import { Component, signal } from '@angular/core';
import {
  IWidget,
  IWidgetUpdateEvent,
  WidgetComponent,
  WidgetService,
} from '@catalyst-cli/dynamic-widget';
import { CardWidgetComponent } from '../../widgets/card-widget.component';
import { ChartWidgetComponent } from '../../widgets/chart-widget.component';
import { StatsWidgetComponent } from '../../widgets/stats-widget.component';

@Component({
  selector: 'app-dynamic-widget-demo',
  standalone: true,
  imports: [WidgetComponent],
  templateUrl: './dynamic-widget-demo.html',
  styleUrl: './dynamic-widget-demo.scss',
})
export class DynamicWidgetDemo {
  isEditMode = signal(false);
  widgets = signal<IWidget[]>([]);

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
        },
      }),
    ];

    this.widgets.set(widgets);
  }

  onWidgetUpdated(event: IWidgetUpdateEvent): void {
    const currentWidgets = this.widgets();
    const widgetIndex = currentWidgets.findIndex((w) => w.id === event.id);

    if (widgetIndex !== -1) {
      const updatedWidget = this.widgetService.updateWidget(
        currentWidgets[widgetIndex],
        event
      );

      if (updatedWidget) {
        const updatedWidgets = [...currentWidgets];
        updatedWidgets[widgetIndex] = updatedWidget;
        this.widgets.set(updatedWidgets);
      }
    }
  }

  onWidgetDeleted(widgetId: number): void {
    const currentWidgets = this.widgets();
    const updatedWidgets = this.widgetService.removeWidget(
      currentWidgets,
      widgetId
    );
    this.widgets.set(updatedWidgets);
  }

  toggleEditMode(): void {
    this.isEditMode.update((value) => !value);
  }
}
