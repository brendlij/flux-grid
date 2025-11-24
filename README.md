# Flux Grid

Flux Grid is a lightweight Vue 3 layout utility that lets you drop arbitrary components, text, or media into a flexible CSS Grid surface. Define fixed tracks, responsive auto-fit columns with custom min/max constraints, or a fully locked canvas where every tile has coordinates—all with a pair of components.

## Features

- 💡 **Single component API** – `FluxGrid` defines the surface, `FluxGridItem` decides placement.
- 📐 **Fixed or dynamic tracks** – Supply numeric counts, explicit templates, or auto-fit/auto-fill objects with custom min/max values.
- 📱 **Responsive by default** – Auto-fit mode stretches or collapses columns at each breakpoint; flip on `locked` to freeze the layout width.
- 🪄 **Breakpoint presets** – Declare container width ranges that retune columns, gaps, and row heights without writing media queries.
- 🧱 **Explicit coordinates** – Pass `col`/`row` plus `colSpan`/`rowSpan` to build magazine-style grids.
- 📦 **Self-contained cards** – `FluxCard` component with auto-sizing, slot system, and safe overflow handling.
- 🧩 **Drop anything inside** – Slots accept plain text, cards, charts, or entire feature components.
- 🎯 **Drag & drop ready** – Grid items expose `data-grid-*` attributes for future interaction layers.

## Quick start

```bash
bun install
bun dev
```

## Usage

```vue
<script setup lang="ts">
import { FluxGrid, FluxGridItem } from "flux-grid";

const dashboardBreakpoints = [
  { name: "stacked", columns: 1, gap: "1rem" },
  { name: "tablet", minWidth: 640, columns: 2, gap: "1.25rem" },
  { name: "desktop", minWidth: 1024, columns: 3, gap: "1.5rem" },
  {
    name: "wide",
    minWidth: 1280,
    columns: { type: "auto-fit", min: "16rem", max: "1fr" },
  },
];

const widgets = [
  { id: "hero", colSpan: 2, rowSpan: 2, title: "Hero" },
  { id: "chart", title: "Chart" },
];
</script>

<template>
  <FluxGrid :breakpoints="dashboardBreakpoints" row-height="auto">
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

### Simple card grid (auto-fit)

```vue
<script setup lang="ts">
import { FluxGrid, FluxGridItem } from "flux-grid";

const cards = [
  { id: 1, title: "Card A" },
  { id: 2, title: "Card B" },
  { id: 3, title: "Card C" },
];
</script>

<template>
  <!-- Auto-fit columns that collapse on small screens -->
  <FluxGrid :columns="{ type: 'auto-fit', min: '250px', max: '1fr' }" :gap="16">
    <FluxGridItem v-for="card in cards" :key="card.id">
      <div class="card">{{ card.title }}</div>
    </FluxGridItem>
  </FluxGrid>
</template>
```

### Fixed 12-column grid (like Bootstrap)

```vue
<!-- Define 12 equal columns with explicit placement -->
<FluxGrid :columns="12" :gap="20" locked>
  <FluxGridItem col="1" :col-span="8">
    <MainContent />
  </FluxGridItem>
  <FluxGridItem col="9" :col-span="4">
    <Sidebar />
  </FluxGridItem>
</FluxGrid>
```

### Aspect ratio preservation

```vue
<!-- Perfect for image galleries or video previews -->
<FluxGrid :columns="{ type: 'auto-fit', min: '200px', max: '1fr' }" :gap="12">
  <FluxGridItem
    v-for="item in items"
    :key="item.id"
    aspect-ratio="16/9"
  >
    <img :src="item.src" alt="" />
  </FluxGridItem>
</FluxGrid>
```

### Mixed sizes with breakpoints

```vue
<script setup lang="ts">
import { FluxGrid, FluxGridItem } from "flux-grid";

const photoBreakpoints = [
  { columns: 1, gap: "1rem" },
  { minWidth: 640, columns: 2, gap: "1.25rem" },
  { minWidth: 1024, columns: 3, gap: "1.5rem" },
  { minWidth: 1440, columns: 4, gap: "2rem" },
];

const photos = Array.from({ length: 12 }, (_, i) => ({ id: i }));
</script>

