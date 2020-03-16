import { Component, OnInit } from '@angular/core';
import { TodoTaskService } from '../todo-tasks/Shared/todo-task.service';
import { Router } from '@angular/router';
import { UserService } from '../user/usershared/user.service';
import { ToastrService } from 'ngx-toastr';
import { EventList } from '../todo-tasks/Shared/event-list.model';

@Component({
  selector: 'app-share-event',
  templateUrl: './share-event.component.html',
  styleUrls: ['./share-event.component.css']
})
export class ShareEventComponent implements OnInit {

  constructor(private toaster:ToastrService,private service:TodoTaskService,private router:Router,private service1:UserService) { }
  userName:any;
  Event1:EventList[]=[];
  gflag:boolean=true;
  mflag:boolean=true;
  nflag:boolean=true;
  allEventDetailList:any;
  ngOnInit() {
    this.service1.getUserProfile().subscribe(
      res=>{
      
       this.userName=res;
      },
      err=>{
        console.log(err);
      }
    );
    this.service.getAllEvent();//Here I make mistake this method automatically call
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
 get EventListAll()
 {
   
   return this.service.Event;
 }
 onGoing(item:EventList)
 {
   item.go=false;
   item.may=true;
   item.not=true;
   this.service.gomaynot.TaskId=item.Id;
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
 myBe(item:EventList)
 {
   item.may=false;
   item.go=true;
   item.not=true;
   this.service.gomaynot.TaskId=item.Id;
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
 notInterest(item:EventList)
 {
  item.not=false;
  item.go=true;
   item.may=true;
  this.service.gomaynot.TaskId=item.Id;
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
