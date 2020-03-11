import { Component, OnInit } from '@angular/core';
import { TodoTaskService } from '../Shared/todo-task.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-todotask-note',
  templateUrl: './todotask-note.component.html',
  styles: []
})
export class TodotaskNoteComponent implements OnInit {
  constructor(private service:TodoTaskService,private toster:ToastrService) { }

  
  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?:NgForm)
  { 
    if(form!=null)
    
    form.resetForm();
        this.service.formData={
          Id: "",
          Task: '',
          Date: '',
          Description:'',
          Place:''
        }
    
  }
  onSubmit(form:NgForm)
  {
    
    
    if( this.service.formData.Id=="")
    {
      this.inserttaskDetail(form);
    }
    // else
    // {
      // this.updatetaskDetail(form);
    // }
  }
  inserttaskDetail(form:NgForm)
  {
    this.service.posttaskDetail().subscribe(
      res=>{
      this.resetForm(form);
      this.toster.success('Task successfuly insert','TaskDetail');
      this.service.refreshtaskList();
    },
    err=>{
     console.log(err);
    });
    
  }
  // updatetaskDetail(form:NgForm)
  // {

  //   this.service.putTaskDetail().subscribe(
  //     res => {
  //       this.resetForm(form);
  //       this.toster.info('Update successfully', 'Task Detail');
  //       this.service.refreshtaskList();
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }
}
