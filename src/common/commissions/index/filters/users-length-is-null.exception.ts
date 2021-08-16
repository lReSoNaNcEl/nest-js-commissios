import {HttpException, HttpStatus} from '@nestjs/common'

export class UsersLengthIsNullException extends HttpException {
    constructor() {
        super('When creating an commission, all users must exist in the database', HttpStatus.BAD_REQUEST)
    }
}
