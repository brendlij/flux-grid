<script setup lang="ts">
import { ref } from "vue";
import { FluxGrid, FluxGridItem, PingCard } from "./lib";
import type { FluxGridBreakpoint } from "./lib";

type ResponsiveCard = {
  id: string;
  title: string;
  body: string;
  badge?: string;
  colSpan?: number;
  rowSpan?: number;
  accent: string;
};

type LockedTile = {
  id: string;
  title: string;
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
  accent: string;
};

const previewWidth = ref(960);

const responsiveBreakpoints: FluxGridBreakpoint[] = [
  { name: "Stacked", columns: 1, gap: "1rem" },
  { name: "Tablet", minWidth: 640, columns: 2, gap: "1.25rem" },
  { name: "Desktop", minWidth: 960, columns: 3, gap: "1.35rem" },
  {
    name: "Wide",
    minWidth: 1280,
    columns: { type: "auto-fit", min: "16rem", max: "1fr" },
    gap: "1.75rem",
  },
];

type PingUser = {
  name: string;
  email: string;
  status: "online" | "away" | "offline";
};

const pingUsers: PingUser[] = [
  { name: "Alice Chen", email: "alice@company.com", status: "online" },
  { name: "Bob Smith", email: "bob@company.com", status: "away" },
  { name: "Carol Davis", email: "carol@company.com", status: "online" },
  { name: "Dan Wilson", email: "dan@company.com", status: "offline" },
  { name: "Eve Johnson", email: "eve@company.com", status: "online" },
  { name: "Frank Lee", email: "frank@company.com", status: "offline" },
];

const responsiveCards: ResponsiveCard[] = [
  {
    id: "analytics",
    title: "Analytics Pulse",
    body: "Live conversion, revenue and retention trends that stretch to fill the available space.",
    badge: "Live",
    colSpan: 2,
    rowSpan: 2,
    accent: "var(--flux-mint)",
  },
  {
    id: "sessions",
    title: "Active Sessions",
    body: "2,451 visitors online",
    accent: "var(--flux-blue)",
  },
  {
    id: "alerts",
    title: "Automation Alerts",
    body: "3 sequences paused · Review to resume",
    accent: "var(--flux-amber)",
  },
  {
    id: "forecast",
    title: "Revenue Forecast",
    body: "Projected $184k MRR next quarter.",
    colSpan: 2,
    accent: "var(--flux-purple)",
  },
  {
    id: "latency",
    title: "Network Latency",
    body: "p95 132ms · 2 regions degraded",
    accent: "var(--flux-pink)",
  },
];

const lockedTiles: LockedTile[] = [
  {
    id: "hero",
    title: "Hero spotlight",
    col: 1,
    row: 1,
    colSpan: 2,
    rowSpan: 2,
    accent: "var(--flux-mint)",
  },
  {
    id: "feed",
    title: "Team feed",
    col: 3,
    row: 1,
    colSpan: 2,
    rowSpan: 1,
    accent: "var(--flux-blue)",
  },
  {
    id: "map",
    title: "Geo heatmap",
    col: 3,
    row: 2,
    colSpan: 2,
    rowSpan: 2,
    accent: "var(--flux-amber)",
  },
  {
    id: "tasks",
    title: "Pinned tasks",
    col: 1,
    row: 3,
    colSpan: 1,
    rowSpan: 2,
    accent: "var(--flux-purple)",
  },
  {
    id: "notes",
    title: "Quick notes",
    col: 2,
    row: 3,
    colSpan: 1,
    rowSpan: 2,
    accent: "var(--flux-pink)",
  },
];
</script>

