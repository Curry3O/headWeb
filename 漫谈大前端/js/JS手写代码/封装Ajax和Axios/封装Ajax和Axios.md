### Ajax
> 是一个异步的JavaScript与XML技术（ Asynchronous JavaScript and XML ）

> Ajax 核心使用 XMLHttpRequest （XHR）对象,首先由微软引入的一个特性；它不需要任何浏览器插件，能在不更新整个页面的前提下维护数据（可以向服务器请求额外的数据无需重载页面），但需要用户允许JavaScript在浏览器上执行。


#### Ajax特性
    - 不用重新加载页面的情况下发送请求
    - 在不重新加载整个网页，能够更新部分网页



#### 原生Ajax
> 请求流程
    - 建立XMLHttpRequest对象
    - 打开一个连接
    - 设置请求头信息(get可以不用设置)
    - 发送请求
    - 监听响应

```js
let xhr=new XMLHttpRequest();
 
xhr.open(method,url); //method描述在文章下面有介绍
 
xhr.setRequestHeader('Content-type','application/json');
 
xhr.send(data);
//data类型取决于我们设置的Content-type
 
xhr.onreadystatechange=funciton(){
    if(this.readyState==4){
        if(this.status==200){
                        
        }
    }
}
```




#### 请求类型
> 同步请求
    - 提交请求-->等待服务器处理-->处理完毕返回  在这个期间客户端浏览器不能干任何事
>异步请求
    - 请求通过事件触发 -->服务器处理(此时浏览器可以做其它事件) -->处理完毕




#### XHR 对象用法
```js
var xhr = new XMLRequestHttp() // 通过XMLHttpRequest 构造函数来创建
```



#### open 方法
```js
xhr.open(method, url, async, user, password);
```
    - method：要发送的请求类型 GET、POST、PUT、DELETE 。（必选）
    - url：请求的URL （必选）
    - axync ：布尔值，是否异步发送请求，默认true（true 时，已完成事务的通知可供事件监听使用，如果 xhr.multipart为true,则此参数必须为true；false 时，send()方法直到收到答复前不会返回）
    - user：用户名用于认证用途 默认 null
    - password：用户名用于认证用途 默认 null

> 调用open方法不会真正发送请求，只是准备发送请求，并且URL有同源策略的限制（须和页面的主域、端口、协议一致，只要一处不符合要求将报错，数据将被拦截，可通过前后端配置，或使用代理来解决）。



#### setRequestHeader()
> 如需设置 Accpet 头部信息，可通过setRequestHeader() 方法来设置
    - Accpet 头部信息：告知客户端可以处理的内容类型，用 MIME类型 表示；服务端使用 Content-Type 通知客户端它的选择媒体类型（ MIME类型 ） ：一种标准，用来表示文档、文件或字节流的性质和格式。

    - Content-Type ：实体头部用于指示资源的 MIME 类型，告诉客户端实际返回的内容类型；浏览器会在某些情况下进行MIME查找，并不一定遵循此标题的值; 为了防止这种行为，可以将标题 X-Content-Type-Options 设置为 nosniff。

        关于Content-type
            - application/x-www-form-urlencoded   查询字符串  
                格式如下: name=val&age=val2  
            
            - text/plain  普通字符串
            
            - multipart/form-data   二进制

            - application/json  json格式 

```js
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
```



#### send 方法
> data：作为请求主体发送的数据，如果不需要通过请求主体发送数据，则必须传 null。

> 调用 send()发送请求，在收到响应后，响应的数据会自动填充XHR对象的属性。

```js
xhr.send(data);
```



#### responseText
> 从服务端返回的文本
```js
xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {            
            console.log(xhr.responseText);
        }
    }
};
```



#### responseXML
> 如果响应的 Content-Type 为text/html 或 application/xml，将保存包含响应数据的 XML DOM 文档，对于其它类型的数据则为 null, 也可通过overrideMimeType() 强制 XHR 对象解析为 XML
```js
// overrideMimeType() 用来强制解析 response 为 XML
xhr.overrideMimeType('text/xml');

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            console.log(xhr.responseXML);
        }
    }
};
```



#### status
> 返回响应的HTTP状态码，请求完成前值为0，如果XHR 对象出错值也是0， 200 表示请求成功，304表示请求的资源并没有修改，可直接使用浏览器种缓存的数据。



