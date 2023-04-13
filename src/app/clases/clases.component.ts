import { Component, OnInit, ViewChild } from '@angular/core';
import { Clase } from '../models/clase.model';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ProfesoresService } from '../services/profesores.service';
import { ActividadesService } from '../services/actividades.service';
import { ClasesService } from '../services/clases.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.sass']
})
export class ClasesComponent implements OnInit {

  @ViewChild('tblClases', {static: false}) tblClases: Table;
  arrClases: Clase[];
  arrSelectClases: Clase[];
  colsClase: any[];
  totalRecordsClases: any;
  selectedClase: any;

  actionGetListClases: Subscription = null;
  
  constructor(
    private clasesService: ClasesService,
    private actividadesService: ActividadesService,
    private profesoresService: ProfesoresService
  ) {
    this.colsClase = [ {label: 'nombre'}];
  }

  ngOnInit() {
    this.actionGetListClases = this.clasesService.getListClases$.subscribe(
      (Clases: Clase[]) => {
        this.arrClases = Clases;
      }
    )

    this.clasesService.getClases();
  }

  search(event) {
    this.tblClases.filterGlobal(event.target.value, 'contains');
  }

}
