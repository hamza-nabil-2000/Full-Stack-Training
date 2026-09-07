import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/products';
import { ViewPanel } from '../../directives/view-panel';
import { RatingSummary } from '../view-product-detail/rating-summary/rating-summary';
import { ViewReviewItem } from '../view-product-detail/view-review-item/view-review-item';
import { MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../ecommerce-store';
import { WriteReview } from '../view-product-detail/write-review/write-review';

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummary, ViewReviewItem, MatButton, WriteReview],
  template: ` <div appViewPanel>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Customer Reviews</h2>

      @if (store.user()) {
        <button matButton="filled" (click)="store.showWriteReview()">Write a Review</button>
      }
    </div>

    @if (store.writeReview()) {
      <app-write-review class="mb-6" />
    }

    <app-rating-summary [product]="product()" />

    <div class="flex flex-col gap-6">
      @for (review of sortedReview(); track review.id) {
        <app-view-review-item [review]="review" />
      }
    </div>
  </div>`,
  styles: ``,
})
export class ViewReviews {
  product = input.required<Product>();

  store = inject(EcommerceStore);

  sortedReview = computed(() => {
    return [...this.product().reviews].sort(
      (a, b) => b.reviewDate.getTime() - a.reviewDate.getTime(),
    );
  });
}
