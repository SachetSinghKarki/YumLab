const quickSearches = ['chicken', 'curry', 'pasta', 'tomato']

const Hero = ({ searchQuery, onSearchChange, resultCount, totalCount, loading }) => {
  const trimmedSearch = searchQuery.trim()

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex min-h-[calc(100vh-70px)] items-center overflow-hidden bg-[#160d07] px-4 py-16 sm:px-6 md:min-h-screen lg:px-10">
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-55 blur-sm"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <video
        className="absolute inset-0 h-full w-full object-contain opacity-95"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-linear-to-r from-[#160d07]/95 via-[#160d07]/70 to-[#160d07]/25" />
      <div className="absolute inset-0 bg-linear-to-t from-[#160d07] via-transparent to-[#160d07]/30" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,247,237,0.08),transparent_34%,rgba(249,115,22,0.12))]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1fr_380px]">
        <div className="max-w-3xl animate-fadeUp">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-200 shadow-[0_14px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
            Guided cooking, softly curated
          </div>

          <h1 className="mt-6 max-w-3xl font-serif text-5xl font-bold leading-[0.98] tracking-normal text-white drop-shadow-[0_16px_40px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl lg:text-8xl">
            Learn the art of beautiful home cooking.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/78 sm:text-lg">
            YumLab helps you discover polished, cozy recipes with YouTube-guided
            steps, so every dish feels easy to follow, lovely to plate, and
            luxurious in its own little way.
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 max-w-2xl rounded-[28px] border border-white/20 bg-white/95 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.26)] backdrop-blur-xl"
            role="search"
          >
            <label htmlFor="hero-recipe-search" className="sr-only">
              Search recipes
            </label>
            <div className="flex items-center gap-2">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500"
                aria-hidden="true"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <input
                id="hero-recipe-search"
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search recipes, ingredients, or cozy keywords"
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#1a1008] outline-none placeholder:text-[#b38353] sm:text-base"
              />
              {trimmedSearch && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#9b6a42] transition duration-200 hover:bg-orange-50 hover:text-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100"
                  aria-label="Clear recipe search"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="hidden h-12 rounded-full bg-linear-to-r from-orange-400 to-red-500 px-6 text-sm font-bold text-white shadow-[0_14px_34px_rgba(249,115,22,0.32)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(249,115,22,0.42)] focus:outline-none focus:ring-4 focus:ring-orange-200 sm:inline-flex sm:items-center"
              >
                Find
              </button>
            </div>
          </form>

          <div className="mt-4 flex max-w-2xl flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
              Try
            </span>
            {quickSearches.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => onSearchChange(keyword)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold capitalize transition duration-200 hover:-translate-y-0.5 ${
                  trimmedSearch.toLowerCase() === keyword
                    ? 'border-orange-300 bg-orange-300 text-[#1a1008]'
                    : 'border-white/15 bg-white/10 text-white/72 hover:bg-white/18'
                }`}
              >
                {keyword}
              </button>
            ))}
            <span className="ml-0 text-xs font-medium text-white/50 sm:ml-2">
              {loading
                ? 'Warming up the recipe shelf...'
                : trimmedSearch
                  ? `${resultCount} of ${totalCount} recipes match`
                  : `${totalCount} recipes ready to browse`}
            </span>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-12 rounded-full bg-linear-to-r from-orange-400 to-red-500 px-7 text-sm font-bold text-white shadow-[0_14px_34px_rgba(249,115,22,0.38)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(249,115,22,0.48)]"
            >
              Start Learning
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('hero-recipe-search')?.focus()}
              className="h-12 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-bold text-white shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white/18"
            >
              Watch Recipes
            </button>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-6">
            {[
              { value: '200+', label: 'Happy food lovers' },
              { value: '50+', label: 'Video recipes' },
              { value: '5★', label: 'Easy lessons' },
            ].map(({ value, label }) => (
              <div key={label} className="min-w-0">
                <p className="font-serif text-2xl font-bold text-orange-300 sm:text-3xl">
                  {value}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-4 text-white/55 sm:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden animate-fadeUp rounded-[28px] border border-white/15 bg-white/10 p-5 text-white shadow-[0_26px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:block">
          <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#fff7ed]/95 p-5 text-[#1a1008]">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-orange-500">
              Learn Beautifully
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight">
              A soft little cooking studio for your screen.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#755943]">
              Follow clear video lessons, collect ideas, and make food that feels
              elegant without feeling complicated.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="font-serif text-2xl font-bold text-orange-300">Daily</p>
              <p className="mt-1 text-white/60">New lessons</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="font-serif text-2xl font-bold text-orange-300">Soft</p>
              <p className="mt-1 text-white/60">Easy plating</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

    </section>
  )
}

export default Hero
