//******************  这里引入配置的mock json数据，提供给其他组件使用 ******************* */

// ___引入Mock
import Mock from 'mockjs';
// 引入json数据
import floor from './floor.json';
import banner from './banner.json';
import address from './address.json';

// ___配置Mock请求模拟   参数1 ：请求地址，参数2 S：请求数据
Mock.mock('/mock/banner' , { code:200 , data:banner })
Mock.mock('/mock/floor' , { code:200 , data:floor })
Mock.mock('/mock/address' , { code:200 , data:address })
