<template>
  <SceneShell>
    <div v-if="scene" class="relative">
      <div class="lux-card p-7 sm:p-10">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="mt-3 font-display text-3xl sm:text-4xl leading-tight text-white/95">
              {{ scene.title }}
            </h2>
          </div>

          <div class="hidden sm:block text-white/40 text-sm select-none">
            <span class="font-display">✦</span>
          </div>
        </div>

        <div class="mt-6 grid gap-4">
          <p v-for="(p, i) in scene.body" :key="i" class="text-white/70 leading-relaxed text-[15px] sm:text-base">
            {{ p }}
          </p>
        </div>

        <div v-if="gateMessage" class="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70 text-sm">
          {{ gateMessage }}
        </div>

        <div class="mt-8 grid gap-3">
          <LuxuryButton
            v-for="(a, idx) in scene.actions"
            :key="idx"
            :variant="a.style || 'primary'"
            :disabled="isActionDisabled(a)"
            :chevron="!isExternal(a.to)"
            @click="onAction(a)"
          >
            {{ a.label }}
          </LuxuryButton>
        </div>

        <div class="mt-7 flex items-center justify-between text-xs text-white/45">
          <button class="underline underline-offset-4 hover:text-white/70 transition" @click="goHome">
            Restart
          </button>

          <div v-if="audio.enabledByUser" class="tabular-nums">
            Played: {{ audio.secondsPlayed }}s
          </div>
        </div>
      </div>

      <ConfirmModal
        :open="confirmOpen"
        :title="confirmTitle"
        :message="confirmMessage"
        :confirmText="confirmConfirmText"
        :cancelText="confirmCancelText"
        @confirm="confirmProceed"
        @cancel="confirmCancel"
      />

      <div class="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl"></div>
    </div>

    <div v-else class="lux-card p-7 sm:p-10">
      <h2 class="font-display text-3xl text-white/90">Not found</h2>
      <p class="mt-3 text-white/70">This step does not exist.</p>
      <div class="mt-7">
        <LuxuryButton variant="primary" @click="goHome">Back to start</LuxuryButton>
      </div>
    </div>
  </SceneShell>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SceneShell from "../components/SceneShell.vue";
import LuxuryButton from "../components/LuxuryButton.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import { getSceneById, isExternalLink } from "../lib/flow";
import { useAudioStore } from "../stores/audio";

const route = useRoute();
const router = useRouter();
const audio = useAudioStore();

const scene = computed(() => getSceneById(route.params.id));

const confirmOpen = ref(false);
const pendingAction = ref(null);
const confirmTitle = ref("Confirm");
const confirmMessage = ref("");
const confirmConfirmText = ref("Confirm");
const confirmCancelText = ref("Cancel");

function isExternal(to) {
  return isExternalLink(to);
}

watch(
  () => scene.value,
  (s) => {
    if (!s) return;

    // Handle scene-level music preferences
    if (s.music?.trackId) {
      audio.setTrack(s.music.trackId, { autoplay: !!(s.music.autoplay && audio.enabledByUser) });
    }
  },
  { immediate: true }
);

const gateMessage = computed(() => {
  const g = scene.value?.gate;
  if (!g) return "";
  if (g.requireMusicStarted && !audio.isPlaying) return "Tap Play in the music dock to continue.";
  if (g.requireMinSecondsPlayed && audio.secondsPlayed < g.requireMinSecondsPlayed) {
    const left = g.requireMinSecondsPlayed - audio.secondsPlayed;
    return `Enjoy the music for ${left}s, then continue.`;
  }
  return "";
});

function gateBlocks() {
  const g = scene.value?.gate;
  if (!g) return false;
  if (g.requireMusicStarted && !audio.isPlaying) return true;
  if (g.requireMinSecondsPlayed && audio.secondsPlayed < g.requireMinSecondsPlayed) return true;
  return false;
}

function isActionDisabled(a) {
  // Only block navigation-type actions when gated
  if (gateBlocks()) return true;
  return false;
}

function onAction(a) {
  if (!scene.value) return;

  // External links
  if (isExternal(a.to)) {
    window.open(a.to, "_blank", "noopener,noreferrer");
    return;
  }

  // Confirm dialog
  if (a.confirm) {
    pendingAction.value = a;
    confirmTitle.value = a.confirm.title || "Confirm";
    confirmMessage.value = a.confirm.message || "";
    confirmConfirmText.value = a.confirm.confirmText || "Confirm";
    confirmCancelText.value = a.confirm.cancelText || "Cancel";
    confirmOpen.value = true;
    return;
  }

  goTo(a.to);
}

function confirmProceed() {
  const a = pendingAction.value;
  confirmOpen.value = false;
  pendingAction.value = null;
  if (!a) return;
  goTo(a.to);
}

function confirmCancel() {
  confirmOpen.value = false;
  pendingAction.value = null;
}

function goTo(to) {
  router.push(`/s/${to}`);
}

function goHome() {
  router.push("/");
}
</script>
