import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/service';
import { Router } from '@angular/router';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  private RegisterTask: FormGroup;
  public tasks;
  public message;

  constructor(private fb: FormBuilder, private cs: CommonService, private router: Router) {
    this.createRegisterTask();
  }

  ngOnInit() {
    this.cs.getTasks().subscribe(result => {
      this.tasks = result;
    });
  }

  createRegisterTask() {
    this.RegisterTask = this.fb.group({
      ttitle: ['', Validators.required],
      sts: ['', Validators.required],
      tcreatedBy: ['admin', Validators.required],
      tdes: ['', Validators.required]

  });
  };

  onSubmit() {
    const taskData = this.RegisterTask.value;
    this.cs.postTask(taskData).subscribe(result => {
      this.message = result;
    });

  }

  editTask(id){
    this.router.navigateByUrl('/task/' + id);
  }
  deleteTask(id) {
    this.cs.deleteTask(id).subscribe(result => {
      this.message = result;
    });
  };

}
