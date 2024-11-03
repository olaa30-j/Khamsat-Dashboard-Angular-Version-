import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesTableComponent } from './subcategories-table.component';

describe('SubcategoriesTableComponent', () => {
  let component: SubcategoriesTableComponent;
  let fixture: ComponentFixture<SubcategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoriesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
