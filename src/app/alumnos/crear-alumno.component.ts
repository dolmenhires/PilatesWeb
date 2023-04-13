import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Alumno } from '../models/alumno.model';
import { AlumnosService } from '../services/alumnos.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.sass']
})
export class CrearAlumnoComponent implements OnInit {

  @ViewChild ('inpNombre', {static: true}) inpNombre: ElementRef;
  @ViewChild ('inpApellidos', {static: true}) inpApellidos: ElementRef;
  @ViewChild ('inpDireccion', {static: true}) inpDireccion: ElementRef;
  @ViewChild ('inpCp', {static: true}) inpCp: ElementRef;
  @ViewChild ('inpLocal', {static: true}) inpLocal: ElementRef;
  @ViewChild ('inpProv', {static: true}) inpProv: ElementRef;
  @ViewChild ('inpTelefono', {static: true}) inpTelefono: ElementRef;
  @ViewChild ('inpMovil', {static: true}) inpMovil: ElementRef;
  @ViewChild ('inpMail', {static: true}) inpMail: ElementRef;
  @ViewChild ('inpDolencias', {static: true}) inpDolencias: ElementRef;
  @ViewChild ('inpOtros', {static: true}) inpOtros: ElementRef;

  date: Date;
  dateIni: Date;
    
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  invalidDates: Array<Date>

  pago: any;
  selectedPago: any;
  
  constructor(private alumnosService: AlumnosService) { }

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

    this.pago = [
      {nombre: 'Metálico', code: 'metalico'},
      {name: 'Tarjeta', code: 'tarjeta'}
  ];
  }

  handleClick() {
    const alumno = new Alumno();
    alumno.nombre = this.inpNombre.nativeElement.value;
    alumno.apellidos = this.inpApellidos.nativeElement.value;
    alumno.direccion  = this.inpDireccion.nativeElement.value;
    alumno.cp  = this.inpCp.nativeElement.value;
    alumno.localidad  = this.inpLocal.nativeElement.value;
    alumno.provincia  = this.inpProv.nativeElement.value;
    alumno.telefono  = this.inpTelefono.nativeElement.value;
    alumno.movil  = this.inpMovil.nativeElement.value;
    alumno.mail  = this.inpMail.nativeElement.value;
    alumno.fecha_inicio = this.dateIni;
    alumno.forma_pago = this.selectedPago;
    alumno.fecha_nacimiento = this.date;

    this.alumnosService.createAlumnos(alumno);
  }

}
