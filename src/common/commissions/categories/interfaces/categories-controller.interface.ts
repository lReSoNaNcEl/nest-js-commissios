import { Category } from "../enitities/Category.entity";

export interface ICategoriesController{
    getCategories: () => Promise<Category[]>
}
