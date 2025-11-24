<script setup lang="ts">
import { computed } from 'vue'
import type { FluxGridItemProps } from './types'

const props = withDefaults(defineProps<FluxGridItemProps>(), {
  colSpan: 1,
  rowSpan: 1,
  tag: 'div'
})

const rootTag = computed(() => props.tag)

const gridColumn = computed(() => buildPlacement(props.col, props.colSpan))
const gridRow = computed(() => buildPlacement(props.row, props.rowSpan))

const itemStyles = computed(() => ({
  gridColumn: gridColumn.value,
  gridRow: gridRow.value,
  zIndex: props.zIndex,
  aspectRatio: formatAspect(props.aspectRatio)
}))

function buildPlacement(start?: number, span?: number) {
  if (start && span && span > 1) {
    return `${start} / span ${span}`
  }
  if (start) {
    return `${start}`
  }
  if (span && span > 1) {
    return `span ${span}`
  }
  return undefined
}

function formatAspect(value?: string | number) {
  if (value == null) {
    return undefined
  }
  if (typeof value === 'number') {
    return `${value}`
  }
  return value
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
    <slot />
  </component>
</template>
