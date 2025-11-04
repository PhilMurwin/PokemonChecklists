<script setup lang="ts">
import ChecklistContainer from './components/ChecklistContainer.vue'

// Compute a data URL relative to the built app base. At runtime
// import.meta.env.BASE_URL reflects the Vite `base` option (or the
// --base CLI flag), so the app will request data from the correct
// subpath when hosted under IIS at /pkmnpostgame.
const dataUrl = `${import.meta.env.BASE_URL}data/sv_postgame_checklist.json`
const storageKey = 'sv-checklist'
const title = 'Scarlet & Violet Checklist'
</script>

<template>
  <div>
    <ChecklistContainer :dataUrl="dataUrl" :storageKey="storageKey" :title="title" />
  </div>
</template>

<style scoped>
/* minimal local styles; main styling comes from Vuetify */
div { padding: 1rem; }
</style>
