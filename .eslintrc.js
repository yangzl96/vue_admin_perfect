module.exports = {
  // 标记当前在根目录
  root: true,
  // 检测环境
  env: {
    // 在node环境下启用
    node: true
  },
  // 继承的配置
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  // 解析器
  parserOptions: {
    parser: 'babel-eslint'
  },
  // off | 0  ：关闭规则
  // warn | 1 ：开启规则，使用警告级别的错误，程序不会退出
  // error | 2 ：开启规则，使用错误级别的错误，程序会退出
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: 'warn',
    'space-before-function-paren': 'off'
  }
}
