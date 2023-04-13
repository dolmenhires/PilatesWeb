import { Injectable } from '@angular/core';
import { Profesor } from '../models/profesor.model';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  getListProfesores = new Subject<Profesor[]>();
  public getListProfesores$ = this.getListProfesores.asObservable();

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  createProfesores(profesor: Profesor) {
    const self = this;
    const  headers = new  HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.http.post(this.utilsService.urlApi + 'profesores/detail/', profesor, {headers}).subscribe({
      next(created) {
        if (created) {
          self.getProfesores();
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

  getProfesores() {
    const self = this;
    this.http.get(this.utilsService.urlApi + 'profesores/list/').subscribe({
      next(profesores: Profesor[]) {
        if (profesores) {
          self.getListProfesores.next(profesores);
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
