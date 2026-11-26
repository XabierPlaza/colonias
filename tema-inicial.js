// Tema claro u oscuro desde el primer instante, antes de que cargue la app.
// El iPhone fija el color de la barra de la hora al abrir la app: si en ese momento la página
// aún no tiene su tema, la barra se queda del color equivocado. (La app lo repite después en
// src/datos/preferencias.ts, que es la que manda; esto solo adelanta el primer pintado.)
(function () {
  var tema = "automatico";
  try {
    tema = localStorage.getItem("contador-colonias:tema") || "automatico";
  } catch (e) {}
  var oscuro = tema === "oscuro" || (tema === "automatico" && matchMedia("(prefers-color-scheme: dark)").matches);
  var html = document.documentElement;
  if (oscuro) html.classList.add("ion-palette-dark");
  html.style.colorScheme = oscuro ? "dark" : "only light";
  if (tema !== "automatico") {
    var color = oscuro ? "#2b3249" : "#dde4f4";
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute("content", color);
  }
})();
