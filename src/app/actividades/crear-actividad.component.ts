import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Actividad } from '../models/actividad.model';
import { ActividadesService } from '../services/actividades.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.sass']
})
export class CrearActividadComponent implements OnInit {
  
  @ViewChild ('inpNombre', {static: true}) inpNombre: ElementRef;
  @ViewChild ('inpDescripcion', {static: true}) inpDescripcion: ElementRef;
  @ViewChild ('fechaIni', {static: true}) fechaIni;
  @ViewChild ('fechaFin', {static: true}) fechaFin;

  dateIni: Date;
  dateFin: Date;  

  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  invalidDates: Array<Date>

  actionGetEditActividad: Subscription = null;
  editActividad: Actividad;

  constructor(
    private actividadesService: ActividadesService
  ) { }

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

    this.actionGetEditActividad = this.actividadesService.getEditActividad$.subscribe(
      (actividad) => {
        this.editActividad = actividad;
        this.inpNombre.nativeElement.value = actividad.nombre;
        this.inpDescripcion.nativeElement.value = actividad.descripcion;
        this.dateIni = new Date(actividad.fecha_inicio);
        this.dateFin = new Date(actividad.fecha_fin);
      }
    );
  }

  handleClick() {
    let actividad = new Actividad();
    if (this.editActividad) {
      actividad = this.editActividad;
    }
    actividad.nombre = this.inpNombre.nativeElement.value;
    actividad.descripcion = this.inpDescripcion.nativeElement.value;
    actividad.fecha_inicio = this.dateIni;
    actividad.fecha_fin = this.dateFin;
    this.actividadesService.createActividades(actividad);
  }

}
