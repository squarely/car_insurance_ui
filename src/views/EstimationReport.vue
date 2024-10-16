<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { useClaimStore } from "@/stores/claim";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const claimStore = useClaimStore();
const route = useRoute()
const router = useRouter()

const estimationReport = computed(() => {
  return claimStore.claimDetails
})

onMounted(()=>{
    const claimId = route.params.id
    
    claimStore.getClaim(claimId,(status)=>{
        if (status) {
          
        }else{
          toast("Couldn't get the estimation report detail.", {
                "type": "error",
                "autoClose": 5000,
                "dangerouslyHTMLString": true
            })
        }
    })
    // claimStore.generateEstimation(claimId,(status)=>{
    //   console.log('status', status);
      
    //     if (status) {
          
    //     }
    // })
})

const redirectToPolicy = (id) => {
  return router.push({
    name: 'policy_details',
    params: {
      id: id
    }
  })
}
</script>

<template>
  <MainComponent>
    <div class="w-full">
      <div class="font-sen flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div>
            <h6 class="font-bold text-2xl app-text-secondary-400">
              AI Repair Estimation
            </h6>
            <p class="font-normal text-xl app-text-secondary-300">#CN{{ estimationReport ? estimationReport.id : '--' }}</p>
          </div>
        </div>
        <div
          @click="redirectToPolicy(route.params.id)"
          class="bg-primary py-3 px-5 font-bold text-xl text-white text-center flex justify-center items-center gap-3 rounded-lg cursor-pointer"
        >
          <p>View Policy</p>
          <img src="../assets/images/login/submit_logo.png" alt="" srcset="" />
        </div>
      </div>
      <template v-if="estimationReport">
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
              {{ estimationReport.vehicle.vehicleIdentificationNumber }}
            </h5>
          </div>
          <div class="flex-1">
            <h6 class="font-normal text-base font-sen app-text-secondary-300">
                Brand
            </h6>
            <h5
              class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
            >
            {{ estimationReport.vehicle.vehicleMake }}
            </h5>
          </div>
          <div class="flex-1">
            <h6 class="font-normal text-base font-sen app-text-secondary-300">
                Model & Year
            </h6>
            <h5
              class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
            >
            {{ estimationReport.vehicle.vehicleModel }} - {{ estimationReport.vehicle.vehicleYear }}
            </h5>
          </div>
          <div class="flex-1">
            <h6 class="font-normal text-base font-sen app-text-secondary-300">
                Vehicle number
            </h6>
            <h5
              class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
            >
            {{ estimationReport.vehicle.vehicleNumber }}
            </h5>
          </div>
        </div>
      </div>
      <div class="mt-4 flex items-center gap-11">
        <div class="app-bg-blue-100 rounded-lg w-6/12 p-5">
            <h6 class="font-sen font-normal text-base app-text-secondary-300">AI Repair Estimation</h6>
            <h4 class="font-extrabold font-nunito text-3xl app-text-secondary-400 mt-2">$ {{ estimationReport.aiRepairEstimationCost }}</h4>
        </div>
        <div class="app-bg-blue-100 rounded-lg w-6/12 p-5">
            <h6 class="font-sen font-normal text-base app-text-secondary-300">Suggested settlement amount based the policyn</h6>
            <h4 class="font-extrabold font-nunito text-3xl app-text-secondary-400 mt-2">$ {{ estimationReport.suggestedSettlementCost }}</h4>
        </div>
      </div>
      <div class="mt-5 flex">
        <div class="w-6/12">
            <div class="pr-14">
                <h6 class="font-nunito font-medium app-text-secondary-400 tex-xl">Original</h6>
            </div>
            <div class="mt-4 pr-14 app-image-border-right">
                <!-- <img class="w-full" src="../assets/images/demo/original.png" alt="original" srcset=""> -->
                <img class="w-full" :src="estimationReport.damagedPartImage" alt="original" srcset="">
            </div>
        </div>
        <div class="w-6/12">
            <div class="pl-14">
                <h6 class="font-nunito font-medium app-text-secondary-400 tex-xl">Damage detected</h6>
            </div>
            <div class="mt-4 pl-14">
                <!-- <img class="w-full" src="../assets/images/demo/detected.png" alt="detected" srcset=""> -->
                <img class="w-full" :src="estimationReport.aiAnalisysImage" alt="detected" srcset="">
            </div>
        </div>
      </div>
      </template>
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
