<script setup lang="ts">
let user = useState('user');
let isGuest = useState('isGuest');
let loginForm = ref({
  username: '',
  password: ''
});

let errorMsg = ref('');

const login = () => {
  $fetch('/api/user/login', {
    method: 'POST',
    body: loginForm.value,
  }).then(res => {
    if (res.code === 1) {
      user.value = res.data;
      isGuest.value = false;
      useRouter().push('/');
    } else {
      errorMsg.value = res.msg;
    }
  }).catch(e => {
    console.log(e)
  })
}
</script>

<template>
  <section class="container max-w-full">
    <div class="center" style="width: 300px">
      <form method="post">
        <div class="item" style="margin-bottom: 15px;">
          <label style="font-size: 18px;color: #bbbbbb;">账号：</label>
          <input v-model="loginForm.username"
                 style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                 type="text" name="username" placeholder="请输入您的账号">
        </div>
        <div class="item" style="margin-bottom: 15px;">
          <label style="font-size: 18px;color: #bbbbbb;">密码：</label>
          <input v-model="loginForm.password"
                 style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                 type="password" name="password" placeholder="请输入您的密码">
        </div>
        <div class="item">
          <input type="button" @click="login" value="登录"
                 style="width: 100px;height: 36px;line-height: 36px;background: #1c7ecf;border: none;border-radius: 3px;color: white;">
          <NuxtLink to="/register" style="color: #666666;">没有账号？请先注册</NuxtLink>
        </div>
        {{ errorMsg }}
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