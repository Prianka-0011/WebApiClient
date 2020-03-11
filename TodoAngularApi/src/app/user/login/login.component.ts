import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../usershared/user.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  formModel={
  UserName:'',
  Password:''
  }
  constructor(private toastr:ToastrService,private service:UserService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem!=null)
    {
      this.router.navigateByUrl('/todotasks');
    }
  }
  onSubmit(form:NgForm)
  {
   this.service.login(form.value).subscribe(
     (res:any)=>{
      localStorage.setItem('token',res.token);
      this.router.navigateByUrl('/todotasks')
     },
     err=>{
       if(err.status==400)
       {
         this.toastr.error('Incurrect username or password','Authentication faild')
       }
       else
       {
        console.log(err);
       }
     }
   );
  }

}
