import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ActividadesService } from '../services/actividades.service';
import { Subscription, from } from 'rxjs';
import * as moment from 'moment';
import { ClasesService } from '../services/clases.service';
import { Clase } from '../models/clase.model';
import { Actividad } from '../models/actividad.model';
import { Matricula } from '../models/matricula.model';
import { MatriculasService } from '../services/matriculas.service';
import { RefrescoService } from '../services/refresco.service';
import { AlumnosService } from '../services/alumnos.service';
import { Alumno } from '../models/alumno.model';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.sass']
})
export class PrincipalComponent implements OnInit {

    @ViewChild ('semanaCalendar', {static:false}) semanaCalendar;
    @ViewChild ('mesCalendar', {static:false}) mesCalendar;

    items: MenuItem[];
    display;
    alumnos: boolean;
    actividades : boolean;
    profesores: boolean;
    clases: boolean;
    mes: boolean;
    semana: boolean;
  
    header: any;
    eventsMes: any[];
    optionsMes: any;

    actionMatriculas: Subscription = null;
    actionClases: Subscription = null;
    actionAlumnos: Subscription = null;
    actionRefrescoCalendario: Subscription = null;

    arrMatriculas: Matricula[];
    arrAlumnos: Alumno[];

    constructor(
        private matriculasService: MatriculasService,
        private clasesService: ClasesService,
        private alumnosService: AlumnosService,
        private refrescoService: RefrescoService
    ) { }

