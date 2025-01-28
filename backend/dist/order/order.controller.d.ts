import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(dto: CreateOrderDto): Promise<{
        id: number;
        totalAmount: number;
        orderDate: Date;
        customer: {
            firstName: string;
            lastName: string;
        };
        lineItems: import("./entities/lineitem.entity").LineItem[];
    }>;
    findAll(id: string): Promise<any>;
    findOne(id: string): Promise<{
        id: number;
        totalAmount: number;
        orderDate: Date;
        customer: {
            firstName: string;
            lastName: string;
        };
        lineItems: import("./entities/lineitem.entity").LineItem[];
    }>;
    report(id: string): void;
    handleOptions(): {
        methods: string[];
        message: string;
    };
}
