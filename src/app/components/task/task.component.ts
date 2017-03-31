import {Router, ActivatedRoute, Params} from '@angular/router';
import {OnInit, OnDestroy, Component} from '@angular/core';
import {CommonService} from '../../shared/service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cs: CommonService) {
  }

  public tid: number;
  public taskData;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.tid = +params['id'];
    });
    this.cs.getTask(this.tid).subscribe(result => {
      this.taskData = result[0];
    });

  }

}
