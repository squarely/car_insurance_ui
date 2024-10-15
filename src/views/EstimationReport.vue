<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <MainComponent>
    <div class="w-full px-12">
      <div class="font-sen flex justify-between items-center">
        <div class="flex items-center gap-3">
          <!-- <div>
                <img src="../assets/images/common/back_arrow.svg" alt="back" srcset="">
            </div> -->
          <div>
            <h6 class="font-bold text-2xl app-text-secondary-400">
              AI Repair Estimation
            </h6>
            <p class="font-normal text-xl app-text-secondary-300">#CN26569</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg px-6 py-5 mt-8">
        <div>
            <h6 class="font-sen font-normal text-xl app-text-secondary-400">Vehicle details</h6>
        </div>
        <div class="flex items-center text-left mt-4">
          <div class="flex-1">
            <h6 class="font-normal text-base font-sen app-text-secondary-300">
                VIN
            </h6>
            <h5
              class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
            >
              1VXBR12EXCP901213
            </h5>
          </div>
          <div class="flex-1">
            <h6 class="font-normal text-base font-sen app-text-secondary-300">
                Brand
            </h6>
            <h5
              class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
            >
            Hyundai
            </h5>
          </div>
          <div class="flex-1">
            <h6 class="font-normal text-base font-sen app-text-secondary-300">
                Model & Year
            </h6>
            <h5
              class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
            >
            Tucson - 2016
            </h5>
          </div>
          <div class="flex-1">
            <h6 class="font-normal text-base font-sen app-text-secondary-300">
                Vehicle number
            </h6>
            <h5
              class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
            >
            DMC - 4583
            </h5>
          </div>
        </div>
      </div>
      <div class="mt-4 flex items-center gap-11">
        <div class="app-bg-blue-100 rounded-lg w-6/12 p-5">
            <h6 class="font-sen font-normal text-base app-text-secondary-300">AI Repair Estimation</h6>
            <h4 class="font-extrabold font-nunito text-3xl app-text-secondary-400 mt-2">$ 2500.00</h4>
        </div>
        <div class="app-bg-blue-100 rounded-lg w-6/12 p-5">
            <h6 class="font-sen font-normal text-base app-text-secondary-300">Suggested settlement amount based the policyn</h6>
            <h4 class="font-extrabold font-nunito text-3xl app-text-secondary-400 mt-2">$ 2500.00</h4>
        </div>
      </div>
      <div class="mt-5 flex items-center">
        <div class="w-6/12">
            <div class="pr-14">
                <h6 class="font-nunito font-medium app-text-secondary-400 tex-xl">Original</h6>
            </div>
            <div class="mt-4 pr-14 app-image-border-right">
                <img class="w-full" src="../assets/images/demo/original.png" alt="original" srcset="">
            </div>
        </div>
        <div class="w-6/12">
            <div class="pl-14">
                <h6 class="font-nunito font-medium app-text-secondary-400 tex-xl">Damage detected</h6>
            </div>
            <div class="mt-4 pl-14">
                <img class="w-full" src="../assets/images/demo/detected.png" alt="detected" srcset="">
            </div>
        </div>
      </div>
    </div>
  </MainComponent>
</template>

<style scoped>
.app-bg-blue-100{
    background-color: #C9D6FF;
}

.app-image-border-right{
    border-right: 1px solid #BFBFBF;
}
</style>
