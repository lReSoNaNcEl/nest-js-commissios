import { Category } from "../enitities/Category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { DeleteResult } from "typeorm";

export interface ICategoriesController{
    getCategories: () => Promise<Category[]>
    createCategory: (dto: CreateCategoryDto) => Promise<Category>
    updateCategory: (dto: UpdateCategoryDto, categoryId: number) => Promise<Category>
    deleteCategory: (categoryId: number) => Promise<DeleteResult>
}
