import { TestBed } from '@angular/core/testing';
import { SimulatorService } from './simulator.service';
import { EXERCISES } from './exercises.data';

describe('SimulatorService', () => {
    let service: SimulatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SimulatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have an initial exercise', () => {
        expect(service.currentExercise()).toEqual(EXERCISES[0]);
        expect(service.currentStepIndex()).toBe(0);
    });

    it('should advance to next step', () => {
        service.nextStep();
        expect(service.currentStepIndex()).toBe(1);
    });

    it('should go back to previous step', () => {
        service.nextStep();
        service.prevStep();
        expect(service.currentStepIndex()).toBe(0);
    });

    it('should not go back past 0', () => {
        service.prevStep();
        expect(service.currentStepIndex()).toBe(0);
    });

    it('should reset state', () => {
        service.nextStep();
        service.reset();
        expect(service.currentStepIndex()).toBe(0);
        expect(service.isPlaying()).toBeFalse();
    });

    it('should change exercise', () => {
        const secondExercise = EXERCISES[1];
        service.setExercise(secondExercise.id);
        expect(service.currentExercise().id).toBe(secondExercise.id);
        expect(service.currentStepIndex()).toBe(0);
    });

    it('should toggle play state', () => {
        expect(service.isPlaying()).toBeFalse();
        service.togglePlay();
        expect(service.isPlaying()).toBeTrue();
        service.togglePlay();
        expect(service.isPlaying()).toBeFalse();
    });

    it('should identify when finished', () => {
        const totalSteps = service.currentExercise().steps.length;
        for (let i = 0; i < totalSteps - 1; i++) {
            service.nextStep();
        }
        expect(service.isFinished()).toBeTrue();
    });
});
