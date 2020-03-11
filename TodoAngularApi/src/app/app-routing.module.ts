import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { TodoTasksComponent } from './todo-tasks/todo-tasks.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { TodotaskListComponent } from './todo-tasks/todotask-list/todotask-list.component';
import { TodotaskNoteComponent } from './todo-tasks/todotask-note/todotask-note.component';
import { ShareEventComponent } from './share-event/share-event.component';


const routes: Routes = [
  {
    path:'',redirectTo:'/user/login',pathMatch:'full'
  },
  {
    path:'user',component:UserComponent,
    children:[
      {
        path:'registration',component:RegistrationComponent
      },
      {
        path:'login',component:LoginComponent
      }
    ]
  },
  {
    path:'todotasks',component:TodoTasksComponent,canActivate:[AuthGuard],
    children:[
      {
        path:'todotasklist',component:TodotaskListComponent
      },
      {
        path:'todotasknote',component:TodotaskNoteComponent
      }
    ]
  },
  {
    path:'shareevent',component:ShareEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
