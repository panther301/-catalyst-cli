import { Routes } from '@angular/router';
import { DynamicWidgetDemo } from './demos/dynamic-widget-demo/dynamic-widget-demo';
import { StepperDemo } from './demos/stepper-demo/stepper-demo';
import { TabDemo } from './demos/tab-demo/tab-demo';
import { IconDemo } from './demos/icon-demo/icon-demo';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/catalyst-dynamic-widget',
    pathMatch: 'full',
  },
  {
    path: 'catalyst-dynamic-widget',
    component: DynamicWidgetDemo,
  },
  {
    path: 'stepper',
    component: StepperDemo,
  },
  {
    path: 'tabs',
    component: TabDemo,
  },
  {
    path: 'icons',
    component: IconDemo,
  },
];
