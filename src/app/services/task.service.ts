import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webService: WebService) {}

  getLists(): Observable<any> {
    return this.webService.get('lists');
  }

  createList(title: string): Observable<any> {
    return this.webService.post('lists', { title });
  }

  getTasks(listId: string): Observable<any> {
    return this.webService.get(`lists/${listId}/tasks`);
  }

  createTask(listId: string, title: string): Observable<any> {
    return this.webService.post(`lists/${listId}/tasks`, { title });
  }

  deleteList(listId: string): Observable<any> {
    return this.webService.delete(`lists/${listId}`);
  }

  deleteTask(listId: string, taskId: string): Observable<any> {
    return this.webService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  setCompleted(listId: string, task: any): Observable<any> {
    return this.webService.patch(`lists/${listId}/tasks/${task._id}`, {
      completed: !task.completed,
    });
  }
}
