import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private loginData = new BehaviorSubject<any>({});
  login = this.loginData.asObservable();

  
  setLogin(login: any) {
    this.loginData.next(login);
  }

  constructor() { }
}
