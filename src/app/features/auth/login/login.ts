import { UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideArrowRight,
  LucideChartColumn,
  LucideEye,
  LucideEyeOff,
  LucideFileText,
  LucideHospital,
  LucideLock,
  LucidePill,
  LucideShieldCheck,
  LucideShoppingCart,
  LucideUser,
  LucideUsers,
} from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService, AppLanguage } from '../../../core/services/language.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    UpperCasePipe,
    LucideHospital,
    LucidePill,
    LucideShoppingCart,
    LucideUsers,
    LucideFileText,
    LucideShieldCheck,
    LucideChartColumn,
    LucideUser,
    LucideLock,
    LucideEye,
    LucideEyeOff,
    LucideArrowRight,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly languageService = inject(LanguageService);

  readonly showPassword = signal(false);
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  setLanguage(lang: AppLanguage): void {
    this.languageService.setLanguage(lang);
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    void this.router.navigateByUrl('/app/dashboard');
  }
}
