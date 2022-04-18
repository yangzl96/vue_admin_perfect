module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则
  roles: {
    // type类型的定义：git 提交的type 必须在以下范围
    'type-enum': [
      // 当前验证的错误级别
      2,
      // 在什么情况下进行验证
      'always',
      // 泛型内容
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'refactor', // 重构（既不增加新功能，也不是修复Bug）
        'style', // 代码格式（不影响代码运行的变动）
        'docs', //文档注释
        'perf', // 性能优化
        'test', // 增加测试
        'build', //打包
        'revert', //回退
        'chore', // 构建过程或辅助工具的变动
      ]
    ],
    // 大小写不做校验
    'subject-case': [0]
  }
};
