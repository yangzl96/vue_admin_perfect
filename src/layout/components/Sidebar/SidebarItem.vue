<template>
  <!-- 创建 `SidebarItem` 组件，
  用来根据数据处理 当前项为 `el-submenu` || `el-menu-item`  -->

  <!-- 支持渲染多级 menu 菜单 -->
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <!-- 导航名称 -->
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <!-- 循环渲染 -->
    <!-- 里面可能又是 el-submenu 这时候就是多层级的了 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-sub-menu>
  <!-- 渲染item -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
  <!-- ex: 导航1
              --导航1-1
              --导航1-2 -->
  <!-- 对于这种有children 那么先渲染 el-submenu 再到 #title
  设置完标题后，再渲染sidebar-item组件 传递children['导航1-1','导航1-2']
  然后发现这两个都没有子集，直接跳到v-else 渲染el-menu-item，结束 -->
</template>

<script setup>
import { defineProps } from 'vue'
import MenuItem from '@/layout/components/Sidebar/MenuItem'

defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
