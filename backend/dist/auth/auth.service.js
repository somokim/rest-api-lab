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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const path = require("path");
let AuthService = class AuthService {
    constructor(repository, jwtService) {
        this.repository = repository;
        this.jwtService = jwtService;
    }
    async signIn(auth) {
        const user = await this.repository.findOneBy({ username: auth.username });
        if (user?.password !== auth.password) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { sub: user.id, role: user.role };
        console.log(process.env.AUTHENTICATION_LAB);
        if (process.env.AUTHENTICATION_LAB == 'KEY_INJECTION') {
            const keyFilePath = path.resolve(process.cwd(), 'config/keys/key.txt');
            const SECRET_KEY = fs.existsSync(keyFilePath)
                ? fs.readFileSync(keyFilePath, 'utf8').trim()
                : 'secret';
            const header = { kid: 'config/keys/key.txt', alg: 'HS256' };
            return {
                access_token: await this.jwtService.signAsync(payload, { secret: SECRET_KEY, header: header }),
            };
        }
        return {
            access_token: await this.jwtService.signAsync(payload, { secret: process.env.SECRET_KEY }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map