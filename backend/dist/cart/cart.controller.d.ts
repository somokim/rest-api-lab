import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(createCartDto: CreateCartDto): Promise<{
        id: number;
        price: number;
        quantity: number;
        product: import("../product/entities/product.entity").Product;
        customer: {
            firstName: string;
            lastName: string;
        };
    }>;
    findAll(id: string): Promise<{
        id: number;
        price: number;
        quantity: number;
        product: import("../product/entities/product.entity").Product;
        customer: {
            firstName: string;
            lastName: string;
        };
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        price: number;
        quantity: number;
        product: import("../product/entities/product.entity").Product;
        customer: {
            firstName: string;
            lastName: string;
        };
    }>;
    update(id: string, updateCartDto: UpdateCartDto): Promise<{
        id: number;
        price: number;
        quantity: number;
        product: import("../product/entities/product.entity").Product;
        customer: {
            firstName: string;
            lastName: string;
        };
    }>;
    remove(id: string): Promise<import("./entities/cart.entity").Cart>;
    handleOptions(): {
        methods: string[];
        message: string;
    };
}
