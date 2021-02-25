import { request } from "@/utils/index"
export const SET_USER_DATA = 0
export function setUserData(data: any) {
    return {
        type: SET_USER_DATA,
        data,
    }
}

export async function  login(param: any) {
    // const data = await request.post('/login',param)
    // console.log(data)
    return param
}