import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { DialogComponent } from '../categories-table/reusable-dailog/resable-dailog.component';
import { ISubCategories, SubSubcategory, SubcategoriesService, Subcategory } from '../../services/subcategories/subcategories.service';
import { MatMenuModule } from '@angular/material/menu';
import { SubcategoriesEditComponent } from '../subcategories-edit/subcategories-edit.component';

@Component({
  selector: 'app-subcategories-table',
  standalone: true,
  imports: [
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './subcategories-table.component.html',
  styleUrl: './subcategories-table.component.scss'
})
export class SubcategoriesTableComponent {
  displayedColumns: string[] = ['id', 'titileAr', 'titleEn', 'nestedSubcategory', 'edit', 'remove'];
  subCategoriesData: ISubCategories[] = [];
  selectedSubcategories: { [key: number]: SubSubcategory | null } = {};
  loading: boolean = true;
  errorMessage: string | null = null;
  dataSource = new MatTableDataSource<ISubCategories>(this.subCategoriesData);
  private subscription: Subscription = new Subscription();

  constructor(private subcategoriesService: SubcategoriesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllSubcategories();
    this.subscription.add(
      this.subcategoriesService.subcategoriesUpdated$.subscribe(updatedSubcategories => {
        this.subCategoriesData = updatedSubcategories;
        this.dataSource.data = this.subCategoriesData;
      })
    );
  }

  selectSubcategory(elementId: number, subcategory: SubSubcategory) {
    this.selectedSubcategories[elementId] = subcategory;
  }


  private getAllSubcategories(): void {
    this.loading = true;
    this.subcategoriesService.getAllSubcategories().subscribe({
      next: (res: ISubCategories[]) => {
        this.subCategoriesData = res;
        this.dataSource.data = this.subCategoriesData;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'An error occurred while fetching categories.';
        console.error('Error fetching categories:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  openEditDialog(element: Subcategory) {
    const dialogRef = this.dialog.open(SubcategoriesEditComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllSubcategories();
      }
    });
  }

  deleteDialog(element: Subcategory): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete Category',
        message: `Are you sure you want to deactivate the account for ${element.title.en}? This action cannot be undone.`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && element._id) {
        this.deleteSubCategory(element._id);
      }
    });
  }

  deleteSubCategory(id: string): void {
    this.subcategoriesService.deleteSubcategory(id).subscribe({
      next: () => {
        this.getAllSubcategories();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'An error occurred while deleting the category.';
        console.error('Error deleting category:', error);
      }
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
