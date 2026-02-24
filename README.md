# JavaScript Event Loop Visualizer

Esta aplicación es una herramienta interactiva diseñada para visualizar y entender cómo funciona el **Event Loop** de JavaScript (y Node.js). 

El objetivo es ayudar a desarrolladores a comprender conceptos fundamentales como:
- **Call Stack** (Pila de llamadas)
- **Microtask Queue** (Promesas, `process.nextTick`)
- **Macrotask Queue** (Task Queue: `setTimeout`, `setInterval`, I/O)

## ¿Qué es el Event Loop?

El bucle de eventos (Event Loop) es lo que permite a JavaScript realizar operaciones no bloqueantes, a pesar de ser un lenguaje de un solo hilo (single-threaded).

Para una explicación técnica detallada, puedes consultar la documentación oficial de Node.js:
👉 [The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)

## Desarrollo

Esta aplicación fue construida con **Angular**.

### Servidor de desarrollo

Ejecuta `ng serve` para iniciar el servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

### Build

Ejecuta `ng build` para compilar el proyecto. Los artefactos de compilación se guardarán en el directorio `dist/`.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
