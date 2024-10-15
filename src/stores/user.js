import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import API from "../config/api";

export const useUserStore = defineStore('user', () => {
  const user = ref({})

  // const doubleCount = computed(() => count.value * 2)

  async function login(userData, cb) {
    
    try {
      const response = await API.post('user/login', JSON.stringify(userData));

      if (response.data) {
        user.value = response.data
        
        localStorage.setItem('api_token', user.value.accessToken)
        localStorage.setItem('user', JSON.stringify({
          username: user.value.username
        }))
        cb(true)
      }else{
        cb(false)
      }
      
    } catch (error) {
      console.error('error', error);
      cb(false)
    }
  }

  return { user, login }
})
