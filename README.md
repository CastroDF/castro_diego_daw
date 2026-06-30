# Weather App

Página web que consulta el clima actual de una ciudad usando la API gratuita de Open-Meteo (sin API key).

El flujo encadena dos peticiones GET: primero la API de geocodificación devuelve la latitud y longitud de la ciudad, y luego con esas coordenadas se consulta el clima actual.

Muestra el nombre de la ciudad, la temperatura, la velocidad del viento y el código de clima.

## Uso

Abrir `index.html` en el navegador, escribir una ciudad y presionar Consultar.

## Tecnologías

- HTML
- CSS
- JavaScript (fetch)
