<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { useClaimStore } from "@/stores/claim";
import { computed, onMounted, ref } from "vue";
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
import timestampFormat from "../config/moment";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const claimStore = useClaimStore();
const route = useRoute();
const router = useRouter();

let isLoader = ref(false);

const claim = computed(() => {
  return claimStore.claimDetails;
});

let isClaimData = ref(false);

onMounted(() => {
  const claimId = route.params.id;

  isLoader.value = true

  claimStore.getClaim(claimId, (status) => {
    isLoader.value = false
    if (status) {
      isClaimData.value = true;
    } else {
      toast("Couldn't get the policy detail.", {
        type: "error",
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
    }
  });
});

const redirectToImageUpload = (id, status) => {
  if (status === "completed") {
    return router.push({
      name: "estimation_report",
      params: {
        id: id,
      },
    });
  }
  return router.push({
    name: "image_upload",
    params: {
      id: id,
    },
  });
};
</script>

<template>
  <MainComponent>
    <div class="w-full">
      <div class="font-sen flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div>
            <h6 class="font-bold text-2xl app-text-secondary-400">
              Assessment details
            </h6>
            <p class="font-normal text-xl app-text-secondary-300">
              #CN{{ claim ? claim.id : "--" }}
            </p>
          </div>
        </div>
        <div
          v-if="claim"
          @click="redirectToImageUpload(claim._id, claim.status)"
          class="bg-primary py-3 px-5 font-bold text-xl text-white text-center flex justify-center items-center gap-3 rounded-lg cursor-pointer"
        >
          <p>
            {{
              claim.status === "completed"
                ? "View AI Estimation"
                : "Get AI Repair Estimation"
            }}
          </p>
          <img src="../assets/images/login/submit_logo.png" alt="" srcset="" />
        </div>
      </div>
      <div
        v-if="isLoader"
        role="status"
        class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
      >
        <svg
          aria-hidden="true"
          class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <template v-else>
        <div class="bg-white rounded-lg px-5 py-7 mt-5 mb-5" v-if="claim">
          <div class="flex justify-between items-center">
            <div class="flex justify-between items-center gap-8">
              <h6
                class="font-sen font-semibold app-text-secondary-400 text-4xl"
              >
                #CN{{ claim.id }}
              </h6>
              <div class="flex items-center gap-3">
                <div
                  :class="`app-status-bg-${claim.status}`"
                  class="w-[12px] h-[12px] rounded-full"
                ></div>
                <p
                  class="font-normal text-base app-text-secondary-200 font-nunito"
                >
                  {{ claim.status }}
                </p>
              </div>
            </div>
            <div
              class="flex justify-center items-center gap-2 font-sen app-bg-green-100 app-text-secondary-400 font-normal text-xl px-5 py-3 rounded-lg"
            >
              <img
                src="../assets/images/common/active_status.svg"
                alt="active"
                srcset=""
              />
              <p>Active Policy</p>
            </div>
          </div>
          <div class="mt-2">
            <p class="text-base font-normal font-nunito app-text-secondary-300">
              Assigned on {{ timestampFormat(claim.assignedDate, "DD MMM, YYYY") }}
            </p>
          </div>
          <div class="mt-4" v-if="claim.status !== 'pending'">
            <div
              class="font-sen font-medium text-base app-text-secondary-400 bg-secondary-dark px-5 py-3 rounded-lg"
            >
              AI Repair Estimation
            </div>
            <div class="pl-5 pr-20 my-4">
              <div class="flex items-start gap-24">
                <div>
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    AI repair estimation
                  </h6>
                  <h5
                    class="mt-2 font-extrabold text-base font-nunito app-text-secondary-400"
                  >
                    $ {{ claim.aiRepairEstimationCost }}
                  </h5>
                </div>
                <div>
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Damaged parts
                  </h6>
                  <template v-if="claim.damagedParts && claim.damagedParts.length">
                    <div class="mt-2 capitalize flex flex-wrap items-center gap-1">
                      <h5
                        v-for="parts, index in claim.damagedParts"
                        :key="index"
                        class="font-extrabold text-base font-nunito app-text-secondary-400"
                      >
                        {{ parts }}{{ index === claim.damagedParts.length -1 ? '' : ',' }}
                      </h5>
                    </div>
                  </template>
                  <h5
                    v-else
                    class="mt-2 font-extrabold text-base font-nunito app-text-secondary-400"
                  >
                    --
                  </h5>
                </div>
                <div>
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Suggested settlement
                  </h6>
                  <h5
                    class="mt-2 font-extrabold text-base font-nunito app-text-secondary-400"
                  >
                    $ {{ claim.suggestedSettlementCost }}
                  </h5>
                </div>
              </div>
              <div class="mt-4">
                <h6
                  class="font-normal text-base font-sen app-text-secondary-300"
                >
                  Damage detected
                </h6>
                <div class="mt-2">
                  <img
                    class="w-[294px]"
                    :src="claim.aiAnalisysImage"
                    alt="detected"
                    srcset=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div
              class="font-sen font-medium text-base app-text-secondary-400 bg-secondary-dark px-5 py-3 rounded-lg"
            >
              Policy details
            </div>
            <div class="pl-5 pr-20 my-4">
              <div class="flex items-center justify-between">
                <div>
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Policy number
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ claim.policy.policyNumber }}
                  </h5>
                </div>
                <div>
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Policy coverage
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ claim.policy.policyCoverage }}
                  </h5>
                </div>
                <div>
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Claim history
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ claim.policy.claimHistory }}
                  </h5>
                </div>
                <div>
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Effective date
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ timestampFormat(claim.policy.effectiveDate, "DD MMM, YYYY") }}
                  </h5>
                </div>
                <div>
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Expiration date
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ timestampFormat(claim.policy.expiryDate, "DD MMM, YYYY") }}
                  </h5>
                </div>
              </div>
              <div class="mt-4">
                <h6
                  class="font-normal text-base font-sen app-text-secondary-300"
                >
                  Additional details
                </h6>
                <ol
                  class="mt-2 font-medium text-base font-nunito app-text-secondary-400"
                >
                  <li
                    v-for="(detail, index) in claim.policy.additionalDetails"
                    :key="index"
                  >
                    {{ detail }}
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div
              class="font-sen font-medium text-base app-text-secondary-400 bg-secondary-dark px-5 py-3 rounded-lg"
            >
              Incident summary
            </div>
            <div class="px-5 my-4 w-full">
              <div class="flex items-center justify-between w-full">
                <div class="w-1/3">
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Nature of incident
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ claim.incident.natureOfIncident }}
                  </h5>
                </div>
                <div class="w-1/3">
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Incident location
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ claim.incident.incidentLocation }}
                  </h5>
                </div>
                <div class="w-1/3">
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Date & Time
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ timestampFormat(claim.incident.incidentDate, "DD MMM, YYYY | hh:mm A") }}
                  </h5>
                </div>
              </div>
              <div class="mt-4">
                <h6
                  class="font-normal text-base font-sen app-text-secondary-300"
                >
                  Incident statement
                </h6>
                <div
                  class="mt-2 font-medium text-base italic font-nunito app-text-secondary-400"
                >
                  {{ claim.incident.incidentStatement }}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div
              class="font-sen font-medium text-base app-text-secondary-400 bg-secondary-dark px-5 py-3 rounded-lg"
            >
              Claimant & Vehicle details
            </div>
            <div class="px-5 my-4 w-full">
              <div class="flex items-center w-full">
                <div class="w-1/3">
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Claimant name
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ claim.owner.username }}
                  </h5>
                </div>
                <div class="w-1/3">
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Vehicle make & model
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ claim.vehicle.vehicleYear }}
                    {{ claim.vehicle.vehicleMake }}
                    {{ claim.vehicle.vehicleModel }}
                  </h5>
                </div>
                <div class="w-1/3">
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    VIN
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{
                      claim.vehicle.vehicleIdentificationNumber
                        ? claim.vehicle.vehicleIdentificationNumber
                        : "--"
                    }}
                  </h5>
                </div>
              </div>
              <div class="mt-4 flex items-center w-full">
                <div class="w-1/3">
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Vehicle number
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ claim.vehicle.vehicleNumber }}
                  </h5>
                </div>
                <div class="w-1/3">
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Email
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ claim.owner.email }}
                  </h5>
                </div>
                <div class="w-1/3">
                  <h6
                    class="font-normal text-base font-sen app-text-secondary-300"
                  >
                    Contact number
                  </h6>
                  <h5
                    class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                  >
                    {{ claim.owner.phonenumber }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex justify-center items-center mt-3">
          No data available
        </div>
      </template>
    </div>
  </MainComponent>
</template>

<style scoped>
.tr-box-shadow {
  box-shadow: 0px 4px 4px 0px #0000000d;
}
</style>
