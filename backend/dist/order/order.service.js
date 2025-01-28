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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("./entities/order.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("../cart/entities/cart.entity");
const lineitem_entity_1 = require("./entities/lineitem.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let OrderService = class OrderService {
    constructor(repository, cartRepository, lineItemRepository, httpService) {
        this.repository = repository;
        this.cartRepository = cartRepository;
        this.lineItemRepository = lineItemRepository;
        this.httpService = httpService;
    }
    async create(dto) {
        const carts = await this.cartRepository.find({ where: { customer: { id: dto.customer } }, relations: ['product', 'customer'] });
        if (!carts || carts.length == 0) {
            throw new Error('Cart is empty');
        }
        const totalAmount = carts.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const order = this.repository.create({
            totalAmount: totalAmount,
            customer: carts[0].customer,
            lineItems: carts.map((item) => this.lineItemRepository.create({
                product: item.product,
                quantity: item.quantity,
                unitPrice: item.price,
                totalPrice: item.price * item.quantity
            }))
        });
        await this.repository.save(order);
        carts.forEach((item) => {
            this.cartRepository.remove(item);
        });
        await this.createDelivery(order, dto);
        return { id: order.id, totalAmount: order.totalAmount, orderDate: order.orderDate, customer: { firstName: order.customer.firstName, lastName: order.customer.lastName }, lineItems: order.lineItems };
    }
    async findAll(id) {
        let orders;
        if (id) {
            orders = await this.repository.find({ where: { customer: { id: id } }, relations: ['lineItems', 'customer'] });
        }
        else {
            orders = await this.repository.find({ relations: ['lineItems', 'customer'] });
        }
        return orders.map((order) => ({
            id: order.id, totalAmount: order.totalAmount, orderDate: order.orderDate, customer: { firstName: order.customer.firstName, lastName: order.customer.lastName }, lineItems: order.lineItems
        }));
    }
    async findOne(id) {
        const order = await this.repository.findOneOrFail({ where: { id }, relations: ['lineItems', 'customer'] });
        return { id: order.id, totalAmount: order.totalAmount, orderDate: order.orderDate, customer: { firstName: order.customer.firstName, lastName: order.customer.lastName }, lineItems: order.lineItems };
    }
    async createDelivery(order, dto) {
        const payload = {
            order_number: order.id,
            total_price: order.totalAmount,
            address: dto.address,
            customer: order.customer.firstName + ' ' + order.customer.lastName
        };
        const headers = {
            'x-api-key': `${process.env.DELIVERY_SERVICE_KEY}`,
            'Content-Type': 'application/json',
        };
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${dto.delivery_service}/api/v1/delivery`, payload, { headers }));
            console.log(response.data);
        }
        catch (error) {
            if (error.response) {
                throw new Error(`API Error: ${error.response.data.message}`);
            }
            throw new Error(`Unexpected Error: ${error.message}`);
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(2, (0, typeorm_1.InjectRepository)(lineitem_entity_1.LineItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        axios_1.HttpService])
], OrderService);
//# sourceMappingURL=order.service.js.map