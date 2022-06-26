import {http} from "@tauri-apps/api";
import {resolve} from "@tauri-apps/api/path";

class Ask {
    constructor(config) {

    }

    interceptors = {
        baseURL: 'http://localhost:5000',
        requert: {
            headers: {},
            body: {},
            use: () => {

            }
        },
        response: response => {
            return new Promise((rec, rej) => {
                console.log('ECT',response)
                if (response.data.type == 'success') {
                    rec(response.data)
                }
            })
        }
    }
    post = (url, data) => {
        return new Promise(resolve => {
            const requestBody = {...data, ...this.interceptors.requert.body}
            const requestHeaders = {...this.interceptors.requert.headers}
            this.interceptors.requert.use();
            http.fetch(this.interceptors.baseURL + url, {
                headers: requestHeaders,
                method: 'POST',
                // 常规的json格式请求体发送
                body: http.Body.json(requestBody)
            }).then(res => {
                // res为请求成功的回调数据
                resolve(this.interceptors.response(res))
            });
        })
    }
    get = (url, data) => {
        return new Promise(resolve => {
            const requestQuery = {...data, ...this.interceptors.requert.body}
            const requestHeaders = {...this.interceptors.requert.headers}
            this.interceptors.requert.use();
            http.fetch(this.interceptors.baseURL + url, {
                headers: requestHeaders,
                method: 'GET',
                // 常规的json格式请求体发送
                query: requestQuery
            }).then(res => {
                // res为请求成功的回调数据
                resolve(this.interceptors.response(res))
            });
        })
    }
}


const Asks = {
    interceptors: {
        baseURL: 'http://localhost:5000',
        requert: {
            headers: {},
            body: {},
            use: () => {

            }
        },
        response: response => {
            return new Promise((rec, rej) => {
                console.log(rec)
                if (rec.type == 'success') {
                    rec(rec)
                }
            })
        }
    },
    post: (url, data) => {
        return new Promise(resolve => {
            console.log(this)
            const requestBody = {...data, ...this.interceptors.requert.body}
            const requestHeaders = {...this.interceptors.requert.headers}
            this.interceptors.requert.use();
            http.fetch(this.baseURL + url, {
                headers: requestHeaders,
                method: 'POST',
                // 常规的json格式请求体发送
                body: http.Body.json(requestBody)
            }).then(res => {
                // res为请求成功的回调数据
                resolve(this.interceptors.response(res))
            });
        })
    },
    get: (url, data) => {
        return new Promise(resolve => {
            const requestQuery = {...data, ...this.interceptors.requert.body}
            const requestHeaders = {...this.interceptors.requert.headers}
            this.interceptors.requert.use();
            http.fetch(this.baseURL + url, {
                headers: requestHeaders,
                method: 'GET',
                // 常规的json格式请求体发送
                query: requestQuery
            }).then(res => {
                // res为请求成功的回调数据
                resolve(this.interceptors.response(res))
            });
        })
    }
}

function test() {
    // 此处示例的是请求用户列表的接口示例，常规的标准接口，包含请求头的token令牌和请求参数
    http.fetch('http://192.168.1.1/v1/user/list', {
        headers: {
            Authorization: 'Bearer test'
        },
        method: 'GET',
        // *** 注意：get请求的参数值必须为字符串，不然tauri会报错，这是tauri框架的要求；可以自己手动进行字符串强制转换 ***
        query: {
            page: '1',
            pageSize: '10'
        }
    }).then(res => {
        // res为请求成功的回调数据
    });

// 此处示例的是请求新增用户的接口示例，常规的标准接口，包含请求头的token令牌和请求体
    http.fetch('http://192.168.1.1/v1/user/create', {
        headers: {
            Authorization: 'Bearer test',
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
        // 常规的json格式请求体发送
        body: http.Body.json({
            userName: '小张',
            age: 20
        })
    }).then(res => {
        // res为请求成功的回调数据
    });

// 部分业务场景，后端需要接口formData类型的请求体，只需要将body改为form形式即可
    http.fetch('http://192.168.1.1/v1/user/create', {
        headers: {
            Authorization: 'Bearer test'
        },
        method: 'POST',
        // 常规的json格式请求体发送
        body: http.Body.form({
            userName: '小张',
            age: 20
        })
    }).then(res => {
        // res为请求成功的回调数据
    });
}

export default Ask