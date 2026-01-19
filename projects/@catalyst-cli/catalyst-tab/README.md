# CatalystTabGroup

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.12.

## Install CatalystTabGroup

```bash
npm i catalyst-tab-group
```

## Demo

click the link for [demo](https://panther301.github.io/catalysttab.github.io/)

## Description

`catalyst-tab-group` organize all tab-panel data into separate view where only one view can be visible at a time. Each tab's label is shown in the tab header. You can fully customize using css class.

The active tab may be set using the `selectedIndex` input or when the user selects one of the tab labels in the heade. It's except number only.

## Use of CatalystTabGroup

### First impornt CatalystTabModule in the root module(AppModule):

```
import { CatalystTabModule } from 'catalyst-tab-group'

@NgModule({
  imports: [
    // ...
    CatalystTabModule
  ],
})
export class AppModule {}
```

### Events

The **onSelectedIndexChange** output event is emitted when the active tab changes.

### In your app.component.ts :

```
import { TabGroupConfig } from 'catalyst-tab-group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   config: TabGroupConfig = {
     position: 'vertical', // Two option for this 'horizontal' or 'vertical', Default value is horizontal.
     taClass: string, // Pass your class for tab here, default null
     coClass: string  // Pass your class for tab-panel here, default null
   }

   index = 0;

   onClick() {
    if (this.config.position === 'horizontal') {
      this.config.position = 'vertical'
    } else {
      this.config.position = 'horizontal'
    }
  }

   onChange(event) {
     this.index = event;
     // ... do whatever you want on tab change event
   }
}
```

### How to use in your app.component.html.

```

<catalyst-tab-group [tabGroupConfig]="config" [selectedIndex]="index" (onSelectedIndexChange)="onChange($event)">
    <catalyst-tab label="First">
        Containt-1
    </catalyst-tab>
    <catalyst-tab label="Second">
        Containt-2
    </catalyst-tab>
</catalyst-tab-group>

```
