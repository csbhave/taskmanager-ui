import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  listId: any;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.actRoute.params.subscribe(
      (params: Params) => (this.listId = params.listId)
    );
  }

  ngOnInit(): void {}
  onSave(newTask: any): void {
    this.taskService
      .createTask(this.listId, newTask)
      .subscribe(() =>
        this.router.navigate(['../'], { relativeTo: this.actRoute })
      );
  }
}
