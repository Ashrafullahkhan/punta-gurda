export type TransactionStatus = 'paid' | 'pending';

export interface KpiCard {
  id: string;
  labelKey: string;
  value: string;
  change: number;
  changeLabelKey: string;
  tone: 'success' | 'info' | 'warning' | 'purple';
  sparkline: number[];
}

export interface TransactionRow {
  id: string;
  invoiceNo: string;
  name: string;
  type: string;
  amount: string;
  date: string;
  status: TransactionStatus;
}

export interface OutstandingAccount {
  id: string;
  name: string;
  invoiceCount: number;
  amount: string;
}

export interface AlertItem {
  id: string;
  titleKey: string;
  messageKey: string;
  timeKey: string;
  tone: 'danger' | 'warning' | 'info';
}

export interface QuickAction {
  id: string;
  labelKey: string;
  icon: 'invoice' | 'search' | 'payment' | 'receipt' | 'property' | 'taxpayer';
  tone: 'primary' | 'success' | 'info' | 'warning' | 'purple' | 'teal';
}

export interface CategorySlice {
  labelKey: string;
  value: number;
  color: string;
}

export interface CollectionPoint {
  label: string;
  current: number;
  previous: number;
}
