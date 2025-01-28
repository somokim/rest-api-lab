import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
export declare class AdministratorController {
    private readonly administratorService;
    constructor(administratorService: AdministratorService);
    create(createAdministratorDto: CreateAdministratorDto): Promise<{
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
    update(id: string, updateAdministratorDto: UpdateAdministratorDto): Promise<{
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
