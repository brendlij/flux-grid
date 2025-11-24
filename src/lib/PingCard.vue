<script setup lang="ts">
import { computed } from "vue";

export interface PingCardProps {
  name: string;
  email: string;
  status?: "online" | "away" | "offline";
  avatar?: string;
}

const props = withDefaults(defineProps<PingCardProps>(), {
  status: "offline",
});

const statusColor = computed(() => {
  const colors = {
    online: "var(--flux-mint)",
    away: "var(--flux-amber)",
    offline: "#888",
  };
  return colors[props.status];
});

const statusLabel = computed(() => {
  return props.status.charAt(0).toUpperCase() + props.status.slice(1);
});
</script>

<template>
  <!-- Content only - layout is handled by FluxGridItem -->
  <div style="display: flex; flex-direction: column; gap: 0.5rem">
    <div
      style="
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
      "
    >
      <div
        v-if="avatar"
        style="
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--flux-blue),
            var(--flux-purple)
          );
          flex-shrink: 0;
        "
      />
      <div>
        <h4 style="margin: 0; font-size: 0.95rem">{{ name }}</h4>
      </div>
    </div>

    <p style="margin: 0; font-size: 0.85rem; color: var(--flux-text-muted)">
      {{ email }}
    </p>

    <div
      style="
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
      "
    >
      <div
        :style="{
          width: '0.5rem',
          height: '0.5rem',
          borderRadius: '50%',
          backgroundColor: statusColor,
          animation: status === 'online' ? 'pulse 2s infinite' : 'none',
        }"
      />
      <span style="font-size: 0.8rem; color: var(--flux-text-muted)">
        {{ statusLabel }}
      </span>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
