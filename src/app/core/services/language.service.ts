import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type AppLanguage = 'es' | 'en' | 'pt';

const STORAGE_KEY = 'punta-gurda-lang';
const SUPPORTED: AppLanguage[] = ['es', 'en', 'pt'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);

  readonly currentLang = signal<AppLanguage>(this.resolveInitialLang());
  readonly languages: AppLanguage[] = SUPPORTED;

  init(): void {
    const lang = this.currentLang();
    this.translate.setFallbackLang('en');
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }

  setLanguage(lang: AppLanguage): void {
    if (!SUPPORTED.includes(lang)) {
      return;
    }

    this.currentLang.set(lang);
    this.translate.use(lang);
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }

  private resolveInitialLang(): AppLanguage {
    const stored = localStorage.getItem(STORAGE_KEY) as AppLanguage | null;
    if (stored && SUPPORTED.includes(stored)) {
      return stored;
    }

    const browser = navigator.language.slice(0, 2).toLowerCase();
    if (browser === 'es' || browser === 'pt') {
      return browser;
    }

    return 'en';
  }
}
