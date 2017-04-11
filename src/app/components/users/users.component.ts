import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {CommonService} from '../../shared/service';
import {isBrowser} from 'angular2-universal';

@Component({
  selector: 'users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  public users;
  public message;
  jwt: string;
  decodedJwt: string;
  response: string;
  jwtDate;
  jwtExpired;
  api: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private cs: CommonService, public router: Router, public authHttp: AuthHttp) {
    this.cs.getUsers().subscribe(result => {
      this.users = result;
    });
    if (isBrowser) {
      this.jwt = localStorage.getItem('id_token');
    }
    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt);
    this.jwtDate = this.jwtHelper.getTokenExpirationDate(this.jwt);
    this.jwtExpired = this.jwtHelper.isTokenExpired(this.jwt);
  }


  updateUser(id) {
    this.cs.updateUser(id).subscribe(result => {
      this.message = result;
    });
  }

  deleteUser(id) {
    let uid = this.users[id].UID;
    this.cs.deleteUser(uid).subscribe(result => {
      this.message = result;
      if (result && !result.error) {
        setTimeout(() => this.users.splice(id, 1), 1000);
      }
    });
  }

  ngOnInit() {
  }

}
