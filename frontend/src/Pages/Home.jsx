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

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=veg')
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.meals || []).map(
          ({ idMeal, strMeal, strArea, strCategory, strYoutube, strMealThumb }) => ({
            idMeal,
            strMeal,
            strArea,
            strCategory,
            strYoutube,
            strMealThumb,
          }),
        )
        setRecipes(filtered)
      })
      .catch(() => {
        setRecipes([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

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
                Curated video recipes
              </span>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight text-[#1a1008] sm:text-5xl lg:text-6xl">
                Learn dishes that look refined and feel easy.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#755943]">
              Every YumLab recipe card leads you into a guided cooking moment with
              YouTube lessons, warm flavors, and a polished finish for your table.
            </p>
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
              {recipes.map((recipe, index) => (
                <FoodCard key={recipe.idMeal} recipe={recipe} index={index} />
              ))}
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
