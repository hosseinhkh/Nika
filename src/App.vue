<template>
  <div class="lux-root">
    <div class="lux-bg" aria-hidden="true"></div>

    <main class="relative z-10">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <AudioDock />
  </div>
</template>

<script setup>
import AudioDock from "./components/AudioDock.vue";
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
