import { Injectable } from '@nestjs/common';
import { CacheService } from './cache';
import { PaymentsService } from './payments/payments.service';

@Injectable()
export class AppService {
  constructor(protected paymentService: PaymentsService) {}
  async getHomePage() {
    const token = await this.paymentService.processPayment({
      totalAmount: 500,
      customerEmail: 'godwin@gmail.com',
      customerName: 'godwin',
      paymentDescription: 'payment for food',
    });
    return token;
  }
}
