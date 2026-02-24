import { Component, inject } from '@angular/core';
import { SimulatorService } from './services/simulator.service';
import { CodeViewComponent } from './components/code-view/code-view.component';
import { CallStackComponent } from './components/call-stack/call-stack.component';
import { TaskQueueComponent } from './components/task-queue/task-queue.component';
import { WebApiComponent } from './components/web-api/web-api.component';
import { ConsoleComponent } from './components/console/console.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CodeViewComponent,
    CallStackComponent,
    TaskQueueComponent,
    WebApiComponent,
    ConsoleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  simulator = inject(SimulatorService);

  onExerciseChange(exerciseId: string) {
    this.simulator.setExercise(exerciseId);
  }
}
