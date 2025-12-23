<template>
  <div class="min-h-[100svh] grid place-items-center px-6">
    <div class="lux-card max-w-lg w-full p-7 sm:p-10 text-center">
      <h1 class="font-display text-3xl sm:text-4xl text-white/90">Page not found</h1>
      <p class="mt-3 text-white/70">The page you are looking for does not exist.</p>
      <div class="mt-7">
        <LuxuryButton variant="primary" @click="$router.push('/')">Back to start</LuxuryButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import LuxuryButton from "../components/LuxuryButton.vue";
</script>
