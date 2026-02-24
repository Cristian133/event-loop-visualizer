# JavaScript Event Loop Visualizer

Esta aplicación es una herramienta interactiva diseñada para visualizar y entender cómo funciona el **Event Loop** de JavaScript (y Node.js). 

El objetivo es ayudar a desarrolladores a comprender conceptos fundamentales como:
- **Call Stack** (Pila de llamadas)
- **Microtask Queue** (Promesas, `process.nextTick`)
- **Macrotask Queue** (Task Queue: `setTimeout`, `setInterval`, I/O)

## ¿Qué es el Event Loop?

El bucle de eventos (Event Loop) es el corazón de Node.js y los navegadores, permitiendo realizar operaciones no bloqueantes (I/O asíncrono) a pesar de que JavaScript se ejecuta en un solo hilo.

### Fases del Event Loop (Node.js)

Según la [documentación oficial de Node.js](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick), el Event Loop pasa por las siguientes fases principales en cada iteración ("tick"):

1.  **Timers**: En esta fase se ejecutan los callbacks programados por `setTimeout()` y `setInterval()`.
2.  **Pending Callbacks**: Se ejecutan callbacks de I/O que fueron diferidos de la iteración anterior (por ejemplo, errores de TCP).
3.  **Idle, Prepare**: Fase de uso interno de Node.js.
4.  **Poll**: El sistema recupera nuevos eventos de I/O. Node.js se bloqueará aquí si es apropiado. Se ejecutan casi todos los callbacks (I/O), excepto timers, close callbacks y los programados por `setImmediate()`.
5.  **Check**: Los callbacks de `setImmediate()` se invocan aquí.
6.  **Close Callbacks**: Se ejecutan callbacks de cierre, como `socket.on('close', ...)`.

### Microtasks:

Existe un concepto crucial adicional: las **Microtasks**. Estas tienen prioridad absoluta sobre las fases mencionadas arriba.

-   **`process.nextTick()`**: No es técnicamente parte del Event Loop, sino que su cola se procesa **inmediatamente después de la operación actual**, antes de pasar a cualquier fase del Event Loop.
-   **Promesas (Promises)**: Las resoluciones de promesas se manejan también como microtasks y se ejecutan justo después de que el código síncrono termine o entre una fase y otra.

---

Para una referencia visual y técnica completa:
[The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)

## Desarrollo

Esta aplicación fue construida con **Angular**.

### Servidor de desarrollo

Ejecuta `ng serve` para iniciar el servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

### Build

Ejecuta `ng build` para compilar el proyecto. Los artefactos de compilación se guardarán en el directorio `dist/`.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
