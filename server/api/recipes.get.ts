import * as z from 'valibot'

const recipeSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.nullish(z.string()),
  readyInMinutes: z.number(),
  servings: z.number(),
  sourceUrl: z.string(),
  summary: z.string(),
  instructions: z.string(),
  extendedIngredients: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      image: z.nullable(z.string()),
      original: z.string(),
      amount: z.number(),
      unit: z.string(),
    })
  ),
})

export default defineCachedEventHandler(
  async (event) => {
    console.log('making fresh recipes request')
    const { recipes } = await $fetch<{ recipes: unknown }>(
      'https://api.spoonacular.com/recipes/random',
      {
        query: {
          limitLicense: true,
          number: 100,
          apiKey: useRuntimeConfig().spoonacular.apiKey,
        },
      }
    )
    try {
      return z.parse(z.array(recipeSchema), recipes)
    } catch (e) {
      console.log(e.issues.map((i) => i.path))
      return []
    }
  },
  {
    base: 'recipes',
    getKey: () => 'recipes',
    shouldBypassCache: () => false,
    maxAge: 10000,
    staleMaxAge: 10000,
  }
)
