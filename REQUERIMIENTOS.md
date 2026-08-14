# 📋 Requerimientos — Aplicación Web de Agendamiento de Citas Médicas

## 1. Descripción General
Aplicación web (HTML, CSS y JavaScript) que permite a los pacientes agendar, consultar y gestionar citas médicas de forma sencilla e intuitiva. La aplicación funciona 100% en el navegador (sin backend), almacenando los datos localmente.

---

## 2. Objetivos
- Permitir el registro de pacientes.
- Permitir agendar citas médicas seleccionando especialidad, médico, fecha y hora.
- Mostrar un listado de citas agendadas.
- Permitir cancelar o eliminar citas.
- Validar que no existan citas duplicadas (mismo médico, fecha y hora).
- Guardar la información de forma persistente en el navegador (LocalStorage).

---

## 3. Requerimientos Funcionales

### RF-01: Registro de Paciente
- El paciente debe ingresar su nombre completo.
- El paciente debe ingresar su número de teléfono.
- El paciente debe ingresar su correo electrónico (opcional).
- Validación de campos obligatorios.

### RF-02: Selección de Especialidad y Médico
- El sistema debe ofrecer una lista de especialidades médicas (Medicina General, Cardiología, Pediatría, Dermatología, etc.).
- Al seleccionar una especialidad, se deben mostrar los médicos disponibles de esa especialidad.

### RF-03: Selección de Fecha y Hora
- El paciente debe poder elegir una fecha (no puede ser anterior a hoy).
- El paciente debe poder elegir una hora dentro de un horario de atención (ej. 8:00 a 17:00).
- Validación de que la fecha/hora no esté ocupada por otro paciente con el mismo médico.

### RF-04: Agendar Cita
- Botón para confirmar el agendamiento.
- Al agendar, se muestra un mensaje de confirmación.
- La cita se guarda en el listado de citas.

### RF-05: Listado de Citas
- Mostrar todas las citas agendadas en una tabla o tarjetas.
- Cada cita muestra: paciente, especialidad, médico, fecha, hora y estado.
- Ordenar las citas por fecha y hora.

### RF-06: Cancelar / Eliminar Cita
- El paciente puede cancelar una cita.
- Al cancelar, se solicita confirmación.
- La cita se elimina del listado.

### RF-07: Persistencia de Datos
- Las citas y pacientes se guardan en el `localStorage` del navegador.
- Al recargar la página, los datos se mantienen.

---

## 4. Requerimientos No Funcionales

### RNF-01: Usabilidad
- Interfaz limpia, moderna y responsive (adaptable a móvil y escritorio).
- Mensajes claros de éxito y error.

### RNF-02: Validación
- Validación de formularios en el lado del cliente.
- Prevención de citas duplicadas.

### RNF-03: Compatibilidad
- Compatible con navegadores modernos (Chrome, Edge, Firefox, Safari).

### RNF-04: Rendimiento
- Carga rápida, sin dependencias externas pesadas.

---

## 5. Estructura de Carpetas
```
citas-medicas/
├── REQUERIMIENTOS.md      # Este documento
├── index.html             # Página principal
├── css/
│   └── style.css          # Estilos de la aplicación
└── js/
    └── app.js             # Lógica de la aplicación
```

---

## 6. Tecnologías
- **HTML5**: Estructura de la página.
- **CSS3**: Estilos y diseño responsive.
- **JavaScript (Vanilla)**: Lógica de agendamiento y persistencia.
- **LocalStorage**: Almacenamiento local de datos.

---

## 7. Criterios de Aceptación
- [ ] El usuario puede registrar sus datos personales.
- [ ] El usuario puede seleccionar especialidad y médico.
- [ ] El usuario puede elegir fecha y hora válidas.
- [ ] El sistema impide agendar una cita duplicada.
- [ ] Las citas se muestran en un listado ordenado.
- [ ] El usuario puede cancelar citas con confirmación.
- [ ] Los datos persisten al recargar la página.
- [ ] La interfaz es responsive y usable en móvil y escritorio.