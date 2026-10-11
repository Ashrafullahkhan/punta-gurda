import { Component, inject } from '@angular/core';
import { LucideBell, LucideChevronDown, LucideMail, LucideMenu } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe, LucideBell, LucideMail, LucideChevronDown, LucideMenu],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly layout = inject(LayoutService);

  toggleMenu(): void {
    this.layout.toggleSidebar();
  }
}
