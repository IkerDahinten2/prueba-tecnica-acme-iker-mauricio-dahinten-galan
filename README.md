# Sistema de Gestión de Empleados - ACME

Aplicación de consola interactiva desarrollada con **Node.js** puro bajo el paradigma de **Programación Orientada a Objetos (POO)** y **Arquitectura en Capas**, diseñada para la gestión integral de empleados en memoria.

##  Características Principales

* **Cero dependencias externas:** Construido exclusivamente con módulos nativos de Node.js (`node:readline/promises`, `node:crypto`).
* **ECMAScript Modules (ESM):** Sintaxis moderna de JavaScript (`import` / `export`).
* **Arquitectura en Capas:** Separación clara de responsabilidades (Modelos, Repositorio, Servicios y Presentación).
* **Almacenamiento en Memoria:** Gestión eficiente de datos utilizando arreglos y encapsulamiento privado.

##  Arquitectura del Proyecto

```text
├── models/
│   └── Employee.js             # Entidad de dominio y generación de ID único
├── repositories/
│   └── EmployeeRepository.js   # Capa de acceso y manipulación de datos en memoria
├── services/
│   └── EmployeeService.js      # Lógica de negocio y validación de reglas
├── index.js                    # Interfaz de consola y menú interactivo
└── package.json                # Configuración del proyecto
```

##  Requerimientos y Reglas de Negocio

### Funcionalidades
* **RF-01:** Registro de empleados con generación automática de UUID.
* **RF-02:** Listado general de empleados registrados.
* **RF-03:** Búsqueda de empleado por número de identificación.
* **RF-04:** Actualización de datos de un empleado mediante su ID único.
* **RF-05:** Eliminación de registro mediante ID único.

### Validaciones Implementadas
* **RN-01:** Nombres y apellidos obligatorios (no vacíos).
* **RN-02:** Género restringido a valores `"F"`, `"M"` u `"O"`.
* **RN-03:** Datos de contacto obligatorios (email, teléfono, dirección y ciudad).
* **RN-04:** Profesión y cargo obligatorios.
* **RN-05:** El salario debe ser un valor numérico superior a `0`.

##  Requisitos y Ejecución

1. Asegúrate de tener **Node.js** (v18 o superior) instalado.
2. Clona el repositorio y navega a la carpeta del proyecto.
3. Ejecuta la aplicación:

```bash
node index.js
```