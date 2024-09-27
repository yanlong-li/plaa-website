<script setup lang="ts">

</script>

<template>
  <section class="container max-w-full">
    <div class="center" style="width: 300px">
      <form action="" method="post">
        <div class="item" style="margin-bottom: 15px;">
          <label for="username" style="font-size: 18px;color: #bbbbbb;">账号：</label>
          <input style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                 id="username" type="text" name="username" placeholder="请输入您要注册的账号 支持数字字母">
        </div>
        <div class="item" style="margin-bottom: 15px;">
          <label for="password" style="font-size: 18px;color: #bbbbbb;">密码：</label>
          <input style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                 id="password" type="password" name="password" placeholder="6-32位数字、字母、下划线">
        </div>
        <div class="item">
          <input type="submit" value="注册"
                 style="width: 100px;height: 36px;line-height: 36px;background: #1c7ecf;border: none;border-radius: 3px;color: white;">
          <NuxtLink to="/login" style="color: #666666;">已有账号？前往登录。</NuxtLink>
        </div>

      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.container {
  padding-bottom: 20px;
  margin-bottom: 40px;
  .center {
    margin: 0 auto;
  }
}
</style>