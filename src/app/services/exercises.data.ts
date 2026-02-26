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
    },
    {
        id: 'setTimeout-zero',
        name: '6. Utilidad de setTimeout 0',
        description: 'A veces usamos setTimeout(0) para "diferir" una ejecución. Esto permite que el Call Stack se vacíe por completo (incluyendo funciones anidadas) antes de ejecutar el callback, dando tiempo al navegador para tareas como renderizar la UI.',
        code: `function interna() {
  console.log('2. Pila profunda');
}
function tarea() {
  interna();
}
console.log('1. Inicio');
setTimeout(() => console.log('4. Diferido'), 0);
tarea();
console.log('3. Fin');`,
        steps: [
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: null, explanation: 'Estado inicial.' },
            { callStack: ['console.log("1. Inicio")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: 6, explanation: 'Comenzamos con un log síncrono.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio'], activeLine: 6, explanation: 'Log impreso.' },
            { callStack: ['setTimeout(...)'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio'], activeLine: 7, explanation: 'Registramos un timer. Aunque sea de 0ms, es asíncrono.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1. Inicio'], activeLine: 7, explanation: 'Delega el callback a la Web API.' },
            { callStack: ['tarea()'], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1. Inicio'], activeLine: 8, explanation: 'Llamamos a una función síncrona "tarea".' },
            { callStack: ['tarea()', 'interna()'], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1. Inicio'], activeLine: 4, explanation: 'tarea() llama a interna(). La pila (Call Stack) empieza a crecer.' },
            { callStack: ['tarea()', 'interna()', 'console.log("2. Pila profunda")'], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1. Inicio'], activeLine: 1, explanation: 'interna() ejecuta un log. Notar cómo el callback diferido sigue esperando su turno.' },
            { callStack: ['tarea()', 'interna()'], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1. Inicio', '2. Pila profunda'], activeLine: 1, explanation: 'Log finalizado.' },
            { callStack: ['tarea()'], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1. Inicio', '2. Pila profunda'], activeLine: 2, explanation: 'interna() termina y sale del stack.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1. Inicio', '2. Pila profunda'], activeLine: 5, explanation: 'tarea() termina y el stack vuelve a estar (momentáneamente) vacío.' },
            { callStack: ['console.log("3. Fin")'], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1. Inicio', '2. Pila profunda'], activeLine: 9, explanation: 'Última instrucción síncrona del script principal.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: ['Timer (0ms)'], console: ['1. Inicio', '2. Pila profunda', '3. Fin'], activeLine: 9, explanation: 'Log finalizado.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: ['callback'], webApi: [], console: ['1. Inicio', '2. Pila profunda', '3. Fin'], activeLine: null, explanation: 'El timer de la Web API ya terminó y puso el callback en la cola de Macrotareas.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: ['callback'], webApi: [], console: ['1. Inicio', '2. Pila profunda', '3. Fin'], activeLine: null, explanation: 'PUNTO CLAVE: El Call Stack está vacío. Si hubiera microtareas o necesidad de renderizar, ocurriría AHORA.' },
            { callStack: ['callback'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Pila profunda', '3. Fin'], activeLine: 7, explanation: 'El Event Loop mueve por fin el callback al Call Stack.' },
            { callStack: ['callback', 'console.log("4. Diferido")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Pila profunda', '3. Fin'], activeLine: 7, explanation: 'Se ejecuta el contenido del setTimeout.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Pila profunda', '3. Fin', '4. Diferido'], activeLine: null, explanation: 'Fin. Se demuestra que el setTimeout(0) siempre espera a que TODO el código síncrono (y sus funciones) termine.' }
        ]
    },
    {
        id: 'async-await',
        name: '7. Async / Await',
        description: 'Las funciones async se ejecutan de forma síncrona hasta encontrar el primer "await". En ese punto, el resto de la función se pausa y se envía a la Microtask Queue.',
        code: `async function miAsync() {
  console.log('2. Dentro async');
  await Promise.resolve();
  console.log('4. Después await');
}

console.log('1. Inicio');
miAsync();
console.log('3. Fin');`,
        steps: [
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: null, explanation: 'Estado inicial.' },
            { callStack: ['console.log("1. Inicio")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: 6, explanation: 'Ejecución síncrona inicial.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio'], activeLine: 6, explanation: 'Log impreso.' },
            { callStack: ['miAsync()'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio'], activeLine: 7, explanation: 'Llamamos a la función asíncrona. Entra al Call Stack normalmente.' },
            { callStack: ['miAsync()', 'console.log("2. Dentro async")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio'], activeLine: 1, explanation: 'IMPORTANTE: El código dentro de una función async se ejecuta SÍNCRONAMENTE hasta el primer await.' },
            { callStack: ['miAsync()'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Dentro async'], activeLine: 1, explanation: 'Log impreso.' },
            { callStack: ['miAsync()', 'await Promise.resolve()'], microtaskQueue: ['miAsync (reanudación)'], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Dentro async'], activeLine: 2, explanation: 'Al llegar al await, la función se pausa y el resto del código se encola como una Microtarea.' },
            { callStack: [], microtaskQueue: ['miAsync (reanudación)'], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Dentro async'], activeLine: 7, explanation: 'miAsync() sale del stack. El control vuelve al hilo principal.' },
            { callStack: ['console.log("3. Fin")'], microtaskQueue: ['miAsync (reanudación)'], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Dentro async'], activeLine: 8, explanation: 'Se continúa con el siguiente bloque síncrono.' },
            { callStack: [], microtaskQueue: ['miAsync (reanudación)'], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Dentro async', '3. Fin'], activeLine: 8, explanation: 'El script principal ha terminado.' },
            { callStack: ['miAsync (reanudación)'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Dentro async', '3. Fin'], activeLine: 2, explanation: 'El Event Loop vacía la Microtask Queue y reanuda la función async.' },
            { callStack: ['miAsync (reanudación)', 'console.log("4. Después await")'], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Dentro async', '3. Fin'], activeLine: 3, explanation: 'Se ejecuta lo que faltaba de la función.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: ['1. Inicio', '2. Dentro async', '3. Fin', '4. Después await'], activeLine: null, explanation: 'Fin. Se observa el flujo: 1 -> 2 -> 3 -> 4.' }
        ]
    },
    {
        id: 'dom-events',
        name: '8. Eventos del DOM',
        description: 'La interacción con el DOM a través de eventos es asíncrona. El navegador vigila el evento y encola el callback en la Macrotask Queue cuando ocurre.',
        code: `const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  console.log('Botón clickeado');
});
console.log('Script finalizado');`,
        steps: [
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: null, explanation: 'Estado inicial. El DOM está listo en el navegador.' },
            { callStack: ["const btn = document.querySelector('button')"], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: 0, explanation: 'JavaScript solicita un elemento al DOM (Web API).' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: 0, explanation: 'El elemento es retornado y guardado en la variable "btn".' },
            { callStack: ["btn.addEventListener('click', ...)"], microtaskQueue: [], macrotaskQueue: [], webApi: [], console: [], activeLine: 1, explanation: 'Se registra un escucha de eventos.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: ['Click Listener'], console: [], activeLine: 1, explanation: 'El listener se delega a la Web API. JavaScript no se bloquea esperando el clic.' },
            { callStack: ["console.log('Script finalizado')"], microtaskQueue: [], macrotaskQueue: [], webApi: ['Click Listener'], console: [], activeLine: 4, explanation: 'El script principal continúa.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: ['Click Listener'], console: ['Script finalizado'], activeLine: 4, explanation: 'Script finalizado. El Call Stack está vacío.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: ['callback click'], webApi: ['Click Listener'], console: ['Script finalizado'], activeLine: null, explanation: '¡Usuario hace clic! La Web API detecta el evento y encola el callback en la Macrotask Queue.' },
            { callStack: ['callback click'], microtaskQueue: [], macrotaskQueue: [], webApi: ['Click Listener'], console: ['Script finalizado'], activeLine: 1, explanation: 'El Event Loop mueve el callback al Call Stack.' },
            { callStack: ['callback click', "console.log('Botón clickeado')"], microtaskQueue: [], macrotaskQueue: [], webApi: ['Click Listener'], console: ['Script finalizado'], activeLine: 2, explanation: 'Se ejecuta el código dentro del callback.' },
            { callStack: [], microtaskQueue: [], macrotaskQueue: [], webApi: ['Click Listener'], console: ['Script finalizado', 'Botón clickeado'], activeLine: null, explanation: 'Fin. El listener sigue en la Web API esperando más clics.' }
        ]
    }
];
