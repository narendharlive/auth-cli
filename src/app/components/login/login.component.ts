import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../shared/service';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {isBrowser} from 'angular2-universal';
@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  public message;

  constructor(private fb: FormBuilder, private cs: CommonService, public router: Router) {
    this.createloginForm();
  }

  ngOnInit() {
  }

  createloginForm() {
    this.loginForm = this.fb.group({
      email: ['test12@gmail.com', Validators.required],
      password: ['12345', Validators.required]
    });
  };

  onSubmit(event) {
    event.preventDefault();

    this.cs.login(this.loginForm.value).subscribe(response => {
        this.message = response;
        // this.router.navigate(['home']);
        if (response && !response.error && response.id_token) {
          if (isBrowser) {
            localStorage.setItem('id_token', response.id_token);
          }
          setTimeout(() => {
            this.router.navigateByUrl('users');
          }, 1000);
        }
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );

  }
}
