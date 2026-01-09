/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentStatus } from "./enum";


export interface IPayment {
  id: string;
  bookingId: string;
  amount: number;
  transactionId: string;
  status: PaymentStatus;
  paymentGatewayData?: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
}
