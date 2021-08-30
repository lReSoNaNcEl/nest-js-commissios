import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ICategoriesController } from "./interfaces/categories-controller.interface";
import { CategoriesService } from "./categories.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category } from "./enitities/Category.entity";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { DeleteResult } from "typeorm";
import { Auth } from "../../auth/auth.decorator";
import { Roles } from "../../users/interfaces/user.interface";

@ApiTags('Categories Of Commission')
@Controller('categories')
export class CategoriesController implements ICategoriesController {

    constructor(
        private categoriesService: CategoriesService
    ) {}

    @Get()
    getCategories() {
        return this.categoriesService.getCategories()
    }

    @Auth(Roles.ADMIN)
    @Post()
    createCategory(@Body() dto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.createCategory(dto)
    }

    @Auth(Roles.ADMIN)
    @Put(':categoryId')
    updateCategory(@Body() dto: UpdateCategoryDto, @Param('categoryId', ParseIntPipe) categoryId: number): Promise<Category> {
        return this.categoriesService.updateCategory(dto, categoryId)
    }

    @Auth(Roles.ADMIN)
    @Delete(':categoryId')
    deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<DeleteResult> {
        return this.categoriesService.deleteCategory(categoryId)
    }

}
