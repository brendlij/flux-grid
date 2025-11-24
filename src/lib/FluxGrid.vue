<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import type { CSSProperties } from "vue";
import type {
  FluxGridAutoTracks,
  FluxGridAxis,
  FluxGridBreakpoint,
  FluxGridProps,
  FluxGridTracks,
  TrackSize,
} from "./types";

const props = withDefaults(defineProps<FluxGridProps>(), {
  gap: "1.25rem",
  columnMin: "12rem",
  columnMax: "1fr",
  rowMin: "8rem",
  rowMax: "auto",
  locked: false,
  tag: "div",
  autoFlow: "row dense",
});

const rootTag = computed(() => props.tag);
const rootRef = ref<HTMLElement | null>(null);
const containerWidth = ref<number | undefined>(undefined);

let resizeObserver: ResizeObserver | null = null;
let windowResizeHandler: (() => void) | null = null;

const activeBreakpoint = computed<FluxGridBreakpoint | undefined>(() => {
  const rules = props.breakpoints;
  if (!rules || !rules.length) {
    return undefined;
  }
  return resolveActiveBreakpoint(rules, containerWidth.value);
});

const lockedState = computed(
  () => activeBreakpoint.value?.locked ?? props.locked
);
const autoFlowValue = computed(
  () => activeBreakpoint.value?.autoFlow ?? props.autoFlow
);

const gridStyles = computed<CSSProperties>(() => {
  const gapValue = formatSize(
    activeBreakpoint.value?.gap ?? props.gap,
    "1.25rem"
  );
  const styles: CSSProperties = {
    gap: gapValue,
    gridAutoFlow: autoFlowValue.value ?? "row dense",
    width: lockedState.value ? "max-content" : "100%",
    maxWidth: lockedState.value ? undefined : "100%",
  };

  (styles as Record<string, string>)["--flux-grid-gap"] = gapValue;

  const columnTemplate = toTrackTemplate(
    activeBreakpoint.value?.columns ?? props.columns,
    {
      axis: "columns",
      min: activeBreakpoint.value?.columnMin ?? props.columnMin,
      max: activeBreakpoint.value?.columnMax ?? props.columnMax,
    }
  );
  if (columnTemplate) {
    styles.gridTemplateColumns = columnTemplate;
  }

  const rowTemplate = toTrackTemplate(
    activeBreakpoint.value?.rows ?? props.rows,
    {
      axis: "rows",
      min: activeBreakpoint.value?.rowMin ?? props.rowMin,
      max: activeBreakpoint.value?.rowMax ?? props.rowMax,
    }
  );
  if (rowTemplate) {
    styles.gridTemplateRows = rowTemplate;
  }

  const rowHeight = activeBreakpoint.value?.rowHeight ?? props.rowHeight;
  if (rowHeight) {
    styles.gridAutoRows = formatSize(rowHeight);
  }

  return styles;
});

const updateContainerWidth = () => {
  if (!rootRef.value) {
    return;
  }
  containerWidth.value = rootRef.value.clientWidth;
};

const stopObserving = () => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (windowResizeHandler && typeof window !== "undefined") {
    window.removeEventListener("resize", windowResizeHandler);
  }
  windowResizeHandler = null;
};

const startObserving = (target: HTMLElement | null) => {
  stopObserving();
  if (!target) {
    return;
  }

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      containerWidth.value = entry?.contentRect.width ?? target.clientWidth;
    });
    resizeObserver.observe(target);
    containerWidth.value = target.clientWidth;
    return;
  }

  if (typeof window !== "undefined") {
    windowResizeHandler = () => updateContainerWidth();
    window.addEventListener("resize", windowResizeHandler);
    updateContainerWidth();
  }
};

watch(
  rootRef,
  (el) => {
    startObserving(el);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  stopObserving();
});

function toTrackTemplate(
  input: FluxGridTracks | undefined,
  options: { axis: FluxGridAxis; min?: TrackSize; max?: TrackSize }
): string | undefined {
  if (input == null) {
    if (options.axis === "columns") {
      return buildAutoTemplate(options.min, options.max);
    }
    return undefined;
  }

  if (typeof input === "number") {
    const min =
      options.axis === "columns" ? formatSize(options.min, "0px") : undefined;
    const max = formatSize(
      options.max,
      options.axis === "columns" ? "1fr" : "auto"
    );
    return min
      ? `repeat(${input}, minmax(${min}, ${max}))`
      : `repeat(${input}, ${max})`;
  }

  if (Array.isArray(input)) {
    return input.map((value) => formatSize(value)).join(" ");
  }

  if (typeof input === "string") {
    return input;
  }

  const auto = input as FluxGridAutoTracks;
  const min = formatSize(
    auto.min ?? options.min,
    options.axis === "columns" ? "12rem" : "8rem"
  );
  const max = formatSize(
    auto.max ?? options.max,
    options.axis === "columns" ? "1fr" : "auto"
  );
  const type = auto.type ?? "auto-fit";
  return `repeat(${type}, minmax(${min}, ${max}))`;
}

function buildAutoTemplate(min?: TrackSize, max?: TrackSize) {
  const resolvedMin = formatSize(min, "12rem");
  const resolvedMax = formatSize(max, "1fr");
  return `repeat(auto-fit, minmax(${resolvedMin}, ${resolvedMax}))`;
}

function formatSize(value?: TrackSize, fallback?: TrackSize): string {
  const target = value ?? fallback;
  if (target == null) {
    return "auto";
  }
  if (typeof target === "number") {
    return `${target}px`;
  }
  return target;
}

function resolveActiveBreakpoint(
  definitions: FluxGridBreakpoint[],
  width?: number
): FluxGridBreakpoint | undefined {
  if (!definitions.length) {
    return undefined;
  }

  if (width == null) {
    return definitions.find(
      (definition) => definition.minWidth == null && definition.maxWidth == null
    );
  }

  const matches = definitions.filter((definition) =>
    matchesWidth(definition, width)
  );
  if (matches.length) {
    return matches[matches.length - 1];
  }

  return definitions.find(
    (definition) => definition.minWidth == null && definition.maxWidth == null
  );
}

function matchesWidth(definition: FluxGridBreakpoint, width: number) {
  const min = resolveBoundary(definition.minWidth);
  const max = resolveBoundary(definition.maxWidth);

  if (min != null && width < min) {
    return false;
  }
  if (max != null && width > max) {
    return false;
  }
  return true;
}

function resolveBoundary(value?: number | string) {
  if (value == null) {
    return undefined;
  }
  if (typeof value === "number") {
    return value;
  }
  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return undefined;
  }
  if (normalized.endsWith("px")) {
    return Number.parseFloat(normalized);
  }
  if (normalized.endsWith("rem") || normalized.endsWith("em")) {
    const factor = getRootFontSize();
    return Number.parseFloat(normalized) * factor;
  }
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : undefined;
}

function getRootFontSize() {
  if (typeof window === "undefined") {
    return 16;
  }
  return (
    Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  );
}
</script>

<template>
  <component
    :is="rootTag"
    class="flux-grid"
    role="grid"
    :style="gridStyles"
    :data-locked="lockedState ? 'true' : undefined"
    :data-breakpoint="activeBreakpoint?.name ?? undefined"
    ref="rootRef"
  >
    <slot />
  </component>
</template>
