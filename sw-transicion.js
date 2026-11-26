// Paso de las versiones que se actualizaban solas a las que piden permiso con el aviso.
// Las versiones antiguas no saben pedir a la nueva que tome el control, así que se quedaría
// esperando para siempre (en el iPhone las apps casi nunca se cierran del todo).
// Si en este dispositivo aún no ha estado activa ninguna versión con aviso, la nueva entra sola;
// a partir de ahí, cada actualización espera a que se pulse «Actualizar».
const MARCA = "contador-aviso-actualizacion";

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.has(MARCA).then((hayAviso) => {
      if (!hayAviso) return self.skipWaiting();
    }),
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.open(MARCA).then(() => {
      // la página que aún tiene el código antiguo pasa a la versión nueva al recargarse
      if (self.registration.active) return self.clients.claim();
    }),
  );
});
