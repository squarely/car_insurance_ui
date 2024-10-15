import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import API from "../config/api";

export const useClaimStore = defineStore('claim', () => {
  const claims = ref([])
  const claimDetails = ref(null)

  async function getClaims(cb) {
    const token = localStorage.getItem('api_token')
    try {
      const response = await API.get('claim', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.data) {
        claims.value = response.data.data
        cb(true)
      }else{
        cb(false)
      }
      
    } catch (error) {
      console.error('error', error);
      cb(false)
    }
  }

  async function getClaim(claimId,cb) {
    const token = localStorage.getItem('api_token')
    try {
      const response = await API.get(`claim/${claimId}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.data) {
        claimDetails.value = response.data
        cb(true)
      }else{
        cb(false)
      }
      
    } catch (error) {
      console.error('error', error);
      cb(false)
    }
  }

  return { claims, claimDetails, getClaims, getClaim }
})
