// products.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList: Product[] = [];
  public filterCategory: Product[] = [];
  public cartItems: Product[] = [];
  public cartItemCount: number = 0;
  public cartTotal: number = 0;
  searchKey: string = "";

  constructor(private api: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts();

    this.cartService.getProducts().subscribe(products => {
      this.cartItems = products;
      this.cartItemCount = products.length;
      this.cartTotal = this.cartService.getTotalPrice();
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  loadProducts(): void {
    this.api.getProduct().subscribe(res => {
      this.productList = res;
      this.filterCategory = res;

      // Additional category mapping for consistent frontend filtering
      this.productList.forEach((a: Product) => {
        if (a.category === "women's clothing" || a.category === "men's clothing") {
          a.category = 'fashion';
        }
      });
    });
  }

  addToCart(item: Product) {
    this.cartService.addtoCart(item);
    this.cartTotal = this.cartService.getTotalPrice();
  }

  removeCartItem(item: Product) {
    this.cartService.removeCartItem(item);
    this.cartTotal = this.cartService.getTotalPrice();
  }

  filter(category: string) {
    if (category === '') {
      this.filterCategory = this.productList;
    } else {
      this.filterCategory = this.productList.filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
      });
    }
  }
}
