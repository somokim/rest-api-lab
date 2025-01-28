import { Customer } from '../../customer/entities/customer.entity';
import { Product } from '../../product/entities/product.entity';
export declare class Cart {
    id: number;
    customer: Customer;
    product: Product;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
