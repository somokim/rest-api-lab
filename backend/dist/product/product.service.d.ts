import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
export declare class ProductService {
    private repository;
    constructor(repository: Repository<Product>);
    onModuleInit(): Promise<void>;
    create(dto: CreateProductDto): Promise<CreateProductDto & Product>;
    search(term: string): Promise<any[]>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, dto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<Product>;
    upload(req: Request, res: Response): Promise<void>;
}
