# MIA React Web Base

Proyecto base para aplicaciones web de MIA Avanza Contigo.

Este proyecto define la estructura, configuración y patrones técnicos
comunes para las aplicaciones React de MIA.

La intención es que los nuevos proyectos partan de esta base y se
concentren en la funcionalidad de negocio, evitando reconstruir la
infraestructura común.

------------------------------------------------------------------------

## Versión

La versión de la aplicación se obtiene directamente desde
`package.json`.

Se utiliza mediante `appConfig.version`, por lo que no debe mantenerse
manualmente en los componentes.

------------------------------------------------------------------------

## Stack tecnológico

-   React
-   Vite
-   React Router
-   Tailwind CSS 4
-   Axios
-   TanStack Query
-   React Hook Form
-   Zod
-   i18next / react-i18next
-   AWS Cognito
-   OIDC
-   Lucide React

------------------------------------------------------------------------

## Arquitectura

La aplicación está organizada por responsabilidades:

``` text
src/
├── api/
│   ├── axiosInstance.js
│   └── useApi.js
├── app/
│   └── App.jsx
├── auth/
├── components/
├── config/
├── features/
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   └── hooks/
│   │       └── useHealth.js
│   └── example/
│       ├── Example.jsx
│       └── hooks/
│           └── useExample.js
├── hooks/
├── i18n/
│   ├── es.json
│   └── en.json
├── layouts/
├── query/
│   └── queryClient.js
├── routes/
├── styles/
│   └── index.css
└── main.jsx
```

------------------------------------------------------------------------

# Autenticación

La autenticación se realiza mediante AWS Cognito utilizando Managed
Login y OIDC.

El frontend no implementa directamente el formulario de autenticación.

Cognito administra:

-   Inicio de sesión
-   Cierre de sesión
-   Recuperación de contraseña
-   Renovación de tokens
-   Sesión del usuario

La aplicación utiliza `useAuth` para acceder al estado de autenticación.

El access token se utiliza para autorizar las llamadas al backend.

------------------------------------------------------------------------

# Internacionalización

La aplicación utiliza `i18next`.

Los idiomas soportados actualmente son:

-   Español (`es`)
-   Inglés (`en`)

Los textos visibles de la aplicación deben mantenerse en los archivos de
traducción y no directamente en los componentes.

Ejemplo:

``` jsx
const { t } = useTranslation();

<h1>{t("dashboard.title")}</h1>
```

El idioma seleccionado persiste aunque el usuario cierre sesión.

------------------------------------------------------------------------

# API

## Axios

Las llamadas HTTP utilizan una instancia configurable de Axios.

``` text
api/
├── axiosInstance.js
└── useApi.js
```

La instancia recibe la URL base de la API, permitiendo trabajar con
múltiples APIs sin modificar la implementación central.

Ejemplo:

``` jsx
const api = useApi(appConfig.api.baseUrl);
```

Para otra API:

``` jsx
const api = useApi(appConfig.api.walletUrl);
```

El token de autenticación se agrega automáticamente a las llamadas
realizadas mediante `useApi`.

------------------------------------------------------------------------

# TanStack Query

TanStack Query administra el estado de servidor de la aplicación.

La responsabilidad queda separada de Axios:

``` text
Axios
    ↓
Realiza la llamada HTTP

TanStack Query
    ↓
Administra el estado de la llamada y sus datos
```

## Queries

Las consultas de lectura utilizan `useQuery`.

Ejemplo:

``` jsx
const { data, isLoading, isError, error, refetch } = useHealth();
```

Las queries proporcionan, entre otros:

-   `data`
-   `isLoading`
-   `isFetching`
-   `isError`
-   `error`
-   `refetch`

## Mutations

Las operaciones que modifican información utilizan `useMutation`.

Ejemplo:

``` jsx
const sayHello = useMutation({
  mutationFn: (name) =>
    api.post("/example", {
      name,
    }),
});
```

Desde el componente:

``` jsx
sayHello.mutate(name);
```

La mutation proporciona, entre otros:

-   `data`
-   `isPending`
-   `isSuccess`
-   `isError`
-   `error`

------------------------------------------------------------------------

# Patrón de features

Cada funcionalidad debe mantenerse dentro de su propia feature.

Ejemplo:

``` text
features/
└── customers/
    ├── Customers.jsx
    └── hooks/
        └── useCustomers.js
```

La responsabilidad se divide así:

``` text
Componente
    ↓
Interfaz y eventos del usuario

Hook de feature
    ↓
Queries / mutations

useApi
    ↓
Comunicación HTTP

Axios
    ↓
Request HTTP

Backend
```

