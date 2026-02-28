import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalystIconComponent, CatalystIconRegistryService } from '@catalyst-cli/catalyst-icon';
import { CatalystTabGroup, CatalystTabComponent } from '@catalyst-cli/catalyst-tab';
import { DemoPageHeader } from '../../shared/components/demo-page-header/demo-page-header';
import { DemoPageLayout } from '../../shared/components/demo-page-layout/demo-page-layout';

@Component({
  selector: 'app-icon-demo',
  standalone: true,
  imports: [
    CommonModule,
    CatalystIconComponent,
    CatalystTabGroup,
    CatalystTabComponent,
    DemoPageHeader,
    DemoPageLayout,
  ],
  templateUrl: './icon-demo.html',
  styleUrl: './icon-demo.scss',
})
export class IconDemo implements OnInit {
  private readonly iconRegistry = inject(CatalystIconRegistryService);

  ngOnInit() {
    this.iconRegistry.registerIcons([
      {
        name: 'pen',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>`,
      },
      {
        name: 'user',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>`,
      },
      {
        name: 'settings',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>`,
      },
      {
        name: 'github',
        url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg',
      },
      {
        name: 'coconut-tree',
        url: 'img/coconut-tree-svgrepo-com.svg',
      },
      {
        name: 'ice-cream',
        url: 'img/ice-cream-svgrepo-com.svg',
      },
      {
        name: 'take-a-bath',
        url: 'img/take-a-bath-svgrepo-com.svg',
      },
    ]);
  }

  // Snippets
  importStandaloneCode = `import { CatalystIconComponent, provideCatalystIcons } from '@catalyst-cli/catalyst-icon';

// In app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideCatalystIcons()
  ]
};

// In your standalone component
@Component({
  standalone: true,
  imports: [CatalystIconComponent],
  ...
})`;

  importModuleCode = `import { CatalystIconModule } from '@catalyst-cli/catalyst-icon';

@NgModule({
  imports: [CatalystIconModule]
})`;

  registerCode = `import { CatalystIconRegistryService } from '@catalyst-cli/catalyst-icon';

export class AppComponent {
  constructor(registry: CatalystIconRegistryService) {
    registry.registerIcons([
      { name: 'my-icon', svg: '<svg>...</svg>' },
      { name: 'github', url: 'https://...' }
    ]);
  }
}`;

  basicExampleTs = `// In your component's ngOnInit or constructor
this.iconRegistry.registerIcons([
  { name: 'pen', svg: '<svg>...</svg>' },
  { name: 'user', svg: '<svg>...</svg>' },
  { name: 'settings', svg: '<svg>...</svg>' },
]);`;

  basicExampleHtml = `<catalyst-icon icon="pen"></catalyst-icon>
<catalyst-icon icon="user"></catalyst-icon>
<catalyst-icon icon="settings"></catalyst-icon>`;

  sizingExampleTs = `// Icons must be registered first
this.iconRegistry.registerIcon('user', '<svg>...</svg>');`;

  sizingExampleHtml = `<catalyst-icon icon="user" height="16" width="16"></catalyst-icon>
<catalyst-icon icon="user" height="24" width="24"></catalyst-icon>
<catalyst-icon icon="user" height="32" width="32"></catalyst-icon>
<catalyst-icon icon="user" height="48" width="48"></catalyst-icon>`;

  urlExampleTs = `// Register external URLs locally and remotely
this.iconRegistry.registerIcons([
  { name: 'github', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg' },
  { name: 'coconut-tree', url: 'img/coconut-tree-svgrepo-com.svg' },
  { name: 'ice-cream', url: 'img/ice-cream-svgrepo-com.svg' },
  { name: 'take-a-bath', url: 'img/take-a-bath-svgrepo-com.svg' },
]);`;

  urlExampleHtml = `<!-- Requires HttpClient to work properly -->
<catalyst-icon icon="github" color="#333" height="32" width="32"></catalyst-icon>
<catalyst-icon icon="coconut-tree" color="#ff9f43" height="48" width="48"></catalyst-icon>
<catalyst-icon icon="ice-cream" color="#ee5253" height="48" width="48"></catalyst-icon>
<catalyst-icon icon="take-a-bath" color="#0abde3" height="48" width="48"></catalyst-icon>`;

  colorsExampleTs = `// Icons can be registered by SVG strings or URLs
this.iconRegistry.registerIcon('settings', '<svg>...</svg>');
this.iconRegistry.registerIcon('pen', '<svg>...</svg>');`;

  colorsExampleHtml = `<catalyst-icon icon="settings" color="#ff4757"></catalyst-icon>
<catalyst-icon icon="settings" color="#2ed573"></catalyst-icon>
<catalyst-icon icon="settings" color="#1e90ff"></catalyst-icon>
<catalyst-icon icon="pen" class="custom-icon-class"></catalyst-icon>`;

  colorsExampleCss = `::ng-deep .custom-icon-class {
  color: #a020f0 !important;
  background-color: #f3e8ff;
  border-radius: 50%;
  padding: 8px;
  height: 48px !important;
  width: 48px !important;
  transition: all var(--transition-slow) ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(160, 32, 240, 0.4);
  }
}`;
}
