import { Component, OnInit } from '@angular/core';
import { TodoTaskService } from '../todo-tasks/Shared/todo-task.service';
import { Router } from '@angular/router';
import { UserService } from '../user/usershared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-share-event',
  templateUrl: './share-event.component.html',
  styleUrls: ['./share-event.component.css']
})
export class ShareEventComponent implements OnInit {

  constructor(private toaster:ToastrService,private service:TodoTaskService,private router:Router,private userservice:UserService) { }
  userName:any;
  gflag:boolean=true;
  mflag:boolean=true;
  nflag:boolean=true;
  allEventDetailList:any;
  ngOnInit() {
    this.userName=this.userservice.userDetail1
    this.getEventList();
    this.service.gomaynot={
      TaskId:'',
      Type:0
    }
   
  }
  onLogout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
 getEventList()
 {
  this.service.getAllEvent().subscribe(
    res=>{
    this.allEventDetailList=res;
    },
    err=>{
     console.log(err);
    }
  )
 }
 onGoing(Id)
 {
   this.gflag=false;
   this.mflag=true;
   this.nflag=true;
   this.service.gomaynot.TaskId=Id;
   this.service.gomaynot.Type=1;
   this.service.postGomaynotDetail().subscribe(
     res=>{
      this.toaster.success('Successfully add type','Event');
     },
     err=>{
       console.log(err);
     }
   );
 }
 myBe(Id)
 {
   this.mflag=false;
   this.nflag=true;
   this.gflag=true;
   this.service.gomaynot.TaskId=Id;
   this.service.gomaynot.Type=2;
   this.service.postGomaynotDetail().subscribe(
     res=>{
      this.toaster.success('Successfully add type','Event');
     },
     err=>{
       console.log(err);
     }
   );
 }
 notInterest(Id)
 {
  this.mflag=true;
  this.nflag=false;
  this.gflag=true;
  this.service.gomaynot.TaskId=Id;
   this.service.gomaynot.Type=3;
   this.service.postGomaynotDetail().subscribe(
     res=>{
      this.toaster.success('Successfully add type','Event');
     },
     err=>{
       console.log(err);
     }
   );

 }
}
