export enum Roles {
    IMPLEMENTOR = 'implementor',
    ADMIN = 'admin'
}

export interface IUser {
    id: number
    email: string
    password: string
    name: string
    role: Roles
}
