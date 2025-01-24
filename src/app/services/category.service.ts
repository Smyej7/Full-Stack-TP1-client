import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}`, category);
  }

  getAllCategories(page: number = 0, size: number = 10, sortBy: string = 'id'): Observable<Category[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy);
    return this.http.get<Category[]>(`${this.baseUrl}`, { params });
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  getSortedCategories(sortBy: string, direction: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('sortBy', sortBy)
      .set('direction', direction)
      .set('page', page)
      .set('size', size);
    return this.http.get(`${this.baseUrl}/sort`, { params });
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
