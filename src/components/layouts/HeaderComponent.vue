<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const userStore = useUserStore();


const userDetails = ref({
  username: ''
})

onMounted(()=>{  
  // userDetails.value.username = userStore.user.username
  let user = JSON.parse(localStorage.getItem('user'))

  userDetails.value.username = user.username
})

const logout = () => {
  localStorage.clear()
  router.push({
    name: 'login'
  })
}
</script>

<template>
  <div class="flex justify-between items-center bg-white py-5 px-10 box-shadow">
    <div class="cursor-pointer" @click="router.push({name: 'home'})">
      <img src="../../assets/images/common/logo.svg" alt="logo">
    </div>
    <div class="flex items-center gap-8">
      <div>
        <h6 class="font-medium text-xl font-nunito app-text-secondary-400">{{ userDetails.username }}</h6>
        <p class="font-normal text-base font-nunito app-text-secondary-300">Assessor</p>
      </div>
      <div class="cursor-pointer" @click="logout">
        <img src="../../assets/images/login/logout.svg" alt="logout">
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-shadow{
  box-shadow: 0px 4px 50px 4px #0000000D;
}
</style>
