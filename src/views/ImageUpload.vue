<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <MainComponent>
    <div class="w-full">
      <div class="font-sen flex justify-between items-center">
        <div class="flex items-center gap-3">
            <div>
                <h6 class="font-bold text-2xl app-text-secondary-400">AI Repair Estimation</h6>
                <p class="font-normal text-xl app-text-secondary-300">#CN26569</p>
            </div>
        </div>
      </div>
      <div class="bg-white rounded-lg py-16 mt-10 upload-border flex justify-center items-center">
        <div class="flex flex-col justify-center items-center">
            <img src="../assets/images/common/upload.svg" alt="upload" srcset="">
            <p class="text-center font-nunito font-normal text-2xl app-text-secondary-300 mt-9">Upload a photo for an AI-powered repair estimate.</p>
        </div>
      </div>
    </div>
  </MainComponent>
</template>

<style scoped>
.tr-box-shadow{
  box-shadow: 0px 4px 4px 0px #0000000D;
}
.upload-border{
    /* border: 2px dashed #4666CA; */
    border: 2px dashed #4666CA
}
</style>