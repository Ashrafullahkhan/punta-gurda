import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideBuilding2,
  LucideCheckCircle2,
  LucideChevronDown,
  LucideClock,
  LucideFileText,
  LucideGlobe,
  LucideHeart,
  LucideIdCard,
  LucideInfo,
  LucideLock,
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideReceipt,
  LucideSearch,
  LucideShieldCheck,
  LucideUser,
} from '@lucide/angular';
import { LanguageService, AppLanguage } from '../../../core/services/language.service';

type SearchTab = 'taxId' | 'invoice' | 'property' | 'license';

interface InvoiceCharge {
  description: string;
  amount: number;
}

interface InvoiceDetails {
  invoiceNumber: string;
  propertyId: string;
  owner: string;
  address: string;
  invoiceDate: string;
  dueDate: string;
  status: string;
  daysUntilDue: number;
  total: number;
  charges: InvoiceCharge[];
}

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe,
    CurrencyPipe,
    LucideUser,
    LucideSearch,
    LucideShieldCheck,
    LucideClock,
    LucideFileText,
    LucideIdCard,
    LucideReceipt,
    LucideBuilding2,
    LucideChevronDown,
    LucideGlobe,
    LucideArrowLeft,
    LucideCheckCircle2,
    LucideLock,
    LucideInfo,
    LucidePhone,
    LucideMail,
    LucideMapPin,
    LucideHeart,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly languageService = inject(LanguageService);

  private readonly resultsSection = viewChild<ElementRef<HTMLElement>>('resultsSection');

  readonly submitted = signal(false);
  readonly searchTab = signal<SearchTab>('taxId');
  readonly searchQuery = signal('');
  readonly showResults = signal(false);
  readonly activeNav = signal('home');

  readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  readonly navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'services', label: 'Services', href: '#services', hasMenu: true },
    { id: 'guide', label: 'Payment Guide', href: '#guide' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  readonly searchTabs: { id: SearchTab; label: string; tone: string }[] = [
    { id: 'taxId', label: 'Tax ID', tone: 'green' },
    { id: 'invoice', label: 'Invoice No.', tone: 'blue' },
    { id: 'property', label: 'Property No.', tone: 'purple' },
    { id: 'license', label: 'Business License No.', tone: 'orange' },
  ];

  readonly placeholders: Record<SearchTab, string> = {
    taxId: 'Enter Taxpayer ID, e.g. PG-100254',
    invoice: 'Enter Invoice No., e.g. INV-2024-0012345',
    property: 'Enter Property No., e.g. PROP-7781',
    license: 'Enter Business License No., e.g. BL-5520',
  };

  readonly invoice: InvoiceDetails = {
    invoiceNumber: 'INV-2024-0012345',
    propertyId: 'PG-PROP-00892',
    owner: 'John Smith',
    address: '12 Front Street, Punta Gorda',
    invoiceDate: 'May 15, 2024',
    dueDate: 'June 30, 2024',
    status: 'Outstanding',
    daysUntilDue: 46,
    total: 525,
    charges: [
      { description: 'Property Tax (2024)', amount: 350 },
      { description: 'Market Fees', amount: 75 },
      { description: 'Sanitation Fees', amount: 50 },
      { description: 'Street Maintenance', amount: 50 },
    ],
  };

  readonly paymentMethods: { id: string; label: string }[] = [
    { id: 'visa', label: 'Visa' },
    { id: 'mastercard', label: 'Mastercard' },
    { id: 'atlantic', label: 'Atlantic Bank' },
    { id: 'belize', label: 'Belize Bank' },
    { id: 'ekpash', label: 'e-kpash' },
    { id: 'paypal', label: 'PayPal' },
  ];

  setLanguage(lang: AppLanguage): void {
    this.languageService.setLanguage(lang);
  }

  setSearchTab(tab: SearchTab): void {
    this.searchTab.set(tab);
    this.searchQuery.set('');
  }

  setActiveNav(id: string): void {
    this.activeNav.set(id);
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    void this.router.navigateByUrl('/app/dashboard');
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('invoice') === '1') {
      this.searchQuery.set(this.invoice.invoiceNumber);
      this.showResults.set(true);
      setTimeout(() => {
        this.resultsSection()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  onSearch(): void {
    const query = this.searchQuery().trim();
    if (!query) {
      this.searchQuery.set(this.invoice.invoiceNumber);
    }

    this.showResults.set(true);

    setTimeout(() => {
      this.resultsSection()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  openPayment(): void {
    void this.router.navigateByUrl('/payment');
  }

  backToSearch(): void {
    this.showResults.set(false);
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
