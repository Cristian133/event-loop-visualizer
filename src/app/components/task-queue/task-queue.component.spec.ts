import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskQueueComponent } from './task-queue.component';

describe('TaskQueueComponent', () => {
    let component: TaskQueueComponent;
    let fixture: ComponentFixture<TaskQueueComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskQueueComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskQueueComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.componentRef.setInput('title', 'Test Queue');
        fixture.componentRef.setInput('items', []);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render title', () => {
        fixture.componentRef.setInput('title', 'Microtask Queue');
        fixture.componentRef.setInput('items', []);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.panel-title')?.textContent).toContain('Microtask Queue');
    });

    it('should show "Vacío" when items is empty', () => {
        fixture.componentRef.setInput('title', 'Queue');
        fixture.componentRef.setInput('items', []);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.empty-text')?.textContent).toContain('Vacío');
    });

    it('should render queue items', () => {
        fixture.componentRef.setInput('title', 'Queue');
        fixture.componentRef.setInput('items', ['Task 1', 'Task 2']);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const items = compiled.querySelectorAll('.queue-item');

        expect(items.length).toBe(2);
        expect(items[0].textContent).toContain('Task 1');
        expect(items[1].textContent).toContain('Task 2');
    });
});
