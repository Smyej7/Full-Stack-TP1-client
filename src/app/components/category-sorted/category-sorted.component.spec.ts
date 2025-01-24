import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySortedComponent } from './category-sorted.component';

describe('CategorySortedComponent', () => {
  let component: CategorySortedComponent;
  let fixture: ComponentFixture<CategorySortedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySortedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
