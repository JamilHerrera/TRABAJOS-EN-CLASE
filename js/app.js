// ===== Importar lógica de negocio =====
import {
    especialidades,
    horasDisponibles,
    obtenerCitas,
    guardarCitas,
    validarPaciente
} from './logica.js';

// ===== Referencias al DOM =====
const form = document.getElementById('citaForm');
const selectEspecialidad = document.getElementById('especialidad');
const selectMedico = document.getElementById('medico');
const selectHora = document.getElementById('hora');
const inputFecha = document.getElementById('fecha');
const mensajeDiv = document.getElementById('mensaje');
const citasContainer = document.getElementById('citasContainer');

// ===== Inicialización =====
function init() {
    cargarEspecialidades();
    cargarHoras();
    configurarFechaMinima();
    renderizarCitas();
}

function cargarEspecialidades() {
    especialidades.forEach(esp => {
        const option = document.createElement('option');
        option.value = esp.id;
        option.textContent = esp.nombre;
        selectEspecialidad.appendChild(option);
    });
}

function cargarHoras() {
    horasDisponibles.forEach(hora => {
        const option = document.createElement('option');
        option.value = hora;
        option.textContent = hora;
        selectHora.appendChild(option);
    });
}

function configurarFechaMinima() {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    inputFecha.min = `${anio}-${mes}-${dia}`;
}

// ===== Manejo de especialidad -> médicos =====
selectEspecialidad.addEventListener('change', () => {
    const espId = selectEspecialidad.value;
    selectMedico.innerHTML = '<option value="">-- Selecciona un médico --</option>';
    selectMedico.disabled = !espId;

    if (espId) {
        const esp = especialidades.find(e => e.id === espId);
        esp.medicos.forEach(med => {
            const option = document.createElement('option');
            option.value = med;
            option.textContent = med;
            selectMedico.appendChild(option);
        });
    }
});

// ===== Mostrar mensajes =====
function mostrarMensaje(texto, tipo) {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo}`;
    setTimeout(() => {
        mensajeDiv.textContent = '';
        mensajeDiv.className = 'mensaje';
    }, 4000);
}

// ===== Validación =====
function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const espId = selectEspecialidad.value;
    const medico = selectMedico.value;
    const fecha = inputFecha.value;
    const hora = selectHora.value;

    const errorPaciente = validarPaciente({ nombre, telefono, correo });
    if (errorPaciente) return errorPaciente;
    if (!espId) return 'Por favor selecciona una especialidad.';
    if (!medico) return 'Por favor selecciona un médico.';
    if (!fecha) return 'Por favor selecciona una fecha.';
    if (!hora) return 'Por favor selecciona una hora.';

    // Validar que la fecha no sea anterior a hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaSel = new Date(fecha + 'T00:00:00');
    if (fechaSel < hoy) return 'La fecha no puede ser anterior a hoy.';

    // Validar cita duplicada (mismo médico, fecha y hora)
    const citas = obtenerCitas();
    const duplicada = citas.some(c =>
        c.medico === medico && c.fecha === fecha && c.hora === hora
    );
    if (duplicada) return 'Ese médico ya tiene una cita ocupada en esa fecha y hora.';

    return null;
}

// ===== Agendar cita =====
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const error = validarFormulario();
    if (error) {
        mostrarMensaje(error, 'error');
        return;
    }

    const cita = {
        id: Date.now(),
        nombre: document.getElementById('nombre').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        correo: document.getElementById('correo').value.trim(),
        especialidad: selectEspecialidad.options[selectEspecialidad.selectedIndex].text,
        medico: selectMedico.value,
        fecha: inputFecha.value,
        hora: selectHora.value,
        estado: 'Agendada'
    };

    const citas = obtenerCitas();
    citas.push(cita);
    guardarCitas(citas);

    mostrarMensaje('✅ ¡Tu cita fue agendada exitosamente!', 'success');
    form.reset();
    selectMedico.innerHTML = '<option value="">-- Primero elige especialidad --</option>';
    selectMedico.disabled = true;
    renderizarCitas();
});

// ===== Renderizar citas =====
function renderizarCitas() {
    const citas = obtenerCitas();
    citasContainer.innerHTML = '';

    if (citas.length === 0) {
        citasContainer.innerHTML = '<p class="empty-state">Aún no tienes citas agendadas.</p>';
        return;
    }

    // Ordenar por fecha y hora
    citas.sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));

    const lista = document.createElement('div');
    lista.className = 'citas-list';

    citas.forEach(cita => {
        const item = document.createElement('div');
        item.className = 'cita-item';

        const info = document.createElement('div');
        info.className = 'cita-info';
        info.innerHTML = `
            <h3>${cita.nombre}</h3>
            <p>${cita.especialidad} · ${cita.medico}</p>
            <p>📅 ${formatearFecha(cita.fecha)} · 🕐 ${cita.hora}</p>
            <span class="cita-badge">${cita.estado}</span>
        `;

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn btn-danger';
        btnEliminar.textContent = 'Cancelar';
        btnEliminar.addEventListener('click', () => cancelarCita(cita.id));

        item.appendChild(info);
        item.appendChild(btnEliminar);
        lista.appendChild(item);
    });

    citasContainer.appendChild(lista);
}

function formatearFecha(fecha) {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
}

// ===== Cancelar cita =====
function cancelarCita(id) {
    if (!confirm('¿Estás seguro de que deseas cancelar esta cita?')) return;

    let citas = obtenerCitas();
    citas = citas.filter(c => c.id !== id);
    guardarCitas(citas);

    mostrarMensaje('🗑️ La cita fue cancelada.', 'success');
    renderizarCitas();
}

// ===== Iniciar aplicación =====
document.addEventListener('DOMContentLoaded', init);