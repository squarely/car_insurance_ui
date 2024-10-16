import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import API from "../config/api";
import axios from "axios";

export const useClaimStore = defineStore('claim', () => {
  const claims = ref([])
  const claimCount = ref(null)
  const claimDetails = ref(null)
  const estimationReport = ref(null)
  const claimImages = ref({
    preSignedUrl: null,
    imageUrl: null
  })

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

  async function getClaimCount(cb) {
    const token = localStorage.getItem('api_token')
    try {
      const response = await API.get('claim/get/getClaimCount', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.data) {
        claimCount.value = response.data
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

  async function getClaimImage(claimId,cb) {
    const token = localStorage.getItem('api_token')
    try {
      const response = await API.get(`claim/getClaimImage/${claimId}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.data) {
        claimImages.value.preSignedUrl = response.data.preSignedUrl
        claimImages.value.imageUrl = response.data.imageUrl
        cb(claimImages.value.preSignedUrl)
      }else{
        cb(false)
      }
      
    } catch (error) {
      console.error('error', error);
      cb(false)
    }
  }

  async function uploadImage(url, file, cb) {
    try {
      const response = await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        }
      });

      if (response.status === 200) {
        cb(true)
      }else{
        cb(false)
      }
      
    } catch (error) {
      console.error('error', error);
      cb(false)
    }
  }

  async function generateEstimation(claimId,cb) {
    const token = localStorage.getItem('api_token')
    try {
      const response = await API.patch(`claim/updateRepairCost/${claimId}`, null, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.data) {
        estimationReport.value = response.data
        cb(true)
      }else{
        cb(false)
      }
      
    } catch (error) {
      console.error('error', error);
      cb(false)
    }
  }

  async function addNewClaim(vehicleId, cb) {
    const token = localStorage.getItem('api_token')

    const claimData = {
      owner: {
        username: "John Doe",
        email: "johndoe090@gmail.com",
        phonenumber: "+1 416-567467"
      },
      vehicle: {
        vehicleNumber: "DMC - 4583",
        vehicleModel: "Camry",
        vehicleMake: "Toyota",
        vehicleYear: "2020",
        vehicleIdentificationNumber: vehicleId,
        vehicleColor: "White"
      },
      incident: {
        natureOfIncident: "accident",
        incidentLocation: "1234 Queen St W, Toronto, ON M6J 1J5",
        incidentDate: "2024-10-14T00:00:00Z",
        incidentStatement: "I was driving north on Main Street when another car ran a red light and hit the side of my vehicle. The accident occurred around 3 PM, and my car sustained damage to the front bumper and right fender."
      },
      policy: {
        policyNumber: "CIC784596",
        policyCoverage: "Comprehensive coverage",
        claimHistory: "No prior claims",
        effectiveDate: "2024-08-15T00:00:00Z",
        expiryDate: "2024-12-15T00:00:00Z",
        additionalDetails: [
          "Collision: Yes",
          "Liability: $100,000/$300,000",
          "Personal Injury Protection (PIP): $50,000",
          "Uninsured Motorist: Yes",
          "Medical Payments: $10,000",
          "Roadside Assistance: Yes",
          "Premium: $1,200 annually",
          "Deductible: $500 (Collision), $250 (Comprehensive)"
        ]
      }
    }

    const data = JSON.stringify(claimData);
    try {
      const response = await API.post('claim', data, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.data) {
        cb(true)
      }else{
        cb(false)
      }
      
    } catch (error) {
      console.error('error', error);
      cb(false)
    }
  }

  return { claims, claimCount, claimDetails, claimImages, estimationReport, getClaims, getClaim, getClaimImage, uploadImage, generateEstimation, addNewClaim, getClaimCount }
})
