import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-widget">
      <div class="card-header">
        <h3>User Statistics</h3>
        <span class="card-badge">Active</span>
      </div>
      <div class="card-content">
        <div class="stat-item">
          <span class="stat-label">Total Users</span>
          <span class="stat-value">12,345</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Active Today</span>
          <span class="stat-value">8,234</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">New This Week</span>
          <span class="stat-value">1,234</span>
        </div>
      </div>
      <div class="card-footer">
        <button class="card-button">View Details</button>
      </div>
    </div>
  `,
  styles: [
    `
      .card-widget {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0;
        color: #333;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .card-badge {
        background: #10b981;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: #f3f4f6;
        border-radius: 8px;
      }

      .stat-label {
        color: #666;
        font-size: 0.875rem;
      }

      .stat-value {
        color: #111;
        font-size: 1.25rem;
        font-weight: 600;
      }

      .card-footer {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;
      }

      .card-button {
        width: 100%;
        padding: 0.5rem 1rem;
        background: #4f46e5;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
      }

      .card-button:hover {
        background: #4338ca;
      }
    `,
  ],
})
export class CardWidgetComponent {}

