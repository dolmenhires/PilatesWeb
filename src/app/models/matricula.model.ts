import { Deserializable } from './deserializable.model';
import { Alumno } from './alumno.model';
import { Clase } from './clase.model';

export class Matricula implements Deserializable {
    _id: object;
    id_clase: string;
    id_alumno: string;
    numero_clases: number;
    fecha_matricula: Date;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}