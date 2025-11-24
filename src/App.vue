<script setup lang="ts">
import { FluxGrid, FluxGridItem } from './lib'

type ResponsiveCard = {
  id: string
  title: string
  body: string
  badge?: string
  colSpan?: number
  rowSpan?: number
  accent: string
}

type LockedTile = {
  id: string
  title: string
  col: number
  row: number
  colSpan: number
  rowSpan: number
  accent: string
}

const responsiveCards: ResponsiveCard[] = [
  {
    id: 'analytics',
    title: 'Analytics Pulse',
    body: 'Live conversion, revenue and retention trends that stretch to fill the available space.',
    badge: 'Live',
    colSpan: 2,
    rowSpan: 2,
    accent: 'var(--flux-mint)'
  },
  {
    id: 'sessions',
    title: 'Active Sessions',
    body: '2,451 visitors online',
    accent: 'var(--flux-blue)'
  },
  {
    id: 'alerts',
    title: 'Automation Alerts',
    body: '3 sequences paused · Review to resume',
    accent: 'var(--flux-amber)'
  },
  {
    id: 'forecast',
    title: 'Revenue Forecast',
    body: 'Projected $184k MRR next quarter.',
    colSpan: 2,
    accent: 'var(--flux-purple)'
  },
  {
    id: 'latency',
    title: 'Network Latency',
    body: 'p95 132ms · 2 regions degraded',
    accent: 'var(--flux-pink)'
  }
]

const lockedTiles: LockedTile[] = [
  {
    id: 'hero',
    title: 'Hero spotlight',
    col: 1,
    row: 1,
    colSpan: 2,
    rowSpan: 2,
    accent: 'var(--flux-mint)'
  },
  {
    id: 'feed',
    title: 'Team feed',
    col: 3,
    row: 1,
    colSpan: 2,
    rowSpan: 1,
    accent: 'var(--flux-blue)'
  },
  {
    id: 'map',
    title: 'Geo heatmap',
    col: 3,
    row: 2,
    colSpan: 2,
    rowSpan: 2,
    accent: 'var(--flux-amber)'
  },
  {
    id: 'tasks',
    title: 'Pinned tasks',
    col: 1,
    row: 3,
    colSpan: 1,
    rowSpan: 2,
    accent: 'var(--flux-purple)'
  },
  {
    id: 'notes',
    title: 'Quick notes',
    col: 2,
    row: 3,
    colSpan: 1,
    rowSpan: 2,
    accent: 'var(--flux-pink)'
  }
]
</script>

<template>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">Flux Grid</p>
      <h1>Drop anything into a deliberate, responsive grid.</h1>
      <p>
        Compose dashboards, marketing layouts, or product configurators with a single flexible
        component. Define fixed tracks, auto-fit columns, or a fully locked canvas in the same API.
      </p>
    </header>

    <section class="panel">
      <div class="panel__header">
        <div>
          <p class="eyebrow">Responsive mode</p>
          <h2>Auto-fit columns with optional spans</h2>
        </div>
        <p>Resize the viewport to see the grid reflow while respecting each card span.</p>
      </div>

      <FluxGrid :columns="{ type: 'auto-fit', min: '14rem', max: '1fr' }" :gap="20" row-height="auto">
        <FluxGridItem
          v-for="card in responsiveCards"
          :key="card.id"
          :col-span="card.colSpan"
          :row-span="card.rowSpan"
        >
          <article class="card" :style="{ borderColor: card.accent }">
            <p v-if="card.badge" class="card__badge">{{ card.badge }}</p>
            <h3>{{ card.title }}</h3>
            <p>{{ card.body }}</p>
          </article>
        </FluxGridItem>
      </FluxGrid>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <p class="eyebrow">Locked mode</p>
          <h2>Explicit placement across a fixed 4 × 4 grid</h2>
        </div>
        <p>Declare coordinates per item to build magazine-style compositions.</p>
      </div>

      <FluxGrid :columns="4" :rows="4" locked :gap="16" :row-height="160">
        <FluxGridItem
          v-for="tile in lockedTiles"
          :key="tile.id"
          :col="tile.col"
          :row="tile.row"
          :col-span="tile.colSpan"
          :row-span="tile.rowSpan"
        >
          <article class="card card--locked" :style="{ borderColor: tile.accent }">
            <h3>{{ tile.title }}</h3>
            <p>({{ tile.col }}, {{ tile.row }}) · spans {{ tile.colSpan }} × {{ tile.rowSpan }}</p>
          </article>
        </FluxGridItem>
      </FluxGrid>
    </section>
  </main>
</template>
