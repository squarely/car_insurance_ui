<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { useClaimStore } from "@/stores/claim";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const claimStore = useClaimStore();
const route = useRoute();
const router = useRouter();

let isLoader = ref(false);

const estimationReport = computed(() => {
  return claimStore.claimDetails;
});

onMounted(() => {
  isLoader.value = true;

  const claimId = route.params.id;

  claimStore.getClaim(claimId, (status) => {
    isLoader.value = false;

    if (status) {
    } else {
      toast("Couldn't get the estimation report detail.", {
        type: "error",
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
    }
  });
});

const redirectToPolicy = (id) => {
  return router.push({
    name: "policy_details",
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
              AI Repair Estimation
            </h6>
            <p class="font-normal text-xl app-text-secondary-300">
              #CN{{ estimationReport ? estimationReport.id : "--" }}
            </p>
          </div>
        </div>
        <div
          v-if="estimationReport"
          @click="redirectToPolicy(route.params.id)"
          class="bg-primary py-3 px-5 font-bold text-xl text-white text-center flex justify-center items-center gap-3 rounded-lg cursor-pointer"
        >
          <p>View Policy</p>
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
        <div v-if="estimationReport">
          <div class="bg-white rounded-lg px-6 py-5 mt-8">
            <div>
              <h6 class="font-sen font-normal text-xl app-text-secondary-400">
                Vehicle details
              </h6>
            </div>
            <div class="flex items-center text-left mt-4">
              <div class="flex-1">
                <h6
                  class="font-normal text-base font-sen app-text-secondary-300"
                >
                  VIN
                </h6>
                <h5
                  class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                >
                  {{ estimationReport.vehicle.vehicleIdentificationNumber }}
                </h5>
              </div>
              <div class="flex-1">
                <h6
                  class="font-normal text-base font-sen app-text-secondary-300"
                >
                  Brand
                </h6>
                <h5
                  class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                >
                  {{ estimationReport.vehicle.vehicleMake }}
                </h5>
              </div>
              <div class="flex-1">
                <h6
                  class="font-normal text-base font-sen app-text-secondary-300"
                >
                  Model & Year
                </h6>
                <h5
                  class="mt-2 font-normal text-base font-nunito app-text-secondary-400"
                >
                  {{ estimationReport.vehicle.vehicleModel }} -
                  {{ estimationReport.vehicle.vehicleYear }}
                </h5>
              </div>
              <div class="flex-1">
                <h6
                  class="font-normal text-base font-sen app-text-secondary-300"
                >
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
            <div class="relative app-bg-blue-100 rounded-lg w-6/12 p-5 overflow-y-hidden">
              <h6 class="font-sen font-normal text-base app-text-secondary-300">
                AI Repair Estimation
              </h6>
              <h4
                class="font-extrabold font-nunito text-3xl app-text-secondary-400 mt-2"
              >
                $ {{ estimationReport.aiRepairEstimationCost }}
              </h4>
              <svg class="absolute top-0 right-[3%]" width="86" height="112" viewBox="0 0 86 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0.5C26.4283 8.54281 69 20.1629 63 40.9336C55.8903 65.5456 -25.5781 80.5653 26.2757 111" stroke="#4666CA" stroke-opacity="0.2"/>
                <path d="M54.1976 0.776932C70.5444 8.81974 91.8907 27.0989 83.6853 45.7436C73.4285 69.0494 28.2357 80.5653 61.5703 111" stroke="#4666CA" stroke-opacity="0.2"/>
                <path d="M47.5 0.776932C54.4266 8.83888 55.2923 26.0621 51.8155 44.7512C47.4694 68.1125 66.8752 80.4929 81 111" stroke="#4666CA" stroke-opacity="0.2"/>
              </svg>
            </div>
            <div class="relative app-bg-blue-100 rounded-lg w-6/12 p-5 overflow-y-hidden">
              <h6 class="font-sen font-normal text-base app-text-secondary-300">
                Suggested settlement amount based the policyn
              </h6>
              <h4
                class="font-extrabold font-nunito text-3xl app-text-secondary-400 mt-2"
              >
                $ {{ estimationReport.suggestedSettlementCost }}
              </h4>
              <svg class="absolute top-0 right-[3%]" width="86" height="112" viewBox="0 0 86 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0.5C26.4283 8.54281 69 20.1629 63 40.9336C55.8903 65.5456 -25.5781 80.5653 26.2757 111" stroke="#4666CA" stroke-opacity="0.2"/>
                <path d="M54.1976 0.776932C70.5444 8.81974 91.8907 27.0989 83.6853 45.7436C73.4285 69.0494 28.2357 80.5653 61.5703 111" stroke="#4666CA" stroke-opacity="0.2"/>
                <path d="M47.5 0.776932C54.4266 8.83888 55.2923 26.0621 51.8155 44.7512C47.4694 68.1125 66.8752 80.4929 81 111" stroke="#4666CA" stroke-opacity="0.2"/>
              </svg>
            </div>
          </div>
          <div class="mt-5 flex">
            <div class="w-6/12">
              <div class="pr-14">
                <h6
                  class="font-nunito font-medium app-text-secondary-400 tex-xl"
                >
                  Original
                </h6>
              </div>
              <div class="mt-4 pr-14 app-image-border-right">
                <!-- <img class="w-full" src="../assets/images/demo/original.png" alt="original" srcset=""> -->
                <img
                  class="w-full"
                  :src="estimationReport.damagedPartImage"
                  alt="original"
                  srcset=""
                />
              </div>
            </div>
            <div class="w-6/12">
              <div class="pl-14">
                <h6
                  class="font-nunito font-medium app-text-secondary-400 tex-xl"
                >
                  Damage detected
                </h6>
              </div>
              <div class="mt-4 pl-14">
                <!-- <img class="w-full" src="../assets/images/demo/detected.png" alt="detected" srcset=""> -->
                <img
                  class="w-full"
                  :src="estimationReport.aiAnalisysImage"
                  alt="detected"
                  srcset=""
                />
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
.app-bg-blue-100 {
  background-color: #c9d6ff;
}

.app-image-border-right {
  border-right: 1px solid #bfbfbf;
}
</style>
