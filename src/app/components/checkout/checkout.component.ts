import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { StripeService } from 'src/app/services/stripe.service';
import { Product } from 'src/app/shared/models/product.model';
import { CheckoutRequest } from 'src/app/shared/models/checkout-request.model';
import { Order } from 'src/app/shared/models/order.model';
import { OrderStatus} from 'src/app/shared/models/order-status.model';
import { PaymentMethod} from 'src/app/shared/models/payment-method.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: Product[] = [];
  total: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private stripeService: StripeService,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
     // user: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      billingAddress: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(products => {
      this.cartItems = products;
      this.total = this.cartService.getTotalPrice();
    });
  }

  onSubmit() {
    if (this.checkoutForm.invalid) return;

    const request: CheckoutRequest = {
      user: {
        id: 1 // <-- Force user with ID 1
      },
      products: this.cartItems.map(item => ({
        id: item.id,
        stock: item.quantity || 1
      })),
      shippingAddress: this.checkoutForm.value.shippingAddress,
      billingAddress: this.checkoutForm.value.billingAddress
    };

    this.stripeService.createCheckoutSession(request).subscribe({
      next: (res) => {
        this.stripeService.redirectToCheckout(res.sessionUrl);
      },
      error: (err) => {
        console.error('Error creating checkout session:', err);
      }
    });
  }


  removeCartItem(item: Product): void {
    this.cartService.removeCartItem(item);
    this.total = this.cartService.getTotalPrice();
  }
}
