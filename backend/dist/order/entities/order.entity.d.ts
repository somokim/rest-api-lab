import { Customer } from '../../customer/entities/customer.entity';
import { LineItem } from './lineitem.entity';
export declare class Order {
    id: number;
    customer: Customer;
    lineItems: LineItem[];
    createdAt: Date;
    updatedAt: Date;
    orderDate: Date;
    totalAmount: number;
}
