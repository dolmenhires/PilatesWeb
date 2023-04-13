import { Deserializable } from './deserializable.model';

export class Profesor implements Deserializable {
    _id: object;
    nombre: string;
    apellidos: string;
    especialidades: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
