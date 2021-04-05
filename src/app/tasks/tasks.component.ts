import { map } from 'rxjs/operators';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskType } from './models/tasks-models';
import { TaskService } from './services/task.service';
import { Store } from './task.store';

@Component({
  selector: 'task-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks:Task[] = [];
  @Input() taskType:TaskType = TaskType.pending;
  TaskType = TaskType;

  tasksObservable$: Observable<Task[]>;

  constructor(private taskService:TaskService,private store: Store)
  {


  }

getDateFormatedState(task:Task):string
   {
    switch (this.taskType) {
      case TaskType.pending:
           return ` Criado em ${task.dateCreated.toDateString()} `
       case TaskType.progress:
            return ` Em Andamento em ${task.dateStart.toDateString()} `
            case TaskType.finished:
              return ` Finalizado em ${task.dateFinished.toDateString()} `
      default:
            return '';
    }
 }

   typeTaskDescription ( ):string
   {

    switch (this.taskType) {
      case TaskType.pending:
           return 'Pendente'
       case TaskType.progress:
            return 'Em Progresso'
            case TaskType.finished:
              return 'Finalizada'
      default:
            return '';
    }

   }

   play(task:Task)
   {
        switch (task.taskType) {
          case TaskType.pending:
               this.taskService.updateTask(task.id,TaskType.progress).subscribe((subs)=>{
                this.store.updateTask(task.id,TaskType.progress);
               //this.LoadTasks();
              })
            break;
            case TaskType.progress:
               this.taskService.updateTask(task.id,TaskType.finished).subscribe((subs)=>{
                this.store.updateTask(task.id,TaskType.finished);
                 //this.LoadTasks();
                })
            break;
          default:
            break;
        }
   }

   returnTask(task:Task)
   {

    switch (task.taskType) {
      case TaskType.progress:
          this.taskService.updateTask(task.id,TaskType.pending).subscribe((subs)=>{
            this.store.updateTask(task.id,TaskType.pending);
           // this.LoadTasks();

          })
        break;
        case TaskType.finished:
          this.taskService.updateTask(task.id,TaskType.progress).subscribe((subs)=>{
            this.store.updateTask(task.id,TaskType.progress);
            //this.LoadTasks();

          })
        break;
      default:
        break;
    }
   }


  ngOnInit(): void {
   // this.LoadTasks();
   this.store.getTasksList()
       .pipe(map(task=> task.filter(fil=> fil.taskType == this.taskType)))
       .subscribe((subs)=>{
          this.tasks  = [...[],...subs]

   })
  }
  private LoadTasks() {
    this.taskService.getTasks(this.taskType).subscribe((sub) => {
      this.tasks = [...[],...sub];
    });
  }
}
