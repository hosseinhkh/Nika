<template>
  <SceneShell>
    <div class="relative">
      <div class="lux-card p-7 sm:p-10">
        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-white/60 text-xs uppercase tracking-[0.35em]">Private Website</div>
            <h1 class="mt-3 font-display text-4xl sm:text-5xl leading-tight text-white/95">
              Nika, this website is for you!
            </h1>
          </div>
          <div class="hidden sm:block h-16 w-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur grid place-items-center animate-floaty">
            <span class="text-white/90 font-display text-xl">✦</span>
          </div>
        </div>

        <p class="mt-6 text-white/70 leading-relaxed text-[15px] sm:text-base">
          You may ask why I made this website. Easy. Because I fucking can. 🙂
        </p>

        <div class="mt-8 grid gap-3">
          <LuxuryButton variant="primary" :chevron="true" @click="start">
            Start
          </LuxuryButton>

        </div>

        <div class="mt-7 text-xs text-white/45 leading-relaxed">
          Tip: click on start to see what's going on!
        </div>
      </div>

      <div class="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl"></div>
    </div>
  </SceneShell>
</template>

<script setup>
import { useRouter } from "vue-router";
import SceneShell from "../components/SceneShell.vue";
import LuxuryButton from "../components/LuxuryButton.vue";
import { flowConfig } from "../flows/story";
import { useAudioStore } from "../stores/audio";

const router = useRouter();
const audio = useAudioStore();

function start() {
  audio.userEnableAudio();
  // Start with default track, but do not force autoplay here.
  // The first scene can decide if it wants autoplay.
  router.push(`/s/${flowConfig.entrySceneId}`);
}
function goToFirstWithoutAudio() {
  router.push(`/s/${flowConfig.entrySceneId}`);
}
</script>
