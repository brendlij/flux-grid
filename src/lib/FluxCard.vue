<script setup lang="ts">
import { computed } from "vue";
import type { CSSProperties } from "vue";

export interface FluxCardProps {
  /**
   * CSS aspect-ratio value (e.g., "16/9", "1/1", 1.5).
   * When set, card maintains this ratio regardless of content.
   */
  aspectRatio?: string | number;

  /**
   * How to handle content overflow: 'hidden', 'auto', or 'visible'.
   * Default 'hidden' prevents content from breaking the layout.
   */
  overflow?: "hidden" | "auto" | "visible";

  /**
   * Padding inside the card. Accepts any CSS size value.
   * Default '1rem' provides safe internal spacing.
   */
  padding?: string | number;

  /**
   * Vertical alignment of content: 'start', 'center', 'end', 'stretch'.
   * Default 'start' aligns content to top.
   */
  align?: "start" | "center" | "end" | "stretch";

  /**
   * Root HTML tag. Default 'div'.
   */
  tag?: string;

  /**
   * Optional CSS class for custom styling.
   */
  class?: string;
}

const props = withDefaults(defineProps<FluxCardProps>(), {
  overflow: "hidden",
  padding: "1rem",
  align: "start",
  tag: "div",
});

const rootTag = computed(() => props.tag);

const formattedPadding = computed(() => {
  if (typeof props.padding === "number") {
    return `${props.padding}px`;
  }
  return props.padding;
});

const cardStyles = computed<CSSProperties>(() => {
  const styles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: formattedPadding.value,
    overflow: props.overflow as any,
    boxSizing: "border-box",
    minWidth: 0,
    minHeight: 0,
  };

  if (props.aspectRatio) {
    styles.aspectRatio =
      typeof props.aspectRatio === "number"
        ? String(props.aspectRatio)
        : props.aspectRatio;
  }

  if (props.align === "center") {
    styles.justifyContent = "center";
  } else if (props.align === "end") {
    styles.justifyContent = "flex-end";
  } else if (props.align === "stretch") {
    styles.justifyContent = "stretch";
  }

  return styles;
});
</script>

<template>
  <component :is="rootTag" class="flux-card" :class="class" :style="cardStyles">
    <!-- Header slot: typically for title or badges -->
    <slot name="header" />

    <!-- Body slot: primary content with flex-grow to fill space -->
    <div class="flux-card__body">
      <slot />
    </div>

    <!-- Footer slot: typically for actions or metadata -->
    <slot name="footer" />
  </component>
</template>

<style scoped>
.flux-card {
  background: var(--flux-card-bg, var(--flux-grid-item-bg, transparent));
  border-radius: var(--flux-card-radius, var(--flux-grid-item-radius, 0.75rem));
  border: var(
    --flux-card-border,
    1px solid var(--flux-card-border-color, transparent)
  );
}

.flux-card__body {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.flux-card__body :deep(img) {
  width: 100%;
  height: auto;
  display: block;
}

.flux-card__body :deep(p) {
  margin: 0;
}

.flux-card__body :deep(h1),
.flux-card__body :deep(h2),
.flux-card__body :deep(h3),
.flux-card__body :deep(h4),
.flux-card__body :deep(h5),
.flux-card__body :deep(h6) {
  margin: 0 0 0.5rem 0;
}
</style>
