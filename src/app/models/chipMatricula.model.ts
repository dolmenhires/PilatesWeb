import { Deserializable } from './deserializable.model';
import { Matricula } from './matricula.model';

export class ChipMatricula implements Deserializable {
    texto: string;
    matricula: Matricula;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}