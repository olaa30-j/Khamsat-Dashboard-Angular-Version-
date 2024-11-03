import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ISubCategories, SubcategoriesService } from '../../services/subcategories/subcategories.service';
import { SubcategoriesTableComponent } from '../../components/subcategories-table/subcategories-table.component';
import { CategoriesService, ICategory } from '../../services/categories/categories.service';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [SubcategoriesTableComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'] 
})
export class SubcategoriesComponent implements OnInit{
  subcategoryForm: FormGroup;
  showDialog = false;
  CategoriesData: ICategory[] =[];
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private subcategoriesService: SubcategoriesService,
    private fb: FormBuilder,
    private categoriesService:CategoriesService
  ) {
    this.subcategoryForm = this.fb.group({
      category_id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      title: this.fb.group({
        ar: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        en: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
      }),
      subcategories: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getAllCategories()
  }

  private getAllCategories(): void {
    this.loading = true;
    this.categoriesService.getAllCategories().subscribe({
      next: (res: ICategory[]) => {
        this.CategoriesData = res;
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

  addSubcategory(){
    const subcategoryGroup = this.fb.group({
      title: this.fb.group({
        ar: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        en: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
      })
    });
    this.subcategories.push(subcategoryGroup);
  }

  removeSubcategory(index: number){
    if (this.subcategories.length > 0) { 
      this.subcategories.removeAt(index);
    }
  }

  openDialog(){
    this.showDialog = true;
  }

  closeDialog(){
    this.showDialog = false;    
    this.resetForm();
  }

  createSubcategory() {
    if (this.subcategoryForm.valid) {
      const newSubcategory: ISubCategories = this.subcategoryForm.value;
      console.log(newSubcategory);
      
      this.subcategoriesService.createSubcategory(newSubcategory).subscribe({
        next: (createdCategory) => {
          this.subcategoriesService.getAllSubcategories().subscribe(); 
          this.resetForm();
          this.closeDialog();
        },
        error: (error) => {
          console.error('Error creating category:', error);
        }
      });
    } else {
      console.error('Form is invalid. Please fill out the required fields.');
    }
  }

  resetForm() {
    this.subcategoryForm.reset({
      category:'',
      title: {
        ar: '',
        en: ''
      }
    });
    this.subcategories.clear(); 
  }

  get titleAr() {
    return this.subcategoryForm.get('title.ar');
  }

  get titleEn() {
    return this.subcategoryForm.get('title.en');
  }

  
  get subcategories(){
    return this.subcategoryForm.get('subcategories') as FormArray;
  }

  get category_id(){
    return this.subcategoryForm.get('category_id');
  }
}
