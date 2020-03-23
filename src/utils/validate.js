// 输入数据验证规则
// 用户名验证 6-12位（字母，数字，下划线）
export function isvalidName (str) {
  const reg = /^[a-zA-Z_\d]{6,12}$/
  return reg.test(str)
}

// 密码验证 6-16位，必须包含数字，字母,特殊字符
export function isvalidPass (str) {
  const reg = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*?()]).*$/
  return reg.test(str)
}

// 手机号验证
export function isvalidPhone (str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}
