<script setup lang="ts">
import { computed } from "vue";
import type { CSSProperties } from "vue";
import type { FluxGridItemProps } from "./types";

const props = withDefaults(defineProps<FluxGridItemProps>(), {
  colSpan: 1,
  rowSpan: 1,
  tag: "div",
  padding: "1rem",
  overflow: "hidden",
  align: "start",
});

const rootTag = computed(() => props.tag);

const gridColumn = computed(() => buildPlacement(props.col, props.colSpan));
const gridRow = computed(() => buildPlacement(props.row, props.rowSpan));

const formattedPadding = computed(() => {
  if (typeof props.padding === "number") {
    return `${props.padding}px`;
  }
  return props.padding;
});

const itemStyles = computed<CSSProperties>(() => ({
  gridColumn: gridColumn.value,
  gridRow: gridRow.value,
  zIndex: props.zIndex,
  aspectRatio: formatAspect(props.aspectRatio),
  // Layout handling (built-in from FluxCard logic)
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  padding: formattedPadding.value,
  overflow: props.overflow as any,
  boxSizing: "border-box",
  minWidth: 0,
  minHeight: 0,
  justifyContent:
    props.align === "center"
      ? "center"
      : props.align === "end"
      ? "flex-end"
      : undefined,
}));

function buildPlacement(start?: number, span?: number) {
  if (start && span && span > 1) {
    return `${start} / span ${span}`;
  }
  if (start) {
    return `${start}`;
  }
  if (span && span > 1) {
    return `span ${span}`;
  }
  return undefined;
}

function formatAspect(value?: string | number) {
  if (value == null) {
    return undefined;
  }
  if (typeof value === "number") {
    return `${value}`;
  }
  return value;
}
</script>

<template>
  <component
    :is="rootTag"
    class="flux-grid__item"
    :data-grid-col="props.col ?? undefined"
    :data-grid-row="props.row ?? undefined"
    :data-grid-col-span="props.colSpan"
    :data-grid-row-span="props.rowSpan"
    :style="itemStyles"
  >
    <!-- Auto-body slot that flexes to fill space -->
    <div class="flux-grid__item-body">
      <slot />
    </div>
  </component>
</template>

<style scoped>
.flux-grid__item-body {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.flux-grid__item-body :deep(img) {
  width: 100%;
  height: auto;
  display: block;
}

.flux-grid__item-body :deep(p) {
  margin: 0;
}

.flux-grid__item-body :deep(h1),
.flux-grid__item-body :deep(h2),
.flux-grid__item-body :deep(h3),
.flux-grid__item-body :deep(h4),
.flux-grid__item-body :deep(h5),
.flux-grid__item-body :deep(h6) {
  margin: 0 0 0.5rem 0;
}
</style>
