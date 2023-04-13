import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Profesor } from '../models/profesor.model';
import { ProfesoresService } from '../services/profesores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.sass']
})
export class ProfesoresComponent implements OnInit {

  @ViewChild('tblProfesores', {static: false}) tblProfesores: Table;
  @ViewChild('tblClases', {static: false}) tblClases;
  arrProfesores: Profesor[];
  colsProfesor: any[];
  totalRecords: any;
  selectedProfesor: Profesor;

  actionGetListAlumnos: Subscription = null;
  
  constructor(
    private profesoresService: ProfesoresService
  ) { }

  ngOnInit() {
    this.colsProfesor = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellidos', header: 'Apellidos' }
    ];
    
    this.actionGetListAlumnos = this.profesoresService.getListProfesores$.subscribe(
      (profesores: Profesor[]) => {
        this.arrProfesores = new Array<Profesor>();
        this.arrProfesores = profesores;
      }
    )

    this.profesoresService.getProfesores();
  }

}
