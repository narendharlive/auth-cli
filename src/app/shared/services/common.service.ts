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
public headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  constructor(private http: Http, private ct: Constants) { }

     login(data) {
        return this.http.post(this.ct.apiUrl + 'login', data, {headers: this.headers}).map((res:Response) => res.json());
      }

      register(data) {
        return this.http.post(this.ct.baseUrl + 'register', data).map((res:Response) => res.json());
      }
      getUsers() {
        return this.http.get(this.ct.baseUrl + 'users').map((res:Response) => res.json());
      }

      postTask(data) {
        return this.http.post(this.ct.apiUrl + 'tasks', data, {headers: this.headers}).map((res:Response) => res.json());
      }

       getTask(data) {
              return this.http.get(this.ct.apiUrl + 'tasks').map((res:Response) => res.json());
            }

}
