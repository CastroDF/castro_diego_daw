const btn = document.getElementById("btnClima");
const estado = document.getElementById("estado");
const resultado = document.getElementById("resultado");

btn.addEventListener("click", () => {
  const ciudad = document.getElementById("ciudad").value.trim();
  resultado.innerHTML = "";

  if (ciudad === "") {
    estado.textContent = "Ingresá una ciudad";
    return;
  }

  estado.textContent = "Consultando...";

  fetch(
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
      ciudad +
      "&count=1",
  )
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al buscar la ciudad");
      }
      return respuesta.json();
    })
    .then((datos) => {
      if (!datos.results || datos.results.length === 0) {
        estado.textContent = "Ciudad no encontrada";
        return;
      }

      const lugar = datos.results[0];
      const lat = lugar.latitude;
      const lon = lugar.longitude;
      const nombre = lugar.name;

      return fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=" +
          lat +
          "&longitude=" +
          lon +
          "&current_weather=true",
      )
        .then((respuesta) => {
          if (!respuesta.ok) {
            throw new Error("Error al obtener el clima");
          }
          return respuesta.json();
        })
        .then((clima) => {
          const c = clima.current_weather;
          estado.textContent = "";
          resultado.innerHTML =
            "<h2>" +
            nombre +
            "</h2>" +
            "<p>Temperatura: " +
            c.temperature +
            " °C</p>" +
            "<p>Viento: " +
            c.windspeed +
            " km/h</p>" +
            "<p>Código de clima: " +
            c.weathercode +
            "</p>";
        });
    })
    .catch((error) => {
      estado.textContent = error.message;
    });
});
