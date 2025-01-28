import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { LineItem } from './entities/lineitem.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { HttpService } from '@nestjs/axios';
export declare class OrderService {
    private repository;
    private cartRepository;
    private lineItemRepository;
    private readonly httpService;
    constructor(repository: Repository<Order>, cartRepository: Repository<Cart>, lineItemRepository: Repository<LineItem>, httpService: HttpService);
    create(dto: CreateOrderDto): Promise<{
        id: number;
        totalAmount: number;
        orderDate: Date;
        customer: {
            firstName: string;
            lastName: string;
        };
        lineItems: LineItem[];
    }>;
    findAll(id: number): Promise<any>;
    findOne(id: number): Promise<{
        id: number;
        totalAmount: number;
        orderDate: Date;
        customer: {
            firstName: string;
            lastName: string;
        };
        lineItems: LineItem[];
    }>;
    createDelivery(order: Order, dto: CreateOrderDto): Promise<void>;
}
