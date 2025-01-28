import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
export declare class AdministratorService {
    private repository;
    private userRepository;
    constructor(repository: Repository<Administrator>, userRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    create(dto: CreateAdministratorDto): Promise<{
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
    update(id: number, dto: UpdateAdministratorDto): Promise<{
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
