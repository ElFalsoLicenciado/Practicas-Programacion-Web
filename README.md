# Practica Unidad 3
## Paso 1
- Agregar eventos y elementos dinámicos a los objetos del índex utilizando al menos una librería o un Framework conocido.   
- Considerar estos eventos y elementos para el resto de las paginas para cuando se muestre todo el contenido de la BD.

## Paso 2
- Aplicar validacion del lado del cliente para todos los formularios de la pagina.
- Utilizar al menos una libreria o un framework conocido.

## Paso 3
- Aplicar el manejo de versiones y actualizaciones del codigo fuente un GitHub.
- Realizar cambios en el repositorio del compañero.

## Paso 4
- Seguir validando el código fuente HTML de todas las paginas renderizadas.
- Seguir validando los CSS's.


## Entregable:
- PDF con la informacion 
- - Breve descripción del procedimiento.
- - Comandos y/o configuración realizada.
- - Capturas de pantalla completa (no del código completo, sino de lo más importante o relevante)
- Código fuente (incluir link del repositorio en la entrega)

## Evaluación:
### Derecho a evaluación.
- Tutorial JavaScript: 200 lecciones, 267 ejercicios, 1 examen. (**W3Schools**)
- Tutorial con todas las lecciones, ejercicios y examen de solo una librería (jQuery, React) o framework (Vue, Angular) (**W3Schools**)
- Tutorial **FreeCodeCamp**: Front-End Devvelopment Libraries Certification (**FreeCodeCamp**)
- Aplica tambien **Scrimba**

### Fecha de entrega:
- 23 al 25 marzo: 100
- 26 y 27 marzo: 80
  
### 10 puntos menos por cada cosa faltante.

*AP1#CONTROL_AP2#CONTROL_U3_PW_G.PDF*

### Validador Oficial
- HTML: https://validator.w3.org/
- CSS: https://jigsaw.w3.org/css-validator/

# Consideraciones para el proyecto:
## Back-end
**Java** + **Oracle**/**MySQL**

## Front-end
**Nextjs** o **React router** (más nativo y liviano)

**JWT** (Inicio de sesión)

**Tailwind CSS**

***FAVOR DE ENCRIPTAR LAS CONTRASEÑAS***

# Apuntes
## Java Script puede "mostrar" datos de diferentes manera: 

- Escribiendo en un elemento HTML, usando *innerHTML* o *innerText* [Para evitar warnings durante la validación, si quiero cambiar un elemento, lo mejor es dejarlo en blanco]
- Escribiendo en la salida HTML usando

## Manejo de Frameworks
- **Librería**: es un conjunto de código reutilizable que resuelve un problema específico y que una aplicación llama para usar sus funciones.
- - React
- - jQuery
- **Framework**: es una estructura de aplicación completa que contiene múltiples librerías y establece cómo la aplicación se escribe y se organiza, controlando el flujo general de la ejecución.
- - Vue
- - Angular

## jQuery
- jQuery es una librería de JavaScript liviana que permite "escribir menos, hacer más".
- jQuery simplifica enormemente la programción en JS.
- - Manipulación de HTML/DOM
- - Manipulación de CSS
- - Métodos de eventos HTML
- - Efectos y animaciones
- - AJAX
- - Utilerias

### Detalles:
- Versión de producción
- Versión de desarrollo
- La sintaxis básica es: `$(selector).action()`
- Un signo `$` para definir/acceder a jQuery
- Un *selector* para "consultar (o encontrar)" elementos HTML
- Un *action* jQuery `()` que se realizará en el elemento(s)
- **Ejemplos**:
  - `$(this).hide()` oculta el elemento actual.
  - `$("p").hide()` oculta todos los elementos `<p>`.
  - `$(".test").hide()` oculta todos los elementos con `class="test"`.
  - `$("#test").hide()` oculta el elemento con `id="test"`.

## React
- Librería de JS para crear interfaces de usuario (Front-End).
- Se utiliza para crear aplicaciones de una sola página.
- Permite crear componentes de UI reutilizables.
- React fue desarrollado por el ingeniero de software de Facebook: Jordan Walke.
- React también se conoce como React.js o ReactJS.

### Detalles:
- Crea un **DOM VIRTUAL** en memoria.
- Sólo cambia lo que necesita ser cambiado.
- **Preparación**:
  - Instalar Node.js
  - Instalar herramienta de compilación (Vite)
  - Crear aplicación React
  - Instalar dependencias
  - Ejecutar aplicación


``` shell
node -v
npm install -g create-vite
npm create vite@latest my-react-app -- --template react
npm install
npm run dev
```

## Vue
- Las interfaces de usuario integradas en Vue se actualizan automáticamente cuando cambian los datos.

### Detalles


## Angular
- Permite crear aplicaciones escalables de una sola página con TypeScript
- Creado con TypeScript
- Utiliza componentes y plantillas
- Manejo de las API's

### Detalles
- **Preparación**:
  1. Tener Node.js
  2. Instalar Angular CLI
  3. Crear aplicación
  4. Ejecutar aplicación
- **Aplicación**:
  1.  