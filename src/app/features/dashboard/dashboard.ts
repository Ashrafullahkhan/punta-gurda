import { DatePipe, NgClass } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  LucideAlertTriangle,
  LucideBell,
  LucideBuilding2,
  LucideCreditCard,
  LucideFileText,
  LucideInfo,
  LucideReceipt,
  LucideSearch,
  LucideTrendingDown,
  LucideTrendingUp,
  LucideUsers,
  LucideWallet,
} from '@lucide/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import type { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { echarts } from '../../core/charts/echarts';
import { KpiCard, TransactionStatus } from '../../shared/models/dashboard.model';
import { buildCollectionChartOption, buildSourceChartOption } from './dashboard-charts';
import {
  DASHBOARD_ALERTS,
  DASHBOARD_COLLECTIONS,
  DASHBOARD_KPIS,
  DASHBOARD_OUTSTANDING,
  DASHBOARD_QUICK_ACTIONS,
  DASHBOARD_SOURCE_TOTAL,
  DASHBOARD_SOURCES,
  DASHBOARD_TRANSACTIONS,
} from './dashboard.data';

@Component({
  selector: 'app-dashboard',
  imports: [
    TranslatePipe,
    DatePipe,
    NgClass,
    NgxEchartsDirective,
    LucideTrendingUp,
    LucideTrendingDown,
    LucideWallet,
    LucideFileText,
    LucideAlertTriangle,
    LucideBuilding2,
    LucideSearch,
    LucideCreditCard,
    LucideReceipt,
    LucideUsers,
    LucideBell,
    LucideInfo,
  ],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly userName = 'Admin';
  readonly today = new Date('2024-05-15T10:30:00');
  readonly sourceTotal = DASHBOARD_SOURCE_TOTAL;

  readonly kpis = DASHBOARD_KPIS;
  readonly collections = DASHBOARD_COLLECTIONS;
  readonly sources = DASHBOARD_SOURCES;
  readonly transactions = DASHBOARD_TRANSACTIONS;
  readonly outstanding = DASHBOARD_OUTSTANDING;
  readonly alerts = DASHBOARD_ALERTS;
  readonly quickActions = DASHBOARD_QUICK_ACTIONS;

  readonly collectionOption = signal<EChartsCoreOption>({});
  readonly sourceOption = signal<EChartsCoreOption>({});

  constructor() {
    this.refreshCharts();
    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.refreshCharts();
    });
  }

  kpiIcon(tone: KpiCard['tone']): string {
    switch (tone) {
      case 'success':
        return 'wallet';
      case 'info':
        return 'invoice';
      case 'warning':
        return 'alert';
      default:
        return 'building';
    }
  }

  statusClass(status: TransactionStatus): string {
    return status === 'paid' ? 'mc-badge--approved' : 'mc-badge--review';
  }

  statusKey(status: TransactionStatus): string {
    return `DASHBOARD.STATUS.${status.toUpperCase()}`;
  }

  sparkLine(values: number[]): string {
    return this.sparkCoords(values)
      .map((p) => `${p.x},${p.y}`)
      .join(' ');
  }

  private sparkCoords(values: number[]): { x: number; y: number }[] {
    const max = Math.max(...values, 1);
    const step = 56 / Math.max(values.length - 1, 1);
    return values.map((v, i) => ({
      x: i * step,
      y: 28 - (v / max) * 22,
    }));
  }

  private refreshCharts(): void {
    const collectionLabels = {
      current: this.translate.instant('DASHBOARD.TREND.CURRENT'),
      previous: this.translate.instant('DASHBOARD.TREND.PREVIOUS'),
    };

    const sourceNames = this.sources.map((slice) => this.translate.instant(slice.labelKey));

    this.collectionOption.set(buildCollectionChartOption(this.collections, collectionLabels));
    this.sourceOption.set(
      buildSourceChartOption(
        this.sources,
        sourceNames,
        this.translate.instant('DASHBOARD.TOTAL'),
        this.sourceTotal,
      ),
    );
  }
}
