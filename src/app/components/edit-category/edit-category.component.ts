import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ApiError } from '../../models/api-error.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  categoryId: number = 0;
  category: Partial<Category> = { name: '', parent: undefined };
  categories: Category[] = [];
  successMessage: string = '';
  apiError?: ApiError;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.loadCategoryDetails();
    this.loadParentCategories();
  }

  loadCategoryDetails(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (data: Category) => {
        this.category = data;
        console.log(this.category);
        this.loadParentCategories();
      },
      error: (error) => {
        this.apiError = error.error;
        console.error(this.apiError);
      },
    });
  }

  loadParentCategories(): void {
    this.categoryService.getAllCategories(0, 100, 'name').subscribe({
      next: (data: Category[]) => {
        this.categories = data.filter((cat) => cat.id !== this.categoryId);

        if (this.category.parent) {
          const parentCategory = this.categories.find(
            (cat) => cat.id === this.category.parent?.id
          );
          if (parentCategory) {
            this.category.parent = parentCategory;
          }
        }
      },
      error: (error) => {
        this.apiError = error.error;
        console.error(this.apiError);
      },
    });
  }

  updateCategory(): void {
    if (!this.category.name) {
      this.apiError = {
        status: 400,
        message: 'Le nom de la catégorie est obligatoire.',
        timestamp: Date.now(),
      };
      return;
    }

    if (this.category.parent && this.category.parent.id === this.category.id) {
      this.apiError = {
        status: 400,
        message: 'Une catégorie ne peut pas être son propre parent.',
        timestamp: Date.now(),
      };
      return;
    }

    this.categoryService.updateCategory(this.categoryId, this.category as Category).subscribe({
      next: () => {
        this.successMessage = 'Catégorie mise à jour avec succès.';
        this.apiError = undefined;
        setTimeout(() => this.router.navigate(['/categories']), 1500);
      },
      error: (error) => {
        this.apiError = error.error;
        console.error(this.apiError);
      },
    });
  }
}
