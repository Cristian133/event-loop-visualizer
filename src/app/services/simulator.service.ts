import { Injectable, signal, computed, effect } from '@angular/core';
import { EventLoopState, Exercise } from '../models/event-loop.models';
import { EXERCISES } from './exercises.data';

@Injectable({
    providedIn: 'root'
})
export class SimulatorService {
    public exercises = signal<Exercise[]>(EXERCISES);
    public currentExercise = signal<Exercise>(EXERCISES[0]);
    public currentStepIndex = signal<number>(0);
    public isPlaying = signal<boolean>(false);
    private playInterval: any;

    constructor() {
        effect(() => {
            if (this.isPlaying()) {
                this.startAutoPlay();
            } else {
                this.stopAutoPlay();
            }
        });
    }

    public currentState = computed<EventLoopState>(() => {
        const exercise = this.currentExercise();
        const index = this.currentStepIndex();
        return exercise.steps[index] || this.getEmptyState();
    });

    public callStack = computed(() => this.currentState().callStack);
    public microtaskQueue = computed(() => this.currentState().microtaskQueue);
    public macrotaskQueue = computed(() => this.currentState().macrotaskQueue);
    public webApi = computed(() => this.currentState().webApi);
    public consoleLogs = computed(() => this.currentState().console);
    public activeLine = computed(() => this.currentState().activeLine);
    public explanation = computed(() => this.currentState().explanation);

    public isFinished = computed(() => {
        return this.currentStepIndex() >= this.currentExercise().steps.length - 1;
    });

    public setExercise(exerciseId: string) {
        const found = this.exercises().find(e => e.id === exerciseId);
        if (found) {
            this.currentExercise.set(found);
            this.currentStepIndex.set(0);
        }
    }

    public nextStep() {
        if (!this.isFinished()) {
            this.currentStepIndex.update(idx => idx + 1);
        }
    }

    public prevStep() {
        if (this.currentStepIndex() > 0) {
            this.currentStepIndex.update(idx => idx - 1);
        }
    }

    public reset() {
        this.stopAutoPlay();
        this.isPlaying.set(false);
        this.currentStepIndex.set(0);
    }

    public togglePlay() {
        this.isPlaying.update(p => !p);
    }

    private startAutoPlay() {
        this.stopAutoPlay();
        this.playInterval = setInterval(() => {
            if (!this.isFinished()) {
                this.nextStep();
            } else {
                this.isPlaying.set(false);
            }
        }, 1500);
    }

    private stopAutoPlay() {
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
    }

    private getEmptyState(): EventLoopState {
        return {
            callStack: [],
            microtaskQueue: [],
            macrotaskQueue: [],
            webApi: [],
            console: [],
            activeLine: null,
            explanation: ''
        };
    }
}
