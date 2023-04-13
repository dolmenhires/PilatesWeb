import { Deserializable } from './deserializable.model';
import { Profesor } from './profesor.model';
import { Actividad } from './actividad.model';

export class Clase implements Deserializable {
    _id: object;
    nombre: string;
    id_profesor: string;
    id_actividad: string;
    online: boolean;
    fecha_inicio: Date;
    fecha_fin: Date;
    lunes: boolean;
    martes: boolean;
    miercoles: boolean;
    jueves: boolean;
    viernes: boolean;
    sabado: boolean;
    domingo: boolean;
    hora_inicio: string;
    hora_fin: string;
    maximo_alumnos: number;
    maximo_alumnos_online: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}