import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ICategoriesService } from "./interfaces/categories-service.interface";
import { Category } from "./enitities/Category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService implements ICategoriesService {

    constructor(
        @InjectRepository(CategoriesRepository)
        private categoriesRepository: CategoriesRepository
    ) {}

    getCategories(): Promise<Category[]> {
        return this.categoriesRepository.find()
    }

    getCategory(categoryId: number): Promise<Category> {
        return this.categoriesRepository.getCategory(categoryId)
    }

    async createCategory(dto: CreateCategoryDto): Promise<Category> {

        const category = await this.categoriesRepository.findOne({...dto})

        if (category)
            throw new HttpException(`Category already exists`, HttpStatus.CONFLICT)

        return this.categoriesRepository.save(
            this.categoriesRepository.create({...dto})
        )
    }

    async updateCategory(dto: UpdateCategoryDto, categoryId: number): Promise<Category> {
        const category = await this.getCategory(categoryId)
        return this.categoriesRepository.save({id: category.id, ...dto})
    }

    deleteCategory(categoryId: number): Promise<any> {
        return this.categoriesRepository.delete(categoryId)
    }

}
