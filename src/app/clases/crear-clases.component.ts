import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Profesor } from '../models/profesor.model';
import { Actividad } from '../models/actividad.model';
import { ActividadesService } from '../services/actividades.service';
import { ProfesoresService } from '../services/profesores.service';
import { Clase } from '../models/clase.model';
import { ClasesService } from '../services/clases.service';

@Component({
  selector: 'app-crear-clases',
  templateUrl: './crear-clases.component.html',
  styleUrls: ['./crear-clases.component.sass']
})
export class CrearClasesComponent implements OnInit {

  @ViewChild ('inpNombre', {static: true}) inpNombre: ElementRef;
  @ViewChild ('fechaIni', {static: true}) fechaIni;
  @ViewChild ('fechaFin', {static: true}) fechaFin;

  selectedDias: string[]

  dateIni: Date;
  dateFin: Date;
  timeIni: Date;
  timeFin: Date;

  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  invalidDates: Array<Date>

  actividades: Actividad[];
  selectedActividades: Actividad;

  profesores: Profesor[];
  selectedProfesor: Profesor;

  max_alumnos: number;
  max_alumnos_online: number;

  actionGetListActividades: Subscription = null;
  actionGetListProfesores: Subscription = null;

  lunes: boolean = false;
  martes: boolean = false;
  miercoles: boolean = false;
  jueves: boolean = false;
  viernes: boolean = false;
  sabado: boolean = false;
  domingo: boolean = false;
  online: boolean = false;
  
  constructor(
    private profesoresService: ProfesoresService,
    private actividadesService: ActividadesService,
    private clasesService: ClasesService
  ) { 
    this.actionGetListActividades = this.actividadesService.getListActividades$.subscribe(
      (actividades: Actividad[]) => {
        this.actividades = actividades;
      }
    )
    this.actionGetListProfesores = this.profesoresService.getListProfesores$.subscribe(
      (profesores: Profesor[]) => {
        this.profesores = profesores;
      }
    )
    this.actividadesService.getActividades();
    this.profesoresService.getProfesores() }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today,invalidDate];
    
  }

  handleClick() {
    let clase = null;
    if (this.lunes) {
      clase = this.crearClase();
      clase.lunes = this.lunes
      this.clasesService.createClases(clase)
    }

    if (this.martes) {
      clase = this.crearClase();
      clase.martes = this.martes
      this.clasesService.createClases(clase)
    }
    if (this.miercoles) {
      clase = this.crearClase();
      clase.miercoles = this.miercoles
      this.clasesService.createClases(clase)
    }
    if (this.jueves) {
      clase = this.crearClase();
      clase.jueves = this.jueves
      this.clasesService.createClases(clase)
    }
    if (this.viernes) {
      clase = this.crearClase();
      clase.viernes = this.viernes
      this.clasesService.createClases(clase)
    }
    if (this.sabado) {
      clase = this.crearClase();
      clase.sabado = this.sabado
      this.clasesService.createClases(clase)
    }
    if (this.domingo) {
      clase = this.crearClase();
      clase.domingo = this.domingo
      this.clasesService.createClases(clase)
    }

    
  }

  crearClase() {
    const clase = new Clase();
    clase.nombre = this.inpNombre.nativeElement.value;
    clase.fecha_inicio = this.fechaIni.value
    clase.fecha_fin = this.fechaFin.value;
    clase.id_profesor = this.selectedProfesor._id.toString();
    clase.id_actividad = this.selectedActividades._id.toString();
    clase.lunes = false;
    clase.martes = false;
    clase.miercoles = false;
    clase.jueves = false;
    clase.viernes = false;
    clase.sabado = false;
    clase.domingo = false;
    clase.hora_inicio = this.timeIni.toTimeString();
    clase.hora_fin = this.timeFin.toTimeString();
    clase.maximo_alumnos = this.max_alumnos;
    clase.online = this.online;
    if (this.online) {
      clase.maximo_alumnos_online = this.max_alumnos_online;
    } else {
      clase.maximo_alumnos_online = 0;
    }
    
    return clase;
  }

}
