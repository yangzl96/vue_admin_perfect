<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 最后一项不需要跳转 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
          {{ generateTitle(item.meta.title) }}
        </span>
        <!-- 需要跳转的 -->
        <span v-else class="redirect" @click.prevent="onLinkClick(item)">
          {{ generateTitle(item.meta.title) }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

// 当前路由信息
const route = useRoute()
const router = useRouter()

// 生成数组数据 供面包屑渲染
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  // route.matched：匹配跟当前路由相关的路径 那么就会得到当前的父级
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

// 监听路由的变化
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

// 点击跳转
const onLinkClick = (item) => {
  router.push(item.path)
}

// 将来需要进行主题替换，所以这里获取下动态样式
const store = useStore()
// eslint-disable-next-line
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }
  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
