import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../services/faq.service';
import { Faq } from '../../models/faq.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqs: Faq[] = [];
  newQuestion = '';
  newAnswer = '';

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs(): void {
    this.faqService.getFaqs().subscribe(data => {
      this.faqs = data;
    });
  }

  addFaq(): void {
    if (!this.newQuestion || !this.newAnswer) return;

    const faq: Faq = {
      question: this.newQuestion,
      answer: this.newAnswer
    };

    this.faqService.createFaq(faq).subscribe(newFaq => {
      this.faqs.push(newFaq);
      this.newQuestion = '';
      this.newAnswer = '';
    });
  }

  deleteFaq(id: string): void {
    this.faqService.deleteFaq(id).subscribe(() => {
      this.faqs = this.faqs.filter(f => f._id !== id);
    });
  }
}

