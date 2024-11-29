import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

import { SidebarcoordinadorComponent } from '../sidebarcoordinador/sidebarcoordinador.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule, 
    ButtonModule, 
    CardModule, 
    RippleModule
    
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isMobileView: boolean = false;
  currentView: 'month' | 'week' | 'day' = 'month';
  currentDate: Date = new Date();
  weekDays: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  weeks: (number | null)[][] = [];
  currentWeekDays: { date: Date }[] = [];
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
 
  ngOnInit() {
    this.generateCalendarData();
  }

  generateCalendarData() {
    if (this.currentView === 'month') {
      this.generateMonthView();
    } else if (this.currentView === 'week') {
      this.generateWeekView();
    }
  }

  generateMonthView() {
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    
    let currentWeek: (number | null)[] = [];
    this.weeks = [];

    // Fill in the days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      currentWeek.push(null);
    }

    // Fill in all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      currentWeek.push(day);
      
      if (currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Fill in the remaining days
    while (currentWeek.length < 7 && currentWeek.length > 0) {
      currentWeek.push(null);
    }
    if (currentWeek.length > 0) {
      this.weeks.push(currentWeek);
    }
  }

  generateWeekView() {
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay());
    
    this.currentWeekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      this.currentWeekDays.push({ date });
    }
  }

  setView(view: 'month' | 'week' | 'day') {
    this.currentView = view;
    this.generateCalendarData();
  }

  previousPeriod() {
    if (this.currentView === 'month') {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    } else if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
    } else {
      this.currentDate.setDate(this.currentDate.getDate() - 1);
    }
    this.generateCalendarData();
  }

  nextPeriod() {
    if (this.currentView === 'month') {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    } else if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
    } else {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
    }
    this.generateCalendarData();
  }

  getCurrentPeriodLabel(): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    if (this.currentView === 'month') {
      return `${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    } else if (this.currentView === 'week') {
      const startDate = this.currentWeekDays[0]?.date;
      const endDate = this.currentWeekDays[6]?.date;
      return `${startDate?.getDate()} - ${endDate?.getDate()} ${months[this.currentDate.getMonth()]}`;
    } else {
      return `${this.currentDate.getDate()} ${months[this.currentDate.getMonth()]}`;
    }
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() && 
           this.currentDate.getMonth() === today.getMonth() && 
           this.currentDate.getFullYear() === today.getFullYear();
  }

  isCurrentDay(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  }

  isCurrentHour(hour: number): boolean {
    const now = new Date();
    return this.isCurrentDay(this.currentDate) && hour === now.getHours();
  }

  formatDayViewHeader(): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return `${days[this.currentDate.getDay()]}, ${this.currentDate.getDate()}`;
  }
}