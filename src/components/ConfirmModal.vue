<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
    >
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="onCancel"></div>

      <div class="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b0911]/90 shadow-glow overflow-hidden">
        <div class="px-6 pt-6 pb-4">
          <h3 class="font-display text-2xl text-white/95">
            {{ title }}
          </h3>
          <p class="mt-2 text-white/70 leading-relaxed">
            {{ message }}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 px-6 pb-6">
          <LuxuryButton
            variant="primary"
            :chevron="true"
            @click="onConfirm"
          >
            {{ confirmText }}
          </LuxuryButton>
          <LuxuryButton
            variant="ghost"
            @click="onCancel"
          >
            {{ cancelText }}
          </LuxuryButton>
        </div>

        <div class="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl"></div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import LuxuryButton from "./LuxuryButton.vue";

defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: "Confirm" },
  message: { type: String, default: "" },
  confirmText: { type: String, default: "Confirm" },
  cancelText: { type: String, default: "Cancel" }
});

const emit = defineEmits(["confirm", "cancel"]);

function onConfirm() {
  emit("confirm");
}
function onCancel() {
  emit("cancel");
}
</script>
