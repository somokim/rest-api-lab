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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const cart_entity_1 = require("./entities/cart.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../product/entities/product.entity");
const customer_entity_1 = require("../customer/entities/customer.entity");
let CartService = class CartService {
    constructor(repository, productRepository, customerRepository) {
        this.repository = repository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }
    async onModuleInit() {
        const products = await this.repository.find();
        if (!products || products.length == 0) {
            this.create({ customer: 1, product: 1, price: 10, quantity: 1 });
            this.create({ customer: 1, product: 2, price: 10, quantity: 1 });
        }
    }
    async create(dto) {
        const customer = await this.customerRepository.findOneByOrFail({ id: dto.customer });
        const product = await this.productRepository.findOneByOrFail({ id: dto.product });
        const cart = this.repository.create({
            customer: customer,
            product: product,
            price: dto.price,
            quantity: dto.quantity
        });
        await this.repository.save(cart);
        return { id: cart.id, price: cart.price, quantity: cart.quantity, product: cart.product, customer: { firstName: cart.customer.firstName, lastName: cart.customer.lastName } };
    }
    async findAll(id) {
        const carts = await this.repository.find({ where: { customer: { id: id } }, relations: ['product', 'customer'] });
        return carts.map(cart => ({
            id: cart.id, price: cart.price, quantity: cart.quantity, product: cart.product, customer: { firstName: cart.customer.firstName, lastName: cart.customer.lastName }
        }));
    }
    async findOne(id) {
        const cart = await this.repository.findOneOrFail({ where: { id }, relations: ['product', 'customer'] });
        return {
            id: cart.id, price: cart.price, quantity: cart.quantity, product: cart.product, customer: { firstName: cart.customer.firstName, lastName: cart.customer.lastName }
        };
    }
    async update(id, dto) {
        const customer = await this.customerRepository.findOneByOrFail({ id: dto.customer });
        const product = await this.productRepository.findOneByOrFail({ id: dto.product });
        const cart = {
            id: id,
            customer: customer,
            product: product,
            price: dto.price,
            quantity: dto.quantity
        };
        await this.repository.save(cart);
        return { id: cart.id, price: cart.price, quantity: cart.quantity, product: cart.product, customer: { firstName: cart.customer.firstName, lastName: cart.customer.lastName } };
    }
    async remove(id) {
        const cart = await this.repository.findOneByOrFail({ id: id });
        return await this.repository.remove(cart);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map