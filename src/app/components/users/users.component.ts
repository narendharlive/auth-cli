import { Component, OnInit } from '@angular/core';
import { CommonService  } from '../../shared/service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
public users;
  constructor(private cs: CommonService) {
    this.cs.getUsers().subscribe(result => { this.users = result;});
  }
  /*getUsers(){
    this.cs.getUsers().subscribe(result => { this.users = result;});
  }*/
  ngOnInit() {
  }

}
