import { CurrencyPipe, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  LucideChevronRight,
  LucideDownload,
  LucideEye,
  LucideFileText,
  LucideFilter,
  LucideMoreVertical,
  LucidePencil,
  LucidePlus,
  LucideSearch,
  LucideSettings2,
  LucideSlidersHorizontal,
} from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePicker } from 'primeng/datepicker';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { RequisitionListItem, RequisitionListStatus } from '../../shared/models/requisition.model';
import { AddMaterialDialogComponent } from './dialogs/add-material-dialog/add-material-dialog';
import {
  REQUISITION_HOSPITALS,
  REQUISITION_ROWS,
  REQUISITION_STATUS_TABS,
  REQUISITION_STATUSES,
  REQUISITION_TYPES,
} from './requisitions.data';

@Component({
  selector: 'app-requisitions',
  imports: [
    FormsModule,
    RouterLink,
    TranslatePipe,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    NgClass,
    TableModule,
    Select,
    DatePicker,
    InputText,
    IconField,
    InputIcon,
    LucidePlus,
    LucideSearch,
    LucideFilter,
    LucideSlidersHorizontal,
    LucideDownload,
    LucideSettings2,
    LucideFileText,
    LucideEye,
    LucidePencil,
    LucideMoreVertical,
    LucideChevronRight,
  ],
  providers: [DialogService],
  templateUrl: './requisitions.html',
  styleUrl: './requisitions.scss',
})
export class RequisitionsComponent {
  private readonly dialogService = inject(DialogService);

  readonly hospitals = REQUISITION_HOSPITALS;
  readonly statuses = REQUISITION_STATUSES;
  readonly types = REQUISITION_TYPES;
  readonly statusTabs = REQUISITION_STATUS_TABS;
  readonly allRows = REQUISITION_ROWS;

  readonly searchQuery = signal('');
  readonly hospital = signal<string>('all');
  readonly status = signal<string>('all');
  readonly type = signal<string>('all');
  readonly dateRange = signal<Date[] | null>(null);
  readonly activeTab = signal<'all' | RequisitionListStatus>('all');
  readonly rowsPerPage = signal(10);
  readonly moreFiltersOpen = signal(false);

  selectedRows: RequisitionListItem[] = [];
  private materialDialogRef: DynamicDialogRef | null = null;

  readonly filteredRows = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const hospital = this.hospital();
    const status = this.status();
    const type = this.type();
    const tab = this.activeTab();
    const range = this.dateRange();

    return this.allRows.filter((row) => {
      const matchesQuery =
        !query ||
        row.number.toLowerCase().includes(query) ||
        row.title.toLowerCase().includes(query) ||
        row.description.toLowerCase().includes(query) ||
        row.requestedBy.toLowerCase().includes(query);

      const matchesHospital = hospital === 'all' || row.hospital === hospital;
      const matchesStatus = status === 'all' || row.status === status;
      const matchesType = type === 'all' || row.type === type;
      const matchesTab = tab === 'all' || row.status === tab;

      let matchesDate = true;
      if (range?.[0]) {
        const rowDate = new Date(row.date);
        const start = new Date(range[0]);
        start.setHours(0, 0, 0, 0);
        matchesDate = rowDate >= start;
        if (range[1]) {
          const end = new Date(range[1]);
          end.setHours(23, 59, 59, 999);
          matchesDate = matchesDate && rowDate <= end;
        }
      }

      return (
        matchesQuery && matchesHospital && matchesStatus && matchesType && matchesTab && matchesDate
      );
    });
  });

  openCreateRequisition(): void {
    this.materialDialogRef?.close();
    this.materialDialogRef = this.dialogService.open(AddMaterialDialogComponent, {
      showHeader: false,
      modal: true,
      dismissableMask: true,
      closable: false,
      closeOnEscape: true,
      focusOnShow: false,
      width: '1400px',
      style: {
        width: '1400px',
        maxWidth: '98vw',
      },
      styleClass: 'mc-dynamic-dialog amd-dialog',
      contentStyle: {
        padding: '0',
        overflow: 'hidden',
        borderRadius: '14px',
      },
      breakpoints: {
        '1500px': '96vw',
        '900px': '98vw',
      },
      data: {
        source: 'create-requisition',
      },
    });

    this.materialDialogRef?.onClose.subscribe((result) => {
      this.materialDialogRef = null;
      if (result) {
        console.info('Material added from create requisition:', result);
      }
    });
  }

  setTab(tab: 'all' | RequisitionListStatus): void {
    this.activeTab.set(tab);
    this.status.set(tab === 'all' ? 'all' : tab);
  }

  onStatusChange(value: string): void {
    this.status.set(value);
    this.activeTab.set(value === 'all' ? 'all' : (value as RequisitionListStatus));
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.hospital.set('all');
    this.status.set('all');
    this.type.set('all');
    this.dateRange.set(null);
    this.activeTab.set('all');
    this.selectedRows = [];
  }

  toggleMoreFilters(): void {
    const next = !this.moreFiltersOpen();
    this.moreFiltersOpen.set(next);
    if (!next) {
      this.activeTab.set('all');
      this.status.set('all');
    }
  }

  applySearch(): void {
    // Filters are reactive via signals; button retained for mock UX.
  }

  statusClass(status: RequisitionListStatus): string {
    const map: Record<RequisitionListStatus, string> = {
      draft: 'mc-badge--draft',
      submitted: 'mc-badge--submitted',
      review: 'mc-badge--review',
      authorized: 'mc-badge--authorized',
      approved: 'mc-badge--approved',
      rejected: 'mc-badge--rejected',
    };
    return map[status];
  }

  statusKey(status: RequisitionListStatus): string {
    return `REQUISITIONS.STATUS.${status.toUpperCase()}`;
  }
}
