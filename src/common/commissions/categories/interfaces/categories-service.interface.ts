import { Category } from "../enitities/Category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";

export interface ICategoriesService {
    getCategory: (categoryId: number) => Promise<Category>
    getCategories: () => Promise<Category[]>
    createCategory: (dto: CreateCategoryDto) => Promise<Category>
    updateCategory: (dto: UpdateCategoryDto, categoryId: number) => Promise<Category>
    deleteCategory: (categoryId: number) => Promise<any>
}
