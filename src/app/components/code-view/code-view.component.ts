import { Component, ChangeDetectionStrategy, input, computed, output } from '@angular/core';
import { Exercise } from '../../models/event-loop.models';

@Component({
  selector: 'app-code-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './code-view.component.html',
  styleUrl: './code-view.component.scss'
})
export class CodeViewComponent {
  currentExercise = input.required<Exercise>();
  allExercises = input.required<Exercise[]>();
  activeLine = input.required<number | null>();

  exerciseSelected = output<string>();

  codeLines = computed(() => {
    return this.currentExercise().code.split('\n');
  });

  onSelect(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.exerciseSelected.emit(select.value);
  }
}
