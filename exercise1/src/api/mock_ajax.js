
//******************这里配置<AXIOS>请求的拦截器等信息</AXIOS>********************* */
import axios from 'axios' // 引入axios
import nprogress from 'nprogress' // 引入进度条 start发送请求开始，服务器响应数据之后 done
import  'nprogress/nprogress.css' // 引入进度条样式

const Request = axios.create({     
      baseURL:"/mock" ,          // 基础路径
      timeout:5000,             //超时5s自动取消
})
  //设置请求拦截器，在发送请求之前进行检查，在发送之前进行一些操作
  Request.interceptors.request.use((config)=>{
        // config配置对象，里面有一个很重要的属性 headers请求头
        nprogress.start()
        return config
  })
  // 设置响应拦截器，在成功之后返回数据后进行操作
  Request.interceptors.response.use((res)=>{
      nprogress.done()
      // return Promise.reject(res)
            return res.data
  },(err)=>{
      // 响应失败的回调
      return Promise.reject(new Error('请求失败'))
  })
  
export default Request