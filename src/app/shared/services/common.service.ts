import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Constants } from '../constants';

@Injectable()
export class CommonService {

  constructor(private http: Http, private ct: Constants) { }

public encodeURIComponent(obj): string{
  let arr = [];
    for (let i in obj) {
          arr.push(i + "=" + obj[i]);
      }
  console.log(arr.join('&'));
  return arr.join('&');
};


  createAuthorizationHeader(headers: Headers) {
      headers.append('Authorization', 'Basic ' + btoa('username:password'));
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
     login(data) {
        let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });
        return this.http.post(this.ct.apiUrl + 'login', this.encodeURIComponent(data), {headers: headers}).map((res:Response) => res.json());
      }

      register(data) {
        let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });
        return this.http.post(this.ct.apiUrl + 'register', this.encodeURIComponent(data), {headers: headers}).map((res:Response) => res.json());
      }

      postTask(data) {
        let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
         //let myHeaders      = new Headers({ 'Authorization': '6243db5b50c021d816af28b34812719a' });// ... Set content type to JSON
         let options       = new RequestOptions({ headers: headers });
        return this.http.post(this.ct.apiUrl + 'tasks', this.encodeURIComponent(data), options).map((res:Response) => res.json());
      }

       getTask() {
             // let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
               //let myHeaders      = new Headers({ 'Authorization': '6243db5b50c021d816af28b34812719a' });// ... Set content type to JSON
             //  let options       = new RequestOptions({ headers: headers });
              return this.http.get(this.ct.baseUrl).map((res:Response) => res.json());
            }

}
