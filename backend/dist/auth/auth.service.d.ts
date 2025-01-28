import { JwtService } from '@nestjs/jwt';
import { Authenticate } from './dto/authenticate.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private repository;
    private jwtService;
    constructor(repository: Repository<User>, jwtService: JwtService);
    signIn(auth: Authenticate): Promise<{
        access_token: string;
    }>;
}
