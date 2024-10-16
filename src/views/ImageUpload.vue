<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { useClaimStore } from "@/stores/claim";
import { computed, onMounted, ref } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const claimStore = useClaimStore();
const route = useRoute()
const router = useRouter()

const claim = computed(() => {
  return claimStore.claimDetails
})

let isLoader = ref(false)
const preSignedUrl = ref(null)

onMounted(()=>{
    const claimId = route.params.id
    
    claimStore.getClaim(claimId,(status)=>{
        if (!status) {
          toast("Couldn't get the claim detail.", {
            "type": "error",
            "autoClose": 5000,
            "dangerouslyHTMLString": true
          })
        }
    })
    claimStore.getClaimImage(claimId,(status)=>{
        if (status) {
          preSignedUrl.value = status
        }else{
          toast("You can't upload the image. Something went wrong!", {
            "type": "error",
            "autoClose": 5000,
            "dangerouslyHTMLString": true
          })
        }
    })
})

const handleFileUpload = (files)=>{
  const claimId = route.params.id
  if (files.length !== 0) {
    isLoader.value = true

    claimStore.uploadImage(preSignedUrl.value, files[0], (status)=>{
      if (status) {
        claimStore.generateEstimation(claimId,(status)=>{
          if (status) {
            router.push({
              name: 'estimation_report',
              params: {
                id: claimId
              }
            })
            isLoader.value = false
          }else{
            isLoader.value = false
            toast("Couldn't generate the estimation report!", {
              "type": "error",
              "autoClose": 5000,
              "dangerouslyHTMLString": true
            })
          }
        })
      }else{
        isLoader.value = false
        toast("Couldn't upload the image. Something went wrong!", {
          "type": "error",
          "autoClose": 5000,
          "dangerouslyHTMLString": true
        })
      }
    })
  }
}

const onFilePicker = (e) => {
  let fileInput = document.getElementById('file-input')
  fileInput.click()  
}
const onDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('over');
}
const onDragLeave = (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('leave');
}
const onDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const files = e.dataTransfer.files;

  handleFileUpload(files)
}
</script>

<template>
  <MainComponent>
    <div class="w-full">
      <div class="font-sen flex justify-between items-center">
        <div class="flex items-center gap-3">
            <div>
                <h6 class="font-bold text-2xl app-text-secondary-400">AI Repair Estimation</h6>
                <p class="font-normal text-xl app-text-secondary-300">#CN{{ claim ? claim.id : '--' }}</p>
            </div>
        </div>
      </div>
      <div v-if="isLoader" role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <svg aria-hidden="true" class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
          <span class="sr-only">Loading...</span>
      </div>
      <div v-else @click="onFilePicker($event)" @dragover="onDragOver($event)" @drop="onDrop($event)" @dragleave="onDragLeave($event)" class="bg-white cursor-pointer rounded-lg py-16 mt-10 upload-border flex justify-center items-center">
        <div class="flex flex-col justify-center items-center">
            <input @change="handleFileUpload($event.target.files)" id="file-input" type="file" name="file" style="display: none;" />
            <img src="../assets/images/common/upload.svg" alt="upload" srcset="">
            <p class="text-center font-nunito font-normal text-2xl app-text-secondary-300 mt-9">Upload a photo for an AI-powered repair estimate.</p>
        </div>
      </div>
    </div>
  </MainComponent>
</template>

<style scoped>
.upload-border{
  border: 2px dashed #4666CA;
}
</style>