import {Component, model} from '@angular/core';
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-todo-dialog',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule],
  templateUrl: './add-todo-dialog.component.html',
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
export class AddTodoDialogComponent {

}
