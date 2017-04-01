import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../shared/service';

@Component({
  selector: 'task-edit',
  templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements OnInit {
  @Input() taskData;
  @Output() onSubmited = new EventEmitter<boolean>();
  @Output() getMessage = new EventEmitter<any>();
  public editTaskGroup: FormGroup;
  public editTaskStatus = true;
  public message;

  constructor(private fb: FormBuilder, private cs: CommonService) {
  }

  ngOnInit() {
    this.editTaskGroup = this.fb.group({
      ttitle: [this.taskData.ttitle, Validators.required],
      sts: [this.taskData.sts, Validators.required],
      tdes: [this.taskData.tdes, Validators.required]

    });
  }

  onSubmit() {
    this.cs.updateTask(this.taskData.TID, this.editTaskGroup.value).subscribe(result => {
      this.message = result;
      if (result && !result.error) {
        this.onSubmited.emit(this.editTaskGroup.value);
        this.getMessage.emit(result);

      }
    });
  };

}
