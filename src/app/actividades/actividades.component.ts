import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActividadesService } from '../services/actividades.service';
import { Table } from 'primeng/table';
import { Actividad } from '../models/actividad.model';
import { Clase } from '../models/clase.model';
import { ClasesService } from '../services/clases.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.sass']
})
export class ActividadesComponent implements OnInit {

  @ViewChild('tblActividades', {static: false}) tblActividades: Table;
  arrActividades: Actividad[];
  colsActividad: any[];
  totalRecordsActividad: any;
  totalRecordsActividades: any
  selectedActividad: Actividad;

  @ViewChild('tblClases', {static: false}) tblClases: Table;
  arrClases: Clase[];
  arrSelectClases: Clase[];
  colsClase: any[];
  totalRecordsClase: any;
  selectedClase: any;

  actionGetListActividades: Subscription = null;
  actionGetListClases: Subscription = null;

  index: number = 0;

  constructor(
    private actividadesService: ActividadesService,
    private clasesService: ClasesService
  ) {
    this.colsActividad = [ {label: 'nombre'}];
    this.colsClase = [ {label: 'nombre'}];
  }
  
  ngOnInit() {
    const self = this;

    this.actionGetListClases = this.clasesService.getListClases$.subscribe(
      (clases: Clase[]) => {
        this.arrClases = clases;
      }
    )

    this.actionGetListActividades = this.actividadesService.getListActividades.subscribe(
      (actividades: Actividad[]) => {
        self.arrActividades = actividades;
        this.totalRecordsActividades = this.arrActividades.length;
          if (this.totalRecordsActividades > 5) {
            this.tblActividades.paginator = true;
          } else {
            this.tblActividades.paginator = false;
          }
      }
    )
    this.clasesService.getClases();
    this.actividadesService.getActividades();
    
  }

  search(event) {
    this.tblActividades.filterGlobal(event.target.value, 'contains');
  }

  onSelectActividad() {
    this.arrSelectClases = this.arrClases.filter((clase) => this.selectedActividad._id.toString() === clase.id_actividad);
  }

  handleClick(rowData) {
    this.index = 1;
    this.actividadesService.getEditActividad.next(rowData);
  }


}
