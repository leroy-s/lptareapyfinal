import { Component } from '@angular/core';
import { FormComponent } from './login/form/form.component';
import { VisualComponent } from './login/visual/visual.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AdministradorComponent } from './administrador/administrador.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front'

}
