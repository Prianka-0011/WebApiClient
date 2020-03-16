import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/usershared/user.service';

@Component({
  selector: 'app-todo-tasks',
  templateUrl: './todo-tasks.component.html',
  styleUrls: ['./todo-tasks.component.css']
})
export class TodoTasksComponent implements OnInit {
userDetails:any;
  constructor(private router:Router,private service:UserService) { }

  ngOnInit() {

    this.service.getUserProfile().subscribe(
      res=>{
       this.userDetails=res;
       //this.service.userDetail1=res;
      },
      err=>{
        console.log(err);
      }
    );

  }
  EventPage()
  {
    this.router.navigate(['/shareevent']);
  }
  onLogout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
