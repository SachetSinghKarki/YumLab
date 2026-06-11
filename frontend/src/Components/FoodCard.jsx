import { Link } from 'react-router-dom'

const FoodCard = ({ recipe, index }) => {
  const { strMeal, strArea, strCategory, strMealThumb, dietType } = recipe
  const isVeg = dietType === 'veg'

  return (
    <Link
      to={`/recipes/${recipe.idMeal}`}
      state={{ recipe }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[28px] border border-orange-100 bg-white text-left shadow-[0_20px_58px_rgba(154,79,20,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(154,79,20,0.18)] focus:outline-none focus:ring-4 focus:ring-orange-200"
      style={{ animation: 'fadeUp 0.5s ease both', animationDelay: `${index * 70}ms` }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1a1008]/70 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 shadow-sm backdrop-blur">
          {strCategory}
        </span>

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur ${
            isVeg
              ? 'border border-emerald-100 bg-emerald-50/95 text-emerald-600'
              : 'border border-rose-100 bg-rose-50/95 text-rose-600'
          }`}
        >
          {isVeg ? 'Veg' : 'Non Veg'}
        </span>

        <div className="absolute inset-0 flex items-end bg-[#1a1008]/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-[#1a1008]/24 group-hover:opacity-100">
          <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#1a1008] shadow-[0_14px_34px_rgba(0,0,0,0.2)]">
            View recipe details
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#b38353]">
          {strArea} lesson
        </p>
        <h2 className="line-clamp-2 font-serif text-xl font-bold leading-snug text-[#1a1008] transition-colors duration-200 group-hover:text-orange-500">
          {strMeal}
        </h2>
        <p className="text-sm leading-6 text-[#7a6148]">
          Open the full detail to see ingredients, cooking instructions, source
          notes, and the video lesson when available.
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-orange-100 pt-4">
          <span className="rounded-full bg-[#1a1008] px-4 py-2 text-xs font-bold text-white transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-orange-500">
            View details
          </span>

          <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-500">
            YumLab
          </span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Link>
  )
}

export default FoodCard
