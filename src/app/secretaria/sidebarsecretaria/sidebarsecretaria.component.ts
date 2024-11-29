import { Component, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../extras/AuthService';

@Component({
  selector: 'app-sidebarsecretaria',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    RouterModule,
    OverlayPanelModule,
    FormsModule // Agrega FormsModule aquí
  ],
  templateUrl: './sidebarsecretaria.component.html',
  styleUrls: ['./sidebarsecretaria.component.css']
})
export class SidebarsecretariaComponent {
  @ViewChild('sidebarsecretariaRef') sidebarsecretariaRef!: Sidebar;
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;

  sidebarVisible: boolean = false;
  isCollapsed: boolean = false;
  selectedItem: string = 'usuarios'; // Selección por defecto
  constructor(private authService: AuthService) {}

  closeCallback(e: Event): void {
    this.sidebarsecretariaRef.close(e);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  selectItem(item: string): void {
    this.selectedItem = item;
  }

  logout(): void {
    console.log("Cerrando sesión...");
    // Implementa la lógica de cierre de sesión aquí
  }
  onLogout(): void {
    this.authService.logout();
  }
}
