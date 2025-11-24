<script setup lang="ts">
import { FluxGrid, FluxGridItem } from "./lib";
import SimpleCard from "./components/SimpleCard.vue";

const items = [
  { id: 1, title: "Card 1", color: "#6366f1" },
  { id: 2, title: "Card 2", color: "#8b5cf6" },
  { id: 3, title: "Card 3", color: "#d946ef" },
  { id: 4, title: "Card 4", color: "#ec4899" },
  { id: 5, title: "Card 5", color: "#f43f5e" },
  { id: 6, title: "Card 6", color: "#f97316" },
];
</script>

<template>
  <main class="page">
    <header class="hero">
      <h1>Flux Grid Demo</h1>
      <p>
        Just drop your content into FluxGridItem. Sizing, spacing, and overflow
        are handled automatically.
      </p>
    </header>

    <section class="panel">
      <h2>Responsive Auto-Fit Grid</h2>
      <p>
        Each item fills its space. No size management needed in your content.
      </p>

      <FluxGrid
        :columns="{ type: 'auto-fit', min: '200px', max: '1fr' }"
        :gap="0"
      >
        <!-- First card: Simple colored card component -->
        <FluxGridItem class="gitem" padding="1.5rem">
          <SimpleCard :color="'red'" />
        </FluxGridItem>

        <!-- Rest of the cards with inline content -->
        <FluxGridItem
          class="gitem"
          v-for="item in items.slice(1)"
          :key="item.id"
          padding="1.5rem"
        >
          <div style="display: flex; flex-direction: column; gap: 1rem">
            <div
              style="
                width: 100%;
                height: 80px;
                background: v-bind('item.color');
                border-radius: 8px;
                opacity: 0.8;
              "
            />
            <h3 style="margin: 0; font-size: 1rem">{{ item.title }}</h3>
            <p
              style="
                margin: 0;
                color: var(--flux-text-muted);
                font-size: 0.9rem;
              "
            >
              Your content just works. Sizing is automatic.
            </p>
          </div>
        </FluxGridItem>
      </FluxGrid>
    </section>
  </main>
</template>

<style scoped>
.gitem {
  border: 1px solid red;
}

.page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  margin-bottom: 3rem;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
  font-weight: 700;
}

.hero p {
  margin: 0;
  color: var(--flux-text-muted);
  font-size: 1.1rem;
}

.panel {
  margin-bottom: 2rem;
}

.panel h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
}

.panel > p {
  margin: 0 0 1.5rem;
  color: var(--flux-text-muted);
}
</style>
