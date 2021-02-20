const Store = {
    get(key: string): any {
        let data: any = localStorage.getItem(key)
        try {
            data = JSON.parse(data)
        } catch{

        }
        return data
    },
    set(key: string,value: any) {
        if(typeof value === 'undefined' || value === null || Number.isNaN(value)) {
            return
        }
        if(typeof value === 'object') {
            value = JSON.stringify(value)
        }
        localStorage.setItem(key,value)
    }
}

export default Store