import path from 'path'
// 期望的结构就是将 全局路由先过滤一遍，留下不重复的路由
// 然后找出带有 title 和 icon的路由，因为要作为菜单显示

// 目标：将现有的路由表结构改造成我们期望的结构
// 1. filterRouters 剔除掉全局路由中的子路由

/**
 * 因为我们通过router.getRoutes() 打印出来的是所有的路由
 * 包含被定义在children中的子路由，都被单独的拎出来枚举了
 * 所以要过滤一下，把这些单独被拎出来的子路由干掉
 */
export const filterRouters = routes => {
  // 获取所有子路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 开始过滤 使用getRoutes的路由通过childrenRoutes去过滤
  return routes.filter(route => {
    // 去childrenRoutes中找到和当前route相同的路由
    // 那么相同的就是要被排除的，所以不相同的就是要被保留的
    // 所以这里取反 留下不相同的
    // 遍历所有子路由，找到与全部路由(getRoutes)中相同的路由，就是要被排除的
    // 那么取反就是留下全部路由中与子路由不相同的路由
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

// 根据 routes数据（已经被过滤了的，不包含单个的子路由），返回对应的menu数据
export function generateMenus(routes, basePath = '') {
  // debugger
  const result = []
  // 遍历路由表
  routes.forEach(item => {
    // debugger
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // debugger
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // debugger
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}

// 不为空
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

// 返回所有的子路由
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
