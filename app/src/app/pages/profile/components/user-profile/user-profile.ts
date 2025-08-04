import { Component, input } from '@angular/core';
import { User } from '@angular/fire/auth';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  imports: [TranslatePipe],
  template: `
    @if (user(); as user) {
      <div class="flex gap-4 flex-col items-center">
        <div
          class="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
          [style.background-image]="
            'url(' + (user.photoURL || 'imgs/profile.png') + ')'
          "
        ></div>
        <div class="flex flex-col items-center justify-center">
          <p
            class="text-[22px] font-bold leading-tight tracking-[-0.015em] text-center"
          >
            {{ user.displayName || 'PROFILE.USER' | translate }}
          </p>
          <p
            class="text-gray-400 text-base font-normal leading-normal text-center"
          >
            {{ user.email || 'PROFILE.NOT_EMAIL_PROVIDER' | translate }}
          </p>
        </div>
      </div>
    }
  `,
  host: {
    class: 'flex w-full flex-col gap-4 items-center',
  },
})
export class UserProfile {
  public readonly user = input.required<User>();
}