#### readyState
> 返回一个当前XHR对象所处的活动状态
    值      状态                        描述
    0       UNSENT                  代理被创建，但尚未调用 open() 方法。
    1       OPENED                  open() 方法已经被调用。
    2       HEADERS_RECEIVED        send() 方法已经被调用，并且头部和状态已经可获得。
    3       LOADING   下载中;响应体部分正在被接收 responseText 属性已经包含部分数据。4       DONE                    下载操作已完成。




#### onreadystatechange
> 当 readyState变化时会触发次事件函数，如果使用 abort() 取消请求则次事件函数不会被触发
```js
xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText)
    }
}
```




#### XMLHttpRequest Level 2 相比于 老版本的 XMLHttpRequest 新增以下内容：
###### 可以设置 HTTP 请求超时时间
```js
var xhr = XMLHttpRequest();
xhr.open('GET','url');
// 超时 2s
xhr.timeout = 2000;
// 超时处理
xhr.ontimeout = function(e) {
    console.log(e)
}
xhr.send(null)
```




###### 可以通过 FormData 发送表单数据
```js
// 实例化 FormData
var formData = new FormData();
// 添加数据
formData.append(key,value);

xhr.open('POST','url');
xhr.send(formData);
```



###### 可以上传文件
    - FormData 除了可以添加字符串数据，也可以添加 blob、file 类型的数据，因此可以用于上传文件。
    - 在浏览器中，一般是通过文件上传输入框来获取 file 对

```html
<input type="file" name='uploadFile' id="upload-file" />
```

```js
document.getElementById('upload-file').addEventListener('change', function () {
    var formData = new FormData();
    // 获取数据
    formData.append('uploadFile', this.files[0])
    xhr.send(formData)
})
```



###### 支持跨域请求
    - 浏览器默认是不允许跨域请求的，有时候又是必要的，在以前通常使用JSONP来解决（IE10 以下不支持）
    - 为了标准化跨域请求， W3C提出 跨域资源共享（CORS）前端无须修改代码，只需 服务器返回 Access-Control-Allow-Origin 响应头，指定允许对应的域，如果是公共资源可指定“*”
    - CORS 默认不发送 cookie 如果需要发送，前端需要设置 withCredentials属性，同时服务器需要 返回 Access-Control-Allow-Credentials: true

```js
xhr.withCredentials = true;
```

> 检测XHR是否支持CORS最简单的方式，就是检查是否存在 withCredentials，再检测XDomainRequest 对象是否存在，即可兼顾所有浏览器
```js
let createCORSRequest = (method, url) => {
    let xhr = new XMLHttpRequest();
    if ('withCredentials' in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != 'undefined') {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null
    }
    return xhr
}
let request = createCORSRequest('get', 'baidu.com')
if (request) {
    request.onload = function () {
        // request.responseText
    }
    request.send()
}
```



###### Preflighted Requests
    - 一个透明服务器验证机制，用于检查服务器是否支持CORS 这是一个 OPTIONS 请求，使用了三个请求头
    - Access-Control-Request-Method：请求自身使用的方法
    - Origin报头：和简单请求相同，将请求的域发送给服务端，服务端再Access-Control-Allow-Origin 响应头中返回同样的域即可解决跨域问题。




###### img src特性
    - 一个网页可以从任何网页中加载图像，不用担心跨域问题，通过onload 和 onerror 事件处理确定是否接收到响应
    - 请求的数据通过查询字符串形式发送，响应可以是任意内容，通常是像素图或204响应。
    - 只能发送 get 请求，无法访问服务器的响应文本

```js
let img = new Image();
img.onload = function (){
  console.log('done')
}
img.src = 'http://www.baidu.com?test=test1'
```



###### 可以获取服务端二进制数据
> 使用 overrideMimeType 方法覆写服务器指定的 MIME 类型，从而改变浏览器解析数据的方式
```js
// 参数 MIME 类型
// 告诉浏览器，服务器响应的内容是用户自定义的字符集
xhr.overrideMimeType('text/plain; charset=x-user-defined');
// 浏览器就会将服务器返回的二进制数据当成文本处理，我们需要做进一步的转换才能拿到真实的数据
// 获取二进制数据的第 i 位的值
var byte = xhr.responseText.charCodeAt(i) & 0xff
```



