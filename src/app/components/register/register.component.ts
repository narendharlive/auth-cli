import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { CommonService  } from '../../shared/service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
private registerForm: FormGroup;
public RegisterMsg: string;
  constructor(private fb: FormBuilder, private cs: CommonService ) {
   this.createRegisterForm();
   }

  ngOnInit() {
  }

createRegisterForm(){
   this.registerForm = this.fb.group({
        name: ['test', Validators.required ],
        email:['test12@gmail.com', Validators.required ],
        password:['12345', Validators.required ]
      });
};
onSubmit() {
  const registerData = this.registerForm.value;
  // console.log(registerData);
  this.cs.register(registerData).subscribe(result => { this.RegisterMsg = result;});
}
}
