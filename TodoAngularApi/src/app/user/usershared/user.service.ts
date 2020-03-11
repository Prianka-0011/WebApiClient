import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetail1:any;

  constructor(private fb:FormBuilder,private http:HttpClient) { }
  
  readonly rootURL='http://localhost:60234/api';
  formModel=this.fb.group({
  UserName:['',Validators.required],
  Email:['',Validators.email],
  FullName:[''],
  Passwords:this.fb.group({
    Password: ['',[Validators.required,Validators.minLength(4)]],// Here i make mistake in braket []
    ConfirmPassword:['',Validators.required]
  },{validators:this.comparePasswords})
  });
  comparePasswords(fb:FormGroup)
  {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }
  register()
  {
    var body={
     UserName:this.formModel.value.UserName,
     Email:this.formModel.value.Email,
     FullName:this.formModel.value.FullName,
     Password: this.formModel.value.Passwords.Password
     
    }
   return this.http.post(this.rootURL+'/ApplicationUser/Register',body);
  }
  
  login(formData)
  {
    return this.http.post(this.rootURL+'/ApplicationUser/Login',formData);
  }
  getUserProfile()
  {
    var tokenHader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.get(this.rootURL+'/UserProfile',{headers:tokenHader});
  }
 
}
