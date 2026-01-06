import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-widget">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon revenue">💰</div>
          <div class="stat-info">
            <span class="stat-title">Revenue</span>
            <span class="stat-amount">$45,231</span>
            <span class="stat-change positive">+12.5%</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orders">📦</div>
          <div class="stat-info">
            <span class="stat-title">Orders</span>
            <span class="stat-amount">1,234</span>
            <span class="stat-change positive">+8.2%</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon customers">👥</div>
          <div class="stat-info">
            <span class="stat-title">Customers</span>
            <span class="stat-amount">892</span>
            <span class="stat-change negative">-2.1%</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .stats-widget {
        height: 100%;
        padding: 1rem;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 1rem;
        height: 100%;
      }

      .stat-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        color: white;
        text-align: center;
      }

      .stat-card:nth-child(2) {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }

      .stat-card:nth-child(3) {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }

      .stat-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      .stat-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .stat-title {
        font-size: 0.75rem;
        opacity: 0.9;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .stat-amount {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0.25rem 0;
      }

      .stat-change {
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.125rem 0.5rem;
        border-radius: 12px;
        display: inline-block;
        width: fit-content;
        margin: 0 auto;
      }

      .stat-change.positive {
        background: rgba(255, 255, 255, 0.2);
      }

      .stat-change.negative {
        background: rgba(255, 255, 255, 0.15);
      }
    `,
  ],
})
export class StatsWidgetComponent {}

