<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    router
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :uniqueOpened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
  >
    <!-- el-menu 下可以是 el-submenu(element-plus是el-sub-menu但是渲染出来样式有问题
    是版本的问题，需要升级element-plus
    el-submenu是element的)，同时也可以是el-menu-item -->
    <sidebar-item v-for="item in routes" :key="item.path" :route="item">
    </sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem'

const router = useRouter()
// routes: 处理好的route数据，去除了/login /404这些路由
// 同时每个路由都有title icon 这两个属性
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
// 计算当前高亮的 menu
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
