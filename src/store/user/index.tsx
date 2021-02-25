import { SET_USER_DATA } from "@/store/user/actions";

const controller: { [key: number]: any }  = {
    [SET_USER_DATA](state: IUser) {
        return state
    }
}
export default function userReducer(state: IUser = { name: '',password: '' }, { type,data }: { type: number,data: IUser }) {
    const generator = controller[type]

    return  generator ? generator(data) : state
}

export interface IUser {
    name: string
    password: string
}