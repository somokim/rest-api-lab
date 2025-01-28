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
exports.AdministratorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const administrator_entity_1 = require("./entities/administrator.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let AdministratorService = class AdministratorService {
    constructor(repository, userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }
    async onModuleInit() {
        const defaultAdmin = await this.repository.findOne({
            where: { email: 'admin@example.com' },
        });
        if (!defaultAdmin) {
            this.create({ firstName: 'Store', lastName: 'Admin', email: 'admin@example.com', password: '123456' });
        }
    }
    async create(dto) {
        const admin = await this.repository.findOneBy({ email: dto.email });
        if (admin) {
            throw new Error('User already exist.');
        }
        const user = this.userRepository.create({
            role: 'admin',
            username: dto.email,
            password: dto.password
        });
        await this.userRepository.save(user);
        const newAdmin = this.repository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            user: user
        });
        await this.repository.save(newAdmin);
        return { id: newAdmin.id, firstName: newAdmin.firstName, lastName: newAdmin.lastName, email: newAdmin.email };
    }
    async findAll() {
        const admins = await this.repository.find();
        return admins.map(admin => ({
            id: admin.id, firstName: admin.firstName, lastName: admin.lastName, email: admin.email
        }));
    }
    async findOne(id) {
        const admin = await this.repository.findOneByOrFail({ id: id });
        return {
            id: admin.id, firstName: admin.firstName, lastName: admin.lastName, email: admin.email
        };
    }
    async update(id, dto) {
        const admin = await this.repository.findOneByOrFail({ id: id });
        await this.repository.save({
            id: id,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email
        });
        return {
            id: admin.id, firstName: dto.firstName, lastName: dto.lastName, email: dto.email
        };
    }
    async remove(id) {
        const admin = await this.repository.findOneByOrFail({ id: id });
        this.repository.remove(admin);
        return {
            id: admin.id, firstName: admin.firstName, lastName: admin.lastName, email: admin.email
        };
    }
};
exports.AdministratorService = AdministratorService;
exports.AdministratorService = AdministratorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(administrator_entity_1.Administrator)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AdministratorService);
//# sourceMappingURL=administrator.service.js.map