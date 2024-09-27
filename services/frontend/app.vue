<script setup>
const user = useState('user');
const isGuest = useState('isGuest');

useHead({
  title: '随时删档跑路的上古'
});

await callOnce(async()=>{
  user.value = await $fetch('/api/user/info', {
    method: 'GET',
    headers: useRequestHeaders(['cookie'])
  }).then(res => {
    console.log(res)
    if (res.code === 1) {
      user.value = res.data;
      isGuest.value = false;
      return res.data;
    }
    isGuest.value = true;
  });

  console.log(isGuest.value)
})
</script>
<template>
  <div>
    <!--    <NuxtRouteAnnouncer />-->
    <!--    <NuxtWelcome />-->
    <AppHeader/>
    <NuxtPage/>
    <AppFooter/>
  </div>
</template>
<style>
@use "~/assets/common.scss" as *;

</style>
