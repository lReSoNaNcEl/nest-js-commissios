import {HttpException, HttpStatus} from '@nestjs/common'

export class ReportIsLockedException extends HttpException {
    constructor() {
        super('The report is frozen for editing, it is expected to be checked by the administrator!', HttpStatus.FORBIDDEN)
    }
}
