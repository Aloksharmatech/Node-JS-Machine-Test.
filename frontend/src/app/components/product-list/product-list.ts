import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';

interface Product {
  ProductId: number;
  ProductName: string;
  CategoryId: number;
  Price: number;
}

interface Category {
  CategoryId: number;
  CategoryName: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ProductService, CategoryService],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductList implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  newProduct: Partial<Product> = {
    ProductName: '',
    CategoryId: undefined,
    Price: undefined,
  };

  // Edit modal
  isEditModalOpen: boolean = false;
  editingProduct: Partial<Product> = {
    ProductId: undefined,
    ProductName: '',
    CategoryId: undefined,
    Price: undefined,
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  // Fetch all categories
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  // Fetch all products
  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data as Product[];
        console.log(data);
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  // Add new product
  onSubmit() {
    if (
      !this.newProduct.ProductName?.trim() ||
      !this.newProduct.CategoryId ||
      !this.newProduct.Price
    )
      return;

    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.newProduct = {
          ProductName: '',
          CategoryId: undefined,
          Price: undefined,
        };
        this.loadProducts();
        alert('Product added successfully!');
      },
      error: (err) => console.error('Error adding product:', err),
    });
  }

  // Open edit modal
  openEditModal(prod: Product) {
    this.editingProduct = { ...prod };
    this.isEditModalOpen = true;
  }

  // Save edited product
  saveEdit() {
    if (
      !this.editingProduct.ProductName?.trim() ||
      !this.editingProduct.CategoryId ||
      !this.editingProduct.Price ||
      !this.editingProduct.ProductId
    )
      return;

    this.productService
      .updateProduct(this.editingProduct.ProductId, this.editingProduct)
      .subscribe({
        next: () => {
          this.isEditModalOpen = false;
          this.editingProduct = {
            ProductId: undefined,
            ProductName: '',
            CategoryId: undefined,
            Price: undefined,
          };
          this.loadProducts();
          alert('Product updated successfully!');
        },
        error: (err) => console.error('Error updating product:', err),
      });
  }

  // Delete product
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Error deleting product:', err),
      });
    }
  }

  // Close modal
  closeModal() {
    this.isEditModalOpen = false;
    this.editingProduct = {
      ProductId: undefined,
      ProductName: '',
      CategoryId: undefined,
      Price: undefined,
    };
  }

  getCategoryName(CategoryId: number | undefined): string {
    if (!CategoryId || !this.categories) return 'Unknown';
    const cat = this.categories.find((c) => c.CategoryId === CategoryId);
    return cat ? cat.CategoryName : 'Unknown';
  }
}
