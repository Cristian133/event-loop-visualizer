import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-call-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="panel">
      <h3 class="panel-title">Call Stack</h3>
      <div class="stack-container">
        @for (item of items().slice().reverse(); track $index) {
          <div class="stack-item">{{ item }}</div>
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
      color: var(--secondary);
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--glass-border);
      padding-bottom: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .stack-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      justify-content: flex-end;
    }
    .stack-item {
      background: rgba(255, 64, 129, 0.1);
      border: 1px solid rgba(255, 64, 129, 0.2);
      border-left: 4px solid var(--secondary);
      border-radius: 4px;
      padding: 0.75rem;
      color: #fff;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 12px rgba(255, 64, 129, 0.1);
    }
    .empty-text {
      color: var(--text-secondary);
      font-style: italic;
      text-align: center;
      margin-top: auto;
      margin-bottom: auto;
      font-size: 0.9rem;
    }
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.9) translateY(-10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
  `
})
export class CallStackComponent {
  items = input.required<string[]>();
}
