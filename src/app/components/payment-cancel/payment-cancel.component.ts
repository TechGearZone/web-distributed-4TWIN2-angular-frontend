import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.css']
})
export class PaymentCancelComponent implements OnInit {
  sessionId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id') ||
                     sessionStorage.getItem('sessionId');

    // Note: We're not clearing session storage here so the user can try again
  }

  backToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  backToProducts(): void {
    this.router.navigate(['/products']);
  }
}
