import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallStackComponent } from './call-stack.component';
import { Component, signal } from '@angular/core';

describe('CallStackComponent', () => {
    let component: CallStackComponent;
    let fixture: ComponentFixture<CallStackComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CallStackComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CallStackComponent);
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

    it('should render items in reverse order', () => {
        fixture.componentRef.setInput('items', ['first', 'second']);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        const stackItems = compiled.querySelectorAll('.stack-item');

        expect(stackItems.length).toBe(2);
        expect(stackItems[0].textContent).toContain('second');
        expect(stackItems[1].textContent).toContain('first');
    });
});
