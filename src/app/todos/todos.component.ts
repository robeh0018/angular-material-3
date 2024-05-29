import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {AddTodoDialogComponent} from "../add-todo-dialog/add-todo-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Task} from "../task";
import todos from "../todos-data";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todoList: WritableSignal<Task[]> = signal<Task[]>([]);

  private dialog = inject(MatDialog);

  constructor() {
  }

  onEdit() {
    console.log('asd');
  }

  ngOnInit() {
    this.todoList.set(todos);
  }

  openDialog() {
    this.dialog.open(AddTodoDialogComponent, {
      autoFocus: "first-tabbable",
      width: '95%',
      maxWidth: '30rem',
    });
  }
}
