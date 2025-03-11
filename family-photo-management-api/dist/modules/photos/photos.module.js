"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosModule = void 0;
const common_1 = require("@nestjs/common");
const global_http_module_module_1 = require("../../core/global-http-module/global-http-module.module");
const photos_service_1 = require("./services/photos.service");
const photos_controller_1 = require("./controllers/photos.controller");
let PhotosModule = class PhotosModule {
};
exports.PhotosModule = PhotosModule;
exports.PhotosModule = PhotosModule = __decorate([
    (0, common_1.Module)({
        imports: [global_http_module_module_1.GlobalHttpModule],
        controllers: [photos_controller_1.PhotosController],
        providers: [photos_service_1.PhotosService],
    })
], PhotosModule);
//# sourceMappingURL=photos.module.js.map