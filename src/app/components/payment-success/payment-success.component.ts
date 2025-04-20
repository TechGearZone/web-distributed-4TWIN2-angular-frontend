import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  orderId: string | null = null;
  order: Order | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // Get session ID from query params or session storage
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id') ||
                     sessionStorage.getItem('sessionId');

    // Get order ID from session storage
    this.orderId = sessionStorage.getItem('orderId');

    if (this.orderId) {
      // Fetch order details
      this.orderService.getOrderById(Number(this.orderId)).subscribe({
        next: (data) => {
          this.order = data;
          this.loading = false;

          // Clear cart after successful payment
          this.cartService.removeAllCart();

          // Clear session storage
          sessionStorage.removeItem('sessionId');
          sessionStorage.removeItem('orderId');
        },
        error: (err) => {
          console.error('Error fetching order:', err);
          this.error = 'Could not retrieve order details.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Order information not found.';
      this.loading = false;
    }
  }

  backToProducts(): void {
    this.router.navigate(['/products']);
  }
}