<template>
  <FluxGrid :breakpoints="photoBreakpoints" :gap="16">
    <FluxGridItem
      v-for="(photo, idx) in photos"
      :key="photo.id"
      :col-span="idx === 0 ? 2 : 1"
      :row-span="idx === 0 ? 2 : 1"
    >
      <img :src="`/photo-${idx}.jpg`" alt="" />
    </FluxGridItem>
  </FluxGrid>
</template>
```

### Dashboard with hero and widgets

```vue
<script setup lang="ts">
import { FluxGrid, FluxGridItem } from "flux-grid";

const dashboardBreakpoints = [
  { columns: 1, gap: "1rem", rowHeight: "200px" },
  { minWidth: 768, columns: 2, gap: "1.25rem", rowHeight: "240px" },
  { minWidth: 1200, columns: 4, gap: "1.5rem", rowHeight: "200px" },
];
</script>

<template>
  <FluxGrid :breakpoints="dashboardBreakpoints">
    <!-- Hero spans full width on mobile, 2 cols on tablet, 2 cols on desktop -->
    <FluxGridItem :col-span="1" :row-span="1">
      <HeroCard />
    </FluxGridItem>

    <!-- Widgets fill remaining space -->
    <FluxGridItem v-for="i in 5" :key="i">
      <MetricWidget :index="i" />
    </FluxGridItem>
  </FluxGrid>
</template>
```

### Using custom CSS for styling

```vue
<script setup lang="ts">
import { FluxGrid, FluxGridItem } from "flux-grid";
import "flux-grid/style.css";
</script>

<template>
  <FluxGrid :columns="3" :gap="20" class="my-grid">
    <FluxGridItem v-for="i in 9" :key="i" class="grid-card">
      <div>Card {{ i }}</div>
    </FluxGridItem>
  </FluxGrid>
</template>

<style scoped>
/* Override grid gap with CSS custom properties */
:deep(.my-grid) {
  --flux-grid-gap: 24px;
}

/* Style individual items */
:deep(.grid-card) {
  --flux-grid-item-bg: rgba(100, 150, 200, 0.1);
  --flux-grid-item-radius: 12px;
}
</style>
```

## API reference

### `<FluxGrid />`

| Prop                      | Type                                                                                                                   | Default           | Description                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columns`                 | `number \| string \| string[] \| { type?: 'auto-fit' \| 'auto-fill'; min?: string \| number; max?: string \| number }` | auto-fit template | Track template for columns. Numbers create equal columns, strings are passed through, objects create minmax auto-fit ranges.                                    |
| `rows`                    | same as `columns`                                                                                                      | `undefined`       | Optional row template. Leave unset to allow implicit rows with `rowHeight`.                                                                                     |
| `gap`                     | `string \| number`                                                                                                     | `1.25rem`         | Gap between items. Numbers resolve to `px`.                                                                                                                     |
| `rowHeight`               | `string \| number`                                                                                                     | `undefined`       | Sets `grid-auto-rows` so implicitly created rows share a height.                                                                                                |
| `columnMin` / `columnMax` | `string \| number`                                                                                                     | `12rem` / `1fr`   | Fallbacks when columns are auto-generated.                                                                                                                      |
| `rowMin` / `rowMax`       | `string \| number`                                                                                                     | `8rem` / `auto`   | Fallbacks when rows are auto-generated.                                                                                                                         |
| `locked`                  | `boolean`                                                                                                              | `false`           | When `true`, the grid width is clamped to its content, producing a fixed canvas.                                                                                |
| `autoFlow`                | `'row' \| 'column' \| 'dense' \| 'row dense' \| 'column dense'`                                                        | `'row dense'`     | Native `grid-auto-flow` passthrough.                                                                                                                            |
| `breakpoints`             | `FluxGridBreakpoint[]`                                                                                                 | `[]`              | Ordered list of container-width presets that override any of the props above. Each entry accepts `minWidth`/`maxWidth` plus `columns`, `gap`, `rowHeight`, etc. |
| `tag`                     | `string`                                                                                                               | `'div'`           | Root element tag.                                                                                                                                               |

`FluxGridBreakpoint` mirrors the main layout props and adds optional `name`, `minWidth`, and `maxWidth` fields (numbers are treated as `px`, or pass CSS lengths with `px`, `rem`, or `em`). Breakpoints are evaluated against the grid's container width (powered by `ResizeObserver`), so you can preview responsive states inside design systems, docs, or Storybook without resizing the entire browser. The component exposes a `data-breakpoint` attribute reflecting the active breakpoint's `name` to help style or debug demos.

