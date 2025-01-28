import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private jwtService;
    private userRepository;
    constructor(reflector: Reflector, jwtService: JwtService, userRepository: Repository<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
    private verify;
    private tokenTamperingLab;
    private noneAlgorithmLab;
    private keyInjectionLab;
    checkRole(context: any, role: string): Promise<boolean>;
}
