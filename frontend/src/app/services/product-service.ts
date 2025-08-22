import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  ProductId?: number;
  ProductName: string;
  CategoryId: number;
  Price?: number;
}

export interface PaginatedResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Partial<Product>): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPaginatedProducts(
    page: number,
    limit: number
  ): Observable<PaginatedResponse> {
    return this.http.get<PaginatedResponse>(
      `${this.apiUrl}/all?page=${page}&limit=${limit}`
    );
  }
}
