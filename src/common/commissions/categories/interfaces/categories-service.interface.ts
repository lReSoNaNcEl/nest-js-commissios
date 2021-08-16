import { Category } from "../enitities/Category.entity";

export interface ICategoriesService {
    getCategory: (categoryId: number) => Promise<Category>
    getCategories: () => Promise<Category[]>
}
