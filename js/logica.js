// ===== Módulo de lógica de negocio (pura, sin dependencia del DOM) =====

// ===== Datos de especialidades y médicos =====
export const especialidades = [
    { id: 'general', nombre: 'Medicina General', medicos: ['Dr. Carlos Ramírez', 'Dra. Ana Torres'] },
    { id: 'cardiologia', nombre: 'Cardiología', medicos: ['Dr. Luis Mendoza', 'Dra. María López'] },
    { id: 'pediatria', nombre: 'Pediatría', medicos: ['Dra. Sofía Herrera', 'Dr. Jorge Castillo'] },
    { id: 'dermatologia', nombre: 'Dermatología', medicos: ['Dra. Elena Vargas', 'Dr. Pedro Salas'] },
    { id: 'ginecologia', nombre: 'Ginecología', medicos: ['Dra. Rosa Jiménez', 'Dr. Andrés Molina'] }
];

// Horario de atención: 8:00 a 17:00 (cada hora)
export const horasDisponibles = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
];

// ===== Almacenamiento (LocalStorage) =====
export const STORAGE_KEY = 'citasMedicas';

export function obtenerCitas(storage = localStorage) {
    const data = storage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function guardarCitas(citas, storage = localStorage) {
    storage.setItem(STORAGE_KEY, JSON.stringify(citas));
}

// ===== Validación de paciente (RF-01) =====
// TODO: Implementar en fase GREEN