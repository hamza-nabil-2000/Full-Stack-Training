import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderActions } from '../header-actions/header-actions';
import { inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, HeaderActions],
  template: `
    <mat-toolbar class="w-full elevated py-2">
      <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between gap-4">
        <div class="flex items-center gap-4 shrink-0">
          <button mat-icon-button (click)="store.toggleSidebar()">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="font-bold text-xl hidden md:block">Modern Store</span>
        </div>

        <div class="flex-grow max-w-[600px] relative">
          <div
            class="w-150 flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-190"
          >
            <mat-icon class="text-gray-400 mr-3">search</mat-icon>
            <input
              type="text"
              placeholder="Search products..."
              class="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
              [value]="store.searchQuery()"
              (input)="store.setSearchQuery($any($event.target).value)"
            />
          </div>
        </div>

        <div class="shrink-0">
          <app-header-actions />
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: `
    .glass-effect {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    :host-context(.dark) .glass-effect {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .search-container:focus-within {
      ring: 2px solid rgba(var(--primary-color), 0.3);
      box-shadow: 0 0 0 2px rgba(var(--primary-color), 0.3);
      border-color: rgba(var(--primary-color), 0.5);
    }
  `,
})
export class Header {
  store = inject(EcommerceStore);
}
