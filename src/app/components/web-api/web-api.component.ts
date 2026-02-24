import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-web-api',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="panel">
      <h3 class="panel-title">Web APIs</h3>
      <div class="api-container">
        @for (item of items(); track $index) {
          <div class="api-item">
            <span class="icon">🕸️</span> {{ item }}
          </div>
        } @empty {
          <div class="empty-text">Vacío</div>
        }
      </div>
    </div>
  `,
  styles: `
    .panel {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      border: 1px dashed rgba(255, 171, 0, 0.3);
      border-radius: 16px;
      padding: 1.25rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }
    .panel-title {
      margin-top: 0;
      color: var(--accent);
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px dashed rgba(255, 171, 0, 0.2);
      padding-bottom: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .api-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .api-item {
      background: rgba(255, 171, 0, 0.1);
      border: 1px solid rgba(255, 171, 0, 0.2);
      border-radius: 8px;
      padding: 0.75rem;
      color: #fff;
      font-family: inherit;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      animation: fadeIn 0.4s ease-out;
      box-shadow: 0 4px 12px rgba(255, 171, 0, 0.1);
    }
    .icon {
      font-size: 1.1rem;
    }
    .empty-text {
      color: var(--text-secondary);
      font-style: italic;
      text-align: center;
      margin-top: auto;
      margin-bottom: auto;
      font-size: 0.9rem;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `
})
export class WebApiComponent {
  items = input.required<string[]>();
}
