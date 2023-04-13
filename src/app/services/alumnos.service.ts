import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Alumno } from '../models/alumno.model';
import { UtilsService } from './utils.service';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  getListAlumnos = new Subject<Alumno[]>();
  public getListAlumnos$ = this.getListAlumnos.asObservable();

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  createAlumnos(alumno: Alumno) {
    const self = this;
    const  headers = new  HttpHeaders().set('Access-Control-Allow-Origin', '*');
    let saveOrUpdate = this.utilsService.urlApi + 'alumnos/detail/';
    if (alumno._id) {
      saveOrUpdate = saveOrUpdate + alumno._id + '/';
    }
    this.http.post(saveOrUpdate, alumno, {headers}).subscribe({
      next(created) {
        if (created) {
          self.getAlumnos();
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

  getAlumnos() {
    const self = this;
    this.http.get(this.utilsService.urlApi + 'alumnos/list/').subscribe({
      next(alumnos: Alumno[]) {
        if (alumnos) {
          self.getListAlumnos.next(alumnos);
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
