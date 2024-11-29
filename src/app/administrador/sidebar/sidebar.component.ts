import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '../../extras/AuthService';
@Component({
  selector: 'app-sidebar',
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
    FormsModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;

  sidebarVisible: boolean = false;
  isCollapsed: boolean = false;
  selectedItem: string = 'usuarios'; // Selección por defecto
  constructor(private authService: AuthService) {}

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
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
