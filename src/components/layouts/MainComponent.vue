<script setup>
import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <HeaderComponent />
    <div class="overflow-y-auto bg-secondary-light grow px-10 py-6">
      <div class="flex">
        <div class="pr-5 cursor-pointer" v-if="route.path !== '/'">
          <img class="mt-3" src="../../assets/images/common/back_arrow.svg" alt="back" srcset="">
        </div>
        <slot></slot>
        <div class="pl-5" v-if="route.path !== '/'">
          <img class="mt-3 invisible" src="../../assets/images/common/back_arrow.svg" alt="back" srcset="">
        </div>
      </div> 
    </div>
  </div>
</template>
