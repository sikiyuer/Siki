import {getCode,Register,Login,TokenLogin,Logout} from '@/api'

const state={
      code:'',
      token:localStorage.getItem('usertoken'),  // vuex的数据不是持久化的，所以像这种用户id可以存储到本地
      userInfo:{}
}
const mutations={
      GETCODE(state,code){
            state.code = code 
      },
      LOGIN(state,token){
            state.token = token
            localStorage.setItem('usertoken',token) 

      },
      TOKENLOGIN(state,userInfo){
            state.userInfo = userInfo
      },
      LOGOUT(state){
            state.token = ''
            state.userInfo={}
            localStorage.setItem('usertoken','') 
      }
}
const actions={
async getcode({commit},phone){ // 获取验证码
      let result = await getCode(phone)
      if(result.code == 200){
            console.log("获取的验证码",result.data);
            commit('GETCODE',result.data)
      }
      // console.log(result);
},
async userRigister({commit},user){ // 用户注册
          console.log(user);
       let result =  await Register(user)
       if(result.code == 200){return '注册成功'}
       else{
             console.log(result);
             return Promise.reject(new Error('注册失败'))
       }
       console.log(result);
    },
async login({commit},user){ // 用户登录
          let result = await Login(user)
      //     debugger
          if(result.code == 200){
                // 登录成功服务器下发  token 令牌（相对于id） 之后经常通过此标识来找服务器要用户信息
                commit('LOGIN',result.data.token)
            //     alert('登录成功,存储token')
            return '登录成功'
          }
          else{
                return Promise.reject(new Error('用户名或密码错误'))
          }
    
    },
async tokenLogin({commit}){  // 登录成功通过token获取用户数据
     let result = await TokenLogin()
     if(result.code==200){
      alert('当前页面无用户信息。重新获取')
           commit('TOKENLOGIN',result.data)
           return '获取数据成功'
     }
     else{
           return Promise.reject(new Error('获取用户信息失败'))
     }
},
async logout({commit}){
      let result = await Logout()
      if (result.code == 200) {
            commit('LOGOUT')
            return ('退出登录成功')
      }
      else{
            return Promise.reject(new Error('退出登录失败'))
      }
}
   
}
const getters={}
export default{
      namespaced:true,
      state,
      mutations,
      actions,
      getters
}