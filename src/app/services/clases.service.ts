import { Injectable } from '@angular/core';
import { Clase } from '../models/clase.model';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  getListClases = new Subject<Clase[]>();
  public getListClases$ = this.getListClases.asObservable();

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  createClases(clase: Clase) {
    const self = this;
    const  headers = new  HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.http.post(this.utilsService.urlApi + 'clases/detail/', clase, {headers}).subscribe({
      next(created) {
        if (created) {
          self.getClases();
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

  getClases() {
    const self = this;
    this.http.get(this.utilsService.urlApi + 'clases/list/').subscribe({
      next(calses: Clase[]) {
        if (calses) {
          self.getListClases.next(calses);
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
