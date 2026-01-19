import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalystTabGroup, CatalystTabComponent, TabGroupConfig } from '@catalyst-cli/catalyst-tab';

@Component({
  selector: 'app-tab-demo',
  standalone: true,
  imports: [CommonModule, CatalystTabGroup, CatalystTabComponent],
  templateUrl: './tab-demo.html',
  styleUrl: './tab-demo.scss',
})
export class TabDemo {
  // Main demo tabs
  mainIndex = signal(0);
  mainConfig: TabGroupConfig = {
    position: 'horizontal',
    taClass: '',
    coClass: '',
  };

  // Example 1: Orientation toggle
  config1 = signal<TabGroupConfig>({
    position: 'horizontal',
    taClass: '',
    coClass: '',
  });

  toggleOrientation() {
    this.config1.update((config) => ({
      ...config,
      position: config.position === 'horizontal' ? 'vertical' : 'horizontal',
    }));
  }

  // Example 2: Selected index control
  tabIndex = signal(0);

  setTabIndex(index: number) {
    this.tabIndex.set(index);
  }

  // Example 3: Custom styling
  customConfig: TabGroupConfig = {
    position: 'horizontal',
    taClass: 'custom-tab-style',
    coClass: 'custom-content-style',
  };

  // Example 4: Many tabs
  manyTabs = signal(
    Array.from({ length: 12 }, (_, i) => ({
      label: `Tab ${i + 1}`,
      content: `This is content for Tab ${i + 1}`,
    })),
  );

  // Code snippets for Overview tab
  importStandaloneCode = `import { CatalystTabGroup, CatalystTabComponent } from '@catalyst-cli/catalyst-tab';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CatalystTabGroup, CatalystTabComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}`;

  importModuleCode = `import { CatalystTabModule } from '@catalyst-cli/catalyst-tab';

@NgModule({
  imports: [
    // ...
    CatalystTabModule
  ],
})
export class AppModule {}`;

  basicUsageCode = `<catalyst-tab-group>
  <catalyst-tab label="First">
    Content-1
  </catalyst-tab>
  <catalyst-tab label="Second">
    Content-2
  </catalyst-tab>
</catalyst-tab-group>`;

  configCode = `import { TabGroupConfig } from '@catalyst-cli/catalyst-tab';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  config: TabGroupConfig = {
    position: 'vertical', // 'horizontal' or 'vertical'
    taClass: 'my-tab-class', // Custom class for tab container
    coClass: 'my-content-class' // Custom class for content area
  };

  index = signal(0); // Current selected index

  onIndexChange(event: number) {
    this.index.set(event);
    // ... do whatever you want on tab change
  }
}`;

  configUsageCode = `<catalyst-tab-group 
  [tabGroupConfig]="config" 
  [(selectedIndex)]="index">
  <catalyst-tab label="First">Content-1</catalyst-tab>
  <catalyst-tab label="Second">Content-2</catalyst-tab>
</catalyst-tab-group>`;

  // Code snippets for Example 1
  orientationTsCode = `import { signal } from '@angular/core';

config = signal<TabGroupConfig>({
  position: 'horizontal',
  taClass: '',
  coClass: '',
});

toggleOrientation() {
  this.config.update((config) => ({
    ...config,
    position: config.position === 'horizontal' 
      ? 'vertical' 
      : 'horizontal',
  }));
}`;

  orientationHtmlCode = `<button (click)="toggleOrientation()">
  Switch to {{ config().position === 'horizontal' ? 'Vertical' : 'Horizontal' }}
</button>

<catalyst-tab-group [tabGroupConfig]="config()">
  <catalyst-tab label="First">Content for first tab</catalyst-tab>
  <catalyst-tab label="Second">Content for second tab</catalyst-tab>
  <catalyst-tab label="Third">Content for third tab</catalyst-tab>
</catalyst-tab-group>`;

  // Code snippets for Example 2
  indexTsCode = `import { signal } from '@angular/core';

tabIndex = signal(0);

setTabIndex(index: number) {
  this.tabIndex.set(index);
}`;

  indexHtmlCode = `<button (click)="setTabIndex(0)">Tab 1</button>
<button (click)="setTabIndex(1)">Tab 2</button>
<button (click)="setTabIndex(2)">Tab 3</button>

<catalyst-tab-group [(selectedIndex)]="tabIndex">
  <catalyst-tab label="Profile">Profile content</catalyst-tab>
  <catalyst-tab label="Settings">Settings content</catalyst-tab>
  <catalyst-tab label="Notifications">Notifications content</catalyst-tab>
</catalyst-tab-group>`;

  // Code snippets for Example 3
  customStyleTsCode = `customConfig: TabGroupConfig = {
  position: 'horizontal',
  taClass: 'custom-tab-style',
  coClass: 'custom-content-style',
};`;

  customStyleHtmlCode = `<catalyst-tab-group [tabGroupConfig]="customConfig">
  <catalyst-tab label="Dashboard">Dashboard content</catalyst-tab>
  <catalyst-tab label="Analytics">Analytics content</catalyst-tab>
  <catalyst-tab label="Reports">Reports content</catalyst-tab>
</catalyst-tab-group>`;

  customStyleCssCode = `::ng-deep .custom-tab-style {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  li {
    color: white;
    
    &.active {
      background: rgba(255, 255, 255, 0.2);
      font-weight: bold;
    }
  }
}

::ng-deep .custom-content-style {
  background: #f8f9fa;
  padding: 24px;
  border-radius: 8px;
}`;

  // API Reference code
  apiConfigCode = `interface TabGroupConfig {
  // Tab orientation: 'horizontal' (default) or 'vertical'
  position: 'horizontal' | 'vertical';
  
  // Custom CSS class for tab container
  taClass: string;
  
  // Custom CSS class for content area
  coClass: string;
}`;
}
