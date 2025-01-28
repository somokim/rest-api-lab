import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';
export declare class LineItem {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
