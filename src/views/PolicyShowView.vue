<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { useClaimStore } from "@/stores/claim";
import { computed, onMounted, ref } from "vue";
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const claimStore = useClaimStore();
const route = useRoute()
const router = useRouter()

const claim = computed(() => {
  return claimStore.claimDetails
})

let isClaimData = ref(false);

onMounted(()=>{
    const claimId = route.params.id
    
    claimStore.getClaim(claimId,(status)=>{
        if (status) {
            isClaimData.value = true
        }else{
            toast("Couldn't get the policy detail.", {
                "type": "error",
                "autoClose": 5000,
                "dangerouslyHTMLString": true
            })
        }
    })
})

const redirectToImageUpload = (id, status) => {
    if (status === 'completed') {
        return router.push({
                name: 'estimation_report',
                params: {
                id: id
            }
        })
    }
    return router.push({
        name: 'image_upload',
        params: {
        id: id
        }
    })
}
</script>

<template>
  <MainComponent>
    <div class="w-full" v-if="claim">
      <div class="font-sen flex justify-between items-center">
        <div class="flex items-center gap-3">
            <div>
                <h6 class="font-bold text-2xl app-text-secondary-400">Assessment details</h6>
                <p class="font-normal text-xl app-text-secondary-300">#CN{{ claim ? claim.id : '--' }}</p>
            </div>
        </div>
        <div
            @click="redirectToImageUpload(claim._id, claim.status)"
          class="bg-primary py-3 px-5 font-bold text-xl text-white text-center flex justify-center items-center gap-3 rounded-lg cursor-pointer"
        >
          <p>{{ claim.status === 'completed' ? 'View AI Estimation' : 'Get AI Repair Estimation' }}</p>
          <img src="../assets/images/login/submit_logo.png" alt="" srcset="" />
        </div>
      </div>
      <div class="bg-white rounded-lg px-5 py-7 mt-5 mb-5">
        <div class="flex justify-between items-center">
            <div class="flex justify-between items-center gap-8">
                <h6 class="font-sen font-semibold app-text-secondary-400 text-4xl">#CN{{ claim.id }}</h6>
                <div class="flex items-center gap-3">
                    <div :class="`app-status-bg-${claim.status}`" class="w-[12px] h-[12px] rounded-full"></div>
                    <p class="font-normal text-base app-text-secondary-200 font-nunito">{{ claim.status }}</p>
                </div>
            </div>
            <div class="flex justify-center items-center gap-2 font-sen app-bg-green-100 app-text-secondary-400 font-normal text-xl px-5 py-3 rounded-lg">
                <img src="../assets/images/common/active_status.svg" alt="active" srcset="">
                <p>Active Policy</p>
            </div>
        </div>
        <div class="mt-2">
            <p class="text-base font-normal font-nunito app-text-secondary-300">{{ claim.assignedDate }}</p>
        </div>
        <div class="mt-4" v-if="claim.status !== 'pending'">
            <div class="font-sen font-medium text-base app-text-secondary-400 bg-secondary-dark px-5 py-3 rounded-lg">
                AI Repair Estimation
            </div>
            <div class="pl-5 pr-20 my-4">
                <div class="flex items-center gap-24">
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">AI repair estimation</h6>
                        <h5 class="mt-2 font-extrabold text-base font-nunito app-text-secondary-400">$ {{ claim.aiRepairEstimationCost }}</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Damaged parts</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.damagedParts }}</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Suggested settlement</h6>
                        <h5 class="mt-2 font-extrabold text-base font-nunito app-text-secondary-400">$ {{ claim.suggestedSettlementCost }}</h5>
                    </div>
                </div>
                <div class="mt-4">
                    <h6 class="font-normal text-base font-sen app-text-secondary-300">Damage detected</h6>
                    <div class="mt-2">
                        <img class="w-[294px]" :src="claim.aiAnalisysImage" alt="detected" srcset="">
                        <!-- <img class="w-[294px]" :src="../assets/images/demo/detected.png" alt="detected" srcset=""> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <div class="font-sen font-medium text-base app-text-secondary-400 bg-secondary-dark px-5 py-3 rounded-lg">
                Policy details
            </div>
            <div class="pl-5 pr-20 my-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Policy number</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.policy.policyNumber }}</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Policy coverage</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.policy.policyCoverage }}</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Claim history</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.policy.claimHistory }}</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Effective date</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.policy.effectiveDate }}</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Expiration date</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.policy.expiryDate }}</h5>
                    </div>
                </div>
                <div class="mt-4">
                    <h6 class="font-normal text-base font-sen app-text-secondary-300">Additional details</h6>
                    <ol class="mt-2 font-medium text-base font-nunito app-text-secondary-400">
                        <li v-for="detail, index in claim.policy.additionalDetails" :key="index">{{ detail }}</li>
                        <!-- <li>Liability: $100,000/$300,000</li>
                        <li>Personal Injury Protection (PIP): $50,000</li>
                        <li>Uninsured Motorist: Yes</li>
                        <li>Medical Payments: $10,000</li>
                        <li>Roadside Assistance: Yes</li>
                        <li>Premium: $1,200 annually</li>
                        <li>Deductible: $500 (Collision), $250 (Comprehensive)</li> -->
                    </ol>
                </div>
            </div>
        </div>
        <!-- section 2 -->
        <div class="mt-4">
            <div class="font-sen font-medium text-base app-text-secondary-400 bg-secondary-dark px-5 py-3 rounded-lg">
                Incident summary
            </div>
            <div class="px-5 my-4 w-full">
                <div class="flex items-center justify-between w-full">
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Nature of incident</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.incident.natureOfIncident }}</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Incident location</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.incident.incidentLocation }}</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Date & Time</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.incident.incidentDate }}</h5>
                    </div>
                </div>
                <div class="mt-4">
                    <h6 class="font-normal text-base font-sen app-text-secondary-300">Incident statement</h6>
                    <div class="mt-2 font-medium text-base italic font-nunito app-text-secondary-400">
                        {{ claim.incident.incidentStatement }}
                    </div>
                </div>
            </div>
        </div>
        <!-- section 3 -->
        <div class="mt-4">
            <div class="font-sen font-medium text-base app-text-secondary-400 bg-secondary-dark px-5 py-3 rounded-lg">
                Claimant & Vehicle details
            </div>
            <div class="px-5 my-4 w-full">
                <div class="flex items-center w-full">
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Claimant name</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.owner.username }}</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Vehicle make & model</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.vehicle.vehicleYear }} {{ claim.vehicle.vehicleMake }} {{ claim.vehicle.vehicleModel }}</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">VIN</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.vehicle.vehicleIdentificationNumber ? claim.vehicle.vehicleIdentificationNumber : '--'  }}</h5>
                    </div>
                </div>
                <div class="mt-4 flex items-center w-full">
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Vehicle number</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.vehicle.vehicleNumber }}</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Email</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.owner.email }}</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Contact number</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">{{ claim.owner.phonenumber }}</h5>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </MainComponent>
</template>

<style scoped>
.tr-box-shadow{
  box-shadow: 0px 4px 4px 0px #0000000D;
}
</style>