> xhr.responseType 用于设置服务器返回的数据的类型,将返回类型设置为 blob 或者 arraybuffer，然后就可以从 xhr.response 属性获取到对应类型的服务器返回数据。
```js
xhr.responseType = 'arraybuffer'
xhr.onload = function () {
var arrayBuffer = xhr.response
    // 接下来对 arrayBuffer 做进一步处理...
}
```



###### 可以获取数据传输进度信息
> 使用 onload 监听了一个数据传输完成的事件。
```js
// 上传进度监听
xhr.upload.addEventListener('progress', onProgressHandler, false);

// 传输成功完成
xhr.upload.addEventListener('load', onLoadHandler, false);
// 传输失败信息
xhr.upload.addEventListener('error', onErrorHandler, false);
```




#### Jquery封装Ajax
> 特点
    - ajax属于jQuery中一部分
    - 回调函数机制
    - 依赖XMLHttpRequest,因此只能运行在浏览器端
    - 自动将data数据转换为字符串

> 参数
    参数名	            描述
    url：请求地址
    method：请求方法(get/post)
    data：提交数据(post请求采用)；如果data为对象，该对象在发送到服务器之前会先被自动转换为查询字符串。可以通过processData选项阻止默认转换
    dataType：期望接受的数据类型，如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断
    async：异步还是同步请求，默认异步
    contenType：取值请参照上面原生Ajax中Content-Type的取值
    processData	：默认true(转换data数据类型为字符串) 如果不希望将data中的数据转换为字符串，则设置false
    beforeSend：发送请求前可修改XMLHttpRequest对象的函数
    success：请求成功后的回调函数
    error：请求失败的回调函数
    complete：请求完成的回调函数(无论请求 失败还是成功都会调用)

> 应用: 有如下数据，将以json格式发送到服务器
```js
var user={
    name:'cc',
    age:22,
    gender:'male'
}
$.ajax({
    url:'',
    method:'post',
    data:JSON.stringify(user),
    contentType:'application/json;charset=UTF-8',
    processData:false  //阻止自动转换为字符串
})
```




### Axios
#### 特点
    - 纯粹ajax库
    - 应用了promise机制
    - 可以直接运行在node环境下，也可以运行在浏览器下、
    - 能拦截请求和相应
    - 自动将data数据转换为JSON


