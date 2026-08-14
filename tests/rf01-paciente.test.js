import { describe, it, expect } from 'vitest';
import { validarPaciente } from '../js/logica.js';

describe('RF-01: Registro de Paciente', () => {
    describe('validarPaciente', () => {
        it('debería aceptar un paciente con datos válidos', () => {
            const error = validarPaciente({
                nombre: 'Juan Pérez',
                telefono: '9999-0000',
                correo: 'juan@correo.com'
            });
            expect(error).toBeNull();
        });

        it('debería aceptar un paciente sin correo (opcional)', () => {
            const error = validarPaciente({
                nombre: 'María López',
                telefono: '8888-1111',
                correo: ''
            });
            expect(error).toBeNull();
        });

        it('debería rechazar si el nombre está vacío', () => {
            const error = validarPaciente({
                nombre: '',
                telefono: '9999-0000',
                correo: ''
            });
            expect(error).toBe('Por favor ingresa tu nombre completo.');
        });

        it('debería rechazar si el nombre solo tiene espacios', () => {
            const error = validarPaciente({
                nombre: '   ',
                telefono: '9999-0000',
                correo: ''
            });
            expect(error).toBe('Por favor ingresa tu nombre completo.');
        });

        it('debería rechazar si el teléfono está vacío', () => {
            const error = validarPaciente({
                nombre: 'Juan Pérez',
                telefono: '',
                correo: ''
            });
            expect(error).toBe('Por favor ingresa tu número de teléfono.');
        });

        it('debería rechazar un correo con formato inválido', () => {
            const error = validarPaciente({
                nombre: 'Juan Pérez',
                telefono: '9999-0000',
                correo: 'correo-invalido'
            });
            expect(error).toBe('El correo electrónico no es válido.');
        });
    });
});