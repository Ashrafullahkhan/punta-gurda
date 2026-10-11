import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { HeaderComponent } from '../header/header';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class ShellComponent implements OnInit {
  readonly layout = inject(LayoutService);

  ngOnInit(): void {
    this.syncViewport();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.syncViewport();
  }

  closeSidebar(): void {
    this.layout.closeSidebar();
  }

  private syncViewport(): void {
    const width = window.innerWidth;
    if (width > 1100) {
      this.layout.sidebarCollapsed.set(false);
      this.layout.closeSidebar();
    } else if (width > 860) {
      this.layout.sidebarCollapsed.set(true);
      this.layout.closeSidebar();
    } else {
      this.layout.sidebarCollapsed.set(false);
    }
  }
}
