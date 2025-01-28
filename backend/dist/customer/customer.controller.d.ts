import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto): Promise<{
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
    findOne(id: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>;
    handleOptions(): {
        methods: string[];
        message: string;
    };
}
