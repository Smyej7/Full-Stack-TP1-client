import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ApiError } from '../../models/api-error.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  apiError?: ApiError;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories(this.currentPage, this.pageSize).subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error) => {
        this.apiError = error.error;
        console.error(this.apiError);
      },
    });
  }

  // nextPage(): void {
  //   if (this.currentPage < this.totalPages - 1) {
  //     this.currentPage++;
  //     this.loadCategories();
  //   }
  // }

  // prevPage(): void {
  //   if (this.currentPage > 0) {
  //     this.currentPage--;
  //     this.loadCategories();
  //   }
  // }

  deleteCategory(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.apiError = undefined;
          this.loadCategories();
        },
        error: (error) => {
          this.apiError = error.error;
          console.error(this.apiError);
        },
      });
    }
  }
}
