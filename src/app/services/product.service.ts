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
              // This line is causing problems - treating product.image as an array when it's a string
              // image: product.image && product.image.length > 0 ? product.image[0] : 'assets/placeholder.png',

              // Fix: Use the image string directly from backend
              image: product.image || 'placeholder.png', // Use the image as is or a placeholder

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
