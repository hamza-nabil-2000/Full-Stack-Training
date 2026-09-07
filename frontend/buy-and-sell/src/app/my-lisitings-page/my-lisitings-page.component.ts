import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-my-lisitings-page',
  templateUrl: './my-lisitings-page.component.html',
  styleUrls: ['./my-lisitings-page.component.css'],
})
export class MyLisitingsPageComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    this.listingsService.getListingsForUser('12345').subscribe((listings) => {
      this.listings = listings;
    });
  }

  onDeleteClicked(listingId: string): void {
    this.listingsService.deleteListing(listingId).subscribe(() => {
      this.listings = this.listings.filter((listing) => listing.id !== listingId);
    });
  }
}
