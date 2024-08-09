# Taskuz Service (Nest + Typescript + MongoDB)

Con el comando yarn puedes instalar todas las dependencias

```bash
yarn
```

### Configuración de la Base de Datos

-   **PORT:** Puerto en el que se ejecutará el servidor (por ejemplo, 3000).
-   **DB_URI:** URI de conexión a la base de datos. (Si estas corriendo mongo localmente suele ser mongodb://localhost:27017)
-   **JWT_SECRET:** Secreto utilizado para firmar y verificar los tokens JWT.

## Generar Secrets

Para generar un secreto `JWT_SECRET` utilizando OpenSSL y codificarlo en base64, puedes ejecutar el siguiente comando en tu terminal:

```bash
openssl rand -base64 32
```

Luego puedes agregar el secret obtenido en JWT_SECRET

## Correr Localmente

Una vez que hayas configurado las variables de entorno en un archivo `.env`, puedes seguir estos pasos para ejecutar la aplicación localmente:

1. **Configurar Variables de Entorno**: Asegúrate de tener configuradas las variables de entorno necesarias en un archivo `.env`. Puedes encontrar un ejemplo de las variables requeridas en el archivo `.env.example`.

2. **Ejecutar el Seeder para Crear el Usuario Root**: Utiliza el siguiente comando para ejecutar el seeder y crear el usuario root con permisos de administrador y 3 usuarios adicionales:

    ```bash
    yarn seed:users
    ```

    Esto creará un usuario root con las siguientes credenciales:

    - Email: root@admin.io
    - Contraseña: admin

    ```bash
    yarn seed:tasks
    ```

    Esto creata Tasks de prueba

3. **Correr el proyecto en modo desarrollo**: Luego de correr los seeders, utiliza el siguiente comando para ejecutar el proyecto en develop:

    ```bash
    yarn start:dev
    ```

## Cors

Puedes cambiar las configuraciones CORS en `src/main.ts`. Por defecto todas las peticiones son admitidas

```js
// src/main.ts
app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }),
);
```

## Authentication Middleware

El middleware Auth usando JWT ya esta incluido en el proyecto, solo necesitas pasar la ruta a la cual quieres excluir

```js
// src/routerMiddleware/authMiddleware.route.ts
const excludedRoutes = [
    { path: 'users/signup', method: RequestMethod.POST },
    //...
];
```

## Admin Guard

Para que una ruta solo pueda ser accedida por un usuario admin puedes usar el guard AdminGuard

```js
// \src\modules\users\users,controller.ts:56
    @Post('/create-from-admin')
    @UseGuards(AdminGuard) // <-- Aplicando el AdminGuard
    async createFromAdmin(@Body() createUserDto: CreateUserDto) {
        /// Resto del codigo
    }
```

# API Documentation

## Users

-   **POST /users/signup**: Crear un nuevo usuario
-   **POST /users/signin**: Loguear un usuario
-   **GET /users/signout**: Logout del usuario
-   **POST /users/create-from-admin**: Crea un usuario desde el rol ADMIN
-   **POST /users/update-by-admin**: Actualiza un usuario
-   **GET /users/verify-token**: Verifica el JWT y retorna el decode
-   **POST /users/delete-user/:id**: Elimina un usuario

## Tasks

-   **POST /tasks**: Crea una nueva tarea
-   **GET /tasks**: Obtiene todas las tareas
-   **GET /tasks/:id**: Obtiene una tarea específica por ID
-   **POST /tasks/update/:id**: Actualiza una tarea específica por ID
-   **PUT /tasks/:id/completed**: Completa una Task

## Running the App

Con Docker Composer puedes crear la imagen de mongo y la imagen de la api para correr el contenedor.

```bash
docker-compose up --build
```
