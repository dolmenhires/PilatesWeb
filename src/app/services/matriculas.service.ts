import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { UtilsService } from './utils.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Matricula } from '../models/matricula.model';

@Injectable({
  providedIn: 'root'
})
export class MatriculasService {

  getListMatriculas = new Subject<Matricula[]>();
  public getListMatriculas$ = this.getListMatriculas.asObservable();

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  createMatriculas(matricula: Matricula) {
    const self = this;
    const  headers = new  HttpHeaders().set('Access-Control-Allow-Origin', '*');
    let saveOrUpdate = this.utilsService.urlApi + 'matriculas/detail/';
    if (matricula._id) {
      saveOrUpdate = saveOrUpdate + matricula._id + '/';
    }
    this.http.post(saveOrUpdate, matricula, {headers}).subscribe({
      next(created) {
        if (created) {
          self.getMatriculas();
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

  deleteMatriculas(matricula: Matricula) {
    const self = this;
    const  headers = new  HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.http.delete(this.utilsService.urlApi + 'matriculas/detail/' + matricula._id + '/', {headers}).subscribe({
      next(created) {
        if (created) {
          self.getMatriculas();
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

  getMatriculas() {
    const self = this;
    this.http.get(this.utilsService.urlApi + 'matriculas/list/').subscribe({
      next(Matriculas: Matricula[]) {
        if (Matriculas) {
          self.getListMatriculas.next(Matriculas);
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
