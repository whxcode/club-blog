function plainToFormData(params: any): FormData {
    if(params instanceof FormData) {
        return params
    }
    const formData = new FormData()
    Object.keys(params).forEach(key => {
        if(typeof params[key] == 'object') {
            params[key] = JSON.stringify(params[key])
        }
        formData.append(key, params[key])
    })
    return formData
}
const BASE_URL = '/api'
function onError(response: any) {
    if(response.code === 0) {
        return
    }
    if(response.code === 3) {
        window.alert('账号已存在，请输入新的账号\n或者您输入的密码错误，请重试。')
    } else {
        window.alert(response.msg)
    }
}

export  async function request(url: string,params: any) {
    const requestConfig = {
        method: 'POST',
        body: plainToFormData(params),
    }
    const responseBlob = await fetch(`${ BASE_URL }${ url }`,requestConfig)
    const response = await responseBlob.json()
    onError(response)
    return response
}
export default  {
     post:request,

}