### `<FluxGridItem />`

| Prop                 | Type               | Default     | Description                                                            |
| -------------------- | ------------------ | ----------- | ---------------------------------------------------------------------- |
| `col`, `row`         | `number`           | `undefined` | 1-based starting coordinate. Optional—omit for natural auto-placement. |
| `colSpan`, `rowSpan` | `number`           | `1`         | Number of tracks to span. Works with or without explicit coordinates.  |
| `aspectRatio`        | `string \| number` | `undefined` | Sets CSS `aspect-ratio` to reserve space for media.                    |
| `zIndex`             | `number`           | `undefined` | Lift an item above overlapping neighbors.                              |
| `tag`                | `string`           | `'div'`     | Wrapper element tag.                                                   |

Each item also exposes `data-grid-col`, `data-grid-row`, and span attributes so you can layer drag-and-drop or analytics later on.

### `<FluxCard />`

Self-contained card component with auto-sizing, overflow safety, and a three-slot structure (header, body, footer).

| Prop          | Type                                        | Default     | Description                                                                            |
| ------------- | ------------------------------------------- | ----------- | -------------------------------------------------------------------------------------- |
| `aspectRatio` | `string \| number`                          | `undefined` | CSS aspect-ratio value (e.g., `"16/9"`, `1.5`). Maintains ratio regardless of content. |
| `overflow`    | `'hidden' \| 'auto' \| 'visible'`           | `'hidden'`  | How to handle content overflow. `'hidden'` prevents layout breaking.                   |
| `padding`     | `string \| number`                          | `'1rem'`    | Internal padding. Numbers resolve to `px`.                                             |
| `align`       | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'`   | Vertical alignment of content within the card.                                         |
| `tag`         | `string`                                    | `'div'`     | Root HTML element tag.                                                                 |
| `class`       | `string`                                    | `undefined` | Additional CSS classes for custom styling.                                             |

**Slots:**

- `default` (body) – Primary content. Flexes to fill available space with `flex: 1`.
- `header` – Optional header area. Useful for titles or badges.
- `footer` – Optional footer area. Useful for actions or metadata.

**Example:**

```vue
<FluxCard aspect-ratio="16/9" padding="1rem">
  <template #header>
    <h3>Card Title</h3>
  </template>
  
  <img src="image.jpg" alt="" class="flux-cover" />
  
  <template #footer>
    <p>Card footer text</p>
  </template>
</FluxCard>
```

## Utility Classes

Flux Grid ships with CSS utility classes for safe content handling:

| Class                   | Purpose                                                                     |
| ----------------------- | --------------------------------------------------------------------------- |
| `.flux-truncate`        | Single-line text overflow with ellipsis.                                    |
| `.flux-truncate-lines`  | Multi-line text truncation (use `--flux-truncate-lines` to set line count). |
| `.flux-overflow-hidden` | Hide overflow without ellipsis.                                             |
| `.flux-cover`           | Image scaling (CSS `object-fit: cover`).                                    |
| `.flux-contain`         | Image scaling (CSS `object-fit: contain`).                                  |

**Example:**

```vue
<!-- Truncate long text -->
<p class="flux-truncate">Very long text that will be cut off...</p>

<!-- Multi-line truncation -->
<p class="flux-truncate-lines" style="--flux-truncate-lines: 3;">
  Text limited to 3 lines...
</p>

<!-- Safe image display -->
<img src="photo.jpg" alt="" class="flux-cover" />
```

## CSS Customization

Flux Grid exposes CSS custom properties for theming:

```css
/* Grid container */
--flux-grid-gap: 1.25rem; /* Gap between items */

/* Grid items */
--flux-grid-item-bg: transparent; /* Background color */
--flux-grid-item-radius: 0.75rem; /* Border radius */
```

Override these in your component or globally:

```css
:root {
  --flux-grid-gap: 2rem;
  --flux-grid-item-bg: #f5f5f5;
  --flux-grid-item-radius: 1rem;
}
```

## Tips & Patterns

### Responsive without breakpoints

Use `auto-fit` or `auto-fill` to let CSS Grid handle responsiveness naturally:

