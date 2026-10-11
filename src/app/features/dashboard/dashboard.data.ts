import {
  AlertItem,
  CategorySlice,
  CollectionPoint,
  KpiCard,
  OutstandingAccount,
  QuickAction,
  TransactionRow,
} from '../../shared/models/dashboard.model';

export const DASHBOARD_KPIS: KpiCard[] = [
  {
    id: 'collections',
    labelKey: 'DASHBOARD.KPI.COLLECTIONS',
    value: '$285,420.50 BZD',
    change: 12.5,
    changeLabelKey: 'DASHBOARD.VS_APR',
    tone: 'success',
    sparkline: [18, 22, 20, 28, 26, 34, 40],
  },
  {
    id: 'invoices',
    labelKey: 'DASHBOARD.KPI.INVOICES',
    value: '1,248',
    change: 8.3,
    changeLabelKey: 'DASHBOARD.VS_APR',
    tone: 'info',
    sparkline: [14, 18, 22, 20, 26, 30, 34],
  },
  {
    id: 'outstanding',
    labelKey: 'DASHBOARD.KPI.OUTSTANDING',
    value: '$1,245,780.30 BZD',
    change: -3.6,
    changeLabelKey: 'DASHBOARD.VS_APR',
    tone: 'warning',
    sparkline: [36, 34, 32, 30, 28, 26, 24],
  },
  {
    id: 'properties',
    labelKey: 'DASHBOARD.KPI.PROPERTIES',
    value: '8,765',
    change: 4.2,
    changeLabelKey: 'DASHBOARD.VS_APR',
    tone: 'purple',
    sparkline: [16, 18, 20, 22, 24, 28, 30],
  },
];

export const DASHBOARD_COLLECTIONS: CollectionPoint[] = [
  { label: 'May 1', current: 6200, previous: 5400 },
  { label: 'May 5', current: 7800, previous: 6100 },
  { label: 'May 9', current: 9100, previous: 7200 },
  { label: 'May 13', current: 10500, previous: 8400 },
  { label: 'May 17', current: 9800, previous: 9000 },
  { label: 'May 21', current: 12200, previous: 9800 },
  { label: 'May 25', current: 13600, previous: 11000 },
  { label: 'May 31', current: 14800, previous: 11800 },
];

export const DASHBOARD_SOURCES: CategorySlice[] = [
  { labelKey: 'DASHBOARD.SOURCES.PROPERTY_TAX', value: 45.2, color: '#002D62' },
  { labelKey: 'DASHBOARD.SOURCES.TRADE_LICENSE', value: 18.7, color: '#0D9488' },
  { labelKey: 'DASHBOARD.SOURCES.BUSINESS_LICENSE', value: 12.9, color: '#2563EB' },
  { labelKey: 'DASHBOARD.SOURCES.MARKET_FEES', value: 8.4, color: '#F59E0B' },
  { labelKey: 'DASHBOARD.SOURCES.TRAFFIC_FINES', value: 6.1, color: '#EF4444' },
  { labelKey: 'DASHBOARD.SOURCES.OTHER_FEES', value: 8.7, color: '#8B5CF6' },
];

export const DASHBOARD_SOURCE_TOTAL = '$285,420.50';

export const DASHBOARD_TRANSACTIONS: TransactionRow[] = [
  {
    id: '1',
    invoiceNo: 'INV-2024-08421',
    name: 'Maria Castillo',
    type: 'Property Tax',
    amount: '$1,250.00',
    date: '2024-05-15',
    status: 'paid',
  },
  {
    id: '2',
    invoiceNo: 'INV-2024-08418',
    name: 'Belize Logistics Ltd.',
    type: 'Trade License',
    amount: '$3,480.00',
    date: '2024-05-15',
    status: 'pending',
  },
  {
    id: '3',
    invoiceNo: 'INV-2024-08412',
    name: 'Ocean View Resort',
    type: 'Business License',
    amount: '$2,100.00',
    date: '2024-05-14',
    status: 'paid',
  },
  {
    id: '4',
    invoiceNo: 'INV-2024-08405',
    name: 'Carlos Mendez',
    type: 'Property Tax',
    amount: '$875.50',
    date: '2024-05-14',
    status: 'paid',
  },
  {
    id: '5',
    invoiceNo: 'INV-2024-08398',
    name: 'PG Market Vendors',
    type: 'Market Fees',
    amount: '$420.00',
    date: '2024-05-13',
    status: 'pending',
  },
];

export const DASHBOARD_OUTSTANDING: OutstandingAccount[] = [
  { id: 'o1', name: 'Belize Logistics Ltd.', invoiceCount: 12, amount: '$48,320.00' },
  { id: 'o2', name: 'Southern Hardware Co.', invoiceCount: 8, amount: '$31,450.00' },
  { id: 'o3', name: 'Coastal Properties Ltd.', invoiceCount: 6, amount: '$27,890.00' },
  { id: 'o4', name: 'PG Transport Services', invoiceCount: 9, amount: '$22,150.00' },
  { id: 'o5', name: 'Maya Trading Group', invoiceCount: 5, amount: '$18,670.00' },
];

export const DASHBOARD_ALERTS: AlertItem[] = [
  {
    id: 'a1',
    titleKey: 'DASHBOARD.ALERTS.A1_TITLE',
    messageKey: 'DASHBOARD.ALERTS.A1_MSG',
    timeKey: 'DASHBOARD.ALERTS.T1',
    tone: 'danger',
  },
  {
    id: 'a2',
    titleKey: 'DASHBOARD.ALERTS.A2_TITLE',
    messageKey: 'DASHBOARD.ALERTS.A2_MSG',
    timeKey: 'DASHBOARD.ALERTS.T2',
    tone: 'warning',
  },
  {
    id: 'a3',
    titleKey: 'DASHBOARD.ALERTS.A3_TITLE',
    messageKey: 'DASHBOARD.ALERTS.A3_MSG',
    timeKey: 'DASHBOARD.ALERTS.T3',
    tone: 'info',
  },
];

export const DASHBOARD_QUICK_ACTIONS: QuickAction[] = [
  { id: 'invoice', labelKey: 'DASHBOARD.ACTIONS.CREATE_INVOICE', icon: 'invoice', tone: 'primary' },
  { id: 'search', labelKey: 'DASHBOARD.ACTIONS.SEARCH_PROPERTY', icon: 'search', tone: 'info' },
  { id: 'payment', labelKey: 'DASHBOARD.ACTIONS.RECORD_PAYMENT', icon: 'payment', tone: 'success' },
  { id: 'receipt', labelKey: 'DASHBOARD.ACTIONS.GENERATE_RECEIPT', icon: 'receipt', tone: 'warning' },
  { id: 'property', labelKey: 'DASHBOARD.ACTIONS.ADD_PROPERTY', icon: 'property', tone: 'purple' },
  { id: 'taxpayer', labelKey: 'DASHBOARD.ACTIONS.ADD_TAXPAYER', icon: 'taxpayer', tone: 'teal' },
];
