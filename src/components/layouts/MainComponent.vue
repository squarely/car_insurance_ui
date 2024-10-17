<script setup>
import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <HeaderComponent />
    <div class="overflow-y-auto bg-secondary-light grow px-10 py-6 relative">
      <div class="flex">
        <div @click="router.back()" class="pr-5 cursor-pointer" v-if="route.path !== '/'">
          <img class="mt-3" src="../../assets/images/common/back_arrow.svg" alt="back" srcset="">
        </div>
        <slot></slot>
        <div class="pl-5" v-if="route.path !== '/'">
          <img class="mt-3 invisible" src="../../assets/images/common/back_arrow.svg" alt="back" srcset="">
        </div>
      </div>
    </div>
    <footer class="bg-secondary-light absolute w-full left-0 bottom-0">
      <div class="mx-10 footer-border py-1.5 flex justify-center items-center gap-3">
        <div class="font-normal text-base font-sen app-text-secondary-100">Powered by</div>
        <img class="self-end w-[83.33px]" src="../../assets/images/login/powered_by_logo.svg" alt="powered_by" srcset="">
      </div>
    </footer> 
  </div>
</template>

<style scoped>
.footer-border{
  border-top: 1px solid #B0B9C3;
}
</style>
