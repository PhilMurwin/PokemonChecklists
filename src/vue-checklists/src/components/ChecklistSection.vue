<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      {{ section.title }}
      <template v-slot:actions>
        <v-progress-linear
          :model-value="completionPercentage"
          color="primary"
          height="20"
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
      </template>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-list>
        <v-list-item v-for="(item, index) in section.items" :key="index">
          <v-checkbox
            v-model="completedItems[index]"
            :label="item.text"
            @change="updateStorage"
          ></v-checkbox>
        </v-list-item>
      </v-list>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface ChecklistItem {
  text: string
  [key: string]: any
}

interface Section {
  title: string
  items: ChecklistItem[]
}

interface Props {
  section: Section
  storageKey: string
}

const props = defineProps<Props>()

const completedItems = ref<boolean[]>([])

const completionPercentage = computed(() => {
  if (!props.section.items.length) return 0
  const completed = completedItems.value.filter(item => item).length
  return (completed / props.section.items.length) * 100
})

const updateStorage = () => {
  localStorage.setItem(
    `${props.storageKey}-${props.section.title}`,
    JSON.stringify(completedItems.value)
  )
}

const loadFromStorage = () => {
  const stored = localStorage.getItem(`${props.storageKey}-${props.section.title}`)
  if (stored) {
    completedItems.value = JSON.parse(stored)
  } else {
    completedItems.value = new Array(props.section.items.length).fill(false)
  }
}

onMounted(() => {
  loadFromStorage()
})
</script>