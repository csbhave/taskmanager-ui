import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: any[] = [];
  tasks: any[] = [];
  listId: any;

  constructor(
    private taskService: TaskService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.getLists().subscribe((list) => (this.lists = list));

    this.actRoute.params.subscribe((params: Params) => {
      this.listId = params.listId;
      if (!this.listId) return;
      this.taskService
        .getTasks(this.listId)
        .subscribe((tasks: any[]) => (this.tasks = tasks));
    });
  }

  onTaskClick(task: any): void {
    this.taskService
      .setCompleted(this.listId, task)
      .subscribe(() => (task.completed = !task.completed));
  }

  deleteTask(task: any): void {
    this.taskService
      .deleteTask(this.listId, task._id)
      .subscribe(
        (task: any) =>
          (this.tasks = this.tasks.filter((t) => t._id != task._id))
      );
  }

  deleteList(list: any): void {
    console.log(list);
    this.taskService
      .deleteList(list._id)
      .subscribe(
        () => (this.lists = this.lists.filter((l) => l._id != list._id))
      );
  }

  addTask(): void {
    if (!this.listId) {
      alert('please select list');
      return;
    }
    this.router.navigate(['./new-task'], { relativeTo: this.actRoute });
  }
}
