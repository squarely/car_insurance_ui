<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { useRouter } from "vue-router";

import { useClaimStore } from "@/stores/claim";
import { computed, onMounted, ref } from "vue";

import timestampFormat from "../config/moment";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const claimStore = useClaimStore();
const router = useRouter();

let isLoader = ref(false);
let isButtonSpinner = ref(false);

const claimList = computed(() => {
  return claimStore.claims;
});
const claimCount = computed(() => {
  return claimStore.claimCount;
});
onMounted(() => {
  isLoader.value = true

  claimStore.getClaimCount((status) => {
    if (!status) {
      toast("Couldn't get the claims list count", {
        type: "error",
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
    }
  });
  claimStore.getClaims((status) => {
    isLoader.value = false
    if (!status) {
      toast("Couldn't get the claims list", {
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

const generateCustomUUID = () => {
  isButtonSpinner.value = true

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uuid = "";
  for (let i = 0; i < 17; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  claimStore.addNewClaim(uuid, (status) => {
    if (status) {
      claimStore.getClaims((status) => {
        isButtonSpinner.value = false

        if (!status) {
          toast("Couldn't get the claims list", {
            type: "error",
            autoClose: 5000,
            dangerouslyHTMLString: true,
          });
        }
      });

      claimStore.getClaimCount((status) => {
        if (!status) {
          toast("Couldn't get the claims list count", {
            type: "error",
            autoClose: 5000,
            dangerouslyHTMLString: true,
          });
        }
      });
    } else {
      isButtonSpinner.value = false

      claimStore.getClaims((status) => {
        if (!status) {
          toast("Couldn't add a claim!", {
            type: "error",
            autoClose: 5000,
            dangerouslyHTMLString: true,
          });
        }
      });
    }
  });
};
</script>

<template>
  <MainComponent>
    <div class="h-full w-full">
      <div class="font-sen flex justify-between items-center">
        <h6 class="font-bold text-2xl app-text-secondary-400">
          Claims requested
        </h6>
        <div
          @click="generateCustomUUID"
          class="bg-primary py-3 px-5 font-bold text-xl text-white text-center flex justify-center items-center gap-3 rounded-lg cursor-pointer"
        >
        <svg v-if="isButtonSpinner" aria-hidden="true" role="status" class="inline w-5 h-5 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
          <p>Add new claims</p>
          <img src="../assets/images/login/submit_logo.png" alt="" srcset="" />
        </div>
      </div>

      <div class="font-sen flex items-center gap-9 mt-4">
        <div class="bg-white w-2/6 rounded-lg py-4 px-6">
          <h5 class="font-extrabold text-3xl font-nunito">
            {{ claimCount ? claimCount.total : "0" }}
          </h5>
          <div class="mt-1.5 flex items-center gap-3">
            <p class="font-normal text-base app-text-secondary-200 font-nunito">
              Total Claims (till date)
            </p>
          </div>
        </div>
        <div class="bg-white w-2/6 rounded-lg py-4 px-6">
          <h5 class="font-extrabold text-3xl font-nunito">
            {{ claimCount ? claimCount.completed : "0" }}
          </h5>
          <div class="mt-1.5 flex items-center gap-3">
            <div
              class="w-[12px] h-[12px] app-status-bg-completed rounded-full"
            ></div>
            <p class="font-normal text-base app-text-secondary-200 font-nunito">
              Completed claims
            </p>
          </div>
        </div>
        <div class="bg-white w-2/6 rounded-lg py-4 px-6">
          <h5 class="font-extrabold text-3xl font-nunito">
            {{ claimCount ? claimCount.pending : "0" }}
          </h5>
          <div class="mt-1.5 flex items-center gap-3">
            <div
              class="w-[12px] h-[12px] app-status-bg-pending rounded-full"
            ></div>
            <p class="font-normal text-base app-text-secondary-200 font-nunito">
              Pending claims
            </p>
          </div>
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
        <div
          class="relative overflow-x-auto mt-4"
          v-if="claimList.length !== 0"
        >
          <table
            style="border-collapse: separate; border-spacing: 0 8px"
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
            <tbody
              class="font-nunito font-medium text-base app-text-secondary-400"
            >
              <tr
                class="bg-white tr-box-shadow capitalize"
                v-for="claim in claimList"
                :key="claim._id"
              >
                <th
                  class="px-6 py-4 whitespace-nowrap font-nunito font-medium text-base app-text-secondary-400"
                >
                  #CN{{ claim.id }}
                </th>
                <td class="px-6 py-4">
                  {{ claim.owner.username }}
                  <div
                    class="font-nunito font-medium text-xs app-text-secondary-200"
                  >
                    {{ claim.vehicle.vehicleNumber }}
                  </div>
                </td>
                <td class="px-6 py-4">{{ timestampFormat(claim.assignedDate, "DD MMM, YYYY") }}</td>
                <td class="px-6 py-4">{{ claim.incident.natureOfIncident }}</td>
                <td class="px-6 py-4">{{ timestampFormat(claim.incident.incidentDate, "DD MMM, YYYY | hh:mm A") }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      :class="`app-status-bg-${claim.status}`"
                      class="w-[12px] h-[12px] rounded-full"
                    ></div>
                    <p>{{ claim.status }}</p>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    @click="redirectToPolicy(claim._id)"
                    class="cursor-pointer text-base font-sen font-medium text-primary border-2 border-primary px-4 py-2.5 rounded-lg"
                  >
                    <div class="flex justify-center items-center gap-2">
                      <p>
                        {{
                          claim.status === "pending"
                            ? "Start Assessment"
                            : "View details"
                        }}
                      </p>
                      <img
                        v-if="claim.status === 'pending'"
                        src="../assets/images/common/redirect_arrow_primary.png"
                        alt=""
                        srcset=""
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
