import { Component, OnInit } from '@angular/core';
import { TodoTaskService } from '../Shared/todo-task.service';
import { TodoTask } from '../Shared/todo-task.model';

import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventList } from '../Shared/event-list.model';

@Component({
  selector: 'app-todotask-list',
  templateUrl: './todotask-list.component.html',
  styleUrls: ['./todotask-list.component.css']
})
export class TodotaskListComponent implements OnInit {

  userDetails:any;
  going:any;
  maybe:any;
  ntintrst:any;
  constructor(private service:TodoTaskService,private toastr:ToastrService,private router:Router) { }
  ngOnInit() {
    this.service.refreshtaskList();
    this.resetForm1();
    
    
    
    
  }
  resetForm1(form?:NgForm)
  { 
    if(form!=null)
    
    form.resetForm();
        this.service.populateData={
          Id: "",
          Task: '',
          Date: '',
          Description:'',
          Place:'',

        }
    
  }
  go(Id)
  {
    this.service.eventId=Id;
    this.service.getGoingEventCount().subscribe(
      res=>{
       this.going=res;
      },
      err=>{
        console.log(err);
      }
    );
    
  }
  may(Id)
  {
    this.service.eventId=Id;
    this.service.getGoingEventmaybeCount().subscribe(
      res=>{
       this.maybe=res;
      },
      err=>{
        console.log(err);
      }
    );
  }
  intrst(Id)
  {
    this.service.eventId=Id;
    this.service.getGoingEventnotinteresteCount().subscribe(
      res=>{
      this.ntintrst=res;
      },
      err=>{
        console.log(err);
      }
    );
  }

  task: TodoTask[];
  populateDetail(item:TodoTask)
   {
     this.service.save=true;
     this.service.populateData=Object.assign({},item);
   }
   onSubmit1(form:NgForm){
       this.updatetaskDetail(form);
   }
   updatetaskDetail(form:NgForm)
  {

    this.service.putTaskDetail().subscribe(
      res => {
        this.resetForm1(form);
        this.toastr.info('Update successfully', 'Task Detail');
        this.service.refreshtaskList();
        this.service.save=false;
      },
      err => {
        console.log(err);
      }
    )
  }

  onCancle(){
    this.service.save=false;
  }
  ondeleteTask1(Id)
  {
    this.service.deleteTaskDetail(Id).subscribe(
      res=>{
        this.service.refreshtaskList();
        this.toastr.warning('Success fully delete','Task Detail');
      },
      err=>{
        console.log(err);
      }
    )
  }
  ondeleteTask(Id)
   {
     this.service.deleteTaskDetail(Id).subscribe(
       res=>{
         this.service.refreshtaskList();
         this.toastr.warning('Success fully delete','Task Detail');
       },
       err=>{
         console.log(err);
       }
     )
   }
   onshareTask(shareItem:TodoTask){
     this.service.userIdList=[];
    this.service.shareData=Object.assign({},shareItem);
    this.service.taskId=this.service.shareData.Id;
    
    this.service.getUserDetail().subscribe(
      res=>{
       this.userDetails=res;
      },
      err=>{
        console.log(err);
      }
    )
   }
   onShareWithUser(id)
   {
     var index = this.service.userIdList.findIndex(x=>x===id);
     if(index > -1)
     {
      this.service.userIdList.slice(index,1)
     }else{
      this.service.userIdList.push(id);
     }

   
   }
   OnSubmitShare()
   {
     this.service.shareItemDetail().subscribe(
      res=>{
        this.service.refreshtaskList();
        this.toastr.success('Successfully Share','Task details');
      },
      err=>{
        console.log(err);
      }
    )

   }
   onCancleUserList()
   {
     this.service.popup=false;
   }
   get sortData() {
    return  this.service.allTaskList.sort((a, b) => {
      return <any>new Date(a.Date) - <any>new Date(b.Date);
    });
  
}
}

