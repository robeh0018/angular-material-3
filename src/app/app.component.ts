import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AngularMaterialModule} from "./angular-material/angular-material.module";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {TodosComponent} from "./todos/todos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AngularMaterialModule,
    ToolbarComponent,
    TodosComponent
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-material-3';
}
