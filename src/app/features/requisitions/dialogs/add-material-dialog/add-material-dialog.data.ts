export interface MaterialOption {
  label: string;
  value: string;
}

export const MATERIAL_CATEGORIES: MaterialOption[] = [
  { label: 'Medical Supplies', value: 'Medical Supplies' },
  { label: 'Pharmaceuticals', value: 'Pharmaceuticals' },
  { label: 'Equipment', value: 'Equipment' },
  { label: 'Consumables', value: 'Consumables' },
  { label: 'Services', value: 'Services' },
];

export const MATERIAL_UNITS: MaterialOption[] = [
  { label: 'Box', value: 'Box' },
  { label: 'Unit', value: 'Unit' },
  { label: 'Pack', value: 'Pack' },
  { label: 'Bottle', value: 'Bottle' },
  { label: 'Kit', value: 'Kit' },
  { label: 'Set', value: 'Set' },
];

export const MATERIAL_CURRENCIES: MaterialOption[] = [
  { label: 'USD - US Dollar', value: 'USD' },
  { label: 'PAB - Panamanian Balboa', value: 'PAB' },
  { label: 'EUR - Euro', value: 'EUR' },
];

export const MATERIAL_SUPPLIERS: MaterialOption[] = [
  { label: 'Panama Med Corp.', value: 'Panama Med Corp.' },
  { label: 'Hospital Supply Co.', value: 'Hospital Supply Co.' },
  { label: 'Global Pharma Ltd.', value: 'Global Pharma Ltd.' },
  { label: 'MedEquip Panama', value: 'MedEquip Panama' },
];
