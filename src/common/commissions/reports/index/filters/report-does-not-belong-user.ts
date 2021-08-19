import {HttpException, HttpStatus} from '@nestjs/common'

export class ReportDoesNotBelongUser extends HttpException {
    constructor() {
        super('The report does not belong to the current user!', HttpStatus.FORBIDDEN)
    }
}
