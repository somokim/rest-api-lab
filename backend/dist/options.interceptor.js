"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsInterceptor = void 0;
const common_1 = require("@nestjs/common");
let OptionsInterceptor = class OptionsInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        console.log('Option Interceptor');
        if (request.method === 'OPTIONS') {
            response.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
            response.status(200).send({
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            });
            return;
        }
        return next.handle();
    }
};
exports.OptionsInterceptor = OptionsInterceptor;
exports.OptionsInterceptor = OptionsInterceptor = __decorate([
    (0, common_1.Injectable)()
], OptionsInterceptor);
//# sourceMappingURL=options.interceptor.js.map