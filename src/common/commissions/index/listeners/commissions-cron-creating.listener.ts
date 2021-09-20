import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CommissionsCronCreatingListener {


    @OnEvent('commissions-cron-creating')
    async commissionsCronCreating() {
        console.log('commissions-cron-creating');
    }
}