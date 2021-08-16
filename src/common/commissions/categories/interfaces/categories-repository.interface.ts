import { Category } from "../enitities/Category.entity";

export interface ICategoriesRepository {
    getCategory: (categoryId: number) => Promise<Category>
}
