<script setup>
import MainComponent from "@/components/layouts/MainComponent.vue";
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <MainComponent>
    <div class="w-full px-12">
      <div class="font-sen flex justify-between items-center">
        <div class="flex items-center gap-3">
            <!-- <div>
                <img src="../assets/images/common/back_arrow.svg" alt="back" srcset="">
            </div> -->
            <div>
                <h6 class="font-bold text-2xl app-text-secondary-400">Assessment details</h6>
                <p class="font-normal text-xl app-text-secondary-300">#CN26569</p>
            </div>
        </div>
        <div
          class="bg-primary py-3 px-5 font-bold text-xl text-white text-center flex justify-center items-center gap-3 rounded-lg cursor-pointer"
        >
          <p>Get AI Repair Estimation</p>
          <img src="../assets/images/login/submit_logo.png" alt="" srcset="" />
        </div>
      </div>
      <div class="bg-white rounded-lg px-5 py-7 mt-5 mb-5">
        <div class="flex justify-between items-center">
            <div class="flex justify-between items-center gap-8">
                <h6 class="font-sen font-semibold app-text-secondary-400 text-4xl">#CN26569</h6>
                <div class="flex items-center gap-3">
                    <div class="w-[12px] h-[12px] app-status-bg-pending rounded-full"></div>
                    <p class="font-normal text-base app-text-secondary-200 font-nunito">Pending</p>
                </div>
            </div>
            <div class="flex justify-center items-center gap-2 font-sen app-bg-green-100 app-text-secondary-400 font-normal text-xl px-5 py-3 rounded-lg">
                <img src="../assets/images/common/active_status.svg" alt="active" srcset="">
                <p>Active Policy</p>
            </div>
        </div>
        <div class="mt-2">
            <p class="text-base font-normal font-nunito app-text-secondary-300">Assigned on Sep 24, 2024 </p>
        </div>
        <div class="mt-4">
            <div class="font-sen font-medium text-base app-text-secondary-400 bg-secondary-dark px-5 py-3 rounded-lg">
                AI Repair Estimation
            </div>
            <div class="pl-5 pr-20 my-4">
                <div class="flex items-center gap-24">
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">AI repair estimation</h6>
                        <h5 class="mt-2 font-extrabold text-base font-nunito app-text-secondary-400">$ 2500.00</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Damaged parts</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">Hood, Front right door</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Suggested settlement</h6>
                        <h5 class="mt-2 font-extrabold text-base font-nunito app-text-secondary-400">$ 2200.00</h5>
                    </div>
                </div>
                <div class="mt-4">
                    <h6 class="font-normal text-base font-sen app-text-secondary-300">Damage detected</h6>
                    <div class="mt-2">
                        <img class="w-[294px]" src="../assets/images/demo/detected.png" alt="detected" srcset="">
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
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">CIC784596</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Policy coverage</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">Comprehensive coverage</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Claim history</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">No prior claims</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Effective date</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">01 Aug, 2024</h5>
                    </div>
                    <div>
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Expiration date</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">15 Sep, 2028</h5>
                    </div>
                </div>
                <div class="mt-4">
                    <h6 class="font-normal text-base font-sen app-text-secondary-300">Additional details</h6>
                    <ol class="mt-2 font-medium text-base font-nunito app-text-secondary-400">
                        <li>Collision: Yes</li>
                        <li>Liability: $100,000/$300,000</li>
                        <li>Personal Injury Protection (PIP): $50,000</li>
                        <li>Uninsured Motorist: Yes</li>
                        <li>Medical Payments: $10,000</li>
                        <li>Roadside Assistance: Yes</li>
                        <li>Premium: $1,200 annually</li>
                        <li>Deductible: $500 (Collision), $250 (Comprehensive)</li>
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
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">Accident</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Incident location</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">1234 Queen St W, Toronto, ON M6J 1J5</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Date & Time</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">Sep 23, 2024 | 03:00 PM</h5>
                    </div>
                </div>
                <div class="mt-4">
                    <h6 class="font-normal text-base font-sen app-text-secondary-300">Incident statement</h6>
                    <div class="mt-2 font-medium text-base italic font-nunito app-text-secondary-400">
                        I was driving north on Main Street when another car ran a red light and hit the side of my vehicle. The accident occurred around 3 PM, and my car sustained damage to the front bumper and right fender.
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
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">John Doe</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Vehicle make & model</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">2020 Toyota Camry</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">VIN</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">1VXBR12EXCP901213</h5>
                    </div>
                </div>
                <div class="mt-4 flex items-center w-full">
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Vehicle number</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">DMC - 4583</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Email</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">johndoe090@gmail.com</h5>
                    </div>
                    <div class="w-1/3">
                        <h6 class="font-normal text-base font-sen app-text-secondary-300">Contact number</h6>
                        <h5 class="mt-2 font-normal text-base font-nunito app-text-secondary-400">+1 416-567467</h5>
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