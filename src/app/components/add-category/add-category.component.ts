import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ApiError } from '../../models/api-error.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  category: Partial<Category> = { name: '', parent: undefined };
  categories: Category[] = [];
  successMessage: string = '';
  apiError?: ApiError;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadParentCategories();
  }

  loadParentCategories(): void {
    this.categoryService.getAllCategories(0, 100, 'name').subscribe({
      next: (data: Category[]) => (this.categories = data),
      error: (error) => {
        this.apiError = error.error;
        this.successMessage = '';
        console.error(this.apiError);
      },
    });
  }

  addCategory(): void {
    if (!this.category.name) {
      this.apiError = {
        status: 400,
        message: 'Le nom de la catégorie est obligatoire.',
        timestamp: Date.now(),
      };
      this.successMessage = ''; // Réinitialiser le message de succès
      return;
    }

    this.categoryService.createCategory(this.category as Category).subscribe({
      next: (data) => {
        this.successMessage = 'Catégorie ajoutée avec succès.';
        this.apiError = undefined; // Réinitialiser les erreurs
        this.category = { name: '', parent: undefined }; // Réinitialiser le formulaire
        this.loadParentCategories(); // Rafraîchir la liste des catégories parentes
      },
      error: (error) => {
        this.apiError = error.error; // Stocker l'erreur API
        this.successMessage = ''; // Réinitialiser le message de succès
        console.error(this.apiError);
      },
    });
  }
}
