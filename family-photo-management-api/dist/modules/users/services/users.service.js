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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let UsersService = class UsersService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async findAll() {
        try {
            const response = await this.httpService.axiosRef.get('/users');
            return response.data.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
            }));
        }
        catch (e) {
            console.log(`Error while fetching Users: error - ${e}`);
            throw e;
        }
    }
    async findAlbumsByUser(userId) {
        try {
            const response = await this.httpService.axiosRef.get(`/users/${userId}/albums`);
            return response.data;
        }
        catch (e) {
            console.log(`Error while fetching Albums of user ${userId}: error - ${e}`);
            throw e;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], UsersService);
//# sourceMappingURL=users.service.js.map