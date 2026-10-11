import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-placeholder-page',
  imports: [TranslatePipe],
  template: `
    <section class="placeholder mc-card">
      <h2>{{ titleKey() | translate }}</h2>
      <p>{{ 'COMMON.COMING_SOON' | translate }}</p>
    </section>
  `,
  styles: `
    .placeholder {
      padding: 2rem;
      min-height: 280px;
      display: grid;
      align-content: center;
      gap: 0.5rem;
    }

    p {
      color: var(--mc-text-muted);
    }
  `,
})
export class PlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly titleKey = toSignal(
    this.route.data.pipe(map((data) => (data['titleKey'] as string) ?? 'NAV.DASHBOARD')),
    { initialValue: 'NAV.DASHBOARD' },
  );
}
