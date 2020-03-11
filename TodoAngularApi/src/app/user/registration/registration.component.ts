import { Component, OnInit } from '@angular/core';
import { UserService } from '../usershared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
    
  }
  onSubmit()
  {
    this.service.register().subscribe(
      (res: any)=>{
       if(res.Succeeded)//Here I make speling mistake that why I caught a undefine error
       {
         this.service.formModel.reset();
         this.toastr.success('Register', 'Successfully');

       }
       else
       {
         //Here I make speling mistake that why I caught a undefine error
        !!res.Errors && res.Errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Username is already taken','Registration failed.');
              break;

            default:
            this.toastr.error(element.description,'Registration failed.');
              break;
           }
         });
       }
    },
    err=>{
     console.log(err);
    })
  }

}
