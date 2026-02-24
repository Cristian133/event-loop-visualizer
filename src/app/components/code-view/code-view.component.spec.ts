import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeViewComponent } from './code-view.component';
import { Exercise } from '../../models/event-loop.models';

describe('CodeViewComponent', () => {
    let component: CodeViewComponent;
    let fixture: ComponentFixture<CodeViewComponent>;

    const mockExercise: Exercise = {
        id: 'test',
        name: 'Test Exercise',
        description: 'Test Description',
        code: 'console.log("1");\nconsole.log("2");',
        steps: []
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CodeViewComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CodeViewComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('currentExercise', mockExercise);
        fixture.componentRef.setInput('allExercises', [mockExercise]);
        fixture.componentRef.setInput('activeLine', null);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should split code into lines', () => {
        expect(component.codeLines().length).toBe(2);
        expect(component.codeLines()[0]).toBe('console.log("1");');
    });

    it('should highlight active line', () => {
        fixture.componentRef.setInput('activeLine', 1);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const lines = compiled.querySelectorAll('.code-line');

        expect(lines[0].classList.contains('active')).toBeFalse();
        expect(lines[1].classList.contains('active')).toBeTrue();
    });

    it('should emit exerciseSelected on change', () => {
        spyOn(component.exerciseSelected, 'emit');

        const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
        select.value = 'test';
        select.dispatchEvent(new Event('change'));

        expect(component.exerciseSelected.emit).toHaveBeenCalledWith('test');
    });
});
