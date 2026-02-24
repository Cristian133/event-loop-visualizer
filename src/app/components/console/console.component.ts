import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-console',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss'
})
export class ConsoleComponent {
  items = input.required<string[]>();
}