<template>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">Flux Grid</p>
      <h1>Drop anything into a deliberate, responsive grid.</h1>
      <p>
        Compose dashboards, marketing layouts, or product configurators with a
        single flexible component. Define fixed tracks, auto-fit columns, or a
        fully locked canvas in the same API.
      </p>
    </header>

    <section class="panel">
      <div class="panel__header">
        <div>
          <p class="eyebrow">Responsive mode</p>
          <h2>Breakpoint-driven columns & gap</h2>
        </div>
        <p>
          Flux Grid now lets you declare min/max widths that tweak tracks, gaps,
          and row heights.
        </p>
      </div>

      <div class="panel__controls">
        <label class="range-control">
          <span>Preview width · {{ previewWidth }}px</span>
          <input
            v-model.number="previewWidth"
            type="range"
            min="360"
            max="1400"
            step="20"
          />
        </label>
        <p class="panel__controls-hint">
          Drag the slider (or resize the window) to see how the grid responds to
          its container width.
        </p>
      </div>

      <div class="breakpoint-demo">
        <div
          class="breakpoint-demo__viewport"
          :style="{ maxWidth: `${previewWidth}px` }"
        >
          <FluxGrid :breakpoints="responsiveBreakpoints" row-height="auto">
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
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <p class="eyebrow">Locked mode</p>
          <h2>Explicit placement across a fixed 4 × 4 grid</h2>
        </div>
        <p>
          Declare coordinates per item to build magazine-style compositions.
        </p>
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
          <article
            class="card card--locked"
            :style="{ borderColor: tile.accent }"
          >
            <h3>{{ tile.title }}</h3>
            <p>
              ({{ tile.col }}, {{ tile.row }}) · spans {{ tile.colSpan }} ×
              {{ tile.rowSpan }}
            </p>
          </article>
        </FluxGridItem>
      </FluxGrid>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <p class="eyebrow">Self-contained cards</p>
          <h2>FluxCard with auto-sizing & slot system</h2>
        </div>
        <p>
          Cards fill their grid cells and handle overflow safely. All sizing is
          automatic.
        </p>
      </div>

      <FluxGrid
        :columns="{ type: 'auto-fit', min: '280px', max: '1fr' }"
        :gap="20"
        row-height="auto"
      >
        <!-- Image card with aspect ratio -->
        <FluxGridItem aspect-ratio="16/9" padding="0">
          <div style="display: flex; flex-direction: column; height: 100%">
            <div
              style="
                padding: 1rem 1rem 0;
                color: var(--flux-text-muted);
                font-size: 0.85rem;
                text-transform: uppercase;
              "
            >
              Gallery
            </div>
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
              alt="Mountain"
              class="flux-cover"
              style="flex: 1; object-fit: cover"
            />
            <div style="padding: 0 1rem 1rem">
              <p
                style="
                  margin: 0.5rem 0 0;
                  color: var(--flux-text-muted);
                  font-size: 0.85rem;
                "
              >
                Beautiful mountain view
              </p>
            </div>
          </div>
        </FluxGridItem>

        <!-- Stat card -->
        <FluxGridItem padding="1.5rem" align="center">
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
            "
          >
            <p
              style="
                margin: 0;
                color: var(--flux-text-muted);
                font-size: 0.9rem;
              "
            >
              Total Revenue
            </p>
            <div
              style="
                font-size: 2.5rem;
                font-weight: bold;
                color: var(--flux-mint);
              "
            >
              $48.2K
            </div>
            <p
              style="
                margin: 0;
                font-size: 0.85rem;
                color: var(--flux-text-muted);
              "
            >
              +12% from last month
            </p>
          </div>
        </FluxGridItem>

        <!-- List card with truncation -->
        <FluxGridItem :row-span="2">
          <div style="display: flex; flex-direction: column; height: 100%">
            <h3 style="margin: 0 0 1rem; font-size: 1.1rem">Recent Activity</h3>
            <div
              style="
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                flex: 1;
                overflow-y: auto;
              "
            >
              <div
                v-for="i in 5"
                :key="i"
                style="
                  padding-bottom: 0.75rem;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                "
              >
                <p style="margin: 0; font-size: 0.9rem">
                  <strong>User {{ i }}</strong> updated settings
                </p>
                <p
                  class="flux-truncate"
                  style="
                    margin: 0.25rem 0 0;
                    font-size: 0.8rem;
                    color: var(--flux-text-muted);
                  "
                >
                  Changed notification preferences and added new team members
                </p>
              </div>
            </div>
          </div>
        </FluxGridItem>

        <!-- Content card with safe overflow -->
        <FluxGridItem>
          <div>
            <h3 style="margin: 0 0 0.75rem; font-size: 1rem">Description</h3>
            <p
              style="
                margin: 0;
                color: var(--flux-text-muted);
                font-size: 0.9rem;
                line-height: 1.5;
              "
            >
              Items automatically fill their grid cells. Content respects
              padding and overflow is hidden safely.
            </p>
          </div>
        </FluxGridItem>
      </FluxGrid>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <p class="eyebrow">Custom components</p>
          <h2>Just provide content - layout is automatic</h2>
        </div>
        <p>
          PingCard is an example: drop it in FluxGridItem, layout is handled
          automatically.
        </p>
      </div>

      <FluxGrid
        :columns="{ type: 'auto-fit', min: '280px', max: '1fr' }"
        :gap="20"
        row-height="auto"
      >
        <FluxGridItem v-for="user in pingUsers" :key="user.name">
          <PingCard
            :name="user.name"
            :email="user.email"
            :status="user.status"
            avatar="true"
          />
        </FluxGridItem>
      </FluxGrid>
    </section>
  </main>
</template>
