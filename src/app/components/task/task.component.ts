import {Router, ActivatedRoute, Params} from '@angular/router';
import {OnInit,  Component} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../shared/service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private cs: CommonService, private router: Router) {
  }

  public tid: number;
  public taskData;
  public editTaskStatus = false;
  public message;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.tid = +params['id'];
    });
    this.cs.getTask(this.tid).subscribe(result => {
      this.taskData = result[0];
    });

  }

  editTask() {
    this.editTaskStatus = true;
  };

  onSubmited(data){
    let list = ['ttitle', 'tdes', 'sts'];
    let x = data;
    for (let i in list) {
      this.taskData[list[i]] = x[list[i]];
     }
  }
  getMessage(data){
    this.message =  data;
  }

  deleteTask() {
    this.cs.deleteTask(this.tid).subscribe(result => {
      this.message = result;
      if (result && !result.error) {
        setTimeout(() => this.router.navigateByUrl('tasks'), 1000);
      }
    });
  };

}
