import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { UtilsService } from './utils.service';
import { Actividad } from '../models/actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  getListActividades = new Subject<Actividad[]>();
  public getListActividades$ = this.getListActividades.asObservable();

  getEditActividad = new Subject<Actividad>();
  public getEditActividad$ = this.getEditActividad.asObservable();

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  createActividades(actividad: Actividad) {
    const self = this;
    const  headers = new  HttpHeaders().set('Access-Control-Allow-Origin', '*');
    let saveOrUpdate = this.utilsService.urlApi + 'actividades/detail/';
    if (actividad._id) {
      saveOrUpdate = saveOrUpdate + actividad._id + '/';
    }
    this.http.post(saveOrUpdate, actividad, {headers}).subscribe({
      next(created) {
        if (created) {
          self.getActividades();
        }
      },
      error(error) {
        self.handleError(error);
      },
      complete() {
        this.unsubscribe();
      }
    });

  }

  getActividades() {
    const self = this;
    this.http.get(this.utilsService.urlApi + 'actividades/list/').subscribe({
      next(actividades: Actividad[]) {
        if (actividades) {
          self.getListActividades.next(actividades);
        }
      },
      error(error) {
        self.handleError(error);
      },
      complete() {
        this.unsubscribe();
      }
    });

  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      error.error;
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
  
}
