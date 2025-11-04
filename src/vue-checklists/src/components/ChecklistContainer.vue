<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ title }}</h1>
        <v-text-field
          v-model="search"
          label="Filter items"
          clearable
        />
      </v-col>

      <v-col cols="12" v-if="loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>

      <v-col cols="12" v-else>
        <ChecklistSection
          v-for="(section, idx) in filteredSections"
          :key="idx"
          :section="section"
          :storageKey="storageKey"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ChecklistSection from './ChecklistSection.vue'

const props = defineProps<{
  dataUrl?: string
  storageKey?: string
  title?: string
}>()

// Use Vite's BASE_URL so requests point to the built app base (works when
// the app is deployed to a subpath). If the consumer passes an explicit
// dataUrl prop, use that instead.
const dataUrl = props.dataUrl ?? `${import.meta.env.BASE_URL}data/menu.json`
const storageKey = props.storageKey ?? 'pokemon-checklist'
const title = props.title ?? 'Checklist'

const loading = ref(true)
const sections = ref<any[]>([])
const search = ref('')

const loadData = async () => {
  try {
    const res = await axios.get(dataUrl)
    // Expect data structure: { sections: [ { title, items: [...] } ] } or array
    if (Array.isArray(res.data)) {
      sections.value = res.data
    } else if (res.data.sections) {
      sections.value = res.data.sections
    } else {
      // Handle files that export an object containing named arrays, e.g. { sv: [ ... ] }
      // Convert each top-level array into a section so our ChecklistSection component
      // can render it. Fall back to wrapping the whole object if no arrays found.
      const obj = res.data
      const keysWithArrays = Object.keys(obj).filter(k => Array.isArray(obj[k]))
      if (keysWithArrays.length > 0) {
        sections.value = keysWithArrays.map(k => ({
          title: k,
          items: obj[k].map((entry: any) => ({ text: entry.task || entry.title || JSON.stringify(entry), raw: entry }))
        }))
      } else {
        sections.value = [res.data]
      }
    }
  } catch (e) {
    console.error('Failed to load checklist data', e)
    sections.value = []
  } finally {
    loading.value = false
  }
}

const filteredSections = computed(() => {
  if (!search.value) return sections.value
  const q = search.value.toLowerCase()
  return sections.value.map((s) => {
    const items = s.items.filter((it: any) => (it.text || '').toLowerCase().includes(q))
    return { ...s, items }
  }).filter((s) => s.items.length > 0)
})

onMounted(() => {
  loadData()
})
</script>
