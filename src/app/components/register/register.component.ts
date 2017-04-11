import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router'
import {CommonService} from '../../shared/service';
import {Http} from '@angular/http';
import {isBrowser} from 'angular2-universal';
@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  public message;

  constructor(private fb: FormBuilder, private cs: CommonService, private router: Router) {
    this.createRegisterForm();
  }

  ngOnInit() {
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['test', Validators.required],
      email: ['test12@gmail.com', Validators.required],
      password: ['12345', Validators.required]
    });
  };

  onSubmit(event) {
    event.preventDefault();
    this.cs.register(this.registerForm.value).subscribe(response => {
        this.message = response;
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
