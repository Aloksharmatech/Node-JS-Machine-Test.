import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Category, CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [CategoryService],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.scss'],
})
export class CategoryList implements OnInit {
  newCategory: string = '';
  categories: Category[] = [];

  isEditModalOpen: boolean = false;
  editingCategoryId: number | null = null;
  editingCategoryName: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  openEditModal(cat: any) {
    this.editingCategoryId = cat.CategoryId;
    this.editingCategoryName = cat.CategoryName;
    this.isEditModalOpen = true;
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  onSubmit() {
    if (!this.newCategory.trim()) return;

    const category: Partial<Category> = { CategoryName: this.newCategory };

    this.categoryService.addCategory(category as Category).subscribe({
      next: (res) => {
        console.log('Category added', res);
        this.newCategory = '';
        alert('Category added successfully!');
        this.loadCategories();
      },
      error: (err) => {
        console.error('Error adding category:', err);
        alert('Failed to add category');
      },
    });
  }


  saveEdit() {
    if (!this.editingCategoryName.trim() || this.editingCategoryId === null)
      return;

    const updatedCategory: Partial<Category> = {
      CategoryName: this.editingCategoryName,
    };

    this.categoryService
      .updateCategory(this.editingCategoryId, updatedCategory)
      .subscribe({
        next: () => {
          this.isEditModalOpen = false;
          this.editingCategoryId = null;
          this.editingCategoryName = '';
          this.loadCategories();
          alert('Category updated successfully!');
        },
        error: (err) => console.error('Error updating category:', err),
      });
  }

  // Delete category
  deleteCategory(categoryId: number) {
    if (confirm(`Are you sure you want to delete"?`)) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: (res) => {
          this.categories = this.categories.filter(
            (c) => c.CategoryId !== categoryId
          );
          alert('Category deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting category:', err);
          alert('Failed to delete category');
        },
      });
    }
  }

  closeModal() {
    this.isEditModalOpen = false;
    this.editingCategoryId = null;
    this.editingCategoryName = '';
  }
}
