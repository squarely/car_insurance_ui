<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import {useUserStore} from '../stores/user';

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter()

const userStore = useUserStore();

const userCrendentials = ref({
    email: "vijayaraj.p@gmail.co",
    password: "Password@12345"
})

// const {count, increment} = storeToRefs(store); 

const submit = (event)=>{
    event.preventDefault();

    userStore.login(userCrendentials.value, (status, data) => {
        if (status) {
            router.push({
                name: 'home'
            })
        }else{
            if (data) {
                toast(data, {
                    "type": "error",
                    "autoClose": 5000,
                    "dangerouslyHTMLString": true
                })
            }else{
                toast("Couldn't process your request.", {
                    "type": "error",
                    "autoClose": 5000,
                    "dangerouslyHTMLString": true
                })
            }
        }
    })
}
onMounted(() => {

})
</script>

<template>
    <div class="flex items-center w-full h-full">
        <div class="flex relative justify-center items-center grow">
            <div class="mx-auto w-6/12">
                <div class="font-sen text-center">
                    <h5 class="font-bold text-5xl">Welcome back!</h5>
                    <p class="font-normal text-2xl mt-3 app-text-dark-100">Enter the email and password to access the claims request.</p>
                </div>
                <div class="mt-10">
                    <form class="flex flex-col justify-center" @submit="submit($event)">
                        <div class="flex flex-col font-normal text-xl app-text-dark-100">
                            <label for="email">Email*</label>
                            <input class="bg-secondary py-3.5 px-3 mt-2.5 rounded-lg" v-model="userCrendentials.email" type="email" name="email" id="email">
                        </div>
                        <div class="flex flex-col font-normal text-xl mt-8 app-text-dark-100">
                            <label for="password">Password*</label>
                            <input class="bg-secondary py-3.5 px-3 mt-2.5 rounded-lg" v-model="userCrendentials.password" type="password" name="password" id="password">
                        </div>
                        <div class="mt-10">
                            <button class="bg-primary w-full py-5 rounded-lg font-bold text-xl text-white text-center flex justify-center items-center gap-3" type="submit">
                                <p>Login</p> 
                                <img src="../assets/images/login/submit_logo.png" alt="" srcset="">
                            </button>
                        </div>
                    </form>
                </div>
                <div class="mt-14 text-center">
                    <p class="font-normal text-xl app-text-secondary-100">Fast, reliable, and hassle-free car insurance for every journey.</p>
                </div>
            </div>
            <!-- <div class="absolute">
                <img src="../assets/images/login/wheel_logo.png" alt="wheel">
            </div> -->
        </div>
        <div class="w-5/12">
            <img class="w-full h-auto" src="../assets/images/login/car.png" alt="" srcset="">
        </div>
    </div>
</template>
