import {Component} from '@angular/core';
import {AngularMaterialModule} from "../angular-material/angular-material.module";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    AngularMaterialModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

}
