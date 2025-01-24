import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CategorySortedComponent } from './components/category-sorted/category-sorted.component';

const routes: Routes = [
  { path: 'categories/edit/:id', component: EditCategoryComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/add', component: AddCategoryComponent },
  { path: 'categories/sorted', component: CategorySortedComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
