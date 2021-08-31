import {EntityRepository, Repository} from "typeorm";
import {Category} from "./enitities/Category.entity";
import {ICategoriesRepository} from "./interfaces/categories-repository.interface";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> implements ICategoriesRepository {

    async getCategory(categoryId: number): Promise<Category> {
        const category = await this.findOne({where: {id: categoryId}})
        if (!category)
            throw new NotFoundException(`Category with ID ${categoryId} don\`t exists in database` )
        return category
    }

}
