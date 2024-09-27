<script setup lang="ts">
let activityList = ref([]);
let activityOptions = ref([])
let serviceList = ref([])
let characterList = ref([])
let errMsg = ref('');

let selectedActivityId = ref(0);
let selectedOptionId = ref(0);
let selectCharacterId = ref(0);
let selectServiceId = ref(0)




const getCharacterByServiceId = (serviceId) => {
  $fetch('/api/character/list?serviceId=' + serviceId).then(res => {
    if (res.code === 1) {
      characterList.value = res.data.list;
    } else {
      errMsg.value = res.msg;
    }
  }).catch(e => {
    console.log(e)
  })
}

const getActivityOptionsById = (id) => {
  $fetch('/api/activities/option-list?activityId=' + id).then(res => {
    if (res.code === 1) {
      activityOptions.value = res.data.list;
    } else {
      errMsg.value = res.msg;
    }
  }).catch(e => {
    console.log(e)
  })
}

$fetch('/api/activities/list').then(res => {
  if (res.code === 1) {
    activityList.value = res.data.list;
  } else {
    errMsg.value = res.msg;
  }
}).catch(e => {
  console.log(e)
})
$fetch('/api/service/list').then(res => {
  if (res.code === 1) {
    serviceList.value = res.data.list;
  } else {
    errMsg.value = res.msg;
  }
})

watchEffect(() => {
  getCharacterByServiceId(selectServiceId.value);
})

watchEffect(() => {
  getActivityOptionsById(selectedActivityId.value)
})
</script>

<template>
  <div>
    <section>
      <div class="center" style="width: 300px">
        <form action="activity.php" method="post">
          <div class="item" style="margin-bottom: 15px;">
            <label style="font-size: 18px;color: #bbbbbb;">活动：</label>
            <select
                style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                name="activity_id" id="activity-select" v-model="selectedActivityId">
              <template v-for="item in activityList">
                <option :value="item.id" :data-tip="item.description">
                  {{ item.name }}
                </option>
              </template>
            </select>
          </div>
          <div class="item" style="margin-bottom: 15px;">
            <label style="font-size: 18px;color: #bbbbbb;">选项：</label>
            <select
                style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                name="option_id" id="activity-option-select" v-model="selectedOptionId">
              <template v-for="item in activityOptions">
                <option :value="item.id" :data-tip="item.description">
                  {{ item.title }}
                </option>
              </template>
            </select>
          </div>
          <div class="item" style="margin-bottom: 15px;">
            <label style="font-size: 18px;color: #bbbbbb;">区服：</label>
            <select
                style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                name="server_id"
                v-model="selectServiceId"
            >
              <template v-for="item in serviceList">
                <option :value="item.id">
                  {{ item.name }}
                </option>
              </template>
            </select>
          </div>
          <div class="item" style="margin-bottom: 15px;">
            <label style="font-size: 18px;color: #bbbbbb;">角色：</label>
            <select
                style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                name="character_id"
                v-model="selectCharacterId"
            >
              <template v-for="item in characterList">
                <option :value="item.id">
                  {{ item.name }}
                </option>
              </template>
            </select>
          </div>
          <div class="item">
            <input type="submit" value="领取"
                   style="width: 100px;height: 36px;line-height: 36px;background: #1c7ecf;border: none;border-radius: 3px;color: white;">
          </div>

          {{ errMsg }}
        </form>

        <div class="tips-group">
          <div class="tip-item">
            <h4>活动说明：</h4>
            <div id="activity-tip"></div>
          </div>
          <div class="tip-item">
            <h4>礼包说明：</h4>
            <div id="option-tip"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>