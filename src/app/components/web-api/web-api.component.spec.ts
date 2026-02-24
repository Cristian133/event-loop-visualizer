import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebApiComponent } from './web-api.component';

describe('WebApiComponent', () => {
    let component: WebApiComponent;
    let fixture: ComponentFixture<WebApiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WebApiComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(WebApiComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.componentRef.setInput('items', []);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should show "Vacío" when items is empty', () => {
        fixture.componentRef.setInput('items', []);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.empty-text')?.textContent).toContain('Vacío');
    });

    it('should render API items with icon', () => {
        fixture.componentRef.setInput('items', ['Timer (0ms)', 'Fetch API']);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const items = compiled.querySelectorAll('.api-item');

        expect(items.length).toBe(2);
        expect(items[0].textContent).toContain('🕸️');
        expect(items[0].textContent).toContain('Timer (0ms)');
        expect(items[1].textContent).toContain('Fetch API');
    });
});
