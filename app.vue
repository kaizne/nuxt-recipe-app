<template>
  <UContainer v-if="recipe">
    <h1 class="mt-4 font-bold text-xl pt-12">{{ recipe.title }}</h1>
    <div class="flex flex-row gap-1 mt-2">
      <UBadge v-for="label in recipe.dishTypes" :label="label" />
    </div>
    <section class="mt-4 flex flex-col md:flex-row-reverse gap-4 w-full">
      <NuxtImg
        :src="recipe.image"
        :alt="recipe.title"
        class="object-cover w-full"
      />
      <p class="text-lg max-w-d-[40ch]" v-html="recipe.summary" />
    </section>
    <div class="flex flex-col md:flex-row gap-2 md:gap-8">
      <section class="py-2 md:py-8 min-w-52">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <h2 class="text-lg">Ingredients</h2>
        </div>
        <UTable
          class="mt-2"
          :rows="recipe.extendedIngredients"
          :columns="columns"
        >
          <template #name-data="{ row }">
            <span class="flex flex-row gap-2 items-center">
              <NuxtImg
                provider="spoonacular"
                :src="row.image"
                :height="20"
                :width="20"
                :alt="`Image of ${row.name}`"
              />
              {{ row.name }}
              ({{ row.amount }} {{ row.unit }})
            </span>
          </template>
        </UTable>
      </section>
      <section class="py-2 md:py-8">
        <h2 class="text-lg">Instructions</h2>
        <div v-html="recipe.instructions"></div>
      </section>
    </div>
    <UButton> View original recipe on {{ recipe.sourceUrl }} </UButton>
  </UContainer>
</template>

<script setup lang="ts">
import type { InternalApi } from 'nitropack'
const { data: recipe } = await useFetch('/api/recipes', {
  transform: (data) => data[(Math.random() * data.length) | 0],
})

const columnsToShow: Array<
  keyof InternalApi['/api/recipes']['get'][number]['extendedIngredients'][number]
> = ['name']

const columns = columnsToShow.map((col) => ({ key: col, label: col }))

const metric = ref(true)
const unit = computed(() => (metric.value ? 'metric' : 'us'))
</script>
