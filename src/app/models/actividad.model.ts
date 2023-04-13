import { Deserializable } from './deserializable.model';

export class Actividad implements Deserializable {
    _id: object;
    nombre: string;
    descripcion: string;
    fecha_inicio: Date;
    fecha_fin: Date;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
