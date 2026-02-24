import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-task-queue',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="panel">
      <h3 class="panel-title">{{ title() }}</h3>
      <div class="queue-container">
        @for (item of items(); track $index) {
          <div class="queue-item">{{ item }}</div>
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
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      padding: 1.25rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }
    .panel-title {
      margin-top: 0;
      color: var(--info);
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--glass-border);
      padding-bottom: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .queue-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .queue-item {
      background: rgba(0, 229, 255, 0.1);
      border: 1px solid rgba(0, 229, 255, 0.2);
      border-left: 4px solid var(--info);
      border-radius: 4px;
      padding: 0.75rem;
      color: #fff;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      animation: slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      box-shadow: 0 4px 12px rgba(0, 229, 255, 0.1);
    }
    .empty-text {
      color: var(--text-secondary);
      font-style: italic;
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `
})
export class TaskQueueComponent {
  title = input.required<string>();
  items = input.required<string[]>();
}
