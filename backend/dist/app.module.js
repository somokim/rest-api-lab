"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const customer_module_1 = require("./customer/customer.module");
const administrator_module_1 = require("./administrator/administrator.module");
const order_module_1 = require("./order/order.module");
const cart_module_1 = require("./cart/cart.module");
const product_module_1 = require("./product/product.module");
const typeorm_1 = require("@nestjs/typeorm");
const administrator_entity_1 = require("./administrator/entities/administrator.entity");
const user_entity_1 = require("./user/entities/user.entity");
const customer_entity_1 = require("./customer/entities/customer.entity");
const product_entity_1 = require("./product/entities/product.entity");
const cart_entity_1 = require("./cart/entities/cart.entity");
const order_entity_1 = require("./order/entities/order.entity");
const lineitem_entity_1 = require("./order/entities/lineitem.entity");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const axios_1 = require("@nestjs/axios");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.registerAsync({
                useFactory: () => ({
                    timeout: 5000,
                    maxRedirects: 5,
                }),
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/static',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'database.sqlite',
                entities: [administrator_entity_1.Administrator, user_entity_1.User, customer_entity_1.Customer, product_entity_1.Product, cart_entity_1.Cart, order_entity_1.Order, lineitem_entity_1.LineItem],
                synchronize: true,
            }),
            customer_module_1.CustomerModule, product_module_1.ProductModule, cart_module_1.CartModule, order_module_1.OrderModule, administrator_module_1.AdministratorModule, auth_module_1.AuthModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map