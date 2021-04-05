
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Task, TaskType } from './models/tasks-models';


export interface State {
  tasks: Task[]
}


const state: State = {
  tasks: []
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value() {
      return this.subject.value;
  }

  updateTask(taskId:number,taskType:TaskType )
  {

    let tasks =  this.value.tasks;
    tasks.forEach((task,idx)=>{

        if (task.id == taskId)
        {
          switch (taskType) {
            case TaskType.finished:
              tasks[idx].dateFinished = new Date()
               break;
              case TaskType.progress:
                tasks[idx].dateStart = new Date()
                break;

            default:
              break;
          }
            tasks[idx].taskType = taskType;
        }
    })
    this.set('tasks',tasks);
  }

  public getTasksList(): Observable<Task[]> {
      return this.store
          .pipe(map(store => store.tasks));
  }

  set(name: string, state: any) {
      this.subject.next({
          ...this.value, [name]: state
      });
  }
}
