import { Component, OnInit } from '@angular/core';
import { TodoTaskService } from '../Shared/todo-task.service';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit {

  
  constructor(private service:TodoTaskService) { }

  ngOnInit() {
    this.service.refreshtaskList();
  }

}
