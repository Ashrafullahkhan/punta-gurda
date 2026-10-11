import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideBox,
  LucideDollarSign,
  LucideFileText,
  LucideInfo,
  LucideLightbulb,
  LucidePackage,
  LucidePlus,
  LucideTruck,
  LucideX,
} from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import {
  MATERIAL_CATEGORIES,
  MATERIAL_CURRENCIES,
  MATERIAL_SUPPLIERS,
  MATERIAL_UNITS,
} from './add-material-dialog.data';

export interface AddMaterialFormValue {
  name: string;
  category: string | null;
  description: string;
  brand: string;
  model: string;
  unit: string | null;
  packageSize: string;
  shelfLife: string;
  hsCode: string;
  quantity: number | null;
  unitPrice: number | null;
  currency: string | null;
  supplier: string | null;
  supplierContact: string;
  supplierPhone: string;
  supplierEmail: string;
  justification: string;
}

@Component({
  selector: 'app-add-material-dialog',
  imports: [
    FormsModule,
    TranslatePipe,
    CurrencyPipe,
    DecimalPipe,
    InputText,
    InputNumber,
    Textarea,
    Select,
    LucideBox,
    LucideX,
    LucidePlus,
    LucideInfo,
    LucidePackage,
    LucideDollarSign,
    LucideTruck,
    LucideFileText,
    LucideLightbulb,
  ],
  templateUrl: './add-material-dialog.html',
  styleUrl: './add-material-dialog.scss',
})
export class AddMaterialDialogComponent {
  private readonly ref = inject(DynamicDialogRef);

  readonly categories = MATERIAL_CATEGORIES;
  readonly units = MATERIAL_UNITS;
  readonly currencies = MATERIAL_CURRENCIES;
  readonly suppliers = MATERIAL_SUPPLIERS;
  readonly descMax = 500;
  readonly justificationMax = 500;

  readonly name = signal('Ultra Clean Surgical Gown');
  readonly category = signal<string | null>('Medical Supplies');
  readonly description = signal(
    'Sterile disposable surgical gowns for operating rooms, size L, fluid resistant.',
  );
  readonly brand = signal('MediSafe');
  readonly model = signal('MSG-L-100');
  readonly unit = signal<string | null>('Box');
  readonly packageSize = signal('10 gowns per box');
  readonly shelfLife = signal('3 years');
  readonly hsCode = signal('6210.10');
  readonly quantity = signal<number | null>(100);
  readonly unitPrice = signal<number | null>(18.75);
  readonly currency = signal<string | null>('USD');
  readonly supplier = signal<string | null>('Panama Med Corp.');
  readonly supplierContact = signal('Ana Rodriguez');
  readonly supplierPhone = signal('+507 301-4589');
  readonly supplierEmail = signal('ana.rodriguez@panamed.com');
  readonly justification = signal(
    'Required for upcoming surgical procedures and to maintain adequate stock levels.',
  );

  readonly estimatedTotal = computed(() => {
    const qty = this.quantity() ?? 0;
    const price = this.unitPrice() ?? 0;
    return qty * price;
  });

  readonly previewName = computed(() => this.name().trim() || '—');
  readonly previewCategory = computed(() => this.category() || '—');
  readonly previewUnit = computed(() => this.unit() || '—');

  close(): void {
    this.ref.close();
  }

  submit(): void {
    const payload: AddMaterialFormValue = {
      name: this.name().trim(),
      category: this.category(),
      description: this.description().trim(),
      brand: this.brand().trim(),
      model: this.model().trim(),
      unit: this.unit(),
      packageSize: this.packageSize().trim(),
      shelfLife: this.shelfLife().trim(),
      hsCode: this.hsCode().trim(),
      quantity: this.quantity(),
      unitPrice: this.unitPrice(),
      currency: this.currency(),
      supplier: this.supplier(),
      supplierContact: this.supplierContact().trim(),
      supplierPhone: this.supplierPhone().trim(),
      supplierEmail: this.supplierEmail().trim(),
      justification: this.justification().trim(),
    };

    this.ref.close(payload);
  }
}
