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
        cb(true, response.data)
      }else{
        cb(false, null)
      }
      
    } catch (error) {
      console.error('error', error);
      if (error.status === 500) {
        cb(false, 'Something went wrong! Please try again later.')
      }else{
        cb(false, 'Invalid email or password')
      }
    }
  }

  return { user, login }
})
