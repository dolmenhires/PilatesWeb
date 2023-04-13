import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Profesor } from '../models/profesor.model';
import { ProfesoresService } from '../services/profesores.service';

@Component({
  selector: 'app-crear-profesores',
  templateUrl: './crear-profesores.component.html',
  styleUrls: ['./crear-profesores.component.sass']
})
export class CrearProfesoresComponent implements OnInit {

  @ViewChild ('inpNombre', {static: true}) inpNombre: ElementRef;
  @ViewChild ('inpApellidos', {static: true}) inpApellidos: ElementRef;
  @ViewChild ('inpEspecialidades', {static: true}) inpEspecialidades: ElementRef;
  
  constructor(
    private profesoresService: ProfesoresService
  ) { }

  ngOnInit() {
  }

  handleClick() {
    const profesor = new Profesor();
    profesor.nombre = this.inpNombre.nativeElement.value;
    profesor.apellidos = this.inpApellidos.nativeElement.value;
    profesor.especialidades  = this.inpEspecialidades.nativeElement.value;
    this.profesoresService.createProfesores(profesor);
  }

}
