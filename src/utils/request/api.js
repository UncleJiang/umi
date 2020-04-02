/**
 * api接口统一管理
 */
import { get, post, del } from './http'

// 接口依次为 账户密码登录、注册、退出登录、查看用户列表、删除用户、添加用户、个人信息、修改密码
export const apiLogin1 = p => post('user/login', p)
export const apiRegister = p => post('user/register', p)
export const apiLogout = p => get('user/logout', p)
export const apiUserList = p => get('user/view', p)
export const apiDelUser = p => del('user/delete/' + p)
export const apiAddUser = p => post('user/adduser', p)
export const apiPersonInfo = p => get('user/personal', p)
export const apiModify = p => post('user/modify', p)
