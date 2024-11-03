import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesEditComponent } from './subcategories-edit.component';

describe('SubcategoriesEditComponent', () => {
  let component: SubcategoriesEditComponent;
  let fixture: ComponentFixture<SubcategoriesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoriesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
