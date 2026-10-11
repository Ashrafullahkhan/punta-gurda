export type RequisitionListStatus =
  | 'draft'
  | 'submitted'
  | 'review'
  | 'authorized'
  | 'approved'
  | 'rejected';

export interface RequisitionListItem {
  id: string;
  number: string;
  date: string;
  title: string;
  description: string;
  hospital: string;
  type: string;
  status: RequisitionListStatus;
  amount: number;
  requestedBy: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface StatusFilterTab {
  id: 'all' | RequisitionListStatus;
  labelKey: string;
  count: number;
}
