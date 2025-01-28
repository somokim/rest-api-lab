"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const exception_filter_1 = require("./exception.filter");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API documentation for Express Ecommerce')
        .setVersion('1.0')
        .build();
    const swaggerDocument = JSON.parse(fs.readFileSync((0, path_1.join)(__dirname, '..', 'static', 'api-specs.json'), 'utf-8'));
    swagger_1.SwaggerModule.setup('docs', app, swaggerDocument);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new exception_filter_1.GlobalExceptionFilter());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map