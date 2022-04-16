import { v4 as uuidv4} from 'uuid'
// 生成一个随机字符串，且每次执行不会再发生变化
// 游客身份要持久存储
export const getUUID=()=>{
      // 获取本地存储的uuid游客身份
      let uuid_token =localStorage.getItem('UUID')
      if(!uuid_token){ // 如果没有获取到
            uuid_token =uuidv4() // 生成一个游客id
            console.log(uuid_token);
            localStorage.setItem('UUID',uuid_token) // 持久化存储
      }
      return uuid_token;
}