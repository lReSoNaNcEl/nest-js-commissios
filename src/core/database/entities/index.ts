import {User} from "../../../common/users/entities/User.entity"
import {Category} from "../../../common/commissions/categories/enitities/Category.entity";
import {Commission} from "../../../common/commissions/index/entities/Commission.entity";
import { Source } from "../../../common/commissions/sources/entities/Source.entity";
import { Report } from "../../../common/commissions/reports/index/entities/Report.entity";

export const entities = [
    User, Category, Commission, Source, Report
]
