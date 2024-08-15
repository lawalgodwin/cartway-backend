import { Controller, Post, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request, Response } from 'express';
import { TransactionData } from 'src/common';

@Controller()
// @Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post('api/monnify/webhook')
  // @Post('api/monnify/transaction/complete/webhook')
  async handleSucessfulPayment(
    @TransactionData() data: any,
    @Res() res: Response,
  ) {
    res.status(200);
    // console.log(requestBody)
    this.paymentService.handleWebhook(data);
  }
}
