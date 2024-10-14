<script setup>
import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <HeaderComponent />
    <div class="overflow-y-auto bg-secondary-light grow px-10 py-6"> 
      <slot></slot>
    </div>
  </div>
</template>
