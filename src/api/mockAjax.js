// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 利用axios对象的方法create 去创建一个axios实例
// 2request就是axios 只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发送请求的时候，路径当中会出现的 
  baseURL:"http://39.98.123.211/mock",
  // 代表请求超时的时间
  timeout:5000,
})
// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config:配置对象 对象里面有一个数据很重要 headers请求头
  //进度条开始动
  nprogress.start();
  return config;
});
requests.interceptors.response.use((res)=>{
  // 响应成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
  //进度条结束
  nprogress.done();
  return res.data;
},(error) => {
  // 响应失败的回调函数
  return Promise.reject(new Error('faile'))
//  alert("服务器响应数据失败");
});

// 对外暴露
export default requests;