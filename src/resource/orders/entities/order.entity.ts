import { PaymentStatusType } from "src/common";
import { AbstractEntity } from "src/database";
import { PAYMENTSTATUS } from "src/enums/payment.enum";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity('orders')
export class Order extends AbstractEntity<Order>{
    @Column({name: 'order_id'})
    orderId: string
    @Column({name: 'vendor_id'})
    vendorId: string
    @Column()
    description: string
    @Column()
    location: string
    @Column({name: "payment_ref"})
    paymentRef: string
    @Column({name: "transaction_ref"})
    transactionRef: string
    @Column({name: "paymentStatus", type: "enum", enum: PAYMENTSTATUS, default: PAYMENTSTATUS.PENDING})
    paymentStatus: PaymentStatusType
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date
}
