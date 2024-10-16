<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { useClaimStore } from "@/stores/claim";
import { computed, onMounted, ref } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
const claimStore = useClaimStore();
const route = useRoute()
const router = useRouter()

const claim = computed(() => {
  return claimStore.claimDetails
})

const preSignedUrl = ref(null)

onMounted(()=>{
    const claimId = route.params.id
    
    claimStore.getClaim(claimId,(status)=>{
        if (status) {
            // isClaimData.value = true
        }
    })
    claimStore.getClaimImage(claimId,(status)=>{
        if (status) {
          preSignedUrl.value = status
        }
    })
})

const handleFileUpload = (files)=>{
  const claimId = route.params.id
  if (files.length !== 0) {
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
          }
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
      <div @click="onFilePicker($event)" @dragover="onDragOver($event)" @drop="onDrop($event)" @dragleave="onDragLeave($event)" class="bg-white cursor-pointer rounded-lg py-16 mt-10 upload-border flex justify-center items-center">
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
.tr-box-shadow{
  box-shadow: 0px 4px 4px 0px #0000000D;
}
.upload-border{
    /* border: 2px dashed #4666CA; */
    border: 2px dashed #4666CA
}
</style>