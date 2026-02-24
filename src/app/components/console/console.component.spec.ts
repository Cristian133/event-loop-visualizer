import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleComponent } from './console.component';

describe('ConsoleComponent', () => {
    let component: ConsoleComponent;
    let fixture: ComponentFixture<ConsoleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConsoleComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ConsoleComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.componentRef.setInput('items', []);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render log lines', () => {
        fixture.componentRef.setInput('items', ['Log 1', 'Log 2']);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const logs = compiled.querySelectorAll('.log-line');

        expect(logs.length).toBe(2);
        expect(logs[0].textContent).toContain('Log 1');
        expect(logs[1].textContent).toContain('Log 2');
    });

    it('should include ">" prefix in each log line', () => {
        fixture.componentRef.setInput('items', ['Hello']);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const log = compiled.querySelector('.log-line');

        expect(log?.textContent).toContain('> Hello');
    });
});
