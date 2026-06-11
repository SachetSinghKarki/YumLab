import { useEffect, useState } from 'react'
import Hero from '../Components/Hero'
import FoodCard from '../Components/FoodCard'

const learningSteps = [
  {
    step: '01',
    title: 'Choose a lesson',
    text: 'Browse cozy recipes selected for clear YouTube-guided learning.',
  },
  {
    step: '02',
    title: 'Cook along softly',
    text: 'Follow the video, pause when needed, and learn every detail at your pace.',
  },
  {
    step: '03',
    title: 'Plate it beautifully',
    text: 'Finish with simple styling touches that make home cooking feel luxurious.',
  },
]

const recipeSources = [
  {
    url: 'https://www.themealdb.com/api/json/v1/1/search.php?s=veg',
    dietType: 'veg',
  },
  {
    url: 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken',
    dietType: 'non-veg',
  },
]

const filterOptions = [
  {
    value: 'all',
    label: 'All',
    helper: 'Every lesson',
    accent: 'from-orange-400 to-red-500',
  },
  {
    value: 'veg',
    label: 'Veg',
    helper: 'Plant-forward',
    accent: 'from-emerald-400 to-lime-500',
  },
  {
    value: 'non-veg',
    label: 'Non Veg',
    helper: 'Chicken specials',
    accent: 'from-rose-400 to-orange-500',
  },
]

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all(
      recipeSources.map(({ url, dietType }) =>
        fetch(url)
          .then((res) => res.json())
          .then((data) =>
            (data.meals || []).map((meal) => ({
              ...meal,
              dietType,
            })),
          ),
      ),
    )
      .then((recipeGroups) => {
        const uniqueRecipes = recipeGroups
          .flat()
          .filter(
            (recipe, index, allRecipes) =>
              allRecipes.findIndex((item) => item.idMeal === recipe.idMeal) === index,
          )

        setRecipes(uniqueRecipes)
      })
      .catch(() => {
        setRecipes([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const visibleRecipes =
    activeFilter === 'all'
      ? recipes
      : recipes.filter((recipe) => recipe.dietType === activeFilter)

  const filterCounts = filterOptions.reduce((counts, option) => {
    counts[option.value] =
      option.value === 'all'
        ? recipes.length
        : recipes.filter((recipe) => recipe.dietType === option.value).length
    return counts
  }, {})

  return (
    <div className="min-h-screen bg-[#fff8ef]">
      <Hero />

      <section className="bg-linear-to-b from-[#160d07] via-[#fff1df] to-[#fff8ef] px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {learningSteps.map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-orange-100 bg-white/90 p-6 shadow-[0_24px_70px_rgba(154,79,20,0.12)] backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-[0_30px_86px_rgba(154,79,20,0.16)]"
            >
              <p className="font-serif text-4xl font-bold text-orange-300">{item.step}</p>
              <h2 className="mt-4 font-serif text-2xl font-bold text-[#1a1008]">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#755943]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-orange-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-orange-500 shadow-[0_12px_32px_rgba(154,79,20,0.08)]">
                Curated MealDB recipes
              </span>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight text-[#1a1008] sm:text-5xl lg:text-6xl">
                Pick your plate, then open the full cooking detail.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#755943]">
              Veg favorites and chicken specials now load together from MealDB.
              Tap a recipe to see ingredients, steps, tags, source notes, and the
              video option in one calm cooking view.
            </p>
          </div>

          <div className="mb-10 grid gap-3 rounded-[32px] border border-orange-100 bg-white/80 p-3 shadow-[0_24px_70px_rgba(154,79,20,0.1)] backdrop-blur md:grid-cols-3">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setActiveFilter(option.value)}
                  className={`group flex min-h-24 items-center justify-between rounded-[24px] border p-4 text-left transition duration-300 ${
                    isActive
                      ? 'border-transparent bg-[#1a1008] text-white shadow-[0_18px_45px_rgba(26,16,8,0.22)]'
                      : 'border-orange-100 bg-[#fffaf3] text-[#1a1008] hover:-translate-y-0.5 hover:border-orange-200 hover:bg-white'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>
                    <span
                      className={`mb-3 block h-2 w-14 rounded-full bg-linear-to-r ${option.accent}`}
                    />
                    <span className="block font-serif text-2xl font-bold">
                      {option.label}
                    </span>
                    <span
                      className={`mt-1 block text-xs font-semibold uppercase tracking-[0.18em] ${
                        isActive ? 'text-white/58' : 'text-[#b38353]'
                      }`}
                    >
                      {option.helper}
                    </span>
                  </span>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                      isActive
                        ? 'bg-white text-[#1a1008]'
                        : 'bg-orange-50 text-orange-500 group-hover:bg-orange-100'
                    }`}
                  >
                    {filterCounts[option.value] || 0}
                  </span>
                </button>
              )
            })}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_20px_58px_rgba(154,79,20,0.1)]"
                >
                  <div className="h-52 animate-pulse bg-linear-to-br from-orange-100 via-rose-50 to-[#f7dfbf]" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-orange-50" />
                    <div className="h-3 w-1/2 animate-pulse rounded-full bg-orange-50" />
                    <div className="h-3 w-1/3 animate-pulse rounded-full bg-orange-50" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleRecipes.map((recipe, index) => (
                <FoodCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  index={index}
                />
              ))}
            </div>
          )}

          {!loading && visibleRecipes.length === 0 && (
            <div className="rounded-[28px] border border-orange-100 bg-white p-8 text-center shadow-[0_20px_58px_rgba(154,79,20,0.1)]">
              <p className="font-serif text-2xl font-bold text-[#1a1008]">
                No recipes found here yet.
              </p>
              <p className="mt-2 text-sm text-[#755943]">
                Try another filter to keep cooking.
              </p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Home
