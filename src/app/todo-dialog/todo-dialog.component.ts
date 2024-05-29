import {Component, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Task} from "../interfaces";

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './todo-dialog.component.html',
  styles: `
    mat-dialog-actions {
      padding-left: 1rem;
      padding-bottom: 1rem;
    }

    .title-section {
      display: flex;
      gap: 0.1rem;
      align-items: center;
    }

    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

  `
})
export class TodoDialogComponent implements OnInit {
  selectedTodo: Signal<Task | undefined> = signal<Task | undefined>(undefined);
  isEditMode: WritableSignal<boolean> = signal<boolean>(false);

  todoForm: FormGroup<{ title: FormControl<string | null>, description: FormControl<string | null> }>;
  private fb = inject(FormBuilder);
  private dialogRef: MatDialogRef<TodoDialogComponent> = inject(MatDialogRef);

  constructor() {
    this.todoForm = this.initForm();
  }

  ngOnInit() {
    this.isEditMode.set(!!this.selectedTodo());

    this.todoForm = this.initForm();
  }

  onSave() {
    this.dialogRef.close(this.todoForm.value);
  }

  private initForm(): FormGroup<{ title: FormControl<string | null>, description: FormControl<string | null> }> {
    const title = this.isEditMode()
      ? (this.selectedTodo()?.title ?? null)
      : '';
    const description = this.isEditMode()
      ? (this.selectedTodo()?.description ?? null)
      : '';

    return this.fb.group({
      title: [title, [Validators.required, Validators.maxLength(20)]],
      description: [description, Validators.maxLength(50)],
    })
  }

}
