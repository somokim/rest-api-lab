import { Authenticate } from './dto/authenticate.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(auth: Authenticate): Promise<{
        access_token: string;
    }>;
}
