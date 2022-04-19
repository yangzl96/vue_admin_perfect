<template>
  <div class="login-container">
    <el-form class="login-form" ref="form" :model="form" label-width="80px">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item label="label">
        <span class="svg-container">
          <el-icon>
            <avatar />
          </el-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          v-model="model"
        ></el-input>
      </el-form-item>
      <el-form-item label="label">
        <span class="svg-container">
          <el-icon>
            <avatar />
          </el-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="model"
        ></el-input>
        <span class="show-pwd">
          <el-icon>
            <avatar />
          </el-icon>
        </span>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-bottom: 30px"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { Avatar } from '@element-plus/icons'
</script>

<style lang="scss" scoped></style>
