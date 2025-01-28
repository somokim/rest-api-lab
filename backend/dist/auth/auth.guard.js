"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const path = require("path");
const core_1 = require("@nestjs/core");
let AuthGuard = class AuthGuard {
    constructor(reflector, jwtService, userRepository) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log(token);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        switch (process.env.AUTHENTICATION_LAB) {
            case 'NONE':
                return await this.verify(request, token) && await this.checkRole(context, request['user']?.role);
            case 'TOKEN_TAMPERING':
                return await this.tokenTamperingLab(request, token) && await this.checkRole(context, request['user']?.role);
            case 'NONE_ALGORITHM':
                return await this.noneAlgorithmLab(request, token) && await this.checkRole(context, request['user']?.role);
            case 'KEY_INJECTION':
                return await this.keyInjectionLab(request, token) && await this.checkRole(context, request['user']?.role);
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async verify(request, token) {
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY });
            request['user'] = await this.userRepository.findOneBy({ id: payload.sub });
            console.log(request['user']);
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    async tokenTamperingLab(request, token) {
        try {
            const payload = await this.jwtService.decode(token);
            request['user'] = await this.userRepository.findOneBy({ id: payload.sub });
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    async noneAlgorithmLab(request, token) {
        try {
            const header = await this.jwtService.decode(token, { complete: true })?.header;
            const payload = header?.alg === 'none' ? await this.jwtService.decode(token) : await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY });
            request['user'] = await this.userRepository.findOneBy({ id: payload.sub });
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    async keyInjectionLab(request, token) {
        try {
            console.log('keyInjectionLab');
            const header = await this.jwtService.decode(token, { complete: true })?.header;
            console.log(header);
            const kid = header.kid;
            console.log(kid);
            const fullPath = path.resolve(process.cwd(), kid);
            console.log(fullPath);
            const key = fs.readFileSync(fullPath, 'utf8');
            console.log(key);
            const payload = await this.jwtService.verifyAsync(token, { secret: key });
            request['user'] = await this.userRepository.findOneBy({ id: payload.sub });
            console.log(request['user']);
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    async checkRole(context, role) {
        const roles = this.reflector.get('roles', context.getHandler());
        console.log(role);
        console.log(roles);
        if (!roles) {
            return true;
        }
        const hasRole = roles?.includes(role);
        if (!hasRole) {
            throw new common_1.ForbiddenException('You do not have the required role');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [core_1.Reflector, jwt_1.JwtService, typeorm_2.Repository])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map