import {Router, ActivatedRoute, Params} from '@angular/router';
import {OnInit, OnDestroy, Component} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../shared/service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private cs: CommonService) {
  }

  public tid: number;
  public taskData;
  public editTaskGroup: FormGroup;
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
    this.editTaskGroup = this.fb.group({
      ttitle: [this.taskData.ttitle, Validators.required],
      sts: [this.taskData.sts, Validators.required],
      tdes: [this.taskData.tdes, Validators.required]

    });
  };
  onSubmit(){
    this.cs.updateTask(this.tid, this.editTaskGroup.value).subscribe(result => {
      this.message = result;
    });
  };

  deleteTask() {
    this.cs.deleteTask(this.tid).subscribe(result => {
      this.message = result;
    });
  };

}
