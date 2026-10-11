import { Routes } from '@angular/router';
import { PlaceholderPageComponent } from './shared/ui/placeholder-page';

const placeholder = (path: string, titleKey: string) => ({
  path,
  component: PlaceholderPageComponent,
  data: { titleKey },
});

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./core/layout/shell/shell').then((m) => m.ShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((m) => m.DashboardComponent),
      },
      placeholder('search', 'NAV.SEARCH'),
      placeholder('properties', 'NAV.PROPERTIES'),
      placeholder('taxpayers', 'NAV.TAXPAYERS'),
      placeholder('invoices', 'NAV.INVOICES'),
      placeholder('payments', 'NAV.PAYMENTS'),
      placeholder('receipts', 'NAV.RECEIPTS'),
      placeholder('property-tax', 'NAV.PROPERTY_TAX'),
      placeholder('trade-license', 'NAV.TRADE_LICENSE'),
      placeholder('business-license', 'NAV.BUSINESS_LICENSE'),
      placeholder('reports', 'NAV.REPORTS'),
      placeholder('users', 'NAV.USERS'),
      placeholder('settings', 'NAV.SETTINGS'),
      placeholder('audit-logs', 'NAV.AUDIT'),
      placeholder('notifications', 'NAV.NOTIFICATIONS'),
      placeholder('documents', 'NAV.DOCUMENTS'),
      placeholder('integrations', 'NAV.INTEGRATIONS'),
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
