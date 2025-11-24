<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type {
  FluxGridAutoTracks,
  FluxGridAxis,
  FluxGridProps,
  FluxGridTracks,
  TrackSize
} from './types'

const props = withDefaults(defineProps<FluxGridProps>(), {
  gap: '1.25rem',
  columnMin: '12rem',
  columnMax: '1fr',
  rowMin: '8rem',
  rowMax: 'auto',
  locked: false,
  tag: 'div',
  autoFlow: 'row dense'
})

const rootTag = computed(() => props.tag)

const gridStyles = computed<CSSProperties>(() => {
  const gapValue = formatSize(props.gap, '1.25rem')
  const styles: CSSProperties = {
    gap: gapValue,
    gridAutoFlow: props.autoFlow,
    width: props.locked ? 'max-content' : '100%',
    maxWidth: props.locked ? undefined : '100%'
  }

  ;(styles as Record<string, string>)['--flux-grid-gap'] = gapValue

  const columnTemplate = toTrackTemplate(props.columns, {
    axis: 'columns',
    min: props.columnMin,
    max: props.columnMax
  })
  if (columnTemplate) {
    styles.gridTemplateColumns = columnTemplate
  }

  const rowTemplate = toTrackTemplate(props.rows, {
    axis: 'rows',
    min: props.rowMin,
    max: props.rowMax
  })
  if (rowTemplate) {
    styles.gridTemplateRows = rowTemplate
  }

  if (props.rowHeight) {
    styles.gridAutoRows = formatSize(props.rowHeight)
  }

  return styles
})

function toTrackTemplate(
  input: FluxGridTracks | undefined,
  options: { axis: FluxGridAxis; min?: TrackSize; max?: TrackSize }
): string | undefined {
  if (input == null) {
    if (options.axis === 'columns') {
      return buildAutoTemplate(options.min, options.max)
    }
    return undefined
  }

  if (typeof input === 'number') {
    const min = options.axis === 'columns' ? formatSize(options.min, '0px') : undefined
    const max = formatSize(options.max, options.axis === 'columns' ? '1fr' : 'auto')
    return min ? `repeat(${input}, minmax(${min}, ${max}))` : `repeat(${input}, ${max})`
  }

  if (Array.isArray(input)) {
    return input.map((value) => formatSize(value)).join(' ')
  }

  if (typeof input === 'string') {
    return input
  }

  const auto = input as FluxGridAutoTracks
  const min = formatSize(auto.min ?? options.min, options.axis === 'columns' ? '12rem' : '8rem')
  const max = formatSize(auto.max ?? options.max, options.axis === 'columns' ? '1fr' : 'auto')
  const type = auto.type ?? 'auto-fit'
  return `repeat(${type}, minmax(${min}, ${max}))`
}

function buildAutoTemplate(min?: TrackSize, max?: TrackSize) {
  const resolvedMin = formatSize(min, '12rem')
  const resolvedMax = formatSize(max, '1fr')
  return `repeat(auto-fit, minmax(${resolvedMin}, ${resolvedMax}))`
}

function formatSize(value?: TrackSize, fallback?: TrackSize): string {
  const target = value ?? fallback
  if (target == null) {
    return 'auto'
  }
  if (typeof target === 'number') {
    return `${target}px`
  }
  return target
}
</script>

<template>
  <component
    :is="rootTag"
    class="flux-grid"
    role="grid"
    :style="gridStyles"
    :data-locked="props.locked ? 'true' : undefined"
  >
    <slot />
  </component>
</template>
