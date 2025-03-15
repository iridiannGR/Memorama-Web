# Memorama con Niveles de Dificultad

## Portada
- **Nombre del estudiante:** Valeria Iridian García Ramírez  
- **Nombre del videojuego desarrollado:** Memorama con Niveles de Dificultad  
- **Fecha de entrega:** 17 de marzo de 2025  
- **Materia:** Desarrollo de Aplicaciones Web  
- **Profesor:** Leonardo Miguel Moreno Villalba  

---

## 1. Introducción
El **Memorama con Niveles de Dificultad** es un juego clásico de memoria en el que el jugador debe encontrar pares de cartas idénticas. Este proyecto incluye tres niveles de dificultad (fácil, medio y difícil), un sistema de preguntas y respuestas para ganar tiempo extra, y una interfaz gráfica atractiva con colores rosados y diseño moderno.

### Objetivo del Proyecto
El objetivo principal de este proyecto es desarrollar un videojuego funcional y atractivo utilizando tecnologías web como **HTML**, **CSS** y **JavaScript**. Además, se busca implementar características adicionales como niveles de dificultad, un sistema de puntuación y una interfaz gráfica intuitiva.

### Tecnologías Utilizadas
- **HTML:** Para la estructura del juego.
- **CSS:** Para el diseño y la estilización de la interfaz.
- **JavaScript:** Para la lógica del juego y la interacción con el usuario.

---

## 2. Planificación del Desarrollo

### Justificación de la Elección del Juego
El memorama fue seleccionado por ser un juego clásico que combina habilidades cognitivas como la memoria y la concentración. Además, su implementación permite explorar conceptos clave de desarrollo web, como la manipulación del DOM, el manejo de eventos y la creación de interfaces interactivas.

### Especificaciones Generales del Juego
- **Género:** Juego de memoria.
- **Mecánicas:** Voltear cartas para encontrar pares, responder preguntas para ganar tiempo extra.
- **Reglas Principales:**
  - El jugador debe encontrar todos los pares de cartas antes de que se agote el tiempo.
  - Cada par encontrado suma puntos.
  - Las preguntas correctas otorgan tiempo adicional.

### Bocetos o Wireframes de la Interfaz Gráfica
- **Menú de Dificultad:** Un menú con botones para seleccionar el nivel de dificultad.
- **Tablero de Juego:** Un grid de cartas que se voltean al hacer clic.
- **Preguntas y Respuestas:** Un contenedor que muestra preguntas aleatorias.
- **Pantalla de Game Over:** Muestra la puntuación final y un botón para reiniciar el juego.

### Lista de Recursos Necesarios
- **Imágenes:** Cartas con frutas y reverso de las cartas.
- **Sonidos:** Efectos de sonido para aciertos y errores.
- **Fuentes:** Fuentes predeterminadas del sistema (Arial, sans-serif).

### Cronograma de Trabajo
1. **Semana 1:** Investigación y planificación del proyecto.
2. **Semana 2:** Creación de la estructura HTML y diseño CSS.
3. **Semana 3:** Implementación de la lógica del juego en JavaScript.
4. **Semana 4:** Pruebas, corrección de errores y documentación.

---

## 3. Estructura del Proyecto

### Explicación de la Estructura de Carpetas y Archivos

/memorama-juego/
├── index.html # Archivo principal del juego
├── styles.css # Estilos CSS para la interfaz
├── script.js # Lógica del juego en JavaScript
├── img/ # Carpeta con imágenes de las cartas
│ ├── img1.png
│ ├── img2.png
│ └── ...
├── sounds/ # Carpeta con efectos de sonido
│ ├── correct.mp3
│ └── wrong.mp3
└── README.md # Documentación del proyecto


### Descripción de Cada Archivo Importante
- **index.html:** Contiene la estructura del juego, incluyendo el menú de dificultad, el tablero de cartas y la pantalla de Game Over.
- **styles.css:** Define los estilos visuales del juego, como colores, bordes y animaciones.
- **script.js:** Implementa la lógica del juego, incluyendo el volteo de cartas, el temporizador y las preguntas.

---

## 4. Desarrollo del Juego

### 5.1. Creación de la Interfaz (HTML y CSS)
- **HTML:** Se utilizaron etiquetas semánticas como `<section>`, `<div>` y `<button>` para estructurar el juego.
- **CSS:** Se aplicaron estilos modernos con bordes redondeados, sombras y colores rosados para una interfaz atractiva.

#### Capturas de Pantalla
1. Menú de Dificultad:
   ![Menú de Dificultad](img/menu.png)
2. Tablero de Juego:
   ![Tablero de Juego](img/tablero.png)
3. Pantalla de Game Over:
   ![Game Over](img/game-over.png)

### 5.2. Lógica del Juego (JavaScript)
- **Funciones Principales:**
  - `startGame(difficulty)`: Inicia el juego según la dificultad seleccionada.
  - `flipCard()`: Maneja el volteo de las cartas.
  - `showQuestion()`: Muestra preguntas aleatorias.
  - `updateScore(points)`: Actualiza la puntuación del jugador.
  - `showGameOver()`: Muestra la pantalla de Game Over.

- **Interacción del Usuario:**
  - El usuario hace clic en las cartas para voltearlas y responde preguntas para ganar tiempo extra.

- **Manejo de Sonidos:**
  - Se reproducen sonidos al acertar o fallar una pregunta.

---

## 6. Pruebas y Debugging

### Métodos Utilizados para Probar el Juego
- Pruebas manuales de todas las funcionalidades.
- Uso de la consola del navegador para depurar errores.

### Problemas Encontrados y Soluciones
1. **Problema:** Las cartas no se volteaban correctamente.
   - **Solución:** Se corrigió la lógica de la función `flipCard()`.

2. **Problema:** El temporizador no se reiniciaba al cambiar de nivel.
   - **Solución:** Se agregó un `clearInterval()` antes de iniciar un nuevo temporizador.

### Feedback Recibido y Mejoras Implementadas
- Se recibió feedback sobre la necesidad de un diseño más atractivo, lo que llevó a la implementación de colores rosados y bordes redondeados.

---

## 7. Conclusiones y Mejoras Futuras

### Evaluación Personal del Proceso de Desarrollo
El desarrollo de este proyecto fue una experiencia enriquecedora que permitió aplicar conocimientos de HTML, CSS y JavaScript en un contexto práctico. Aprendí a manejar eventos, manipular el DOM y crear interfaces interactivas.

### Desafíos Enfrentados
- Implementar la lógica del volteo de cartas.
- Manejar el temporizador y las preguntas de manera eficiente.

### Mejoras Futuras
- Agregar más niveles de dificultad.
- Implementar un sistema de guardado de puntuaciones usando `localStorage`.
- Mejorar la interfaz gráfica con animaciones más avanzadas.

---

¡Gracias por revisar mi proyecto! 😊🎮