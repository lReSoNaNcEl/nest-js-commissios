import {User} from "../../../common/users/entities/User.entity"
import {Category} from "../../../common/commissions/categories/enitities/Category.entity";
import {Commission} from "../../../common/commissions/index/entities/Commission.entity";
import { Source } from "../../../common/commissions/sources/entities/Source.entity";
import { Report } from "../../../common/commissions/reports/index/entities/Report.entity";
import { CommissionDocument } from "../../../common/commissions/documents/entities/CommissionDocument.entity";
import { ReportDocument } from "../../../common/commissions/reports/documents/entities/ReportDocument.entity";
import { ReportComment } from "../../../common/commissions/reports/comments/entities/ReportComment.entity";

export const entities = [
    User, Category, Commission, Source, Report, CommissionDocument, ReportDocument, ReportComment
]
