const FoodCard = ({ recipe, index }) => {
  const { strMeal, strArea, strCategory, strYoutube, strMealThumb } = recipe

  const handleYoutube = () => {
    if (strYoutube) window.open(strYoutube, '_blank')
  }

  return (
    <article
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_20px_58px_rgba(154,79,20,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(154,79,20,0.18)]"
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

        {strYoutube && (
          <button
            type="button"
            onClick={handleYoutube}
            className="absolute inset-0 flex items-center justify-center bg-[#1a1008]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-label={`Watch ${strMeal} lesson on YouTube`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-red-500 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:scale-105">
              <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#b38353]">
          {strArea} lesson
        </p>
        <h2 className="line-clamp-2 font-serif text-xl font-bold leading-snug text-[#1a1008] transition-colors duration-200 group-hover:text-orange-500">
          {strMeal}
        </h2>
        <p className="text-sm leading-6 text-[#7a6148]">
          Follow a guided video and learn the little details that make this dish
          feel polished at home.
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-orange-100 pt-4">
          {strYoutube ? (
            <button
              type="button"
              onClick={handleYoutube}
              className="rounded-full bg-[#1a1008] px-4 py-2 text-xs font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-orange-500"
            >
              Start lesson
            </button>
          ) : (
            <span className="text-xs font-semibold text-[#b69b82]">Lesson coming soon</span>
          )}

          <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-500">
            Video
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
    </article>
  )
}

export default FoodCard
