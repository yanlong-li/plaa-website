<script setup>
const user = useState('user');
const isGuest = useState('isGuest');
const router = useRouter()

const logout = () => {
  $fetch('/api/user/logout').then(res => {
    isGuest.value = true;
    user.value = {};
  });
}


const startGame = () => {
  if (isGuest) {
    router.push('/login');
  } else {

    let launcherWindow = window.open(`aelcf://aaemu.yanlongli.com/A/nQUFFbXUtWWFubG9uZ2xp/adHJpbm9fMV8y/waHR0cHM6Ly9hYWVtdS55YW5sb25nbGkuY29t/LemhfY24%3D/lemhfY24%3D/faHR0cHM6Ly9hYWVtdS55YW5sb25nbGkuY29tL25ld3NmZWVkLw%3D%3D/xaHR0cHM6Ly9hYWVtdS1wYXRjaC55YW5sb25nbGkuY29tLw==/u${user.value.username}/p${user.value.password}/`);

    if (!launcherWindow) {
      alert("游戏启动失败，请先下载启动器！");
    } else {
      launcherWindow.document.write(`<H1>正在启动游戏......</H1>`);
      // Set a timeout to check if the schema was handled
      setTimeout(function () {
        // If the new window is still open after the timeout, it means the schema was not handled
        if (!launcherWindow.closed) {
          launcherWindow.document.write(`<H1>启动失败，<a class="btn download" href="https://aaemu.yanlongli.com/Patcher.exe">点击下载启动器</a></H1> <p>游戏客户端本体因较大，请提前下载。</p><a href="https://github.com/AAEmu/AAEmu/wiki/Client">下载游戏客户端本体</a>`);
        }
      }, 2000);
    }

  }
}
</script>

<template>
  <div>
    <header>
      <!--    <img src="static/img/aaemu-logo.png" alt="ArcheAge 游戏">-->
      <a style="font-size: 60px; color: #666666;font-weight: bold;text-decoration: none;"
         href="/">随时删档跑路的上古</a>
    </header>
    <section id="start" class="container max-w-full">
      <!--<h2>开始游戏</h2>
      <p>点击下方按钮，下载并安装客户端，开始你的 Archeage 冒险之旅。</p>-->
      <div class="center-cont">
        <button @click="startGame">开始游戏</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a class="btn" href="/Patcher.exe">下载启动器</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a class="btn" href="/activity">活动专题</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a class="btn" href="https://pan.quark.cn/s/9b7a76858d95" target="_blank">下载游戏</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a class="btn" href="https://qm.qq.com/q/h7TMOhVhXG" target="_blank">加入QQ群</a>
      </div>
      <div class="btn-cont">
        <template v-if="isGuest">
          <NuxtLink to="/login" class="btn">登录</NuxtLink>&nbsp;
          <NuxtLink to="/register" class="btn">注册</NuxtLink>
        </template>
        <template v-else>
          <i style="color: #bbbbbb">Welcome</i> <i>{{ user.username }}</i>, <a class="btn" @click="logout">退出登录</a>
        </template>


      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">

header {
  text-align: center;
  padding: 20px;
  background-color: #1f1f1f;


  h1 {
    margin: 0;
    font-size: 2.5em;
  }

  p {
    margin: 0;
    font-size: 1.2em;
    color: #bbbbbb;
  }
}

.container {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
}

section {
  margin-bottom: 40px;
}

h2 {
  border-bottom: 2px solid #444444;
  padding-bottom: 10px;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
}

article {
  margin-bottom: 20px;
}

button {
  background-color: #1e90ff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
}

button:hover {
  background-color: #1c7ecf;
}


.btn {
  text-decoration: none;
  color: #666666;
  text-wrap: none;
}

.btn:hover {
  color: #1c7ecf;
}

#start {
  overflow: hidden;
}

.center-cont {
  float: left;
}

.btn-cont {
  float: right;
}


</style>