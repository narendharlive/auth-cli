import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {of}         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Constants} from '../constants';

@Injectable()
export class CommonService {
  public headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http: Http, private ct: Constants) {
  }

  login(data) {
    return this.http.post(this.ct.baseUrl + 'login', data, {headers: this.headers}).map((res: Response) => res.json());
  }

  register(data) {
    return this.http.post(this.ct.baseUrl + 'register', data).map((res: Response) => res.json());
  }

  getUsers() {
    return this.http.get(this.ct.baseUrl + 'users').map((res: Response) => res.json());
  }

  updateUser(id) {
    return this.http.put(this.ct.baseUrl + 'users/' + id, {'name': 'myTest'}).map((res: Response) => res.json());
  }

  deleteUser(id) {
    return this.http.delete(this.ct.baseUrl + 'users/' + id).map((res: Response) => res.json());
  }

  postTask(data) {
    return this.http.post(this.ct.baseUrl + 'tasks', data).map((res: Response) => res.json());
  }

  getTasks() {
    return this.http.get(this.ct.baseUrl + 'tasks').map((res: Response) => res.json());
  }

  getTask(tid) {
    return this.http.get(this.ct.baseUrl + 'task/' + tid).map((res: Response) => res.json());
  }

  updateTask(tid, data) {
    return this.http.post(this.ct.baseUrl + 'task/' + tid, data).map((res: Response) => res.json());
  }

  deleteTask(tid) {
    return this.http.delete(this.ct.baseUrl + 'task/' + tid).map((res: Response) => res.json());
  }

}
