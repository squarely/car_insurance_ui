<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <MainComponent>
    <div class="h-full w-full">
      <div class="font-sen flex justify-between items-center">
        <h6 class="font-bold text-2xl app-text-secondary-400">Claims requested</h6>
        <div
          class="bg-primary py-3 px-5 font-bold text-xl text-white text-center flex justify-center items-center gap-3 rounded-lg cursor-pointer"
        >
          <p>Add new claims</p>
          <img src="../assets/images/login/submit_logo.png" alt="" srcset="" />
        </div>
      </div>

      <div class="font-sen flex items-center gap-9 mt-4">
        <div class="bg-white w-2/6 rounded-lg py-4 px-6">
          <h5 class="font-extrabold text-3xl font-nunito">222</h5>
          <div class="mt-1.5 flex items-center gap-3">
            <!-- <div class="w-[12px] h-[12px] app-status-bg-pending rounded-full"></div> -->
            <p class="font-normal text-base app-text-secondary-200 font-nunito">Total Claims (till date)</p>
          </div>
        </div>
        <div class="bg-white w-2/6 rounded-lg py-4 px-6">
          <h5 class="font-extrabold text-3xl font-nunito">222</h5>
          <div class="mt-1.5 flex items-center gap-3">
            <div class="w-[12px] h-[12px] app-status-bg-completed rounded-full"></div>
            <p class="font-normal text-base app-text-secondary-200 font-nunito">Completed claims</p>
          </div>
        </div>
        <div class="bg-white w-2/6 rounded-lg py-4 px-6">
          <h5 class="font-extrabold text-3xl font-nunito">222</h5>
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
          <tbody class="font-nunito font-medium text-base app-text-secondary-400">
            <tr class="bg-white tr-box-shadow">
              <th
                class="px-6 py-4 whitespace-nowrap font-nunito font-medium text-base app-text-secondary-400"
              >
              #CN26569
              </th>
              <td class="px-6 py-4">John Doe <div class="font-nunito font-medium text-xs app-text-secondary-200"># DMC - 4583</div> </td>
              <td class="px-6 py-4">24 Sep, 2024 </td>
              <td class="px-6 py-4">Accident</td>
              <td class="px-6 py-4">23 Sep, 2024 | 03:00 PM</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-[12px] h-[12px] app-status-bg-pending rounded-full"></div>
                  <p>Pending</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="cursor-pointer text-base font-sen font-normal text-primary border-2 border-primary px-4 py-2.5 rounded-lg">
                  <div class="flex justify-center items-center gap-2">
                    <p>
                      Start Assessment
                    </p>
                    <img src="../assets/images/common/redirect_arrow_primary.png" alt="" srcset="">
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