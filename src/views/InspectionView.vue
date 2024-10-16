<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { RouterLink, RouterView, useRouter } from 'vue-router'

import { useClaimStore } from "@/stores/claim";
import { computed, onMounted, ref } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const claimStore = useClaimStore();
const router = useRouter()

const claimList = computed(() => {
  return claimStore.claims
})
const claimCount = computed(() => {
  return claimStore.claimCount
})
onMounted(()=>{
  claimStore.getClaimCount((status)=>{
    if (!status) {
      toast("Couldn't get the claims list count", {
        "type": "error",
        "autoClose": 5000,
        "dangerouslyHTMLString": true
      })
    }
  })
  claimStore.getClaims((status)=>{
    if (!status) {
      toast("Couldn't get the claims list", {
        "type": "error",
        "autoClose": 5000,
        "dangerouslyHTMLString": true
      })
    }
  })
})

const redirectToPolicy = (id) => {
  return router.push({
    name: 'policy_details',
    params: {
      id: id
    }
  })
}

const generateCustomUUID = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let uuid = '';
  for (let i = 0; i < 17; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log(uuid);

  claimStore.addNewClaim(uuid, (status)=>{
    if (status) {
      claimStore.getClaims((status)=>{
        if (!status) {
          toast("Couldn't get the claims list", {
            "type": "error",
            "autoClose": 5000,
            "dangerouslyHTMLString": true
          })
        }
      })

      claimStore.getClaimCount((status)=>{
        if (!status) {
          toast("Couldn't get the claims list count", {
            "type": "error",
            "autoClose": 5000,
            "dangerouslyHTMLString": true
          })
        }
      })
    }else{
      claimStore.getClaims((status)=>{
        if (!status) {
          toast("Couldn't add a claim!", {
            "type": "error",
            "autoClose": 5000,
            "dangerouslyHTMLString": true
          })
        }
      })
    }
  })
  
}
</script>

<template>
  <MainComponent>
    <div class="h-full w-full">
      <div class="font-sen flex justify-between items-center">
        <h6 class="font-bold text-2xl app-text-secondary-400">Claims requested</h6>
        <div
          @click="generateCustomUUID"
          class="bg-primary py-3 px-5 font-bold text-xl text-white text-center flex justify-center items-center gap-3 rounded-lg cursor-pointer"
        >
          <p>Add new claims</p>
          <img src="../assets/images/login/submit_logo.png" alt="" srcset="" />
        </div>
      </div>

      <div class="font-sen flex items-center gap-9 mt-4">
        <div class="bg-white w-2/6 rounded-lg py-4 px-6">
          <h5 class="font-extrabold text-3xl font-nunito">{{ claimCount ? claimCount.total : '0' }}</h5>
          <div class="mt-1.5 flex items-center gap-3">
            <p class="font-normal text-base app-text-secondary-200 font-nunito">Total Claims (till date)</p>
          </div>
        </div>
        <div class="bg-white w-2/6 rounded-lg py-4 px-6">
          <h5 class="font-extrabold text-3xl font-nunito">{{ claimCount ? claimCount.completed : '0' }}</h5>
          <div class="mt-1.5 flex items-center gap-3">
            <div class="w-[12px] h-[12px] app-status-bg-completed rounded-full"></div>
            <p class="font-normal text-base app-text-secondary-200 font-nunito">Completed claims</p>
          </div>
        </div>
        <div class="bg-white w-2/6 rounded-lg py-4 px-6">
          <h5 class="font-extrabold text-3xl font-nunito">{{ claimCount ? claimCount.pending : '0' }}</h5>
          <div class="mt-1.5 flex items-center gap-3">
            <div class="w-[12px] h-[12px] app-status-bg-pending rounded-full"></div>
            <p class="font-normal text-base app-text-secondary-200 font-nunito">Pending claims</p>
          </div>
        </div>
      </div>

      <!-- table -->
      <!-- <div class="overflow-x-auto mt-4">
        <div class="">
           <div>
            <div></div>
           </div>
        </div>
      </div> -->

      <div class="relative overflow-x-auto mt-4">
        <table
          style="border-collapse: separate; border-spacing: 0 8px;"
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg"
        >
          <thead
            class="font-sen font-medium text-base app-text-secondary-200 bg-secondary-dark rounded-lg"
          >
            <tr class="rounded-lg">
              <th scope="col" class="px-6 py-3">Claim number</th>
              <th scope="col" class="px-6 py-3">Claimant</th>
              <th scope="col" class="px-6 py-3">Assigned date</th>
              <th scope="col" class="px-6 py-3">Nature of Incident</th>
              <th scope="col" class="px-6 py-3">Incident date & time</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody class="font-nunito font-medium text-base app-text-secondary-400" v-if="claimList.length !== 0">
            <tr class="bg-white tr-box-shadow capitalize" v-for="claim in claimList" :key="claim._id">
              <th
                class="px-6 py-4 whitespace-nowrap font-nunito font-medium text-base app-text-secondary-400"
              >
              #CN{{ claim.id }}
              </th>
              <td class="px-6 py-4">{{ claim.owner.username }} <div class="font-nunito font-medium text-xs app-text-secondary-200">{{ claim.vehicle.vehicleNumber }}</div> </td>
              <td class="px-6 py-4">{{ claim.assignedDate }}</td>
              <td class="px-6 py-4">{{ claim.incident.natureOfIncident }}</td>
              <td class="px-6 py-4">{{ claim.incident.incidentDate }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div :class="`app-status-bg-${claim.status}`" class="w-[12px] h-[12px] rounded-full"></div>
                  <p>{{ claim.status }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <div @click="redirectToPolicy(claim._id)" class="cursor-pointer text-base font-sen font-medium text-primary border-2 border-primary px-4 py-2.5 rounded-lg">
                  <div class="flex justify-center items-center gap-2">
                    <p>
                      {{ claim.status === 'pending' ? 'Start Assessment' : 'View details' }}
                    </p>
                    <img v-if="claim.status === 'pending'" src="../assets/images/common/redirect_arrow_primary.png" alt="" srcset="">
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainComponent>
</template>

<style scoped>
.tr-box-shadow{
  box-shadow: 0px 4px 4px 0px #0000000D;
}
</style>