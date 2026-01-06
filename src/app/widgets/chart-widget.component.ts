import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-widget">
      <h3>Sales Chart</h3>
      <div class="chart-container">
        <div class="chart-bar" style="height: 60%"></div>
        <div class="chart-bar" style="height: 80%"></div>
        <div class="chart-bar" style="height: 45%"></div>
        <div class="chart-bar" style="height: 90%"></div>
        <div class="chart-bar" style="height: 70%"></div>
        <div class="chart-bar" style="height: 55%"></div>
      </div>
      <p class="chart-label">Monthly Sales Data</p>
    </div>
  `,
  styles: [
    `
      .chart-widget {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem;
      }

      h3 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .chart-container {
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        gap: 0.5rem;
        flex: 1;
        min-height: 150px;
      }

      .chart-bar {
        flex: 1;
        background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%);
        border-radius: 4px 4px 0 0;
        min-width: 30px;
        transition: opacity 0.3s;
      }

      .chart-bar:hover {
        opacity: 0.8;
      }

      .chart-label {
        margin: 0.5rem 0 0 0;
        color: #666;
        font-size: 0.875rem;
        text-align: center;
      }
    `,
  ],
})
export class ChartWidgetComponent {}

