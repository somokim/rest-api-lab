import { User } from '../../user/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
export declare class Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    user: User;
    carts: Cart[];
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
}
