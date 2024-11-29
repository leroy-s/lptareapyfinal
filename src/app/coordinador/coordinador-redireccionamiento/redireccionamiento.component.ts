import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-redireccionamiento',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './redireccionamiento.component.html',
  styleUrl: './redireccionamiento.component.css'
})
export class RedireccionamientoComponent {
  constructor (private router : Router){

  }
  
  
    @Output() onRedirect = new EventEmitter<void>();
  
    navigateToSidebar() {
      //this.onRedirect.emit();
      this.router.navigate(['/sidebarcoordinador']);
    }
}
