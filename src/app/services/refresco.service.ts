import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefrescoService {

  getRefrescoCalendario = new Subject();
  public getRefrescoCalendario$ = this.getRefrescoCalendario.asObservable();

  constructor() { }
}
