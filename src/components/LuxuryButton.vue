<template>
  <button
    :class="classes"
    :disabled="disabled"
    @mousemove="onMove"
    @mouseleave="reset"
  >
    <span class="relative z-10 flex items-center justify-center gap-2">
      <slot />
      <svg
        v-if="chevron"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 opacity-90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </span>

    <span class="lux-sheen" aria-hidden="true"></span>
    <span class="lux-glow" aria-hidden="true"></span>
  </button>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  variant: { type: String, default: "primary" },
  disabled: { type: Boolean, default: false },
  chevron: { type: Boolean, default: false }
});

const x = ref(50);
const y = ref(50);

const classes = computed(() => {
  const base =
    "lux-btn relative w-full select-none overflow-hidden rounded-2xl px-5 py-4 text-[15px] font-medium tracking-wide transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";
  const v =
    props.variant === "ghost"
      ? "lux-btn-ghost"
      : props.variant === "danger"
      ? "lux-btn-danger"
      : "lux-btn-primary";

  return [base, v].join(" ");
});

function onMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  x.value = ((e.clientX - r.left) / r.width) * 100;
  y.value = ((e.clientY - r.top) / r.height) * 100;
  e.currentTarget.style.setProperty("--mx", `${x.value}%`);
  e.currentTarget.style.setProperty("--my", `${y.value}%`);
}
function reset(e) {
  e.currentTarget.style.setProperty("--mx", `50%`);
  e.currentTarget.style.setProperty("--my", `50%`);
}
</script>

<style scoped>
.lux-btn {
  --mx: 50%;
  --my: 50%;
}
.lux-sheen {
  position: absolute;
  inset: 0;
  background: radial-gradient(450px circle at var(--mx) var(--my), rgba(255,255,255,0.16), transparent 55%);
  opacity: 0;
  transition: opacity 250ms ease;
}
.lux-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(600px circle at var(--mx) var(--my), rgba(164, 123, 255, 0.28), transparent 60%);
  opacity: 0;
  transition: opacity 250ms ease;
}
.lux-btn:hover .lux-sheen,
.lux-btn:hover .lux-glow {
  opacity: 1;
}
</style>
