import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CacheService } from 'src/cache';
import { CURRENCY_CODE, PaymentDataType } from 'src/common';
import { generateCode } from 'src/helpers';
import { v4 as uuid4 } from 'uuid';

function generateKey() {
  return `pay-${uuid4()}`;
}

const key = generateKey();

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    protected cacheService: CacheService,
  ) {}

  async authenticateWithPaymentApi() {
    const apiKey = this.configService.get('MONNIFY_API_KEY');
    const apiSecret = this.configService.get('MONNIFY_SECRET_KEY');
    const clientSecretIDInBase64 = Buffer.from(
      apiKey + ':' + apiSecret,
    ).toString('base64');
    const headers = {
      Authorization: `Basic ${clientSecretIDInBase64}`,
    };
    const path = 'api/v1/auth/login';
    const url = `${this.configService.get('MONNIFY_BASE_URL')}/${path}`;

    try {
      const response = await axios.post(url, null, { headers });
      const { responseBody } = response.data;
      const { accessToken } = responseBody;
      await this.cacheService.client.set(key, `${accessToken}`, {
        EX: this.configService.get('CACHE_TTL'),
      });
      return accessToken;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async initializeTransaction(paymentData: PaymentDataType) {
    const { totalAmount, customerName, customerEmail, paymentDescription } =
      paymentData;

    try {
      const dataToSend = {
        amount: totalAmount,
        customerName: customerName,
        customerEmail: customerEmail,
        paymentReference: Date.now(),
        paymentDescription: paymentDescription,
        currencyCode: CURRENCY_CODE,
        contractCode: this.configService.get('MONNIFY_CONTRACT_CODE'),
        redirectUrl: this.configService.get('REDIRECT_URL'),
        paymentMethods: [
          this.configService.get('MONNIFY_CARD_PAYMENT_METHOD'),
          this.configService.get('MONNIFY_ACCOUNT_TRANSFER_PAYMENT_METHOD'),
        ],
      };
      // check if token has not expired in cache store to generate new one
      let accessToken = await this.cacheService.client.get(key);
      if (!accessToken) {
        accessToken = await this.authenticateWithPaymentApi();
      }
      const path = 'api/v1/merchant/transactions/init-transaction';
      const url = `${this.configService.get('MONNIFY_BASE_URL')}/${path}`;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      // make the api request to enable checkouturl generation

      const response = await axios.post(url, dataToSend, { headers });

      return response.data.responseBody;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async processPayment(paymentData: PaymentDataType) {
    // create an order in your db with product id, trans ref, payment ref and status pending
    const orderCode = await generateCode(7, 'food');
    // console.log(orderCode);
    const response = await this.initializeTransaction(paymentData);
    // check if you hot a response
    if (Object.keys(response).length > 0) {
      const { checkoutUrl, transactionReference, paymentReference } = response;
      // update order in db with ID by changing the status to AWAITING_PAYMENT
      return checkoutUrl;
    }
    return null;
  }

  // handle sucessful transaction webhook
  async handleWebhook(requestBody: any) {
    // update order in db with ID by changing the status to PAID

    console.log(requestBody);
  }
}
