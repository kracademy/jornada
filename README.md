# Jornada

Fichaje personal para iPhone: entrar, pausa y salir, horas por semana y por mes, horas extra e informe para enviar.

- Se instala desde Safari: Compartir → Añadir a pantalla de inicio.
- Sin cuentas ni servidores. Los datos se guardan solo en el dispositivo (localStorage) y se hace copia de seguridad en un archivo JSON (Guardar en Archivos / iCloud Drive).
- Funciona sin conexión (service worker). Al publicar cambios, subir la versión de `CACHE` en `sw.js`.
- Registro mensual en PDF con el formato del papel de Milnotes («Registre treballadors a temps parcial») y un anexo con semanas, desplazamientos y lo pendiente de cobro. Lo genera `pdf.js` con jsPDF (`vendor/`, se carga al abrir Mes).
- Horas extra día a día: dentro de cada semana, pasadas las horas de contrato, el resto son extra. Las semanas en que empieza o acaba el contrato cuentan la parte proporcional.
- Gastos: kilometraje (km de ida, ×2 si es ida y vuelta, al precio por km de ese día) u otros importes.

App: https://kracademy.github.io/jornada/
