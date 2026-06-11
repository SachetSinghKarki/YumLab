const contactCards = [
  {
    title: 'Recipe Help',
    detail: 'Need help following a video lesson or finding the right recipe path?',
    value: 'support@yumlab.co',
  },
  {
    title: 'Creator Collabs',
    detail: 'Share your cooking channel, recipe idea, or learning series pitch.',
    value: 'collab@yumlab.co',
  },
  {
    title: 'Kitchen Hours',
    detail: 'We usually reply while the coffee is warm and the prep board is full.',
    value: 'Mon - Fri, 9 AM - 6 PM',
  },
]

const Contact = () => {
  return (
    <main className="min-h-screen bg-[#fff8ef] text-[#1a1008]">
      <section className="bg-linear-to-b from-[#fff1df] via-[#fff8ef] to-[#fff8ef] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-orange-100 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-orange-500 shadow-[0_12px_34px_rgba(154,79,20,0.08)]">
              Contact YumLab
            </div>

            <h1 className="mt-6 max-w-2xl font-serif text-5xl font-bold leading-[1.02] text-[#1a1008] sm:text-6xl lg:text-7xl">
              Let's make your cooking journey softer.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#755943] sm:text-lg">
              Have a recipe question, a YouTube lesson idea, or a little kitchen
              confusion? Send us a note and we will help you learn with clarity,
              warmth, and a touch of YumLab polish.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
              {[
                { value: '24h', label: 'Typical reply' },
                { value: '50+', label: 'Video lessons' },
                { value: 'Soft', label: 'Guided learning' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-orange-100 bg-white/85 p-5 shadow-[0_16px_42px_rgba(154,79,20,0.09)]"
                >
                  <p className="font-serif text-3xl font-bold text-orange-400">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a6b43]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <form className="rounded-[32px] border border-orange-100 bg-white p-5 shadow-[0_28px_80px_rgba(154,79,20,0.14)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-[#5c3d1e]">Name</span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-2 h-12 w-full rounded-2xl border border-orange-100 bg-[#fff8ef] px-4 text-sm font-medium text-[#1a1008] outline-none transition focus:border-orange-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(251,146,60,0.12)]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-[#5c3d1e]">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 h-12 w-full rounded-2xl border border-orange-100 bg-[#fff8ef] px-4 text-sm font-medium text-[#1a1008] outline-none transition focus:border-orange-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(251,146,60,0.12)]"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-bold text-[#5c3d1e]">Topic</span>
              <select className="mt-2 h-12 w-full rounded-2xl border border-orange-100 bg-[#fff8ef] px-4 text-sm font-bold text-[#1a1008] outline-none transition focus:border-orange-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(251,146,60,0.12)]">
                <option>Recipe lesson help</option>
                <option>Video recommendation</option>
                <option>Creator collaboration</option>
                <option>General feedback</option>
              </select>
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-bold text-[#5c3d1e]">Message</span>
              <textarea
                rows="6"
                placeholder="Tell us what you are trying to cook or learn..."
                className="mt-2 w-full resize-none rounded-2xl border border-orange-100 bg-[#fff8ef] px-4 py-4 text-sm font-medium leading-6 text-[#1a1008] outline-none transition focus:border-orange-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(251,146,60,0.12)]"
              />
            </label>

            <button
              type="button"
              className="mt-6 h-13 w-full rounded-full bg-linear-to-r from-orange-400 to-red-500 px-7 text-sm font-bold text-white shadow-[0_16px_36px_rgba(249,115,22,0.34)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(249,115,22,0.44)] sm:w-auto"
            >
              Send Sweet Note
            </button>
          </form>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {contactCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-[0_20px_58px_rgba(154,79,20,0.1)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(154,79,20,0.14)]"
            >
              <h2 className="font-serif text-2xl font-bold text-[#1a1008]">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#755943]">{card.detail}</p>
              <p className="mt-5 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-500">
                {card.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </main>
  )
}

export default Contact
