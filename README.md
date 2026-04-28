# Practica Unidad 4

## Paso 1
- Crear una clase o plantilla para la conexión a la BD.
- Mostrar todos los productos y servicios almacenados en la BD, manejar eventos y diseño.
## Paso 2
- Crear un módulo para registrar, modificar y eliminar usuarios de la Página Web.
(Agregar Cloudfare/Captcha/Mandar correo de verificación)
- Usar permisos, roles y tipos de usuario correctos en la BD.
(Roles: Administrador, Usuario y Turista [loggeo])(Usuario de loggeo [Permisos de lectura y escritura en solo usuarios]) 
- Cifrar contraseñas de los usuarios en la BD.
## Paso 3
- De la practica anterior en la plantilla de formularios, almacenar y actualizar la información en la BD.
- Usar AJAX para mínimo un elemento:
  - Nombre de usuario.
  - Nombre / Id de Producto o Servicio.
- Conservar Sesiones del Navegador.
## Paso 4
- Seguir validando el código fuente HTML de todas las páginas rendereizadas.
- Seguir validando los CSSs.
- El Servidor Web debe tener conexión cifrada (HTTPS).
- Commits en GitHub.

## Entregable:
- PDF con la informacion 
- - Diseño de red con direcciones IP, servicios y datos de acceso.
- - Breve descripción del procedimiento.
- - Comandos y/o configuración realizada.
- - Capturas de pantalla completa (no del código completo, sino de lo más importante o relevante)
- Conclusiones.
- Código fuente (incluir link del repositorio en la entrega)

## Evaluación:
### Derecho a evaluación.
- Tutorial Lengauje del lado del Servidor.
- Entregar todas las actividades de la Unidad.
### Fecha de entrega:
- 4 al 6 de mayo: 100
- 7 y 8 de mayo: 80
  
### 10 puntos menos por cada cosa faltante.

*AP1#CONTROL_AP2#CONTROL_U4_PW_G.PDF*

### Validador Oficial
- HTML: https://validator.w3.org/
- CSS: https://jigsaw.w3.org/css-validator/

# Consideraciones para el proyecto:
## Back-end
**Java** + **Oracle**/**MySQL**

## Front-end
**React router** (más nativo y liviano)

**JWT** (Inicio de sesión)

**Tailwind CSS**

***FAVOR DE ENCRIPTAR LAS CONTRASEÑAS***
USAR SHA256

## Notas Yovax
- Cada vez que cargue una ruta que debe estar protegida, debe haber una función al principio que haga una llamada al api.
- Y que en tus cookies exista la sesión del usuario.
- Entonces si por ejemplo `/mis-cursos` es una ruta protegida, entonces al cargar el archivo que renderiza `/mis-cursos`, debe al principio cargar la llamada al *endpoint*

Eso puede ser con un useEffect

1. Hace la llamada y envías la sesión del usuario

2. No hay sesión? No haces la llamada y devuelves a login. Si hay sesión? Envia la sesión al endpoint y con esta informacion consultas en la BD si el usuario existe y que rol tiene. En base a eso lo redireccionas donde debe
Esto debe ocurrir cada vez que cargues una ruta
Es complicado así que va a tomar tiempo rey
Y esto tienes que protegerlo con JWT

# Apuntes




# Uso de TODO
### Projects:

* Anything with colon at the end of the line is a project title
* You can nest projects inside each other
* You can fold projects and sub projects
### Tasks:

New Task:
    * Press Cmd+Enter (Ctrl+Enter on Windows and Linux) to add a new task
    * You can also use the Command pallette to create a new task by typing To Do:New Task
    * If you are on a new line, it will create a new task on the current line
    * If you are on a line with some text pressing new task shortcut will convert it to a task
    * New tasks are nested as much as the previous task

More Actions:
    * Complete a task by pressing Alt+d @done
    * Re-open a completed task by pressing Alt+d
    * Cancel a task by pressing Alt+c @cancelled
    * Complete a cancelled task by pressing Alt+d
    * You can also use the Command pallette to complete or cancel a task by typing 
      To Do:Complete Task or To Do:Cancel Task 

Tagging:
    * You can add tags using @ sign, like this @tag
    * You can use following pre-existing tags to mark tasks @critical @high @low @today 
    * Auto intellisense is provided to help you in finding tags