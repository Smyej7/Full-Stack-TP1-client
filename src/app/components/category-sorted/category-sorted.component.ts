import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-sorted',
  templateUrl: './category-sorted.component.html',
  styleUrls: ['./category-sorted.component.css'],
})
export class CategorySortedComponent implements OnInit {
  categories: Category[] = [];
  sortBy: string = 'name';
  direction: string = 'asc';
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadSortedCategories();
  }

  loadSortedCategories(): void {
    this.categoryService
      .getSortedCategories(this.sortBy, this.direction, this.page, this.size)
      .subscribe({
        next: (data) => {
          this.categories = data.content;
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
          console.log('totalElements', this.totalElements);
          console.log('totalPages', this.totalPages);
          console.log('size', this.size);
          console.log('page', this.page);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des catégories triées', error);
        },
      });
  }

  toggleSortDirection(): void {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this.loadSortedCategories();
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadSortedCategories();
    }
  }

  updatePageSize(newSize: number): void {
    this.size = newSize;
    this.page = 0;
    this.loadSortedCategories();
  }
}
