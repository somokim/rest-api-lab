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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const child_process_1 = require("child_process");
const multer = require("multer");
const promises_1 = require("fs/promises");
const util_1 = require("util");
let ProductService = class ProductService {
    constructor(repository) {
        this.repository = repository;
    }
    async onModuleInit() {
        const products = await this.repository.find();
        if (!products || products.length == 0) {
            this.create({ name: 'Product 001', description: 'Description Of Product 001', price: 10, stock: 100, imageUrl: '/static/images/001.png' });
            this.create({ name: 'Product 002', description: 'Description Of Product 002', price: 10, stock: 100, imageUrl: '/static/images/002.png' });
            this.create({ name: 'Product 003', description: 'Description Of Product 003', price: 10, stock: 100, imageUrl: '/static/images/003.png' });
            this.create({ name: 'Product 004', description: 'Description Of Product 004', price: 10, stock: 100, imageUrl: '/static/images/004.png' });
            this.create({ name: 'Product 005', description: 'Description Of Product 005', price: 10, stock: 100, imageUrl: '/static/images/005.png' });
            this.create({ name: 'Product 006', description: 'Description Of Product 006', price: 10, stock: 100, imageUrl: '/static/images/006.png' });
            this.create({ name: 'Product 007', description: 'Description Of Product 007', price: 10, stock: 100, imageUrl: '/static/images/007.png' });
            this.create({ name: 'Product 008', description: 'Description Of Product 008', price: 10, stock: 100, imageUrl: '/static/images/008.png' });
            this.create({ name: 'Product 009', description: 'Description Of Product 009', price: 10, stock: 100, imageUrl: '/static/images/009.png' });
            this.create({ name: 'Product 010', description: 'Description Of Product 010', price: 10, stock: 100, imageUrl: '/static/images/010.png' });
        }
    }
    async create(dto) {
        return await this.repository.save(dto);
    }
    async search(term) {
        return await this.repository.createQueryBuilder('product')
            .where(`product.name like '%${term}%' or product.description like '%${term}%'`)
            .getRawMany();
    }
    async findAll() {
        return await this.repository.find();
    }
    async findOne(id) {
        return await this.repository.findOneByOrFail({ id: id });
    }
    async update(id, dto) {
        const product = await this.repository.findOneByOrFail({ id: id });
        product.name = dto.name;
        product.description = dto.description;
        product.price = dto.price;
        product.stock = dto.stock;
        product.imageUrl = dto.imageUrl;
        return await this.repository.save(product);
    }
    async remove(id) {
        const product = await this.repository.findOneByOrFail({ id: id });
        return await this.repository.remove(product);
    }
    async upload(req, res) {
        const saveFile = multer({
            storage: multer.memoryStorage(),
            limits: { fileSize: 5 * 1024 * 1024 },
        }).single('file');
        saveFile(req, res, async (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
                }
                throw new common_1.HttpException('File upload failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!req.file) {
                throw new common_1.HttpException('No file uploaded', common_1.HttpStatus.BAD_REQUEST);
            }
            const location = req.body.location;
            if (!location) {
                throw new common_1.HttpException('Location is required', common_1.HttpStatus.BAD_REQUEST);
            }
            try {
                const execPromise = (0, util_1.promisify)(child_process_1.exec);
                execPromise(`mkdir -p public/image/${location}`);
            }
            catch (error) {
                console.error(error);
            }
            const file = req.file;
            const filename = `${Date.now()}-${file.originalname}`;
            const filePath = `public/image/${location}/${filename}`;
            try {
                await (0, promises_1.writeFile)(filePath, file.buffer);
                return res.status(201).json({
                    message: 'File uploaded successfully',
                    path: `/static/image/${location}/${filename}`
                });
            }
            catch (error) {
                console.error(error);
                return res.status(400).json({
                    message: 'File upload error',
                    path: `/static/image/${location}/${filename}`
                });
            }
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map