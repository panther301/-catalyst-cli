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
  horizontalIndex = signal(0);
  verticalIndex = signal(0);

  horizontalConfig: TabGroupConfig = {
    position: 'horizontal',
    taClass: 'custom-horizontal-tab',
    coClass: 'custom-horizontal-content',
  };

  verticalConfig: TabGroupConfig = {
    position: 'vertical',
    taClass: 'custom-vertical-tab',
    coClass: 'custom-vertical-content',
  };

  tabs = signal([
    { title: 'Tab 1', content: 'Content for Tab 1' },
    { title: 'Tab 2', content: 'Content for Tab 2' },
    { title: 'Tab 3', content: 'Content for Tab 3' },
  ]);

  addTab() {
    this.tabs.update((tabs) => [
      ...tabs,
      {
        title: `Tab ${tabs.length + 1}`,
        content: `Content for Tab ${tabs.length + 1}`,
      },
    ]);
  }
}