    ngOnInit() {
        const self = this;
        this.display = true
        this.items = [{
            label: 'Personal',
            items: [
                {label: 'Alumnos', icon: 'pi pi-fw pi-user', command: () => { this.viewAlumnos()}},
                {label: 'Profesores', icon: 'pi pi-fw pi-user', command: () => { this.viewProfesores()}}
            ]
        },
        {
            label: 'Actividades',
            items: [
                {label: 'Cursos', icon: 'pi pi-fw pi-id-card', command: () => { this.viewActividades()}},
                {label: 'Clases', icon: 'pi pi-fw pi-comments', command: () => { this.viewClases()}}
            ]
        },{
            label: 'Calendario',
            items: [
                {label: 'Mensual', icon: 'pi pi-fw pi-id-card', command: () => { this.viewMes()}}
            ]
        }
        ];

        // let hoy = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDay().toString();
        this.optionsMes = {
            locale: 'es',
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            header: {
                locale: 'es',
                left: 'prev,next',
                center: 'title',
                dayNames: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            defaultView: 'dayGridMonth'
        }

        this.refreshCalendar();
        this.actionRefrescoCalendario = this.refrescoService.getRefrescoCalendario$.subscribe(
            () => {
                this.refreshCalendar();
            }
        );

    }

    viewAlumnos() {
        this.alumnos = true;
        this.actividades = false;
        this.profesores = false;
        this.mes = false;
        this.semana = false;
        this.clases = false;
    }

    viewActividades() {
        this.alumnos = false;
        this.actividades = true;
        this.profesores = false;
        this.mes = false;
        this.semana = false;
        this.clases = false;
    }

    viewProfesores() {
        this.alumnos = false;
        this.actividades = false;
        this.profesores = true;
        this.mes = false;
        this.semana = false;
        this.clases = false;
    }

    viewClases() {
        this.alumnos = false;
        this.actividades = false;
        this.profesores = false;
        this.mes = false;
        this.semana = false;
        this.clases = true;
    }

    viewMes() {
        this.alumnos = false;
        this.actividades = false;
        this.profesores = false;
        this.mes = true;
        this.semana = false;
        this.clases = false;
    }

    refreshCalendar() {
        const self = this;
        this.eventsMes= new Array<any>();
        this.actionAlumnos = this.alumnosService.getListAlumnos$.subscribe(
            (alumnos: Alumno[]) => {
                self.arrAlumnos = new Array<Alumno>();
                self.arrAlumnos = alumnos;
                self.actionAlumnos.unsubscribe();

                self.actionMatriculas = self.matriculasService.getListMatriculas$.subscribe(
                    (matriculas: Matricula[]) => {
                        self.arrMatriculas = new Array<Matricula>();
                        self.arrMatriculas = matriculas;
                        self.actionMatriculas.unsubscribe();

                        self.actionClases = self.clasesService.getListClases$.subscribe(
                            (clases: Clase[]) => {
                                if (clases) {
                                    clases.map(
                                        (clase: Clase) => {
                                            self.getEventosMensuales(clase);
                                        }
                                    )
                                }
                                self.actionClases.unsubscribe();
                            }
                        );      
                        self.clasesService.getClases();
                    }
                );
                self.matriculasService.getMatriculas();
            }
        );
        this.alumnosService.getAlumnos();
    }

    setEvento(clase, day_start_hour, day_end_hour) {
        let contAlumnosMatriculados = new Array<Alumno>();
        const matriculas = this.arrMatriculas.filter((matricula) => clase._id.toString() === matricula.id_clase);
        matriculas.map(
            (matricula)=> {
                const alumnoMatriculado = this.arrAlumnos.find((alumno) => alumno._id.toString() === matricula.id_alumno);
                if (alumnoMatriculado) {
                    if ((new Date(alumnoMatriculado.fecha_inicio) < day_start_hour) && (new Date(alumnoMatriculado.fecha_matricula_fin)) > day_end_hour) {
                        contAlumnosMatriculados.push(alumnoMatriculado);
                    }
                }
            }
        );
        const cont_matriculas = contAlumnosMatriculados.length;
        const max_matriculas = clase.maximo_alumnos;
        let color = '';
        if (cont_matriculas === max_matriculas) {
            color = '#AC3426'
        } else if (cont_matriculas === 0) {
            color = '#A8BF5B'
        } else if (cont_matriculas >= max_matriculas - 2) {
            color = '#BD883D'
        } else {
            color = '#5B81BF'
        }
        const auxActiv = {
            'title': clase.nombre, 'start': day_start_hour.toISOString(), 'end': day_end_hour.toISOString(), 'color': color, 'alumnos': contAlumnosMatriculados
        };
        this.eventsMes.push(auxActiv);
    }

    getEventosMensuales(clase: Clase) {
        let day_start = new Date(clase.fecha_inicio);
        //day_start.setDate(day_start.getDay() - 120);
        let day_end = new Date(clase.fecha_fin);
        //day_end.setDate(day_end.getDay() + 120);
        const end = moment(day_end);
        const start = moment(day_start);
        const diff = end.diff(start,'days');
        let day_start_hour = new Date(day_start);
        day_start_hour.setHours(Number(clase.hora_inicio.split(':')[0]));
        day_start_hour.setMinutes(Number(clase.hora_inicio.split(':')[1]));
        day_start_hour.setSeconds(Number(clase.hora_inicio.split(':')[2]));
        let day_end_hour = new Date(day_start);
        day_end_hour.setHours(Number(clase.hora_fin.split(':')[0]));
        day_end_hour.setMinutes(Number(clase.hora_fin.split(':')[1]));
        day_end_hour.setSeconds(Number(clase.hora_fin.split(':')[2]));
        for (let i=0; i < diff; i++) {
            switch(day_start_hour.getDay()) { 
                case 0: {
                    if (clase.domingo) {
                        this.setEvento(clase, day_start_hour, day_end_hour);
                    }
                    break;
                }
                case 1: {
                    if (clase.lunes) {    
                        this.setEvento(clase, day_start_hour, day_end_hour);
                    }
                    break;
                }
                case 2: {
                    if (clase.martes) {    
                        this.setEvento(clase, day_start_hour, day_end_hour);
                    }
                    break;
                }
                case 3: {
                    if (clase.miercoles) {    
                        this.setEvento(clase, day_start_hour, day_end_hour);
                    }
                    break;
                }
                case 4: {
                    if (clase.jueves) {    
                        this.setEvento(clase, day_start_hour, day_end_hour);
                    }
                    break;
                }
                case 5: {
                    if (clase.viernes) {    
                        this.setEvento(clase, day_start_hour, day_end_hour);
                    }
                    break;
                }
                case 6: {
                    if (clase.sabado) {    
                        this.setEvento(clase, day_start_hour, day_end_hour);
                    }
                    break;
                }
            }
            day_start_hour.setDate(day_start_hour.getDate() + 1);
            day_end_hour.setDate(day_end_hour.getDate() + 1);
        }
    }

}
