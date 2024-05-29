import {Component, inject, OnInit, Signal, signal} from '@angular/core';
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {TodoDialogComponent} from "../todo-dialog/todo-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task, TaskDto} from "../interfaces";
import {TodoService} from "../todo.service";
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [AngularMaterialModule, NgStyle, NgClass],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todoList: Signal<Task[]> = signal<Task[]>([]);

  private dialog = inject(MatDialog);
  private todoService = inject(TodoService);

  ngOnInit() {
    this.todoList = this.todoService.getAll();
  }

  openDialogOnAddTodo() {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      autoFocus: "first-tabbable",
      width: '95%',
      maxWidth: '30rem',
    });

    this.handleCreateTodo(dialogRef);
  };


  openDialogOnEditMode(todoId: number) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      autoFocus: "first-tabbable",
      width: '95%',
      maxWidth: '30rem',
    });

    this.handleUpdateTodo(dialogRef, todoId);
  }

  handleToggleTodoCompleted(todoId: number): void {
    console.log(todoId)

    this.todoService.toggleCompleted(todoId)
  }

  private handleCreateTodo(dialogRef: MatDialogRef<TodoDialogComponent>) {

    dialogRef.afterClosed().subscribe((result: TaskDto | undefined) => {

      if (result) {

        this.todoService.create(result);
      }
    })
  }

  private handleUpdateTodo(dialogRef: MatDialogRef<TodoDialogComponent>, todoId: number) {
    dialogRef.componentInstance.selectedTodo = this.todoService.getOne(todoId);

    dialogRef.afterClosed().subscribe((result: TaskDto | undefined) => {

      if (result) {

        this.todoService.update(todoId, result);
      }
    })
  }
}
