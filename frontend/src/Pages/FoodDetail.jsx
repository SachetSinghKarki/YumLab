import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const nonVegWords = [
  'chicken',
  'beef',
  'pork',
  'lamb',
  'goat',
  'fish',
  'seafood',
  'salmon',
  'tuna',
  'prawn',
  'shrimp',
  'duck',
  'turkey',
  'bacon',
  'ham',
  'meat',
]

const getIngredients = (recipe) =>
  Array.from({ length: 20 }, (_, index) => {
    const position = index + 1
    const ingredient = recipe[`strIngredient${position}`]?.trim()
    const measure = recipe[`strMeasure${position}`]?.trim()

    if (!ingredient) return null

    return {
      ingredient,
      measure,
    }
  }).filter(Boolean)

const getYoutubeEmbedUrl = (youtubeUrl) => {
  if (!youtubeUrl) return ''

  try {
    const url = new URL(youtubeUrl)
    const videoId = url.hostname.includes('youtu.be')
      ? url.pathname.slice(1)
      : url.searchParams.get('v')

    return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
  } catch {
    return ''
  }
}

const getInstructionSteps = (instructions = '') => {
  const cleanLines = instructions
    .replace(/\r/g, '')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^(step\s*)?\d+[).:-]?\s*/i, '').trim())

  if (cleanLines.length > 1) return cleanLines

  const [singleBlock = ''] = cleanLines
  const sentenceSteps = singleBlock
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.map((step) => step.trim())
    .filter(Boolean)

  return sentenceSteps?.length ? sentenceSteps : cleanLines
}

const getDietType = (recipe, ingredients) => {
  if (recipe.dietType) return recipe.dietType

  const category = recipe.strCategory?.toLowerCase() || ''
  if (category.includes('vegan') || category.includes('vegetarian')) return 'veg'

  const searchableText = [
    recipe.strMeal,
    recipe.strCategory,
    ...ingredients.map(({ ingredient }) => ingredient),
  ]
    .join(' ')
    .toLowerCase()

  return nonVegWords.some((word) => searchableText.includes(word)) ? 'non-veg' : 'veg'
}

