import {Connection, Repository, getRepository} from 'typeorm'
import { Category } from "../../../common/commissions/categories/enitities/Category.entity";

export const CreateCategoriesSeed = async () => {
    const repository: Repository<Category> = getRepository(Category)

    const categories = []

    categories.map(async title => {
        const category = await repository.findOne({where: {title}})
        if (!category) return repository.save(repository.create({title}))
    })

}
