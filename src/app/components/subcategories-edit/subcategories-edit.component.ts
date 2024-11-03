import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService, ICategory } from '../../services/categories/categories.service';
import { SubcategoriesService, Subcategory } from '../../services/subcategories/subcategories.service';

@Component({
  selector: 'app-subcategories-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subcategories-edit.component.html',
  styleUrls: ['./subcategories-edit.component.scss']
})
export class SubcategoriesEditComponent implements OnInit {
  editSubcategoryForm: FormGroup;
  CategoriesData: ICategory[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;
  showEditDialog: boolean = true;

  constructor(
    private subcategoriesService: SubcategoriesService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private dialogRef: MatDialogRef<SubcategoriesEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Subcategory 
  ) {
    this.editSubcategoryForm = this.fb.group({
      category_id: ['', [Validators.required]],
      title: this.fb.group({
        ar: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        en: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
      }),
      subcategories: this.fb.array([])  
    });

    if (data) {
      this.editSubcategoryForm.patchValue({
        category_id: data.category_id,
        title: {
          ar: data.title.ar,
          en: data.title.en,
        }
      });

      if (data.subcategories) {
        data.subcategories.forEach(subcategory => {
          this.addSubcategory(subcategory.title.ar, subcategory.title.en);
        });
      }
    }
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories(): void {
    this.loading = true;
    this.categoriesService.getAllCategories().subscribe({
      next: (res: ICategory[]) => {
        this.CategoriesData = res;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'An error occurred while fetching categories.';
        this.loading = false;
        console.error('Error fetching categories:', error);
      }
    });
  }

  addSubcategory(ar: string = '', en: string = '') {
    const subcategoryGroup = this.fb.group({
      title: this.fb.group({
        ar: [ar, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        en: [en, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
      })
    });
    this.subcategories.push(subcategoryGroup);
  }

  removeSubcategory(index: number) {
    this.subcategories.removeAt(index);
  }

  updateSubcategory() {
    if (this.editSubcategoryForm.invalid) {
      this.errorMessage = 'Form is invalid. Please fill out the required fields.';
      return;
    }

    const updatedSubcategory: Subcategory = this.editSubcategoryForm.value;

    if (this.data._id) {
      this.subcategoriesService.updateSubcategory(this.data._id, updatedSubcategory).subscribe({
        next: () => {
          this.dialogRef.close(updatedSubcategory);
        },
        error: (error) => {
          this.errorMessage = 'Error updating subcategory. Please try again.';
          console.error('Error updating subcategory:', error);
        }
      });
    } else {
      console.error('No subcategory ID provided for updating.');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get titleAr() {
    return this.editSubcategoryForm.get('title.ar');
  }

  get titleEn() {
    return this.editSubcategoryForm.get('title.en');
  }
  
  get subcategories(): FormArray {
    return this.editSubcategoryForm.get('subcategories') as FormArray;
  }

  get category_id() {
    return this.editSubcategoryForm.get('category_id');
  }
}
