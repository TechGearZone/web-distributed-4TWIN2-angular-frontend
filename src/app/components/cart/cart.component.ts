import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartItems: Product[] = [];
  public cartItemCount: number = 0;
  public cartTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(products => {
      this.cartItems = products;
      this.cartItemCount = products.length;
      this.cartTotal = this.cartService.getTotalPrice();
    });
  }

  removeCartItem(item: Product) {
    this.cartService.removeCartItem(item);
    this.cartTotal = this.cartService.getTotalPrice();
    this.cartItemCount = this.cartItems.length;
  }
}
