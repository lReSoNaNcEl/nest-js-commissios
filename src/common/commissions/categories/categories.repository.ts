import { EntityRepository, Repository } from "typeorm";
import { Category } from "./enitities/Category.entity";
import { ICategoriesRepository } from "./interfaces/categories-repository.interface";

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> implements ICategoriesRepository {}
