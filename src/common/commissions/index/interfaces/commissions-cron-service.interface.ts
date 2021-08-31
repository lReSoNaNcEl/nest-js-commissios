export interface ICommissionsCronService {
    handleExpiredCommissions: () => Promise<void>
}
