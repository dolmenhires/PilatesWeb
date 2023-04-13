import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';
import { Alumno } from '../models/alumno.model';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { Clase } from '../models/clase.model';
import { ClasesService } from '../services/clases.service';
import { MatriculasService } from '../services/matriculas.service';
import { Matricula } from '../models/matricula.model';
import { ChipMatricula } from '../models/chipMatricula.model';
import { RefrescoService } from '../services/refresco.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.sass']
})
export class AlumnosComponent implements OnInit {

  @ViewChild('tblAlumnos', {static: false}) tblAlumnos: Table;
  @ViewChild('tblClases', {static: false}) tblClases;
  arrAlumnos: Alumno[];
  colsAlumno: any[];
  totalRecords: any;
  selectedAlumno: Alumno;
  diasMatricula: string = '2';
  selectedClases: Clase[];
  matriculado: string[];
  arrMatriculas: Matricula[];
  arrDelMatriculas: Matricula[];
  arrAlumnoMatricula: Matricula[];
  arrChipMatricula: ChipMatricula[];
  arrClases: Clase[];
  colsClase: any[];

  dateFin: Date;  

  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  invalidDates: Array<Date>


  actionGetListAlumnos: Subscription = null;
  actionGetListClases: Subscription = null;
  actionGetListMatriculas: Subscription = null;

  constructor(
    private alumnosService: AlumnosService,
    private clasesService: ClasesService,
    private matriculasService: MatriculasService,
    private refrescoService: RefrescoService
  ) {
    this.colsAlumno = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellidos', header: 'Apellidos' },
      { field: 'fecha_matricula_fin', header: 'Fin Matricula' },
    ];
    this.colsClase = [ {label: 'nombre'}];
  }
  
  ngOnInit() {
    const self = this;

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
    
    this.actionGetListAlumnos = this.alumnosService.getListAlumnos$.subscribe(
      (alumnos: Alumno[]) => {
        self.arrAlumnos = alumnos;
        this.totalRecords = this.arrAlumnos.length;
          if (this.totalRecords > 5) {
            this.tblAlumnos.paginator = true;
          } else {
            this.tblAlumnos.paginator = false;
          }
      }
    );
    this.alumnosService.getAlumnos();

    this.actionGetListClases = this.clasesService.getListClases$.subscribe(
      (clases: Clase[]) => {
        this.arrClases = clases;
      }
    )

    this.clasesService.getClases();

    this.actionGetListMatriculas = this.matriculasService.getListMatriculas$.subscribe(
      (matriculas: Matricula[]) => {
        this.arrMatriculas = matriculas;
      }
    )
    this.matriculasService.getMatriculas();
  }

  search(event) {
    this.tblAlumnos.filterGlobal(event.target.value, 'contains');
  }

  onRowSelectClase(event) {
    const numDias = Number(this.diasMatricula);
    if (this.arrAlumnoMatricula.length < numDias) {
      const matricula = new Matricula();
      matricula.id_alumno = this.selectedAlumno._id.toString();
      matricula.numero_clases = numDias;
      matricula.fecha_matricula = this.selectedAlumno.fecha_inicio;
      this.selectedAlumno.fecha_matricula_fin = this.dateFin;
      matricula.id_clase = event.data._id.toString();
      this.arrAlumnoMatricula.push(matricula);
      this.getDiasMatriculado(matricula, event.data);
    }
    
  }

  onRowUnSelectClase(event) {
    this.arrChipMatricula = this.arrChipMatricula.filter((chip)=> chip.matricula.id_clase !== event.data._id);
    this.matriculado = new Array<string>();
    this.arrChipMatricula.map(
      (chip) => {
        this.matriculado.push(chip.texto);
      }
    )
    this.arrAlumnoMatricula = this.arrAlumnoMatricula.filter((matricula) => matricula.id_clase !== event.data._id);
  }

  onRowSelectAlumno(event) {
    this.matriculado = new Array<string>();
    const alumno = event.data;
    this.dateFin = new Date(alumno.fecha_matricula_fin);
    this.arrChipMatricula = new Array<ChipMatricula>()
    if (this.arrMatriculas) {
      this.arrAlumnoMatricula = this.arrMatriculas.filter((matricula) => matricula.id_alumno === alumno._id);
      if (this.arrAlumnoMatricula) {
        this.selectedClases = new Array<Clase>();
        this.diasMatricula = String(this.arrAlumnoMatricula.length);
        this.arrAlumnoMatricula.map(
          (matricula) => {
            const fndClase = this.arrClases.find((clase) => clase._id.toString() === matricula.id_clase)
            this.selectedClases.push(fndClase); 
            this.getDiasMatriculado(matricula, fndClase);
          }
        );
      } else {
        this.arrAlumnoMatricula = new Array<Matricula>();        
      }
    } else {
      this.arrAlumnoMatricula = new Array<Matricula>();
    }

  }

  handleClick() {
    const numDias = Number(this.diasMatricula);
    if (this.arrAlumnoMatricula.length === numDias) {
      if (this.arrMatriculas) {
        this.arrDelMatriculas = this.arrMatriculas.filter((matricula) => matricula.id_alumno === this.selectedAlumno._id.toString());
        if (this.arrDelMatriculas) {
          this.arrDelMatriculas.map(
            (delMatricula) => {
              const fndMatricula = this.arrAlumnoMatricula.find((matricula) => matricula._id === delMatricula._id);
              if (!fndMatricula) {
                this.matriculasService.deleteMatriculas(delMatricula);
                this.arrMatriculas.splice(this.arrMatriculas.findIndex((matricula) => matricula._id === delMatricula._id));
              }
            }
          );
        }
      }
      this.arrAlumnoMatricula.map(
        (matricula) => {
          this.matriculasService.createMatriculas(matricula);
        }
      );
      if(this.selectedAlumno.fecha_matricula_fin !== this.dateFin) {
        this.selectedAlumno.fecha_matricula_fin = this.dateFin
        this.alumnosService.createAlumnos(this.selectedAlumno);
      }
      setTimeout(() => {
        this.refrescoService.getRefrescoCalendario.next();;
      }, 5000);
      
    }
  }

  getDiasMatriculado(matricula: Matricula, clase: Clase) {
    let strMatr = clase.nombre + ' ';
    if (clase.lunes) {
      strMatr = strMatr + 'Lunes '
    } else if (clase.martes) {
      strMatr = strMatr + 'Martes '
    } else if (clase.miercoles) {
      strMatr = strMatr + 'Miercoles '
    } else if (clase.jueves) {
      strMatr = strMatr + 'Jueves '
    } else if (clase.viernes) {
      strMatr = strMatr + 'Viernes '
    } else if (clase.sabado) {
      strMatr = strMatr + 'Sabado '
    } else if (clase.domingo) {
      strMatr = strMatr + 'Domingo '
    }
    strMatr = strMatr + clase.hora_inicio + clase.hora_fin
    this.matriculado.push(strMatr);
    const chipMat = new ChipMatricula();
    chipMat.matricula = matricula;
    chipMat.texto = strMatr;
    this.arrChipMatricula.push(chipMat);


  }

  removeChipClase(event) {
    const chipMat = this.arrChipMatricula.find((chip)=> chip.texto === event.value);
    event.data = chipMat.matricula.id_clase;
    this.selectedClases = this.selectedClases.filter((clase) => clase._id.toString() !== chipMat.matricula.id_clase);
    this.arrAlumnoMatricula = this.arrAlumnoMatricula.filter((matricula) => matricula.id_clase !== event.data);
  }

}
