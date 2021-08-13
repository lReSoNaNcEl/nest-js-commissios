import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ICategoriesService } from "./interfaces/categories-service.interface";
import { Category } from "./enitities/Category.entity";

@Injectable()
export class CategoriesService implements ICategoriesService {

    constructor(
        @InjectRepository(CategoriesRepository)
        private categoriesRepository: CategoriesRepository
    ) {}

    getCategories(): Promise<Category[]> {
        return this.categoriesRepository.find()
    }

}
