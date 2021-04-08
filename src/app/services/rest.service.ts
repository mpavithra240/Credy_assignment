import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { DataSharingService } from './data-sharing.service';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  user = JSON.parse(sessionStorage.getItem("user"));
  RestUrl = environment.restUrl;
  subscription: Subscription;
  urlparams = '';
  logindata;
  acessToken;
  constructor(private http: HttpClient, private data: DataSharingService) {
    

  }
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  loginPost(input) {
    return this.http.post(input.url, input.params)
  }
  
  get(url) {
    this.subscribe();    
    console.log(this.httpOptions);
    
    return this.http.get(url, this.httpOptions)
  }


  subscribe(){
    this.subscription = this.data.login.subscribe((res:any) => {
      console.log(res, res.token);
      
      this.acessToken = res.token;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Token '+ res.token,
        }),
      }
    });
  }

}
