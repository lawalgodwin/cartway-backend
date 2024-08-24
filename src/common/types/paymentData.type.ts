export type PaymentDataType = {
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  paymentDescription: string;
};

export type PaymentStatusType = "PENDING" |"AWAITING_PAYMENT" | "CANCELED" | "PAID"
