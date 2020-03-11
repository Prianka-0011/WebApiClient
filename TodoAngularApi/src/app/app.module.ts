import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { TodoTasksComponent } from './todo-tasks/todo-tasks.component';
import { TodotaskNoteComponent } from './todo-tasks/todotask-note/todotask-note.component';
import { TodotaskListComponent } from './todo-tasks/todotask-list/todotask-list.component';
import { SearchTaskComponent } from './todo-tasks/search-task/search-task.component';
import { TodoTaskService } from './todo-tasks/Shared/todo-task.service';
import { TaskPipePipe } from './todo-tasks/task-pipe.pipe';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './user/usershared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ShareEventComponent } from './share-event/share-event.component';



@NgModule({
  declarations: [
    AppComponent,
   
    TodoTasksComponent,
   
    TodotaskNoteComponent,
   
    TodotaskListComponent,
   
    SearchTaskComponent,
   
    TaskPipePipe,
   
    UserComponent,
   
    RegistrationComponent,
   
    LoginComponent,
   
    HomeComponent,
   
    ShareEventComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  // "here I again make ,mistake"
    ToastrModule.forRoot(),
    
  ],
  providers: [TodoTaskService,UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