```vue
<FluxGrid :columns="{ type: 'auto-fit', min: '16rem', max: '1fr' }">
  <!-- Automatically wraps at viewport size -->
</FluxGrid>
```

### Combining locked items with flexible layout

Mix explicit placement with auto-flow:

```vue
<FluxGrid :columns="4" :gap="16">
  <!-- Explicitly placed hero -->
  <FluxGridItem col="1" :col-span="2" :row-span="2">
    <Hero />
  </FluxGridItem>
  
  <!-- Remaining items flow naturally -->
  <FluxGridItem v-for="item in rest" :key="item.id">
    <Card :item="item" />
  </FluxGridItem>
</FluxGrid>
```

### Reordering on mobile with breakpoints

Adjust `colSpan` and `rowSpan` per breakpoint:

```vue
<script setup lang="ts">
const breakpoints = [
  {
    name: "mobile",
    columns: 1,
    gap: "1rem",
  },
  {
    name: "desktop",
    minWidth: 1024,
    columns: 2,
    gap: "2rem",
  },
];
</script>

<template>
  <FluxGrid :breakpoints="breakpoints">
    <!-- Each item can have different appearance per breakpoint -->
    <FluxGridItem col-span="1" row-span="1">
      <Header />
    </FluxGridItem>
  </FluxGrid>
</template>
```

### Masonry-like layout

Use `column-dense` auto-flow to pack items tightly:

```vue
<FluxGrid
  :columns="{ type: 'auto-fit', min: '200px', max: '1fr' }"
  :gap="16"
  auto-flow="column dense"
>
  <!-- Items fill rows left-to-right, then columns top-to-bottom -->
</FluxGrid>
```

### Building custom card components with FluxCard

The ideal pattern: Create domain-specific components that wrap `FluxCard` internally. The card handles all layout concerns, your component provides content.

**PingCard.vue (example custom component):**

```vue
<script setup lang="ts">
import FluxCard from "flux-grid";

export interface PingCardProps {
  name: string;
  email: string;
  status?: "online" | "away" | "offline";
}

defineProps<PingCardProps>();
</script>

<template>
  <FluxCard padding="1rem">
    <template #header>
      <h4 style="margin: 0; font-size: 0.95rem;">{{ name }}</h4>
    </template>
    <div>
      <p style="margin: 0; font-size: 0.85rem; color: var(--flux-text-muted);">
        {{ email }}
      </p>
      <div
        style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--flux-text-muted);"
      >
        {{ status }}
      </div>
    </div>
  </FluxCard>
</template>
```

**Usage in grid:**

```vue
<script setup lang="ts">
import { FluxGrid, FluxGridItem } from "flux-grid";
import PingCard from "@/components/PingCard.vue";

const users = [
  { name: "Alice", email: "alice@company.com", status: "online" },
  { name: "Bob", email: "bob@company.com", status: "away" },
];
</script>

<template>
  <FluxGrid :columns="{ type: 'auto-fit', min: '280px', max: '1fr' }" :gap="20">
    <FluxGridItem v-for="user in users" :key="user.name">
      <PingCard :name="user.name" :email="user.email" :status="user.status" />
    </FluxGridItem>
  </FluxGrid>
</template>
```

**Benefits of this pattern:**

- ✅ FluxCard handles height, overflow, padding, and slot structure
- ✅ Your component (PingCard) only worries about content and styling
- ✅ Grid automatically sizes everything—no layout logic in custom components
- ✅ Easy to create many domain-specific cards (UserCard, StatsCard, ChartCard, etc.)
- ✅ Reusable across projects

## Development

- `bun dev` – run the playground showcasing both responsive and locked grids.
- `bun build` – type-check via `vue-tsc` and emit the production bundle.
- `bun preview` – inspect the built assets locally.

## Roadmap

- **Drag-and-drop helpers** – Vue 3 composables to easily reorder items using the existing `data-grid-*` attributes.
- **Serialization utilities** – Save and restore grid layouts as JSON (useful for dashboards and dashboards).
- **Storybook docs site** – Interactive examples and design system integration.
- **Layout presets** – Pre-configured templates (dashboard, masonry, card grid, etc.).
- **Container queries** – Enhanced responsive behavior with `@container` queries.
- **Error boundaries** – Better console warnings for invalid slot content or prop misuse.

## License

MIT © [brendlij](https://github.com/brendlij)