const FoodDetail = () => {
  const { id } = useParams()
  const location = useLocation()
  const initialRecipe =
    location.state?.recipe?.idMeal === id ? location.state.recipe : null
  const [recipe, setRecipe] = useState(initialRecipe)
  const [error, setError] = useState('')

  useEffect(() => {
    if (recipe?.idMeal === id) return

    let isActive = true

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isActive) return

        const meal = data.meals?.[0]
        if (!meal) {
          setError('Recipe not found.')
          setRecipe(null)
          return
        }

        setRecipe(meal)
        setError('')
      })
      .catch(() => {
        if (!isActive) return

        setRecipe(null)
        setError('Could not load this recipe right now.')
      })

    return () => {
      isActive = false
    }
  }, [id, recipe?.idMeal])

  const ingredients = useMemo(() => (recipe ? getIngredients(recipe) : []), [recipe])
  const instructionSteps = useMemo(
    () => (recipe ? getInstructionSteps(recipe.strInstructions) : []),
    [recipe],
  )
  const loading = !error && recipe?.idMeal !== id

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8ef] px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="h-[420px] animate-pulse rounded-[32px] bg-linear-to-br from-orange-100 via-rose-50 to-[#f7dfbf]" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-[28px] bg-white shadow-[0_18px_48px_rgba(154,79,20,0.08)]"
              />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (error || !recipe) {
    return (
      <main className="min-h-screen bg-[#fff8ef] px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-orange-100 bg-white p-8 text-center shadow-[0_24px_70px_rgba(154,79,20,0.1)]">
          <p className="font-serif text-4xl font-bold text-[#1a1008]">
            Recipe needs another try.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#755943]">
            {error || 'This recipe could not be found.'}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-[#1a1008] px-6 text-sm font-bold text-white transition hover:bg-orange-500"
          >
            Back to recipes
          </Link>
        </div>
      </main>
    )
  }

  const embedUrl = getYoutubeEmbedUrl(recipe.strYoutube)
  const tags = recipe.strTags
    ?.split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
  const dietType = getDietType(recipe, ingredients)
  const isVeg = dietType === 'veg'
  const region = recipe.strCountry || recipe.strArea || 'MealDB'

  return (
    <main className="min-h-screen bg-[#fff8ef]">
      <section className="bg-linear-to-b from-[#160d07] via-[#2a160b] to-[#fff1df] px-4 pb-16 pt-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/10 px-5 text-sm font-bold text-white shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/18"
          >
            Back to recipes
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-stretch">
            <div className="overflow-hidden rounded-[32px] border border-white/12 bg-[#0f0905] shadow-[0_34px_100px_rgba(0,0,0,0.32)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-orange-200">
                    Watch video to learn
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/70">
                    Start with the lesson, then follow the steps below.
                  </p>
                </div>
                {embedUrl ? (
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#1a1008] transition hover:bg-orange-100"
                  >
                    Open on YouTube
                  </a>
                ) : (
                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/72">
                    Video coming soon
                  </span>
                )}
              </div>

              <div className="aspect-video bg-[#120a05]">
                {embedUrl ? (
                  <iframe
                    className="h-full w-full"
                    src={embedUrl}
                    title={`${recipe.strMeal} video lesson`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative flex h-full items-end overflow-hidden">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#120a05] via-[#120a05]/25 to-transparent" />
                    <p className="relative p-6 font-serif text-3xl font-bold text-white">
                      Video lesson is not available for this recipe yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <aside className="rounded-[32px] border border-white/12 bg-white/10 p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                    isVeg
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {isVeg ? 'Veg' : 'Non Veg'}
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
                  {recipe.strCategory}
                </span>
              </div>

              <h1 className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {recipe.strMeal}
              </h1>

              <p className="mt-5 text-sm leading-7 text-white/72">
                A guided MealDB recipe with ingredients, method, source details,
                and a video-first learning flow for relaxed cooking.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-[22px] border border-white/10 bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200">
                    Cuisine
                  </p>
                  <p className="mt-2 font-semibold">{recipe.strArea || 'Global'}</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200">
                    Origin
                  </p>
                  <p className="mt-2 font-semibold">{region}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {tags?.length ? (
                  tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                    Home cooking
                  </span>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-[32px] border border-orange-100 bg-white p-5 shadow-[0_24px_70px_rgba(154,79,20,0.1)] sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-500">
                    Ingredients
                  </p>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-[#1a1008]">
                    Gather these first
                  </h2>
                </div>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-500">
                  {ingredients.length}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {ingredients.map(({ ingredient, measure }) => (
                  <div
                    key={`${ingredient}-${measure}`}
                    className="flex items-center gap-3 rounded-[22px] border border-orange-100 bg-[#fffaf3] p-3"
                  >
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ${
                        isVeg ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#1a1008]">
                        {ingredient}
                      </p>
                      {measure && (
                        <p className="mt-0.5 text-xs font-medium text-[#8a6b50]">
                          {measure}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {(recipe.strSource || recipe.dateModified) && (
              <div className="mt-5 rounded-[28px] border border-orange-100 bg-white p-5 text-sm text-[#755943] shadow-[0_18px_48px_rgba(154,79,20,0.08)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-500">
                  Recipe notes
                </p>
                {recipe.strSource && (
                  <a
                    href={recipe.strSource}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex h-11 items-center rounded-full bg-[#1a1008] px-5 text-xs font-bold text-white transition hover:bg-orange-500"
                  >
                    Original source
                  </a>
                )}
                {recipe.dateModified && (
                  <p className="mt-4 font-semibold">Updated {recipe.dateModified}</p>
                )}
              </div>
            )}
          </aside>

          <div>
            <div className="rounded-[32px] border border-orange-100 bg-white p-5 shadow-[0_24px_70px_rgba(154,79,20,0.1)] sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-500">
                Cute cooking order
              </p>
              <h2 className="mt-2 font-serif text-4xl font-bold leading-tight text-[#1a1008] sm:text-5xl">
                Follow the steps softly
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#755943]">
                Watch the lesson above, then cook through these steps one by one.
                Each step is separated so the recipe feels easy to scan while you
                are in the kitchen.
              </p>
            </div>

            <ol className="mt-6 space-y-5">
              {instructionSteps.map((step, index) => (
                <li
                  key={`${step}-${index}`}
                  className="relative overflow-hidden rounded-[30px] border border-orange-100 bg-white p-5 shadow-[0_18px_48px_rgba(154,79,20,0.08)] sm:p-6"
                >
                  <div
                    className={`absolute left-0 top-0 h-full w-1.5 ${
                      isVeg ? 'bg-emerald-300' : 'bg-rose-300'
                    }`}
                  />
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1a1008] font-serif text-xl font-bold text-white shadow-[0_12px_28px_rgba(26,16,8,0.18)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b38353]">
                        Step {index + 1}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#755943] sm:text-base sm:leading-8">
                        {step}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </main>
  )
}

export default FoodDetail
