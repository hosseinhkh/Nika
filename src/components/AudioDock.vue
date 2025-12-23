<template>
  <div class="fixed bottom-4 right-4 z-40">
    <div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-glow px-3 py-2 flex items-center gap-3">
      <button
        class="h-10 w-10 grid place-items-center rounded-xl bg-white/10 hover:bg-white/15 transition"
        @click="toggle"
        :aria-label="audio.isPlaying ? 'Pause music' : 'Play music'"
        :title="audio.isPlaying ? 'Pause' : 'Play'"
      >
        <svg v-if="!audio.isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 5h4v14H6zm8 0h4v14h-4z"/>
        </svg>
      </button>

      <div class="hidden sm:block min-w-[150px]">
        <div class="text-xs uppercase tracking-wider text-white/45">Now playing</div>
        <div class="text-sm text-white/80 truncate">
          {{ audio.currentTrack?.title ?? "Music" }}
        </div>
      </div>

      <button
        class="h-10 w-10 grid place-items-center rounded-xl bg-white/10 hover:bg-white/15 transition"
        @click="audio.setMuted(!audio.muted)"
        :aria-label="audio.muted ? 'Unmute music' : 'Mute music'"
        :title="audio.muted ? 'Unmute' : 'Mute'"
      >
        <svg v-if="audio.muted" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 5L6 9H2v6h4l5 4z"/>
          <path d="M23 9l-6 6"/>
          <path d="M17 9l6 6"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 5L6 9H2v6h4l5 4z"/>
          <path d="M15.5 8.5a4.5 4.5 0 0 1 0 7"/>
          <path d="M18.5 5.5a9 9 0 0 1 0 13"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAudioStore } from "../stores/audio";

const audio = useAudioStore();

function toggle() {
  if (!audio.enabledByUser) {
    audio.userEnableAudio();
  }
  audio.togglePlay();
}
</script>
