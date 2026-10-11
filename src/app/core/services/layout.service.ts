import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  readonly sidebarOpen = signal(false);
  readonly sidebarCollapsed = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  openSidebar(): void {
    this.sidebarOpen.set(true);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  toggleCollapsed(): void {
    this.sidebarCollapsed.update((value) => !value);
  }
}
