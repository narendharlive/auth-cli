import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../shared/service';
import {Router} from '@angular/router';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  private RegisterTask: FormGroup;
  public tasks;
  public message;
  public taskData;
  public editTaskStatus = false;

  constructor(private fb: FormBuilder, private cs: CommonService, private router: Router) {
    this.createRegisterTask();
  }

  ngOnInit() {
    /*this.cs.getTasks().subscribe(result => {
      this.tasks = result;
    });*/
  }

  getTasks(){
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
    const data = this.RegisterTask.value;
    this.cs.postTask(data).subscribe(result => {
      this.message = result;
      if (result && !result.error) {
        setTimeout(() => this.tasks.push(data), 1000);
      }
    });

  }

  editTask(id) {
    let tid = this.tasks[id].TID;
    this.taskData = this.tasks[id];
    this.editTaskStatus = true;
    // this.router.navigateByUrl('task/' + tid);
  }

  onSubmited(data){
    let list = ['ttitle', 'tdes', 'sts'];
    const xx = data;
    for (let i in list) {
      this.taskData[list[i]] = xx[list[i]];
    }
    this.editTaskStatus = false;
  }
  getMessage(data){
    this.message =  data;
  }

  deleteTask(id) {
    let tid = this.tasks[id].TID;
    this.cs.deleteTask(tid).subscribe(result => {
      this.message = result;
      if (result && !result.error) {
        setTimeout(() => this.tasks.splice(id, 1), 1000);
      }
    });
  };

}
