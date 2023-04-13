import { Deserializable } from './deserializable.model';

export class Alumno implements Deserializable {
    _id: object;
    nombre: string;
    apellidos: string;
    fecha_nacimiento: Date;
    direccion: string;
    cp: string;
    localidad: string;
    provincia: string;
    telefono: string;
    movil: string;
    mail: string;
    forma_pago: string
    fecha_inicio: Date;
    fecha_matricula_fin: Date;
    pago_matricula: boolean;
    cantidad: number;
    estudio_postural: boolean;
    dolencias_patologias: string;
    yoga: boolean;
    pilates: boolean;
    hipopresivos: boolean;
    yoga_infantil: boolean;
    pilates_infantil: boolean;
    mamas_bebes: boolean;
    charlas_educa: boolean;
    charlas_bebes: boolean;
    taller_meditacion: boolean;
    mindfulness: boolean;
    proteccion_datos: boolean;
    archivo_firmado: File;
    otros: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
