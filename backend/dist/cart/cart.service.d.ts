import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Customer } from 'src/customer/entities/customer.entity';
export declare class CartService {
    private repository;
    private productRepository;
    private customerRepository;
    constructor(repository: Repository<Cart>, productRepository: Repository<Product>, customerRepository: Repository<Customer>);
    onModuleInit(): Promise<void>;
    create(dto: CreateCartDto): Promise<{
        id: number;
        price: number;
        quantity: number;
        product: Product;
        customer: {
            firstName: string;
            lastName: string;
        };
    }>;
    findAll(id: number): Promise<{
        id: number;
        price: number;
        quantity: number;
        product: Product;
        customer: {
            firstName: string;
            lastName: string;
        };
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        price: number;
        quantity: number;
        product: Product;
        customer: {
            firstName: string;
            lastName: string;
        };
    }>;
    update(id: number, dto: UpdateCartDto): Promise<{
        id: number;
        price: number;
        quantity: number;
        product: Product;
        customer: {
            firstName: string;
            lastName: string;
        };
    }>;
    remove(id: number): Promise<Cart>;
}
