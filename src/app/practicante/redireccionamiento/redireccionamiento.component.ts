import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-redireccionamientopracticante',
  standalone: true,
  imports: [CardModule,
    ButtonModule,
    RouterModule],
  templateUrl: './redireccionamiento.component.html',
  styleUrls: ['./redireccionamiento.component.css']
})
export class RedireccionamientoComponent {

  constructor (private router : Router){

  }
  
  
    @Output() onRedirect = new EventEmitter<void>();
  
    navigateToSidebar() {
      //this.onRedirect.emit();
      this.router.navigate(['/sidebarpracticante']);
    }
}
