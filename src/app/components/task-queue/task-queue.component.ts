import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-task-queue',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-queue.component.html',
  styleUrl: './task-queue.component.scss'
})
export class TaskQueueComponent {
  title = input.required<string>();
  items = input.required<string[]>();
}
