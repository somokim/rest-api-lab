import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class CustomerService {
    private repository;
    private userRepository;
    constructor(repository: Repository<Customer>, userRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    create(dto: CreateCustomerDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>;
    findAll(): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>;
    update(id: number, dto: UpdateCustomerDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>;
}
