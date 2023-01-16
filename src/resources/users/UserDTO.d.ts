export interface IUser {
    id?: string
    username: string
    age: string
    hobbies: string
}

export type IUserResponse = Omit<IUser, "id">;