import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideBuilding2,
  LucideChevronLeft,
  LucideClipboardList,
  LucideCreditCard,
  LucideFileBarChart,
  LucideFileText,
  LucideFolderOpen,
  LucideHandshake,
  LucideLayoutDashboard,
  LucideLink2,
  LucideReceipt,
  LucideScrollText,
  LucideSearch,
  LucideSettings,
  LucideShield,
  LucideStore,
  LucideUsers,
  LucideBell,
} from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { LayoutService } from '../../services/layout.service';

interface NavItem {
  labelKey: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LucideLayoutDashboard,
    LucideSearch,
    LucideBuilding2,
    LucideUsers,
    LucideFileText,
    LucideCreditCard,
    LucideReceipt,
    LucideScrollText,
    LucideStore,
    LucideHandshake,
    LucideFileBarChart,
    LucideShield,
    LucideSettings,
    LucideClipboardList,
    LucideBell,
    LucideFolderOpen,
    LucideLink2,
    LucideChevronLeft,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  readonly layout = inject(LayoutService);

  readonly navItems: NavItem[] = [
    { labelKey: 'NAV.DASHBOARD', route: '/app/dashboard', icon: 'dashboard' },
    { labelKey: 'NAV.SEARCH', route: '/app/search', icon: 'search' },
    { labelKey: 'NAV.PROPERTIES', route: '/app/properties', icon: 'properties' },
    { labelKey: 'NAV.TAXPAYERS', route: '/app/taxpayers', icon: 'taxpayers' },
    { labelKey: 'NAV.INVOICES', route: '/app/invoices', icon: 'invoices' },
    { labelKey: 'NAV.PAYMENTS', route: '/app/payments', icon: 'payments' },
    { labelKey: 'NAV.RECEIPTS', route: '/app/receipts', icon: 'receipts' },
    { labelKey: 'NAV.PROPERTY_TAX', route: '/app/property-tax', icon: 'property-tax' },
    { labelKey: 'NAV.TRADE_LICENSE', route: '/app/trade-license', icon: 'trade-license' },
    { labelKey: 'NAV.BUSINESS_LICENSE', route: '/app/business-license', icon: 'business-license' },
    { labelKey: 'NAV.REPORTS', route: '/app/reports', icon: 'reports' },
    { labelKey: 'NAV.USERS', route: '/app/users', icon: 'users' },
    { labelKey: 'NAV.SETTINGS', route: '/app/settings', icon: 'settings' },
    { labelKey: 'NAV.AUDIT', route: '/app/audit-logs', icon: 'audit' },
    { labelKey: 'NAV.NOTIFICATIONS', route: '/app/notifications', icon: 'notifications' },
    { labelKey: 'NAV.DOCUMENTS', route: '/app/documents', icon: 'documents' },
    { labelKey: 'NAV.INTEGRATIONS', route: '/app/integrations', icon: 'integrations' },
  ];

  onNavigate(): void {
    if (window.innerWidth <= 860) {
      this.layout.closeSidebar();
    }
  }

  toggleCollapse(): void {
    this.layout.toggleCollapsed();
  }
}
