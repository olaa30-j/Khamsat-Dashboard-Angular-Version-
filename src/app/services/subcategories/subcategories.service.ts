import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, Subject, tap } from 'rxjs';

interface Title {
  ar: string;
  en: string;
}

export interface SubSubcategory {
  title: Title;
  _id: string;
}

export interface Subcategory {
  title: Title;
  _id: string;
  category_id: string;
  subcategories: SubSubcategory[];
  __v: number;
}


export interface ISubCategories{
  subcategories: Subcategory[];
}

export interface ISubcategoriesResponse {
  message: string;
  subcategories: ISubCategories[];
}

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  subCategoriesData: ISubCategories[] =[];
  private url: string = `${environment.apiUrl}subcategories`;
  private subcategoriesUpdateSource = new Subject<ISubCategories[]>();
  subcategoriesUpdated$ = this.subcategoriesUpdateSource.asObservable()

  constructor(private http:HttpClient) {}

  getAllSubcategories(): Observable<ISubCategories[]> {
    return this.http.get<ISubcategoriesResponse>(`${this.url}/dashboard`,{ withCredentials: true }).pipe(
      tap((response) => {
        this.subCategoriesData = response.subcategories; 
        this.subcategoriesUpdateSource.next(this.subCategoriesData); 
      }),
      map(response => { 
        return response.subcategories
      }) 
    );
  }

  createSubcategory(subcategory: ISubCategories): Observable<ISubCategories> {
    return this.http.post<ISubCategories>(this.url, subcategory, { withCredentials: true }).pipe(
      tap((newSubcategory) => {
        this.subCategoriesData.push(newSubcategory);
        this.subcategoriesUpdateSource.next(this.subCategoriesData);
      })
    );

  }

  updateSubcategory(subcategoriesId: string, subcategory: Subcategory): Observable<Subcategory> {
    return this.http.patch<Subcategory>(`${this.url}/${subcategoriesId}`, subcategory, { withCredentials: true });
  }

  deleteSubcategory(subcategoriesId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${subcategoriesId}`, { withCredentials: true });
  }

}
