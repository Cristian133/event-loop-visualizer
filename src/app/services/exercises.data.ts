import { Exercise } from '../models/event-loop.models';

export const EXERCISES: Exercise[] = [
    {
        id: 'sync-basic',
        name: '1. Síncrono Básico',
        description: 'El código síncrono JavaScript se ejecuta línea por línea en el Call Stack principal.',
        code: `console.log('Inicio');
function saludar() {
  console.log('Hola');
}
saludar();
console.log('Fin');`,
        steps: [
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: null, explanation: 'Estado inicial. Esperando ejecutar.' },
            { callStack: ['console.log("Inicio")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: 0, explanation: 'La primera instrucción entra al Call Stack.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Inicio'], activeLine: 0, explanation: 'Se ejecuta console.log, sale del Call Stack y se muestra en la Consola.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Inicio'], activeLine: 1, explanation: 'Se lee la declaración de la función, pero no se ejecuta aún.' },
            { callStack: ['saludar()'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Inicio'], activeLine: 4, explanation: 'Invocamos saludar(), por lo que entra al Call Stack.' },
            { callStack: ['saludar()', 'console.log("Hola")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Inicio'], activeLine: 2, explanation: 'Dentro de saludar(), el console.log entra en el tope del Call Stack (LIFO).' },
            { callStack: ['saludar()'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Inicio', 'Hola'], activeLine: 2, explanation: 'Se ejecuta console.log, sale del Call Stack y se muestra en la Consola.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Inicio', 'Hola'], activeLine: 4, explanation: 'saludar() termina y es retirada del Call Stack.' },
            { callStack: ['console.log("Fin")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Inicio', 'Hola'], activeLine: 5, explanation: 'La última instrucción entra al Call Stack.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Inicio', 'Hola', 'Fin'], activeLine: 5, explanation: 'Se ejecuta la instrucción y el programa termina sin errores.' },
        ]
    },
    {
        id: 'async-macro',
        name: '2. Macrotarea (setTimeout)',
        description: 'Los timers se delegan al navegador (Web API) y luego van a la Macrotask Queue.',
        code: `console.log('1');
setTimeout(() => {
  console.log('2');
}, 0);
console.log('3');`,
        steps: [
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: null, explanation: 'Estado inicial.' },
            { callStack: ['console.log("1")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: 0, explanation: 'El primer log va al Call Stack.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1'], activeLine: 0, explanation: 'Se muestra en la Consola.' },
            { callStack: ['setTimeout(...)'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1'], activeLine: 1, explanation: 'setTimeout entra al Call Stack.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1'], activeLine: 1, explanation: 'setTimeout es parte de la Web API. Delega el callback y completa el Call Stack.' },
            { callStack: ['console.log("3")'], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1'], activeLine: 4, explanation: 'El hilo principal no se detiene e inmediatamente sigue a la próxima instrucción síncrona.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1', '3'], activeLine: 4, explanation: 'Termina el log síncrono.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: ['callback setTimeout'], webApi: [], console: ['1', '3'], activeLine: null, explanation: 'El Timer en Web API completó su espera (0ms) y mueve el callback a la Macrotask Queue.' },
            { callStack: ['callback setTimeout'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1', '3'], activeLine: 1, explanation: 'El Event Loop nota el Call Stack vacío y mueve la tarea de la Macrotask Queue al Call Stack.' },
            { callStack: ['callback setTimeout', 'console.log("2")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1', '3'], activeLine: 2, explanation: 'El callback ejecuta su interior, enviando console.log("2") al tope de la pila.' },
            { callStack: ['callback setTimeout'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1', '3', '2'], activeLine: 2, explanation: 'El log finaliza.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1', '3', '2'], activeLine: null, explanation: 'El callback finaliza. Ejecución completada.' },
        ]
    },
    {
        id: 'async-micro',
        name: '3. Microtarea (Promesa)',
        description: 'Las Promesas van a la Microtask Queue, que tiene mayor prioridad que la Macrotask Queue.',
        code: `console.log('A');
Promise.resolve().then(() => {
  console.log('B');
});
console.log('C');`,
        steps: [
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: null, explanation: 'Estado inicial.' },
            { callStack: ['console.log("A")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: 0, explanation: 'A entra al Call Stack.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['A'], activeLine: 0, explanation: 'Se imprime A.' },
            { callStack: ['Promise.resolve()'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['A'], activeLine: 1, explanation: 'Se resuelve la Promesa inmediatamente (síncronamente).' },
            { callStack: ['Promise.resolve().then(...)'], microtaskQueue: ['callback Promise'], macrotaskQueue: [], webApi: [], console: ['A'], activeLine: 1, explanation: 'El then adjunta el callback a la Microtask Queue y la ejecución continúa.' },
            { callStack: ['console.log("C")'], microtaskQueue: ['callback Promise'], macrotaskQueue: [], webApi: [], console: ['A'], activeLine: 4, explanation: 'C entra al Call Stack.' },
            { callStack: [], microtaskQueue: ['callback Promise'], macrotaskQueue: [], webApi: [], console: ['A', 'C'], activeLine: 4, explanation: 'Se imprime C. El script principal terminó.' },
            { callStack: ['callback Promise'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['A', 'C'], activeLine: 1, explanation: 'Event loop lee la Microtask Queue (alta prioridad) y mueve el callback al Call Stack.' },
            { callStack: ['callback Promise', 'console.log("B")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['A', 'C'], activeLine: 2, explanation: 'Se ejecuta el callback y appendea B al Call Stack.' },
            { callStack: ['callback Promise'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['A', 'C', 'B'], activeLine: 2, explanation: 'Se imprime B en consola.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['A', 'C', 'B'], activeLine: null, explanation: 'Fin.' },
        ]
    },
    {
        id: 'mix',
        name: '4. Mix: Macro vs Micro',
        description: 'Una Promesa siempre le gana a un setTimeout, incluso si ambos están listos al mismo tiempo.',
        code: `console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');`,
        steps: [
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: null, explanation: 'Estado inicial.' },
            { callStack: ['console.log("Start")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: 0, explanation: 'Inicia el código síncrono.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Start'], activeLine: 0, explanation: 'Imprime Start.' },
            { callStack: ['setTimeout(...)'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Start'], activeLine: 1, explanation: 'setTimeout se envia a Web API.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['Start'], activeLine: 1, explanation: 'Timer de Web API inicia.' },
            { callStack: ['Promise.then(...)'], microtaskQueue: ['Promise callback'], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['Start'], activeLine: 2, explanation: 'Promise callback se va a la Microtask Queue.' },
            { callStack: ['console.log("End")'], microtaskQueue: ['Promise callback'], macrotaskQueue: ['Timeout callback'], webApi: [], console: ['Start'], activeLine: 3, explanation: 'Al mismo tiempo el Timer termina en Web API y va a Macrotask Queue. Imprimimos End.' },
            { callStack: [], microtaskQueue: ['Promise callback'], macrotaskQueue: ['Timeout callback'], webApi: [], console: ['Start', 'End'], activeLine: 3, explanation: 'Call Stack vacío. Event Loop evalúa colas. ¡Microtareas primero!' },
            { callStack: ['Promise callback', 'console.log("Promise")'], microtaskQueue: [], macrotaskQueue: ['Timeout callback'], webApi: [], console: ['Start', 'End'], activeLine: 2, explanation: 'La microtask toma el Call Stack.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: ['Timeout callback'], webApi: [], console: ['Start', 'End', 'Promise'], activeLine: 2, explanation: 'Se imprime Promise y se limpia el Call Stack.' },
            { callStack: ['Timeout callback', 'console.log("Timeout")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Start', 'End', 'Promise'], activeLine: 1, explanation: 'Con Microtask vacía, pasamos a Macrotasks y ejecutamos timeout.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Start', 'End', 'Promise', 'Timeout'], activeLine: null, explanation: 'Fin del mix!' },
        ]
    },
    {
        id: 'nested-micro',
        name: '5. Miocrotareas Anidadas',
        description: 'Las microtareas pueden encolar más microtareas. El Call Stack no pasará a la siguiente macrotarea hasta que la Microtask Queue esté totalmente vacía.',
        code: `Promise.resolve().then(() => {
  console.log('Micro 1');
  Promise.resolve().then(() => {
    console.log('Micro 2');
  });
});
setTimeout(() => console.log('Macro'), 0);`,
        steps: [
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: null, explanation: 'Estado inicial.' },
            { callStack: ['Promise.resolve().then(...)'], microtaskQueue: ['Micro 1 callback'], macrotaskQueue: [], webApi: [], console: [], activeLine: 0, explanation: 'Encolamos la primera Microtarea.' },
            { callStack: ['setTimeout(...)'], microtaskQueue: ['Micro 1 callback'], macrotaskQueue: [], webApi: [], console: [], activeLine: 6, explanation: 'setTimeout va al Call Stack.' },
            { callStack: [], microtaskQueue: ['Micro 1 callback'], macrotaskQueue: ['Macro callback'], webApi: [], console: [], activeLine: 6, explanation: 'setTimeout delega a Web API y luego a Macrotask Queue.' },
            { callStack: ['Micro 1 callback'], microtaskQueue: [], macrotaskQueue: ['Macro callback'], webApi: [], console: [], activeLine: 0, explanation: 'Script principal termina. Event Loop toma la primera microtarea.' },
            { callStack: ['Micro 1 callback', 'console.log("Micro 1")'], microtaskQueue: [], macrotaskQueue: ['Macro callback'], webApi: [], console: [], activeLine: 1, explanation: 'Ejecutamos "Micro 1".' },
            { callStack: ['Micro 1 callback'], microtaskQueue: [], macrotaskQueue: ['Macro callback'], webApi: [], console: ['Micro 1'], activeLine: 1, explanation: 'Impreso.' },
            { callStack: ['Micro 1 callback', 'Promise.resolve().then(...)'], microtaskQueue: ['Micro 2 callback'], macrotaskQueue: ['Macro callback'], webApi: [], console: ['Micro 1'], activeLine: 2, explanation: 'Micro 1 encola una NUEVA microtarea.' },
            { callStack: [], microtaskQueue: ['Micro 2 callback'], macrotaskQueue: ['Macro callback'], webApi: [], console: ['Micro 1'], activeLine: 0, explanation: 'Micro 1 termina. Pero la Microtask Queue NO está vacía.' },
            { callStack: ['Micro 2 callback'], microtaskQueue: [], macrotaskQueue: ['Macro callback'], webApi: [], console: ['Micro 1'], activeLine: 2, explanation: 'Event Loop toma la microtarea anidada inmediatamente.' },
            { callStack: ['Micro 2 callback', 'console.log("Micro 2")'], microtaskQueue: [], macrotaskQueue: ['Macro callback'], webApi: [], console: ['Micro 1'], activeLine: 3, explanation: 'Ejecutamos "Micro 2".' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: ['Macro callback'], webApi: [], console: ['Micro 1', 'Micro 2'], activeLine: 3, explanation: 'Micro 2 termina. Ahora sí, Microtask Queue está vacía.' },
            { callStack: ['Macro callback'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Micro 1', 'Micro 2'], activeLine: 6, explanation: 'Finalmente, el Event Loop puede pasar a la Macrotask Queue.' },
            { callStack: ['Macro callback', 'console.log("Macro")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Micro 1', 'Micro 2'], activeLine: 6, explanation: 'Ejecutamos el log del timeout.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['Micro 1', 'Micro 2', 'Macro'], activeLine: null, explanation: 'Fin. Observa cómo las microtareas retrasaron la macrotarea.' },
        ]
    }
];
