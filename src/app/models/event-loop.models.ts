export interface EventLoopState {
    callStack: string[];
    microtaskQueue: string[];
    macrotaskQueue: string[];
    webApi: string[];
    console: string[];
    activeLine: number | null;
    explanation: string;
}

export interface Exercise {
    id: string;
    name: string;
    description: string;
    code: string;
    steps: EventLoopState[];
}
