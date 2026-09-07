import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/products';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { QtySelector } from '../../../components/qty-selector/qty-selector';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../../ecommerce-store';
import { ToggleWishlistButton } from '../../../components/toggle-wishlist-button/toggle-wishlist-button';
import { StarRating } from '../../../components/star-rating/star-rating';

@Component({
  selector: 'app-product-info',
  imports: [
    TitleCasePipe,
    DecimalPipe,
    StockStatus,
    QtySelector,
    MatButton,
    MatIcon,
    ToggleWishlistButton,
    MatIconButton,
    StarRating,
  ],
  template: `
    <div class="text-xs rounded-xl bg-gray-100 px-2 py-1 w-fit mb-4">
      {{ product().category | titlecase }}
    </div>

    <h1 class="text-2xl font-extrabold mb-3">{{ product().name }}</h1>

    <app-star-rating [rating]="product().rating" class="mb-3 block">
      {{ product().rating | number:'1.1-1' }} ({{ product().reviewCount }} reviews)
    </app-star-rating>

    <p class="text-3xl font-extrabold mb-4">Rs. {{ product().price.toLocaleString() }}</p>

    <app-stock-status class="mb-4" [inStock]="product().inStock" />

    <p class="font-semibold mb-2 mt-8">Description</p>

    <p class="text-gray-600 border-b border-gray-200 pb-6 mb-6">
      {{ product().description }}
    </p>

    <div class="mb-8">
      <span class="font-semibold">Quantity</span>
      <app-qty-selector [quantity]="quantity()" (qtyUpdated)="quantity.set($event)" />
    </div>

    <div class="flex gap-4 border-b border-gray-200 pb-6">
      <button
        mat-flat-button
        color="primary"
        class="w-full flex items-center gap-2"
        (click)="store.addToCart(product(), quantity())"
        [disabled]="!product().inStock"
      >
        <mat-icon>shopping_cart</mat-icon>
        {{ product().inStock ? 'Add to Cart' : 'Out of Stock' }}
      </button>

      <app-toggle-wishlist-button [product]="product()" />

      <button matIconButton>
        <mat-icon>share</mat-icon>
      </button>
    </div>

    <div class="pt-6 flex flex-col gap-2 text-gray-700 text-xs">
      <div class="flex items-center gap-3">
        <mat-icon class="small">local_shipping</mat-icon>
        <span>Free Shipping on order over Rs. 15,000</span>
      </div>

      <div class="flex items-center gap-3">
        <mat-icon class="small">autorenew</mat-icon>
        <span>30-Day Return Policy</span>
      </div>

      <div class="flex items-center gap-3">
        <mat-icon class="small">shield</mat-icon>
        <span>2-year warranty included</span>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductInfo {
  product = input.required<Product>();

  quantity = signal(1);

  store = inject(EcommerceStore);
}
