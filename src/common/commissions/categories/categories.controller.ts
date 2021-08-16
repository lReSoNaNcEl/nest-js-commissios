import { Controller, Get } from "@nestjs/common";
import { ICategoriesController } from "./interfaces/categories-controller.interface";
import { CategoriesService } from "./categories.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categories Of Commission')
@Controller('commissions/categories')
export class CategoriesController implements ICategoriesController {

    constructor(
        private categoriesService: CategoriesService
    ) {}

    @Get()
    getCategories() {
        return this.categoriesService.getCategories()
    }

}
