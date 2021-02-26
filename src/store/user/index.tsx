import { SET_USER_DATA } from "@/store/user/actions";

const controller: { [key: number]: any }  = {
    [SET_USER_DATA](state: IUser) {
        return state
    }
}

export interface IUser {
    username: string
    password: string
    about: string
    avatar: string
    createTime: string
    updateTime: string
    id: number,
    email: string
}
export default function userReducer(state: IUser = ({  } as IUser), { type,data }: { type: number,data: IUser }) {
    const generator = controller[type]
    return  generator ? generator(data) : state
}

