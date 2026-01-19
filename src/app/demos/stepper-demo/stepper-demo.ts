import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperMenu, CatalystStepperModule } from '@catalyst-cli/catalyst-stepper';
import { CatalystTabGroup, CatalystTabComponent } from '@catalyst-cli/catalyst-tab';

@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [CommonModule, CatalystStepperModule, CatalystTabGroup, CatalystTabComponent],
  templateUrl: './stepper-demo.html',
  styleUrl: './stepper-demo.scss',
})
export class StepperDemo {
  // Main demo tabs
  mainIndex = signal(0);
  mainConfig = {
    position: 'horizontal' as const,
    taClass: '',
    coClass: '',
  };

  // Example 1: Orientation
  orientation = signal<'horizontal' | 'vertical'>('horizontal');
  ex1Step = signal(0);
  mobileView = signal(false); // Mobile view toggle

  exampleSteps = signal<StepperMenu[]>([
    { label: 'Getting Started', description: 'Begin your journey', icon: '🚀' },
    { label: 'Configuration', description: 'Set up your preferences', icon: '⚙️' },
    { label: 'Completion', description: 'All done!', icon: '✓' },
  ]);

  toggleOrientation() {
    this.orientation.update((current) => (current === 'horizontal' ? 'vertical' : 'horizontal'));
  }

  toggleMobileView() {
    this.mobileView.update((current) => !current);
  }

  ex1Prev() {
    if (this.ex1Step() > 0) this.ex1Step.update((s) => s - 1);
  }

  ex1Next() {
    if (this.ex1Step() < this.exampleSteps().length - 1) {
      this.ex1Step.update((s) => s + 1);
    }
  }

  // Example 2: Header Layout
  headerLayout = signal<'row' | 'column'>('row');
  ex2Step = signal(0);

  // Example 3: Custom Icons
  ex3Step = signal(0);
  iconSteps = signal<StepperMenu[]>([
    {
      label: 'SVG Icon',
      description: 'Using inline SVG',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7L12 12L22 7L12 2Z"></path><path d="M2 17L12 22L22 17"></path><path d="M2 12L12 17L22 12"></path></svg>',
    },
    {
      label: 'Emoji Icon',
      description: 'Using emoji characters',
      icon: '😊',
    },
    {
      label: 'Image Icon',
      description: 'Using external images',
      icon: 'https://api.iconify.design/mdi:check-circle.svg?color=%23f5576c',
    },
    {
      label: 'HTML Icon',
      description: 'Using custom HTML',
      icon: '<span style="font-weight: bold; color: currentColor;">★</span>',
    },
  ]);

  getIconType(index: number): string {
    const types = ['SVG String', 'Emoji', 'Image URL', 'HTML String'];
    return types[index] || 'Default';
  }

  ex3Prev() {
    if (this.ex3Step() > 0) this.ex3Step.update((s) => s - 1);
  }

  ex3Next() {
    if (this.ex3Step() < this.iconSteps().length - 1) {
      this.ex3Step.update((s) => s + 1);
    }
  }

  // Code snippets for Overview
  importStandaloneCode = `import { CatalystStepperComponent, CatalystStepBodyComponent } from '@catalyst-cli/catalyst-stepper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CatalystStepperComponent, CatalystStepBodyComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}`;

  importModuleCode = `import { CatalystStepperModule } from '@catalyst-cli/catalyst-stepper';

@NgModule({
  imports: [
    // ...
    CatalystStepperModule
  ],
})
export class AppModule {}`;

  defineStepsCode = `import { StepperMenu } from '@catalyst-cli/catalyst-stepper';

steps: StepperMenu[] = [
  { label: 'Step 1', description: 'First step', icon: '1️⃣' },
  { label: 'Step 2', description: 'Second step', icon: '2️⃣' },
  { label: 'Step 3', description: 'Third step', icon: '3️⃣' },
];

activeStep = signal(0);`;

  basicUsageCode = `<app-catalyst-stepper
  [itemMenu]="steps"
  [options]="{ orientation: 'horizontal', header: 'row' }"
  [(activeStep)]="activeStep">
  
  @for (step of steps; track $index) {
    <app-catalyst-step-body [value]="$index">
      <h3>{{ step.label }}</h3>
      <p>{{ step.description }}</p>
    </app-catalyst-step-body>
  }
  
  <div stepFooter>
    <button (click)="goNext()">Next</button>
  </div>
</app-catalyst-stepper>`;

  // Code snippets for Example 1
  orientationTsCode = `orientation = signal<'horizontal' | 'vertical'>('horizontal');
activeStep = signal(0);

steps: StepperMenu[] = [
  { label: 'Start', description: 'Begin', icon: '🚀' },
  { label: 'Config', description: 'Setup', icon: '⚙️' },
  { label: 'Done', description: 'Complete', icon: '✓' },
];

toggleOrientation() {
  this.orientation.update((current) =>
    current === 'horizontal' ? 'vertical' : 'horizontal'
  );
}`;

  orientationHtmlCode = `<button (click)="toggleOrientation()">
  Switch to {{ orientation() === 'horizontal' ? 'Vertical' : 'Horizontal' }}
</button>

<app-catalyst-stepper
  [itemMenu]="steps"
  [options]="{ orientation: orientation(), header: 'row' }"
  [(activeStep)]="activeStep">
  <!-- step bodies here -->
</app-catalyst-stepper>`;

  // Code snippets for Example 2
  headerTsCode = `headerLayout = signal<'row' | 'column'>('row');

// Toggle between row and column
setRowLayout() {
  this.headerLayout.set('row');
}

setColumnLayout() {
  this.headerLayout.set('column');
}`;

  headerHtmlCode = `<app-catalyst-stepper
  [itemMenu]="steps"
  [options]="{ orientation: 'horizontal', header: headerLayout() }"
  [(activeStep)]="activeStep">
  <!-- Row layout: icon and text side-by-side -->
  <!-- Column layout: icon above text -->
</app-catalyst-stepper>`;

  // Interfaces code for API Reference
  interfacesCode = `// Stepper configuration options
interface IStepperOptions {
  orientation: 'horizontal' | 'vertical';  // Layout direction
  header: 'row' | 'column';                // Header content layout
}

// Individual step configuration
interface StepperMenu {
  label: string;           // Step title (required)
  description?: string;    // Step subtitle (optional)
  disabled?: boolean;      // Disable user interaction (optional)
  icon?: string;          // Icon (SVG, emoji, URL, or HTML)
}`;
}
