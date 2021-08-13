import { Category } from "../enitities/Category.entity";

export interface ICategoriesService {
    getCategories: () => Promise<Category[]>
}
