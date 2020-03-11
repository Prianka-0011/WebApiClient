import { Injectable } from '@angular/core';
import { TodoTask } from './todo-task.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventList } from './event-list.model';
import { Gmn } from './gmn.model';
import { TodoListFinal } from './todo-list-final.model';


@Injectable({
  providedIn: 'root'
})
export class TodoTaskService {

  constructor(private http:HttpClient) { 
   
  }
  gomaynot:Gmn;
  eventId:any;
  taskId:any;
  goingTaskId:any;
  listOfEvent:EventList[]=[];
  userIdList:Array<string>;
  formData:TodoTask;
  populateData:TodoTask;
  shareData:TodoTask;
  save:boolean=false;
  popup:boolean=false;
  allTaskList:TodoListFinal[]=[];
  taskList:TodoTask[] = [];//Here I make a mistake this property uudefined
  query:string='';
  readonly returnUrl='http://localhost:60234/api';
  posttaskDetail()
  {
    var tokenHader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.post(this.returnUrl+'/TodoTasks',this.formData,{headers:tokenHader});
  }
  putTaskDetail()
  {
    var tokenHader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.put(this.returnUrl+'/TodoTasks/'+this.populateData.Id,this.populateData,{headers:tokenHader});
    // here I made a mistake in url
  }
  deleteTaskDetail(id)
  {
    var tokenHader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.delete(this.returnUrl+'/TodoTasks/'+id,{headers:tokenHader});
    // here I made a mistake in url
  }

  shareItemDetail()
  {
    var tokenHader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.put(this.returnUrl+'/ShareEvents/EventList/'+this.taskId,this.userIdList,{headers:tokenHader});//Here I make mistake
  }
  getUserDetail()
  {
    return this.http.get(this.returnUrl+'/UserProfile/GetUsers');
  }
  getAllEvent()
  {
    var tokenHader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.get(this.returnUrl+'/ShareEvents/GetSharedEvents',{headers:tokenHader});
  }
  postGomaynotDetail()
  {
   return this.http.post(this.returnUrl+'/PeopleGoing/PostMaybe',this.gomaynot);
  }
  // postMayDetail()
  // {
  //  return this.http.post(this.returnUrl+'/PeopleGoing/PostMaybe',this.goingTaskId);
  // }
  // postNotInterestedDetail()
  // {
  //   return this.http.post(this.returnUrl+'/PeopleGoing/PostNotInterest',this.goingTaskId);
  // }
  getGoingEventCount()
  {
    return this.http.get(this.returnUrl+'/ShareEvents/going/'+this.eventId)
  }
  getGoingEventmaybeCount()
  {
    return this.http.get(this.returnUrl+'/ShareEvents/maybe/'+this.eventId)
  }
  getGoingEventnotinteresteCount()
  {
    return this.http.get(this.returnUrl+'/ShareEvents/notinterest/'+this.eventId)
  }
  
  refreshtaskList()
  {
    var tokenHader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    this.http.get(this.returnUrl+'/TodoTasks',{headers:tokenHader})
      .toPromise()
      .then(res=>this.allTaskList=res as TodoListFinal[]);
  }
  
}
