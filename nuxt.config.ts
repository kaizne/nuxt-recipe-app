// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    spoonacular: {
      apiKey: '',
    },
  },

  $development: {
    nitro: {
      storage: {
        recipes: {
          driver: 'fs',
          base: 'recipes',
        },
      },
    },
  },

  image: {
    providers: {
      spoonacular: {
        provider: '~/providers/spoonacular.ts',
      },
    },
  },

  modules: ['@nuxt/ui', '@nuxt/image'],
})