> 参数
    参数名	            描述
    url：请求的接口地址 /user
    method：默认 get请求
    baseURL：'http://120.11.164.247:8099'
    params:{}	必须是一个纯对象，或者url参数对象(get请求参数列表）
    data：适用于post传参
    headers：用于自定义头部信息
    transformRequest:[function(data,header){}]	用于请求之前(send之前)对请求数据进行操作，只有当请求方法为‘post、put、patch’有用 必须有返回值
    transformResponse:[(data)=>{}]	在获取到响应信息，在then/catch执行，用于修改响应信息
    paramSerializer：在执行send之前，用于修改params


#### 安装
> npm install axios




#### 快捷API
    - axios.request(config)
    - axios.get(url[, config])
    - axios.delete(url[, config])
    - axios.head(url[, config])
    - axios.options(url[, config])
    - axios.post(url[, data[, config]])
    - axios.put(url[, data[, config]])
    - axios.patch(url[, data[, config]])





#### methods
###### get
```js
const axios = require('axios')

axios.get('url?id=xxx').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

//or
axios.get('url', {
    params: {
        id: 'xxxxx'
    }
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
```




###### post
```js
axios.post('url', {
    name: 'Owen'
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
```





###### concurrent requests 并发请求
```js
axios.all([axios.get('url1'),axios.get('url2')])
```




#### API
> axios(config)
```js
axios({
    method: 'get', // default is get
    url: 'url', // request  url
    data: { // 仅支持post，put和patch方法，数据作为请求主体发送 ( Only the post,put and patch methods are supported, and the data is sent as the request body )
        /* 浏览器仅支持传递 FormData, File, Blob （The browser only supports passing FormData, File and Blob)
            Node 仅支持传递 Stream, Buffer (The Node only supports passing Stream, Buffer)
        */
        name: 'owen'
    },
    baseURL: 'base/url', // 除非url是绝对路径，否则将baseURL添加到url的前面 (Add baseURL to then front of the url unless the url is an absolute path)
    transformRequest: [function (data, headers) {
        // 可以修改发送的请求数据和请求头，只支持put，post和patch，回调函数必须返回Buffer，ArrayBuffer，FormData或Stream数据
        // Can modify the sent request data and request header,only support put, post and patch.
        // Callback must return Buffer, ArrayBuffer, FormData or Stream data

        // Do whatever you want to transform the data

        return data;
    }],
    transformResponse: [function (data) {
        // 修改响应数据，再传递给 then或catch 方法 （Modify the response data and pass it to the then or catch method)
        // Do whatever you want to transform the data

        return data;
    }],
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }, // 自定义请求头 (Custom request header)
    params: { // 添加到url尾部的参数，一般用于get 和 delete（ Parameters addde to the end of the url,generally used for get and delete )
        id: 'xxx'
    },
    paramsSerializer: function (params) { //序列化 [params] (https://www.npmjs.com/package/qs)
        return Qs.stringify(params, {
            arrayFormat: 'brackets'
        })
    },
    timeout: 1000, // default is 0 , 设置请求超时时间，单位毫秒 （ Set request timeout in milliseconds )
    withCredentials: true, // default is false, 跨域时是否携带cookie（ Whether to carry cookies when crossing domains )
    adapter: function (config) {
        /*拦截响应数据*/
        // At this point:
        //  - config has been merged with defaults
        //  - request transformers have already run
        //  - request interceptors have already run

        // Make the request using config provided
        // Upon response settle the Promise
        return new Promise(function (resolve, reject) {

            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };

            settle(resolve, reject, response);

            // From here:
            //  - response transformers will run
            //  - response interceptors will run

            /**
             * Resolve or reject a Promise based on response status.
             *
             * @param {Function} resolve A function that resolves the promise.
             * @param {Function} reject A function that rejects the promise.
             * @param {object} response The response.
             */
            function settle(resolve, reject, response) {
                var validateStatus = response.config.validateStatus;
                if (!validateStatus || validateStatus(response.status)) {
                    resolve(response);
                } else {
                    reject(createError(
                        'Request failed with status code ' + response.status,
                        response.config,
                        null,
                        response.request,
                        response
                    ));
                }
            };
            /**
             * Create an Error with the specified message, config, error code, request and response.
             *
             * @param {string} message The error message.
             * @param {Object} config The config.
             * @param {string} [code] The error code (for example, 'ECONNABORTED').
             * @param {Object} [request] The request.
             * @param {Object} [response] The response.
             * @returns {Error} The created error.
             */
            function createError(message, config, code, request, response) {
                var error = new Error(message);
                return enhanceError(error, config, code, request, response);
            }

            /**
             * Update an Error with the specified config, error code, and response.
             *
             * @param {Error} error The error to update.
             * @param {Object} config The config.
             * @param {string} [code] The error code (for example, 'ECONNABORTED').
             * @param {Object} [request] The request.
             * @param {Object} [response] The response.
             * @returns {Error} The error.
             */
            function enhanceError(error, config, code, request, response) {
                error.config = config;
                if (code) {
                    error.code = code;
                }

                error.request = request;
                error.response = response;
                error.isAxiosError = true;

                error.toJSON = function () {
                    return {
                        // Standard
                        message: this.message,
                        name: this.name,
                        // Microsoft
                        description: this.description,
                        number: this.number,
                        // Mozilla
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        // Axios
                        config: this.config,
                        code: this.code
                    };
                };
                return error;
            }
        });
    },
    auth: { //  表示应使用HTTP Basic身份验证，并提供凭据 ( indicates that HTTP Basic auth should be used, and supplies credentials. )
        user: 'xxx',
        password: '***'
    },
    responseType: 'json',
    /* 服务器响应的数据类型（ The server response data type ）
                                支持 arraybuffer, blob, document, json, text, stream
                            */
    responseEncoding: 'utf8', // 用于解码响应的编码 (Encoding for decoding the response )
    xsrfCookieName: 'XSRF-TOKEN', // default is XSRF-TOKEN , csrf令牌Cookie 名称
    xsrfHeaderName: 'X-XSRF-TOKEN', //default is X-XSRF-TOKEN, xsrf标记值的http标头的名称
    onUploadProgress: function (progressEvent) { //上传进度事件 （handling of progress events for uploads ）
        console.log(progressEvent)
    },
    onDownloadProgress: function (progressEvent) { // 下载进度事件 （ handling of progress events for downloads）
        console.log(progressEvent)
    },
    maxContentLength: 2000, // 允许响应内容的最大字节 （defines the max size of the http response content in bytes allowed）
    validateStatus: function (status) { // 返回给定HTTP状态范围, 如果状态在给定范围内，响应数据传给`then` ，否则传给 `catch` ( Returns the given HTTP status range, if the status is within the give range, the respones data is passed to `then`, otherwise passed to `catch` )
        return status >= 200 && status < 300; // default
    },
    maxRedirects: 5, // default is 5  // 定义Node 中最大重定向数  ( defines the maximunn number of redirects in Node )
    socketPath: null, //  default is null 定义要在node.js中使用的 UNIX socket
    httpAgent: new http.Agent({
        keepAlive: true
    }), // node 中 http 和 https 的代理
    httpsAgent: new https.Agent({
        keepAlive: true
    }), // http://nodejs.cn/api/http.html
    proxy: { // 代理配置
        host: '127.0.0.1',
        port: 9000,
        auth: {
            username: 'mikeymike',
            password: 'rapunz3l'
        }
    },
    cancelToken: new CancelToken(function (cancel) { // 取消请求的 token
    })
})
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})
```




#### 全局配置
> 通过 axios.create 方法来替换全局配置
```js
const instance = axios.create({
    baseURL: 'base/url'
});
```
> 通过axios.defaults 对象替换全局默认配置
```js
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```



#### 设置请求超时
> 通过axios.defaults.timeout设置默认的请求超时时间。例如超过了10s，就会告知用户当前请求超时，请刷新等。
```js
axios.defaults.timeout = 10000;
```




#### post请求头的设置
> post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
```js
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
```




#### 拦截器
> 拦截请求前的数据。响应拦截器很好理解，就是服务器返回给我们的数据，我们在拿到之前可以对他进行一些处理。例如上面的思想：如果后台返回的状态码是200，则正常返回数据，否则的根据错误的状态码类型进行一些我们需要的错误，其实这里主要就是进行了错误的统一处理和没登录或登录过期后调整登录页的一个操作。
```js
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
```

> 拦截响应数据
```js
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
```

> 删除拦截器
```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```




#### 封装get方法
> get方法：我们通过定义一个get函数，get函数有两个参数，第一个参数表示我们要请求的url地址，第二个参数是我们要携带的请求参数。get函数返回一个promise对象，当axios其请求成功时resolve服务器返回 值，请求失败时reject错误值。最后通过export抛出get函数。
```js
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});
```




#### 封装post方法
> post方法：原理同get基本一样，但是要注意的是，post方法必须要使用对提交从参数对象进行序列化的操作，所以这里我们通过node的qs模块来序列化我们的参数（import QS from 'qs';）。这个很重要，如果没有序列化操作，后台是拿不到你提交的数据的。
```js
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
```

> 这里有个小细节说下，axios.get()方法和axios.post()在提交数据时参数的书写方式还是有区别的。区别就是，get的第二个参数是一个{}，然后这个对象的params属性值是一个参数对象的。而post的第二个参数就是一个参数对象。





#### 导出
```js
import axios from './api';

const get = (url, data) => {
    return axios({
        url,
        method: 'get',
        params: data
    });
};
const post = (url, data, json) => {
    return axios({
        url,
        method: 'post',
        data,
        json
    });
};
const del = (url, data) => {
    return axios({
        url,
        method: 'delete',
        params: data
    });
};
const put = (url, data, json) => {
    return axios({
        url,
        method: 'put',
        data,
        json
    });
};

export default {
    get,
    post,
    del,
    put
};
```




### Fetch
> 随着前端异步的发展， XHR 这种耦合方式的书写不利于前端异步的 Promise 回调。而且，写起来也是很复杂.。fetch API 本来是在 SW(ServiceWorkers) 中提出的，不过，后面觉得好用， 就把他挂载到 window 对象下。这样，在前端的正常通信中, 我们也可以直接调用。

> Fetch本质上是一种标准，该标准定义了请求、响应和绑定的流程。Fetch标准还定义了Fetch () JavaScript API，它在相当低的抽象级别上公开了大部分网络功能，我们今天讲的主要是Fetch API。Fetch API 提供了一个获取资源的接口（包括跨域）。它类似于 XMLHttpRequest ，但新的API提供了更强大和灵活的功能集。Fetch 的核心在于对 HTTP 接口的抽象，包括 Request，Response，Headers，Body，以及用于初始化异步请求的 global fetch。




#### fetch() 方法的使用
> Fetch API 提供了一种全局fetch()方法，该方法位于 WorkerOrGlobalScope 这一个 mixin 中 方法用于发起获取资源的请求。它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 Response 对象。
```js
fetch(input?: Request | string, init?: RequestInit): Promise<Response>

fetch(url, options).then(function(response) {
  // 处理 HTTP 响应
}, function(error) {
  // 处理网络错误
})
```




#### fetch() 参数
> fetch方法可以接收两个参数input和options。
    - input 参数可以是字符串，包含要获取资源的 URL。也可以是一个 Request 对象。
    - options 是一个可选参数。一个配置项对象，包括所有对请求的设置。可选的参数有：
        - method: 请求使用的方法，如 GET、POST。
        - headers: 请求的头信息，包含与请求关联的Headers对象。
        - body: 请求的 body 信息。注意 GET 或 HEAD 方法的请求不能包含 body 信息
        - mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
        - credentials: 请求的 credentials，如 omit、same-origin 或者 include。为了在当前域名内自动发送 cookie ， 必须提供这个选项。





#### 常用的fetch请求
> HTML
```js
fetch('/index/fetchHtml').then((res) => {
    return res.text()
}).then((result) => {
    document.body.innerHTML += result
})
.catch((err) => {

})
```

> JSON
```js
fetch('/api/user/CaiCai').then((res) => {
    return res.json()
}).then((json) => {
    console.log(json)
}).catch((err => {
    
}))


```

> POST Form
```js
function postForm() {
    const form = document.querySelector('form')
    const name = encodeURI(document.getElementsByName('name')[0].value)
    fetch(`/api/user/${name}`, {
        method: 'POST',
        body: new FormData(form)
    })
}
```

> POST JSON
```js
fetch('/api/user/CaiCai', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'CaiCai',
        age: '26',
    })
})
```




#### 请求头(Request Headers)
> 自定义请求头信息极大地增强了请求的灵活性。我们可以通过 new Headers() 来创建请求头:
```js
// 创建一个空的 Headers 对象,注意是Headers，不是Header
var headers = new Headers();

// 添加(append)请求头信息
headers.append('Content-Type', 'text/plain');
headers.append('X-My-Custom-Header', 'CustomValue');

// 判断(has), 获取(get), 以及修改(set)请求头的值
headers.has('Content-Type'); // true
headers.get('Content-Type'); // "text/plain"
headers.set('Content-Type', 'application/json');

// 删除某条请求头信息(a header)
headers.delete('X-My-Custom-Header');

// 创建对象时设置初始化信息
var headers = new Headers({
    'Content-Type': 'text/plain',
    'X-My-Custom-Header': 'CustomValue'
});
```
> 可以使用的方法包括: append, has, get, set, 以及 delete 。需要创建一个 Request 对象来包装请求头:
```js
var request = new Request('/some-url', {
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

fetch(request).then(function() { /* handle response */ });
```




#### Request 简介
> Request 对象表示一次 fetch 调用的请求信息。传入 Request 参数来调用 fetch, 可以执行很多自定义请求的高级用法:
    - method：支持 GET, POST, PUT, DELETE, HEAD
    - url：请求的 URL
    - headers：对应的 Headers 对象
    - referrer：请求的 referrer 信息
    - mode：可以设置 cors, no-cors, same-origin
    - credentials：设置 cookies 是否随请求一起发送。可以设置: omit, same-origin
    - redirect：follow, error, manual
    - integrity：subresource 完整性值(integrity value)
    - cache：设置 cache 模式 (default, reload, no-cache)

> Request 的示例如下:
```js
var request = new Request('/users.json', {
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

// 使用
fetch(request).then(function() { /* handle response */ });
```
> 只有第一个参数 URL 是必需的。在 Request 对象创建完成之后, 所有的属性都变为只读属性. 请注意, Request 有一个很重要的 clone 方法, 特别是在 Service Worker API 中使用时 —— 一个 Request 就代表一串流(stream), 如果想要传递给另一个 fetch 方法,则需要进行克隆。


> fetch 的方法签名(signature,可理解为配置参数), 和 Request 很像, 示例如下:
```js
fetch('/users.json', {
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
}).then(function() { /* handle response */ });
```




#### Response 简介
> Response 代表响应, fetch 的 then 方法接收一个 Response 实例, 当然你也可以手动创建 Response 对象 —— 比如在 service workers 中可能会用到. Response 可以配置的参数包括:
    - type：类型,支持: basic, cors
    - url
    - useFinalURL：Boolean 值, 代表 url 是否是最终 URL
    - status：状态码 (例如: 200, 404, 等等)
    - ok：Boolean值,代表成功响应(status 值在 200-299 之间)
    - statusText：状态值(例如: OK)
    - headers：与响应相关联的 Headers 对象.

```js
// 在 service worker 测试中手动创建 response
// new Response(BODY, OPTIONS)
var response = new Response('.....', {
    ok: false,
    status: 404,
    url: '/'
});

// fetch 的 `then` 会传入一个 Response 对象
fetch('/').then(function(responseObj) {
    console.log('status: ', responseObj.status);
});
```


> Response 提供的方法如下:
    clone() - 创建一个新的 Response 克隆对象.
    error() - 返回一个新的,与网络错误相关的 Response 对象.
    redirect() - 重定向,使用新的 URL 创建新的 response 对象..
    arrayBuffer() - Returns a promise that resolves with an ArrayBuffer.
    blob() - 返回一个 promise, resolves 是一个 Blob.
    formData() - 返回一个 promise, resolves 是一个 FormData 对象.
    json() - 返回一个 promise, resolves 是一个 JSON 对象.
    text() - 返回一个 promise, resolves 是一个 USVString (text).




#### 处理Blob结果
> 如果你想通过 fetch 加载图像或者其他二进制数据, 则会略有不同:
```js
fetch('flowers.jpg').then(function(response) {
    return response.blob();
}).then(function(imageBlob) {
    document.querySelector('img').src = URL.createObjectURL(imageBlob);
});
```
> 响应 Body mixin 的 blob() 方法处理响应流(Response stream), 并且将其读完。




#### fetch注意事项
###### 错误处理
> fetch只有在网络错误的情况，返回的promise会被reject。成功的 fetch() 检查不仅要包括 promise 被 resolve，还要包括 Response.ok 属性为 true。HTTP 404 状态并不被认为是网络错误，所以Promise的状态为resolve。




###### credentials 设置
> fetch可以通过credentials自己控制发送请求时是否带上cookie。credentials可设置为include、same-origin、omit。include为了让浏览器发送包含凭据的请求（即使是跨域源）。如果你只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加credentials: 'same-origin'。要改为确保浏览器不在请求中包含凭据，请使用credentials: 'omit'。

> credentials 默认是“same-origin”，但是以下版本的浏览器实现了一个更老版本的fetch规范，其中默认是“忽略”:Firefox 39-60Chrome 42 - 67Safari 10.1 11.1.2 如果您的目标是这些浏览器，建议始终对所有fetch请求显式指定凭据:'同源'，而不是依赖于默认




###### 中止
> fetch 自身并没有提供 中止请求的方法。但是部分浏览器有实现AbortController，可以通过AbortController中止fetch请求
```js
const controller = new AbortController();
const signal = controller.signal;
setTimeout(() => controller.abort(), 5000);


fetch('/api/user/CaiCai', {
    signal, // 在option中加入signal
    method: 'POST',
    // credentials:'include',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'CaiCai',
        age: '26',
    })
}).then((res) => {
    return res.json()
}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})
```



#### 为什么要用Fetch、而不用XHR
    - fetch返回的是promise对象，比XMLHttpRequest的实现更简洁，fetch 使用起来更简洁，完成工作所需的实际代码量也更少

    - fetch 可自定义是否携带Cookie

    - fetch在ServiceWorker中使用