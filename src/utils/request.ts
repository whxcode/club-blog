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
export  async function request(method: 'POST' | 'GET',url: string,params: any) {
    const requestConfig = {
        method,
        body: plainToFormData(params),
    }
    const responseBlob = await fetch(`${ BASE_URL }${ url }`,requestConfig)
    const response = responseBlob.json()
    return response
}
export default  {
    post: request.bind(null,'POST'),
    get: request.bind(null,'GET')
}
