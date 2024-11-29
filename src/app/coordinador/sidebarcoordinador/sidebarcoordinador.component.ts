import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '../../extras/AuthService';
@Component({
  selector: 'app-sidebarcoordinador',
  standalone: true,
  imports: [CommonModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    RouterModule,
    OverlayPanelModule],
  templateUrl: './sidebarcoordinador.component.html',
  styleUrl: './sidebarcoordinador.component.css'
})
export class SidebarcoordinadorComponent {
  @ViewChild('sidebarcoordinadorRef') sidebarcoordinadorRef!: Sidebar;
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;

  sidebarVisible: boolean = false;
  isCollapsed = false; 
  selectedItem = '';  // Para gestionar la selección del item principal
  subSelectedItem = 'home'; 
  usuario: string = 'Usuario'; 
  userAvatar: string = 'png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png';
  icono: string = 'default-logo.png'; // Declaración de la propiedad para el logo
  constructor(private authService: AuthService) {}

  

  closeCallback(e: Event): void {
    this.sidebarcoordinadorRef.close(e);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    console.log("Cerrando sesión...");
  }

  selectItem(item: string): void {
    this.selectedItem = item;
    this.subSelectedItem = '';
  }

  toggleSubMenu(item: string): void {
    this.selectedItem = this.selectedItem === item ? '' : item;
  }

  selectSubItem(subItem: string): void {
    this.subSelectedItem = subItem;
  }
  onLogout(): void {
    this.authService.logout();
  }
}
