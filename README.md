# Intérprete

Este proyecto se generó con [Angular CLI](https://github.com/angular/angular-cli) versión 13.0.2.

## **Contenido**

- [Ejecucion](#ejecucion)
- [Dependencias](#dependencias)
  - [Angular Material](#angularMaterial)
  - [Bootstrap](#bootstrap)
  - [CodeMirror](#codeMirror)
  - [ECharts](#eCharts)
  - [Jison](#jison)
  - [Angular-cli-ghpages](#ghpages)
- [Despliegue](#despliegue)

## Ejecucion<a name="ejecucion"></a>

Es necesario instalar las dependencias utilizadas luego de ser descargado el proyecto, ejecutando el siguiente comando en la terminal

```
npm install
```

Para ejecutar el proyecto se debe ejecutar el siguiente comando

```
ng serve
```

## Dependencias<a name="dependencias"></a>

Dependencias utilizadas en la creación del intérprete

### Angular Material v13.0.1<a name="angularMaterial"></a>

Módulo de diseño material para componentes de angular, el cual se instaló a través del siguiente comando

```
ng add @angular/material
```

### Bootstrap v5.1.3<a name="bootstrap"></a>

Módulo de diseño, el cual se instaló a través del siguiente comando

```
npm install bootstrap
```

Luego de la instalación se agregaron las siguientes líneas en las áreas de **_styles_** y **_scripts_** en el archivo [**_angular.json_**](./angular.json)

```json
...,
"styles": [
  ...,
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
  ...,
  "node_modules/bootstrap/dist/js/bootstrap.min.js"
],
...
```

### CodeMirror v5.63.3<a name="codeMirror"></a>

Módulo de diseño el cual permite agregar un editor de texto o código, el cual se instaló a través del siguiente comando

```
npm install @ctrl/ngx-codemirror codemirror
```

Luego de la instalación se agregó las siguiente sección **_allowedCommonJsDependencies_** en el archivo [**_angular.json_**](./angular.json)

```json
...,
"allowedCommonJsDependencies": [
  "@ctrl/ngx-codemirror"
],
...
```

### ECharts v5.2.2<a name="eCharts"></a>

Módulo de diseño el cual permite agregar gráficas, el cual permitió crear el AST, se instaló a través de los siguientes comandos

```
npm install echarts
npm install ngx-echarts
```

Luego de la instalación se agregaron las siguientes líneas en las áreas de **_scripts_** en el archivo [**_angular.json_**](./angular.json)

```json
...,
"scripts": [
  ...,
  "node_modules/echarts/dist/echarts.min.js"
],
...
```

### Jison v0.4.18<a name="jison"></a>

Módulo el cual permite crear el parser para el intérprete, para esto se necesitó instalar de manera global en el equipo

```
npm install -g jison
```

Para compilar la gramática es necesario abrir la terminal donde se encuentre el archivo con extensión **_.jison_** y ejecutar el siguiente comando

```
jison nombre.jison
```

Para poder utilizar nuestra gramática es necesario agregar las siguiente línea en el archivo [**_tsconfig.json_**](./tsconfig.json)

```json
...,
"compilerOptions": {
  ...,
  "noImplicitAny": false
},
...
```

El cual permite importar nuestra gramática de la siguiente manera

```ts
import { parser as Parser } from "src/app/utils/gramatica/gramatica.js";
```

### Angular-cli-ghpages v1.0.0<a name="ghpages"></a>

Módulo el cual permite desplegar el proyecto en github pages, para esto se necesitó instalar de manera global en el equipo

```
ng add angular-cli-ghpages
```

## Despliegue<a name="despliegue"></a>

Para realizar el despliegue en github pages solo se debe ejecutar el siguiente comando

```
ng deploy --base-href "https://USERNAME.github.io/REPOSITORY_NAME/"
```