El componente no debe implementar directamente la lógica HTTP.

------------------------------------------------------------------------

# Formularios

Los formularios utilizan:

-   React Hook Form
-   Zod
-   `@hookform/resolvers`

La validación pertenece al schema de Zod.

Los mensajes de validación deben utilizar i18next.

Cuando cambia el idioma mientras existen errores de validación visibles,
los campos con error se vuelven a validar para actualizar los mensajes
al nuevo idioma.

------------------------------------------------------------------------

# Componentes reutilizables

Los componentes comunes se encuentran en:

``` text
src/components/
```

Actualmente se incluyen componentes como:

-   `Button`
-   `Card`
-   `Input`

Los componentes deben mantenerse genéricos y reutilizables.

La lógica específica de negocio debe permanecer dentro de las features.

------------------------------------------------------------------------

# Layout

La aplicación utiliza una estructura común:

``` text
MainLayout
├── Sidebar
├── Header
├── Outlet
└── Footer
```

El `Outlet` contiene la funcionalidad correspondiente a la ruta actual.

El footer utiliza la versión definida en `appConfig`, evitando duplicar
la versión de la aplicación.

------------------------------------------------------------------------

# Routing

Las rutas se manejan mediante React Router.

La ruta raíz corresponde al Dashboard:

``` text
/
```

Ejemplo:

``` text
/          → Dashboard
/example   → Example
```

El Dashboard no requiere una ruta `/dashboard`; la ruta `/` es su ruta
principal.

------------------------------------------------------------------------

# Ejemplo funcional

La feature `Example` funciona como referencia para implementar una
integración completa entre frontend y backend.

El flujo es:

``` text
Formulario
    ↓
React Hook Form
    ↓
Zod
    ↓
useExample
    ↓
useMutation
    ↓
useApi
    ↓
Axios
    ↓
API
    ↓
Lambda
```

El ejemplo recibe un nombre:

``` json
{
  "name": "Melina"
}
```

y el backend responde con un saludo.

Esta feature debe utilizarse como referencia para entender el patrón de
comunicación con las APIs.

------------------------------------------------------------------------

# Configuración

La configuración específica de la aplicación se centraliza mediante
`appConfig`.

La información que depende del ambiente no debe quedar hardcodeada en
los componentes.

Antes de ejecutar el proyecto, configurar las variables requeridas para
el ambiente correspondiente.

------------------------------------------------------------------------

# Desarrollo

Instalar dependencias:

``` bash
npm install
```

Ejecutar en desarrollo:

``` bash
npm run dev
```

La aplicación estará disponible en:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# Build

Generar el build de producción:

``` bash
npm run build
```

Previsualizar el build:

``` bash
npm run preview
```

------------------------------------------------------------------------

# Principios del proyecto

## 1. Separación de responsabilidades

Cada capa debe tener una responsabilidad clara.

``` text
UI
↓
Feature
↓
Query / Mutation
↓
API
↓
Backend
```

## 2. Evitar duplicación

La infraestructura común debe resolverse una sola vez y reutilizarse.

## 3. No sobre-abstraer

No agregar capas, helpers o patrones sin una necesidad real.

## 4. Server state ≠ UI state

Los datos provenientes del backend deben administrarse mediante TanStack
Query.

El estado propio de la interfaz debe permanecer en React cuando sea
necesario.

## 5. Traducciones

Los textos visibles de la aplicación deben utilizar i18next.

## 6. Autenticación

La aplicación no debe implementar lógica propia de renovación de tokens
mientras Cognito/OIDC sea responsable de esa función.

------------------------------------------------------------------------

# Estructura de una nueva feature

Para crear una nueva funcionalidad:

``` text
features/
└── nueva-feature/
    ├── NuevaFeature.jsx
    └── hooks/
        └── useNuevaFeature.js
```

Ejemplo de lectura:

``` jsx
const { data, isLoading, isError } = useNuevaFeature();
```

Ejemplo de modificación:

``` jsx
const { create } = useNuevaFeature();

create.mutate(data);
```

La feature debe encargarse de la presentación y composición de la
funcionalidad, mientras que la comunicación con el backend se realiza
mediante `useApi`.

------------------------------------------------------------------------

# Objetivo

Este proyecto es un **starter técnico**.

No debe convertirse en una aplicación de negocio ni acumular
funcionalidades específicas de un proyecto.

Su objetivo es proporcionar una base común, consistente y reutilizable
para las aplicaciones web de MIA Avanza Contigo.

A partir de esta base, cada proyecto debe incorporar únicamente la
lógica y funcionalidades propias de su dominio.
