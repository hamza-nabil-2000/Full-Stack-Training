import { computed, inject } from '@angular/core';
import { Product } from './models/products';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignOutParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from './models/user-review';

export type EcommerceState = {
  products: Product[];

  category: string;

  wishlistItems: Product[];

  cartItems: CartItem[];

  user: User | undefined;

  loading: boolean;

  selectedProductId: string | undefined;

  writeReview: boolean;

  showSidebar: boolean;

  searchQuery: string;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },

  withState({
    showSidebar: true,

    searchQuery: '',

    products: [
      {
        id: '1',
        name: 'Wireless Noise-Cancelling Headphones',
        description:
          'Premium wireless headphones with active noise cancellation and 30-hour battery life',
        price: Math.round(83913.98),
        imageUrl:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&w=400&q=80',
        rating: 4.6,
        reviewCount: 6,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'r-1',
            productId: '1',
            userName: 'Hamza Nabil',
            userImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            rating: 5,
            title: 'Excellent sound & ANC',
            comment:
              'Super comfortable, battery lasts forever, and the noise cancelling is top-notch.',
            reviewDate: new Date('2026-03-17'),
          },
          {
            id: 'r-2',
            productId: '1',
            userName: 'Alice Smith',
            userImageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
            rating: 4,
            title: 'Great quality but a bit heavy',
            comment:
              'The sound is amazing, but after a few hours, they start to feel a bit heavy on my head.',
            reviewDate: new Date('2026-03-16'),
          },
          {
            id: 'r-3',
            productId: '1',
            userName: 'John Doe',
            userImageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
            rating: 5,
            title: 'Best headphones I own',
            comment: 'I use these for travel and work. The noise cancellation is truly impressive.',
            reviewDate: new Date('2026-03-15'),
          },
          {
            id: 'r-4',
            productId: '1',
            userName: 'Emma Wilson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
            rating: 4,
            title: 'Good value for money',
            comment: 'Comparing these to other premium brands, these hold up really well.',
            reviewDate: new Date('2026-03-14'),
          },
          {
            id: 'r-5',
            productId: '1',
            userName: 'Michael Brown',
            userImageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
            rating: 5,
            title: 'Stunning battery life',
            comment: 'I easily get 30 hours of use. Perfect for long flights.',
            reviewDate: new Date('2026-03-13'),
          },
          {
            id: 'r-6',
            productId: '1',
            userName: 'Sarah Davis',
            userImageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
            rating: 5,
            title: 'Highly recommend!',
            comment: 'The sound profile is very balanced. Great for all types of music.',
            reviewDate: new Date('2026-03-12'),
          },
        ],
      },

      {
        id: '2',
        name: 'Smart 4K TV',
        description: '65-inch OLED Smart TV with HDR and built-in streaming apps',
        price: Math.round(363636.58),
        imageUrl:
          'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=80',
        rating: 4.9,
        reviewCount: 6,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'r-7',
            productId: '2',
            userName: 'David Miller',
            userImageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
            rating: 5,
            title: 'Breathtaking Picture',
            comment:
              'The OLED black levels are incredible. Watching movies is a whole new experience.',
            reviewDate: new Date('2026-03-10'),
          },
          {
            id: 'r-8',
            productId: '2',
            userName: 'Sophia Garcia',
            userImageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
            rating: 5,
            title: 'Worth Every Penny',
            comment: 'I was hesitant about the price, but the quality is unmatched.',
            reviewDate: new Date('2026-03-09'),
          },
          {
            id: 'r-9',
            productId: '2',
            userName: 'James Martinez',
            userImageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
            rating: 4,
            title: 'Very Good, Small Issues',
            comment: 'The smart interface is a bit laggy sometimes, but the picture is perfect.',
            reviewDate: new Date('2026-03-08'),
          },
          {
            id: 'r-10',
            productId: '2',
            userName: 'Isabella Rodriguez',
            userImageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
            rating: 5,
            title: 'Perfect for Gaming',
            comment: 'The refresh rate and HDR make games look phenomenal.',
            reviewDate: new Date('2026-03-07'),
          },
          {
            id: 'r-11',
            productId: '2',
            userName: 'Christopher Lee',
            userImageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
            rating: 4,
            title: 'Solid TV',
            comment: 'Great connectivity and sleek design. Very happy with it.',
            reviewDate: new Date('2026-03-06'),
          },
          {
            id: 'r-12',
            productId: '2',
            userName: 'Mia Hernandez',
            userImageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
            rating: 5,
            title: 'Simply the Best',
            comment: 'I researched for weeks and I am glad I chose this one.',
            reviewDate: new Date('2026-03-05'),
          },
        ],
      },

      {
        id: '3',
        name: 'Professional Camera',
        description: 'Mirrorless digital camera with 4K video capabilities',
        price: Math.round(251747.54),
        imageUrl:
          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 6,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'r-13',
            productId: '3',
            userName: 'Andrew Walker',
            userImageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
            rating: 5,
            title: 'Pro Level Quality',
            comment: 'The autofocus is blazing fast. Perfect for my photography business.',
            reviewDate: new Date('2026-03-11'),
          },
          {
            id: 'r-14',
            productId: '3',
            userName: 'Olivia Taylor',
            userImageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
            rating: 5,
            title: 'Vlogging Dream',
            comment: 'The 4K video is so crisp, and the flip-out screen is a life saver.',
            reviewDate: new Date('2026-03-10'),
          },
          {
            id: 'r-15',
            productId: '3',
            userName: 'Ryan Moore',
            userImageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
            rating: 4,
            title: 'Great but Learning Curve',
            comment: 'Takes some time to master all the settings, but it is worth it.',
            reviewDate: new Date('2026-03-09'),
          },
          {
            id: 'r-16',
            productId: '3',
            userName: 'Chloe Anderson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
            rating: 5,
            title: 'Lightweight and Powerful',
            comment: 'Amazing how they fit all this tech in such a compact body.',
            reviewDate: new Date('2026-03-08'),
          },
          {
            id: 'r-17',
            productId: '3',
            userName: 'Nathan Thomas',
            userImageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
            rating: 5,
            title: 'Excellent Lens Selection',
            comment: 'The native lenses available for this system are top-tier.',
            reviewDate: new Date('2026-03-07'),
          },
          {
            id: 'r-18',
            productId: '3',
            userName: 'Lily Jackson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
            rating: 4,
            title: 'Battery life could be better',
            comment: 'Wish the battery lasted a bit longer, but spares are cheap.',
            reviewDate: new Date('2026-03-06'),
          },
        ],
      },

      {
        id: '4',
        name: 'Classic Denim Jacket',
        description: 'Vintage-style denim jacket with modern fit',
        price: Math.round(22375.01),
        imageUrl:
          'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 5,
        inStock: false,
        category: 'fashion',
        reviews: [
          {
            id: 'r-19',
            productId: '4',
            userName: 'Tyler White',
            userImageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
            rating: 5,
            title: 'Classic Look',
            comment: 'Fits perfectly and the denim quality is very high.',
            reviewDate: new Date('2026-03-12'),
          },
          {
            id: 'r-20',
            productId: '4',
            userName: 'Grace Harris',
            userImageUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
            rating: 4,
            title: 'Stylish',
            comment: 'Goes with almost everything in my wardrobe.',
            reviewDate: new Date('2026-03-11'),
          },
          {
            id: 'r-21',
            productId: '4',
            userName: 'Brandon Clark',
            userImageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
            rating: 5,
            title: 'Rugged and Durable',
            comment: 'I have worn this daily for a month and it still looks brand new.',
            reviewDate: new Date('2026-03-10'),
          },
          {
            id: 'r-22',
            productId: '4',
            userName: 'Audrey Lewis',
            userImageUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
            rating: 5,
            title: 'Love the Fit',
            comment: 'Got a medium and it fits exactly as expected. Not too baggy.',
            reviewDate: new Date('2026-03-09'),
          },
          {
            id: 'r-23',
            productId: '4',
            userName: 'Justin Young',
            userImageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
            rating: 4,
            title: 'Good Quality',
            comment: 'Great jacket, though I wish it had one more inside pocket.',
            reviewDate: new Date('2026-03-08'),
          },
        ],
      },

      {
        id: '5',
        name: 'Cotton T-Shirt Pack',
        description: 'Set of 3 premium cotton t-shirts in essential colors',
        price: Math.round(9787.49),
        imageUrl:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=400&q=80',
        rating: 4.9,
        reviewCount: 6,
        inStock: false,
        category: 'fashion',
        reviews: [
          {
            id: 'r-24',
            productId: '5',
            userName: 'Victoria Nelson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
            rating: 5,
            title: 'Super Soft',
            comment: 'The cotton is very high quality and feels great against the skin.',
            reviewDate: new Date('2026-03-13'),
          },
          {
            id: 'r-25',
            productId: '5',
            userName: 'Kevin Hall',
            userImageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
            rating: 5,
            title: 'Perfect Basics',
            comment: 'Exactly what I needed. They wash well without shrinking.',
            reviewDate: new Date('2026-03-12'),
          },
          {
            id: 'r-26',
            productId: '5',
            userName: 'Zoe Wright',
            userImageUrl: 'https://randomuser.me/api/portraits/women/13.jpg',
            rating: 4,
            title: 'Nice Colors',
            comment: 'The essential colors are exactly as shown in the picture.',
            reviewDate: new Date('2026-03-11'),
          },
          {
            id: 'r-27',
            productId: '5',
            userName: 'Adam Lopez',
            userImageUrl: 'https://randomuser.me/api/portraits/men/14.jpg',
            rating: 5,
            title: 'Great Fit',
            comment: 'Comfortable fit, not too tight, not too loose.',
            reviewDate: new Date('2026-03-10'),
          },
          {
            id: 'r-28',
            productId: '5',
            userName: 'Leah King',
            userImageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
            rating: 5,
            title: 'Repeat Buyer',
            comment: 'I buy these every year. They are my go-to t-shirts.',
            reviewDate: new Date('2026-03-09'),
          },
          {
            id: 'r-29',
            productId: '5',
            userName: 'Mark Baker',
            userImageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
            rating: 4,
            title: 'Good Value',
            comment: 'Price for a pack of 3 is very reasonable.',
            reviewDate: new Date('2026-03-08'),
          },
        ],
      },

      {
        id: '6',
        name: 'Wool Winter Coat',
        description: 'Elegant wool-blend coat perfect for cold weather',
        price: Math.round(55941.72),
        imageUrl:
          'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 6,
        inStock: true,
        category: 'fashion',
        reviews: [
          {
            id: 'r-30',
            productId: '6',
            userName: 'Maya Green',
            userImageUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
            rating: 5,
            title: 'Warm and Stylish',
            comment: 'Perfect for winter. I get compliments every time I wear it.',
            reviewDate: new Date('2026-03-14'),
          },
          {
            id: 'r-31',
            productId: '6',
            userName: 'Paul Adams',
            userImageUrl: 'https://randomuser.me/api/portraits/men/16.jpg',
            rating: 5,
            title: 'Quality Material',
            comment: 'The wool blend is thick and keeps the wind out.',
            reviewDate: new Date('2026-03-13'),
          },
          {
            id: 'r-32',
            productId: '6',
            userName: 'Stacy Hill',
            userImageUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
            rating: 4,
            title: 'Elegant Fit',
            comment: 'Tailored very well, though the sleeves are slightly long for me.',
            reviewDate: new Date('2026-03-12'),
          },
          {
            id: 'r-33',
            productId: '6',
            userName: 'Eric Rivera',
            userImageUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
            rating: 5,
            title: 'Great Value',
            comment: 'Looks much more expensive than it actually is.',
            reviewDate: new Date('2026-03-11'),
          },
          {
            id: 'r-34',
            productId: '6',
            userName: 'Claire Campbell',
            userImageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
            rating: 5,
            title: 'Beautiful Color',
            comment: 'The color is deep and rich. Very happy with this purchase.',
            reviewDate: new Date('2026-03-10'),
          },
          {
            id: 'r-35',
            productId: '6',
            userName: 'Gary Mitchell',
            userImageUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
            rating: 4,
            title: 'Warm enough',
            comment: 'Kept me warm even in freezing temperatures.',
            reviewDate: new Date('2026-03-09'),
          },
        ],
      },

      {
        id: '7',
        name: 'Leather Watch',
        description: 'Classic analog watch with genuine leather strap',
        price: Math.round(41955.59),
        imageUrl:
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 5,
        inStock: true,
        category: 'fashion',
        reviews: [
          {
            id: 'r-36',
            productId: '7',
            userName: 'Anna Carter',
            userImageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
            rating: 5,
            title: 'Timeless Piece',
            comment: 'The leather strap is soft and the watch face is very clear.',
            reviewDate: new Date('2026-03-15'),
          },
          {
            id: 'r-37',
            productId: '7',
            userName: 'Luke Roberts',
            userImageUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
            rating: 4,
            title: 'Simple and Clean',
            comment: 'Elegant design. Matches everything.',
            reviewDate: new Date('2026-03-14'),
          },
          {
            id: 'r-38',
            productId: '7',
            userName: 'Julia Phillips',
            userImageUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
            rating: 5,
            title: 'Perfect Gift',
            comment: 'Bought this for my husband and he absolutely loves it.',
            reviewDate: new Date('2026-03-13'),
          },
          {
            id: 'r-39',
            productId: '7',
            userName: 'Scott Evans',
            userImageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
            rating: 5,
            title: 'High Quality',
            comment: 'You can tell the leather is genuine. Feels very premium.',
            reviewDate: new Date('2026-03-12'),
          },
          {
            id: 'r-40',
            productId: '7',
            userName: 'Paige Turner',
            userImageUrl: 'https://randomuser.me/api/portraits/women/20.jpg',
            rating: 4,
            title: 'Nice Watch',
            comment: 'Very happy with it, though the strap was a bit stiff initially.',
            reviewDate: new Date('2026-03-11'),
          },
        ],
      },

      {
        id: '8',
        name: 'Designer Sunglasses',
        description: 'UV-protected polarized sunglasses with premium frame',
        price: Math.round(36361.14),
        imageUrl:
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 6,
        inStock: true,
        category: 'fashion',
        reviews: [
          {
            id: 'r-41',
            productId: '8',
            userName: 'Sean Stewart',
            userImageUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
            rating: 5,
            title: 'Great Vision',
            comment: 'The polarization is fantastic. Makes a huge difference when driving.',
            reviewDate: new Date('2026-03-16'),
          },
          {
            id: 'r-42',
            productId: '8',
            userName: 'Bethany Morris',
            userImageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
            rating: 5,
            title: 'Stylish and Protective',
            comment: 'Look great and I feel my eyes are well-protected.',
            reviewDate: new Date('2026-03-15'),
          },
          {
            id: 'r-43',
            productId: '8',
            userName: 'Jason Rogers',
            userImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
            rating: 4,
            title: 'Lightweight',
            comment: 'So light I almost forget I am wearing them.',
            reviewDate: new Date('2026-03-14'),
          },
          {
            id: 'r-44',
            productId: '8',
            userName: 'Megan Reed',
            userImageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
            rating: 5,
            title: 'Excellent Case',
            comment: 'Comes with a very nice hard case and cleaning cloth.',
            reviewDate: new Date('2026-03-13'),
          },
          {
            id: 'r-45',
            productId: '8',
            userName: 'Patrick Cook',
            userImageUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
            rating: 4,
            title: 'Good value',
            comment: 'Excellent quality for the price.',
            reviewDate: new Date('2026-03-12'),
          },
          {
            id: 'r-46',
            productId: '8',
            userName: 'Holly Morgan',
            userImageUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
            rating: 5,
            title: 'Love the Shape',
            comment: 'The frame shape is very flattering. Highly recommend.',
            reviewDate: new Date('2026-03-11'),
          },
        ],
      },

      {
        id: '9',
        name: 'Leather Wallet',
        description: 'Handcrafted leather wallet with RFID protection',
        price: Math.round(13983.33),
        imageUrl:
          'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 6,
        inStock: true,
        category: 'fashion',
        reviews: [
          {
            id: 'r-47',
            productId: '9',
            userName: 'Jeremy Bell',
            userImageUrl: 'https://randomuser.me/api/portraits/men/24.jpg',
            rating: 5,
            title: 'Slim and Secure',
            comment: 'Fits all my cards but stays very slim in my pocket.',
            reviewDate: new Date('2026-03-17'),
          },
          {
            id: 'r-48',
            productId: '9',
            userName: 'Monica Murphy',
            userImageUrl: 'https://randomuser.me/api/portraits/women/24.jpg',
            rating: 5,
            title: 'Great RFID Protection',
            comment: 'Tested it and it works. Feel much safer now.',
            reviewDate: new Date('2026-03-16'),
          },
          {
            id: 'r-49',
            productId: '9',
            userName: 'Dustin Bailey',
            userImageUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
            rating: 4,
            title: 'Quality Leather',
            comment: 'Beautiful leather, should age really well.',
            reviewDate: new Date('2026-03-15'),
          },
          {
            id: 'r-50',
            productId: '9',
            userName: 'Lauren Rivera',
            userImageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
            rating: 5,
            title: 'Perfect Organization',
            comment: 'Enough slots for all my cards and a nice compartment for cash.',
            reviewDate: new Date('2026-03-14'),
          },
          {
            id: 'r-51',
            productId: '9',
            userName: 'Eddie Cooper',
            userImageUrl: 'https://randomuser.me/api/portraits/men/26.jpg',
            rating: 4,
            title: 'Good Wallet',
            comment: 'Met all my expectations. Solid build quality.',
            reviewDate: new Date('2026-03-13'),
          },
          {
            id: 'r-52',
            productId: '9',
            userName: 'Cynthia Richardson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
            rating: 5,
            title: 'Beautiful Packaging',
            comment: 'Came in a lovely box, perfect for gifting.',
            reviewDate: new Date('2026-03-12'),
          },
        ],
      },

      {
        id: '10',
        name: 'Smart Coffee Maker',
        description: 'WiFi-enabled coffee maker with programmable brewing',
        price: Math.round(55941.72),
        imageUrl:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 5,
        inStock: true,
        category: 'home',
        reviews: [
          {
            id: 'r-53',
            productId: '10',
            userName: 'Marcus Cox',
            userImageUrl: 'https://randomuser.me/api/portraits/men/27.jpg',
            rating: 5,
            title: 'Best Coffee Ever',
            comment: 'Scheduling my coffee for the morning is a game changer.',
            reviewDate: new Date('2026-03-17'),
          },
          {
            id: 'r-54',
            productId: '10',
            userName: 'Rachel Howard',
            userImageUrl: 'https://randomuser.me/api/portraits/women/27.jpg',
            rating: 4,
            title: 'Very Convenient',
            comment: 'The app works well and the coffee is always fresh.',
            reviewDate: new Date('2026-03-16'),
          },
          {
            id: 'r-55',
            productId: '10',
            userName: 'Dennis Ward',
            userImageUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
            rating: 5,
            title: 'Sleek Design',
            comment: "Looks great on my kitchen counter and isn't too bulky.",
            reviewDate: new Date('2026-03-15'),
          },
          {
            id: 'r-56',
            productId: '10',
            userName: 'Vanessa Torres',
            userImageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
            rating: 5,
            title: 'Easy to Clean',
            comment: 'Maintenance is a breeze. Most parts are dishwasher safe.',
            reviewDate: new Date('2026-03-14'),
          },
          {
            id: 'r-57',
            productId: '10',
            userName: 'Franklin Peterson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
            rating: 4,
            title: 'Good smart features',
            comment: 'A bit pricey but the convenience is well worth it.',
            reviewDate: new Date('2026-03-13'),
          },
        ],
      },

      {
        id: '11',
        name: 'Air Purifier',
        description: 'HEPA air purifier with air quality monitoring',
        price: Math.round(69927.85),
        imageUrl:
          'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 5,
        inStock: true,
        category: 'home',
        reviews: [
          {
            id: 'r-58',
            productId: '11',
            userName: 'Teresa Gray',
            userImageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
            rating: 5,
            title: 'Noticeable Difference',
            comment: 'My allergies have much improved since I started using this.',
            reviewDate: new Date('2026-03-17'),
          },
          {
            id: 'r-59',
            productId: '11',
            userName: 'Alvin Simmons',
            userImageUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
            rating: 4,
            title: 'Quiet and Efficient',
            comment: 'I can leave it on at night and it doesnt disturb my sleep.',
            reviewDate: new Date('2026-03-16'),
          },
          {
            id: 'r-60',
            productId: '11',
            userName: 'Mona Foster',
            userImageUrl: 'https://randomuser.me/api/portraits/women/30.jpg',
            rating: 5,
            title: 'Love the Sensors',
            comment: 'The air quality light is very reactive. Great to see it working.',
            reviewDate: new Date('2026-03-15'),
          },
          {
            id: 'r-61',
            productId: '11',
            userName: 'Oscar Perry',
            userImageUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
            rating: 5,
            title: 'Solid Build',
            comment: 'Well-constructed and looks like it will last a long time.',
            reviewDate: new Date('2026-03-14'),
          },
          {
            id: 'r-62',
            productId: '11',
            userName: 'Erica Bryant',
            userImageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
            rating: 4,
            title: 'Clean Air',
            comment: 'Does a great job filtering out cooking smells and dust.',
            reviewDate: new Date('2026-03-13'),
          },
        ],
      },

      {
        id: '12',
        name: 'Robot Vacuum',
        description: 'Smart robot vacuum with mapping and scheduling',
        price: Math.round(111886.24),
        imageUrl:
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 6,
        inStock: false,
        category: 'home',
        reviews: [
          {
            id: 'r-63',
            productId: '12',
            userName: 'Gilbert Alexander',
            userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
            title: 'Saves so much time',
            comment: "I don't have to vacuum anymore. Truly a life saver.",
            reviewDate: new Date('2026-03-17'),
          },
          {
            id: 'r-64',
            productId: '12',
            userName: 'Leona Russell',
            userImageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
            rating: 5,
            title: 'Smart Mapping',
            comment: 'Mapped out my entire apartment perfectly on the first run.',
            reviewDate: new Date('2026-03-16'),
          },
          {
            id: 'r-65',
            productId: '12',
            userName: 'Clifford Griffin',
            userImageUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
            rating: 4,
            title: 'Good Suction',
            comment: 'Strong enough to pick up pet hair from my rugs.',
            reviewDate: new Date('2026-03-15'),
          },
          {
            id: 'r-66',
            productId: '12',
            userName: 'Isabel Diaz',
            userImageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
            rating: 5,
            title: 'Great App Interface',
            comment: 'The scheduling features are very easy to use.',
            reviewDate: new Date('2026-03-14'),
          },
          {
            id: 'r-67',
            productId: '12',
            userName: 'Marshall Hayes',
            userImageUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
            rating: 4,
            title: 'Solid Vacuum',
            comment: 'Works as advertised. Very happy with the purchase.',
            reviewDate: new Date('2026-03-13'),
          },
          {
            id: 'r-68',
            productId: '12',
            userName: 'Florence Myers',
            userImageUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
            rating: 5,
            title: 'Impressive Tech',
            comment: 'The obstacle avoidance is actually very good.',
            reviewDate: new Date('2026-03-12'),
          },
        ],
      },
    ],

    category: 'all',

    wishlistItems: [],

    cartItems: [],

    user: undefined,

    loading: false,

    selectedProductId: undefined,

    writeReview: false,
  } as EcommerceState),

  withStorageSync({
    key: 'modern-store',
    select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  }),

  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId, searchQuery }) => ({
    filteredProducts: computed(() => {
      let filtered = products();

      if (category() !== 'all') {
        filtered = filtered.filter((p: Product) => p.category.toLowerCase() === category());
      }

      if (searchQuery()) {
        const query = searchQuery().toLowerCase();
        filtered = filtered.filter(
          (p: Product) =>
            p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
        );
      }

      return filtered;
    }),

    wishlistCount: computed(() => wishlistItems().length),

    cartCount: computed(() => cartItems().reduce((acc, items) => acc + items.quantity, 0)),

    selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
  })),

  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      setSearchQuery: signalMethod<string>((searchQuery: string) => {
        patchState(store, { searchQuery });
      }),

      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
      }),

      toggleSidebar: () => {
        patchState(store, { showSidebar: !store.showSidebar() });
      },

      addToWishlist: (product: Product) => {
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, { wishlistItems: updatedWishlistItems });
        toaster.success('Product added to wishlist');
      },

      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist');
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
        toaster.success('Wishlist cleared');
      },

      addToCart: (product: Product, quantity = 1) => {
        const existingItemIndex = store.cartItems().findIndex((i) => i.product.id === product.id);

        const updatedCartItem = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }

          draft.push({
            product,
            quantity,
          });
        });

        patchState(store, { cartItems: updatedCartItem });

        toaster.success(
          existingItemIndex !== -1 ? 'Product Added Again' : 'Product Added to the Cart',
        );
      },

      setItemQuantity(params: { productId: string; quantity: number }) {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);

        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });

        patchState(store, { cartItems: updated });
      },

      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });

        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
        toaster.success('All wishlist items added to cart');
      },

      moveToWishlist: (product: Product) => {
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);

        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
        toaster.success('Product moved to wishlist');
      },

      removeFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
        });
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }

        router.navigate(['/checkout']);
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'Hamza Nabil',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signUp: ({ name, email, password, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'Hamza Nabil',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
      },

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Please sign in to place an order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0),
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        toaster.success('Order placed successfully');
        router.navigate(['order-success']);
      },

      showWriteReview: () => {
        patchState(store, { writeReview: true });
      },

      hideWriteReview: () => {
        patchState(store, { writeReview: false });
      },

      addReview: async ({ title, comment, rating }: AddReviewParams) => {
        patchState(store, { loading: true });

        const product = store.products().find((p) => p.id === store.selectedProductId());

        if (!product) {
          patchState(store, { loading: false });
          return;
        }

        const review: UserReview = {
          id: crypto.randomUUID(),
          title,
          comment,
          rating,
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || '',
          reviewDate: new Date(),
        };

        const updatedProduct = produce(store.products(), (draft) => {
          const index = draft.findIndex((p) => p.id === product.id);
          draft[index].reviews.push(review);
          draft[index].rating =
            Math.round(
              (draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
                draft[index].reviews.length) *
                10,
            ) / 10;

          draft[index].reviewCount = draft[index].reviews.length;
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, products: updatedProduct, writeReview: false });
        toaster.success('Review added successfully');
      },
    }),
  ),
);
