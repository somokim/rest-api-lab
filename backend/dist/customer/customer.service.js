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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const customer_entity_1 = require("./entities/customer.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
let CustomerService = class CustomerService {
    constructor(repository, userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }
    async onModuleInit() {
        const defaultCustomer = await this.repository.findOne({
            where: { email: 'jsmith@example.com' },
        });
        if (!defaultCustomer) {
            this.create({ firstName: 'Jhon', lastName: 'Smith', email: 'jsmith@example.com', password: '123456' });
        }
    }
    async create(dto) {
        const customer = await this.repository.findOneBy({ email: dto.email });
        if (customer) {
            throw new Error('User already exist.');
        }
        const user = this.userRepository.create({
            role: 'customer',
            username: dto.email,
            password: dto.password
        });
        await this.userRepository.save(user);
        const newCustomer = this.repository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            user: user
        });
        await this.repository.save(newCustomer);
        return { id: newCustomer.id, firstName: newCustomer.firstName, lastName: newCustomer.lastName, email: newCustomer.email };
    }
    async findAll() {
        const customers = await this.repository.find();
        return customers.map(customer => ({
            id: customer.id, firstName: customer.firstName, lastName: customer.lastName, email: customer.email
        }));
    }
    async findOne(id) {
        const customer = await this.repository.findOneByOrFail({ id: id });
        return {
            id: customer.id, firstName: customer.firstName, lastName: customer.lastName, email: customer.email
        };
    }
    async update(id, dto) {
        const customer = await this.repository.findOneByOrFail({ id: id });
        await this.repository.save({
            id: id,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email
        });
        return {
            id: customer.id, firstName: dto.firstName, lastName: dto.lastName, email: dto.email
        };
    }
    async remove(id) {
        const customer = await this.repository.findOneByOrFail({ id: id });
        this.repository.remove(customer);
        return {
            id: customer.id, firstName: customer.firstName, lastName: customer.lastName, email: customer.email
        };
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map