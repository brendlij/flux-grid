# Flux Grid

Flux Grid is a lightweight Vue 3 layout utility that lets you drop arbitrary components, text, or media into a flexible CSS Grid surface. Define fixed tracks, responsive auto-fit columns with custom min/max constraints, or a fully locked canvas where every tile has coordinates—all with a pair of components.

## Features

- 💡 **Single component API** – `FluxGrid` defines the surface, `FluxGridItem` decides placement.
- 📐 **Fixed or dynamic tracks** – Supply numeric counts, explicit templates, or auto-fit/auto-fill objects with custom min/max values.
- 📱 **Responsive by default** – Auto-fit mode stretches or collapses columns at each breakpoint; flip on `locked` to freeze the layout width.
- 🧱 **Explicit coordinates** – Pass `col`/`row` plus `colSpan`/`rowSpan` to build magazine-style grids.
- 🧩 **Drop anything inside** – Slots accept plain text, cards, charts, or entire feature components.
- 🎯 **Drag & drop ready** – Grid items expose `data-grid-*` attributes for future interaction layers.

## Quick start

```bash
bun install
bun dev
```

> Prefer npm or pnpm? Swap `bun` with your favorite package manager—the scripts are standard Vite commands.

## Usage

```vue
<script setup lang="ts">
import { FluxGrid, FluxGridItem } from "flux-grid";

const widgets = [
  { id: "hero", colSpan: 2, rowSpan: 2, title: "Hero" },
  { id: "chart", title: "Chart" },
];
</script>

<template>
  <FluxGrid
    :columns="{ type: 'auto-fit', min: '16rem', max: '1fr' }"
    :gap="24"
    row-height="auto"
  >
    <FluxGridItem
      v-for="widget in widgets"
      :key="widget.id"
      :col-span="widget.colSpan"
      :row-span="widget.rowSpan"
    >
      <WidgetCard :title="widget.title" />
    </FluxGridItem>
  </FluxGrid>
</template>
```

### Locked layout

```vue
<FluxGrid :columns="4" :rows="4" locked :gap="16" :row-height="160">
	<FluxGridItem col="1" row="1" :col-span="2" :row-span="2">
		<HeroModule />
	</FluxGridItem>
	<FluxGridItem col="3" row="1" :col-span="2">
		<ActivityFeed />
	</FluxGridItem>
</FluxGrid>
```

## API reference

### `<FluxGrid />`

| Prop                      | Type                                                                                                                   | Default           | Description                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `columns`                 | `number \| string \| string[] \| { type?: 'auto-fit' \| 'auto-fill'; min?: string \| number; max?: string \| number }` | auto-fit template | Track template for columns. Numbers create equal columns, strings are passed through, objects create minmax auto-fit ranges. |
| `rows`                    | same as `columns`                                                                                                      | `undefined`       | Optional row template. Leave unset to allow implicit rows with `rowHeight`.                                                  |
| `gap`                     | `string \| number`                                                                                                     | `1.25rem`         | Gap between items. Numbers resolve to `px`.                                                                                  |
| `rowHeight`               | `string \| number`                                                                                                     | `undefined`       | Sets `grid-auto-rows` so implicitly created rows share a height.                                                             |
| `columnMin` / `columnMax` | `string \| number`                                                                                                     | `12rem` / `1fr`   | Fallbacks when columns are auto-generated.                                                                                   |
| `rowMin` / `rowMax`       | `string \| number`                                                                                                     | `8rem` / `auto`   | Fallbacks when rows are auto-generated.                                                                                      |
| `locked`                  | `boolean`                                                                                                              | `false`           | When `true`, the grid width is clamped to its content, producing a fixed canvas.                                             |
| `autoFlow`                | `'row' \| 'column' \| 'dense' \| 'row dense' \| 'column dense'`                                                        | `'row dense'`     | Native `grid-auto-flow` passthrough.                                                                                         |
| `tag`                     | `string`                                                                                                               | `'div'`           | Root element tag.                                                                                                            |

### `<FluxGridItem />`

| Prop                 | Type               | Default     | Description                                                            |
| -------------------- | ------------------ | ----------- | ---------------------------------------------------------------------- |
| `col`, `row`         | `number`           | `undefined` | 1-based starting coordinate. Optional—omit for natural auto-placement. |
| `colSpan`, `rowSpan` | `number`           | `1`         | Number of tracks to span. Works with or without explicit coordinates.  |
| `aspectRatio`        | `string \| number` | `undefined` | Sets CSS `aspect-ratio` to reserve space for media.                    |
| `zIndex`             | `number`           | `undefined` | Lift an item above overlapping neighbors.                              |
| `tag`                | `string`           | `'div'`     | Wrapper element tag.                                                   |

Each item also exposes `data-grid-col`, `data-grid-row`, and span attributes so you can layer drag-and-drop or analytics later on.

## Development

- `bun dev` – run the playground showcasing both responsive and locked grids.
- `bun build` – type-check via `vue-tsc` and emit the production bundle.
- `bun preview` – inspect the built assets locally.

## Roadmap

- Drag-and-drop helpers powered by the existing data attributes.
- Serialization utilities for persisting layouts.
- Storybook-driven docs site.
