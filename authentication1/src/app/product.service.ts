import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api/shop/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(productId: number): Observable<Product> {
    const url = `${this.apiUrl}${productId}`;
    return this.http.get<Product>(url);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${productId}/delete`);
  }

  updateProduct(productId: number, updatedProductData: any): Observable<Product> {
    const url = `${this.apiUrl}${productId}/edit`;
    return this.http.put<Product>(url, updatedProductData);
  }

  rateProduct(productId: number, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}${productId}/rate`, rating);
  }
}
