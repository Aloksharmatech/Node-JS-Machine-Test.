// import { Component, OnInit } from '@angular/core';
// import { ProductService, Product } from '../../services/product-service';
// import { CategoryService, Category } from '../../services/category-service';

// import { CommonModule, CurrencyPipe } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   providers: [CurrencyPipe],
//   templateUrl: './home.html',
//   styleUrls: ['./home.scss'],
// })
// export class HomeComponent implements OnInit {
//   products: Product[] = [];
//   categories: Category[] = [];
//   isLoading = true;

//   constructor(
//     private productService: ProductService,
//     private categoryService: CategoryService
//   ) {}

//   ngOnInit(): void {
//     this.loadData();
//   }

//   loadData(): void {
//     this.isLoading = true;

//     this.categoryService.getCategories().subscribe({
//       next: (cats) => {
//         this.categories = cats;
//         this.productService.getProducts().subscribe({
//           next: (prods) => {
//             this.products = prods;
//             this.isLoading = false;
//           },
//           error: (err) => {
//             console.error('Error fetching products:', err);
//             this.isLoading = false;
//           },
//         });
//       },
//       error: (err) => {
//         console.error('Error fetching categories:', err);
//         this.isLoading = false;
//       },
//     });
//   }

//   getCategoryName(categoryId: number | undefined): string {
//     const cat = this.categories.find((c) => c.CategoryId === categoryId);
//     return cat ? cat.CategoryName : 'Unknown';
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product-service';
import { CategoryService, Category } from '../../services/category-service';

import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [CurrencyPipe],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isLoading = true;

  // Pagination variables
  currentPage = 1;
  totalProducts = 0;
  limit = 8; // products per page
  totalPages = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadData(this.currentPage);
  }

  loadData(page: number): void {
    this.isLoading = true;

    // First load categories
    this.categoryService.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats;

        // Then load products with pagination
        this.productService.getPaginatedProducts(page, this.limit).subscribe({
          next: (res: { data: Product[]; total: number; page: number; }) => {
            this.products = res.data;
            this.totalProducts = res.total;
            this.currentPage = res.page;
            this.totalPages = Math.ceil(this.totalProducts / this.limit);
            this.isLoading = false;
            console.log(res);
          },
          error: (err) => {
            console.error('Error fetching products:', err);
            this.isLoading = false;
          },
        });
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.isLoading = false;
      },
    });
  }

  // Go to next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadData(this.currentPage + 1);
    }
  }

  // Go to previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadData(this.currentPage - 1);
    }
  }

  // Get category name from id
  getCategoryName(categoryId: number | undefined): string {
    const cat = this.categories.find((c) => c.CategoryId === categoryId);
    return cat ? cat.CategoryName : 'Unknown';
  }
}
