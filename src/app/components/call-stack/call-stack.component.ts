import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-call-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './call-stack.component.html',
  styleUrl: './call-stack.component.scss'
})
export class CallStackComponent {
  items = input.required<string[]>();
}
