import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../shared/service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  public users;
  public message;

  constructor(private cs: CommonService) {
    this.cs.getUsers().subscribe(result => {
      this.users = result;
    });
  }

  /*getUsers(){
   this.cs.getUsers().subscribe(result => { this.users = result;});
   }*/

  updateUser(id) {
    this.cs.updateUser(id).subscribe(result => {
      this.message = result;
    });
  }

  deleteUser(id) {
    this.cs.deleteUser(id).subscribe(result => {
      this.message = result;
    });
  }

  ngOnInit() {
  }

}
