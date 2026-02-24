import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-web-api',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './web-api.component.html',
  styleUrl: './web-api.component.scss'
})
export class WebApiComponent {
  items = input.required<string[]>();
}
