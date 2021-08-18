import {HttpException, HttpStatus} from '@nestjs/common'

export class HasNotAccessSendReportToReviewException extends HttpException {
    constructor() {
        super('You don`t have the right to send a report for verification that does not belong to you!', HttpStatus.FORBIDDEN)
    }
}
