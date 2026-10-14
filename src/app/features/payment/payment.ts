import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideBuilding2,
  LucideCalendar,
  LucideChevronDown,
  LucideClock,
  LucideCreditCard,
  LucideFileText,
  LucideGlobe,
  LucideHeart,
  LucideInfo,
  LucideLock,
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideShieldCheck,
} from '@lucide/angular';
import { LanguageService, AppLanguage } from '../../core/services/language.service';

type PayMethod = 'visa' | 'mastercard' | 'ekpash' | 'atlantic' | 'belize' | 'paypal';

@Component({
  selector: 'app-payment',
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    CurrencyPipe,
    LucideArrowLeft,
    LucideCreditCard,
    LucideCalendar,
    LucideInfo,
    LucideLock,
    LucideShieldCheck,
    LucideClock,
    LucideBuilding2,
    LucideFileText,
    LucideChevronDown,
    LucideGlobe,
    LucidePhone,
    LucideMail,
    LucideMapPin,
    LucideHeart,
  ],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class PaymentComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly languageService = inject(LanguageService);

  readonly activeNav = signal('home');
  readonly selectedMethod = signal<PayMethod>('visa');
  readonly saveCard = signal(false);

  readonly navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/#services', hasMenu: true },
    { id: 'guide', label: 'Payment Guide', href: '/#guide' },
    { id: 'faq', label: 'FAQ', href: '/#faq' },
    { id: 'contact', label: 'Contact', href: '/#contact' },
  ];

  readonly payMethods: {
    id: PayMethod;
    title: string;
    subtitle: string;
    logo: string;
    alt: string;
  }[] = [
    {
      id: 'visa',
      title: 'Credit / Debit Card',
      subtitle: 'Visa, Mastercard',
      logo: 'assets/images/payment-methods/visa.svg',
      alt: 'Visa',
    },
    {
      id: 'mastercard',
      title: 'Credit / Debit Card',
      subtitle: 'Mastercard',
      logo: 'assets/images/payment-methods/mastercard.svg',
      alt: 'Mastercard',
    },
    {
      id: 'ekpash',
      title: 'e-Kash',
      subtitle: 'Online Payment',
      logo: 'assets/images/payment-methods/ekash.svg',
      alt: 'e-Kash',
    },
    {
      id: 'atlantic',
      title: 'Atlantic Bank',
      subtitle: 'Online Banking',
      logo: 'assets/images/payment-methods/atlantic-bank.svg',
      alt: 'Atlantic Bank',
    },
    {
      id: 'belize',
      title: 'Belize Bank',
      subtitle: 'Online Banking',
      logo: 'assets/images/payment-methods/belize-bank.svg',
      alt: 'Belize Bank',
    },
    {
      id: 'paypal',
      title: 'PayPal',
      subtitle: 'Online Payment',
      logo: 'assets/images/payment-methods/paypal.svg',
      alt: 'PayPal',
    },
  ];

  readonly paymentMethods = [
    { id: 'visa', label: 'Visa' },
    { id: 'mastercard', label: 'Mastercard' },
    { id: 'atlantic', label: 'Atlantic Bank' },
    { id: 'belize', label: 'Belize Bank' },
    { id: 'ekpash', label: 'e-kpash' },
    { id: 'paypal', label: 'PayPal' },
  ];

  readonly invoice = {
    invoiceNumber: 'INV-2024-0012345',
    propertyId: 'PG-100254',
    owner: 'John Smith',
    invoiceDate: 'May 15, 2024',
    dueDate: 'June 30, 2024',
    status: 'Outstanding',
    daysUntilDue: 46,
    total: 525,
  };

  readonly payForm = this.fb.nonNullable.group({
    cardNumber: ['', Validators.required],
    nameOnCard: ['', Validators.required],
    expiry: ['', Validators.required],
    cvv: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
  });

  setLanguage(lang: AppLanguage): void {
    this.languageService.setLanguage(lang);
  }

  setActiveNav(id: string): void {
    this.activeNav.set(id);
  }

  selectMethod(id: PayMethod): void {
    this.selectedMethod.set(id);
  }

  backToInvoice(): void {
    void this.router.navigateByUrl('/?invoice=1');
  }

  goHome(): void {
    void this.router.navigateByUrl('/');
  }

  onPay(): void {
    if (this.payForm.invalid) {
      this.payForm.markAllAsTouched();
      return;
    }
  }
}
