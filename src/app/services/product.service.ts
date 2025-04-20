import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8093/api/products';

  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
      .pipe(
        map(products => {
          return products.map(product => {
            // Transform backend data to match the expected format
            return {
              ...product,
              // Set a default image if images array is empty
              image: product.images && product.images.length > 0 ? product.images[0] : 'assets/placeholder.png',
              // Add dummy rating for now (can be replaced with actual rating)
              rating: {
                rate: 4.0,
                count: 10
              },
              quantity: 1,
              total: product.price
            };
          });
        })
      );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }

  filterByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category?category=${category}`);
  }
}
