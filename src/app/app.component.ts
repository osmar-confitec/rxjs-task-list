import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { TaskType } from './tasks/models/tasks-models';
import { TaskService } from './tasks/services/task.service';
import { Store } from './tasks/task.store';

@Component({
  selector: 'task-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  ngOnInit(): void {

    this.taskService.getTasks().subscribe((tsks)=>{
      let arrs = [...tsks]
      this.store.set('tasks',arrs);
    })

  }
  title = 'rxjs-task-list';
  TaskType = TaskType;

  constructor(private taskService:TaskService, private store: Store){


  }

}
