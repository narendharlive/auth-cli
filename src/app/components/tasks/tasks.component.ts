import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { CommonService  } from '../../shared/service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
private RegisterTask: FormGroup;
  constructor(private fb: FormBuilder, private cs: CommonService) {
   this.createRegisterTask();
   cs.getTask().subscribe(result => { console.log(result)});
   }
  ngOnInit() {
  }

createRegisterTask(){
   this.RegisterTask = this.fb.group({
        task:['test', Validators.required ]
      });
};
onSubmit() {
  const taskData = this.RegisterTask.value;
  this.cs.postTask(taskData).subscribe(result => { console.log(result)});

}
}
