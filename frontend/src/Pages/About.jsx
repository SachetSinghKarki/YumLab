import { useState } from 'react'

const imageCandidates = [1, 2, 3, 4].map((number) => [
  `/about ${number}.jpg`,
  `/about ${number}.jpeg`,
  `/about ${number}.png`,
  `/about ${number}.webp`,
  `/about${number}.jpg`,
  `/about${number}.jpeg`,
  `/about${number}.png`,
  `/about${number}.webp`,
  `/about-${number}.jpg`,
  `/about-${number}.jpeg`,
  `/about-${number}.png`,
  `/about-${number}.webp`,
])

const galleryCopy = [
  {
    title: 'Fresh Beginnings',
    text: 'Seasonal colors, crisp textures, and a little joy in every bite.',
  },
  {
    title: 'Cozy Plates',
    text: 'Comfort food with a polished YumLab touch.',
  },
  {
    title: 'Sweet Details',
    text: 'Tiny finishes that make every dish feel special.',
  },
  {
    title: 'Made To Share',
    text: 'Pretty food, warm tables, and recipes worth passing around.',
  },
]

const values = [
  'Fresh-first ingredients',
  'Cute plating, classy flavor',
  'Comfort recipes with character',
]

const ImageTile = ({ candidates, alt, className = '' }) => {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-to-br from-orange-100 via-rose-100 to-[#f7dfbf] ${className}`}
      >
        <span className="font-serif text-4xl font-bold text-orange-300">YumLab</span>
      </div>
    )
  }

  return (
    <img
      src={candidates[index]}
      alt={alt}
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex(index + 1)
        } else {
          setFailed(true)
        }
      }}
      className={`object-cover ${className}`}
    />
  )
}

const About = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fff8ef] text-[#211309]">
      <section className="relative bg-linear-to-b from-[#fff4e6] via-[#fff8ef] to-[#fff8ef] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="order-2 lg:order-1">
            <div className="inline-flex rounded-full border border-orange-100 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-orange-500 shadow-[0_10px_30px_rgba(154,79,20,0.08)]">
              About YumLab
            </div>

            <h1 className="mt-6 max-w-2xl font-serif text-5xl font-bold leading-[1.02] text-[#1a1008] sm:text-6xl lg:text-7xl">
              A cute little kitchen for beautiful cravings.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#755943] sm:text-lg">
              YumLab is where cozy recipes meet delicate presentation. We blend
              homestyle comfort with soft colors, fresh ingredients, and a little
              sparkle so every meal feels thoughtful, warm, and quietly special.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {values.map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-[#5c3d1e] shadow-[0_10px_24px_rgba(154,79,20,0.08)]"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>

          <div className="order-1 grid min-h-[520px] grid-cols-2 gap-4 lg:order-2">
            <div className="flex flex-col gap-4 pt-10">
              <ImageTile
                candidates={imageCandidates[0]}
                alt="YumLab styled food moment one"
                className="h-64 w-full rounded-[28px] shadow-[0_24px_60px_rgba(154,79,20,0.18)]"
              />
              <ImageTile
                candidates={imageCandidates[2]}
                alt="YumLab styled food moment three"
                className="h-40 w-full rounded-[24px] shadow-[0_18px_45px_rgba(154,79,20,0.14)]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <ImageTile
                candidates={imageCandidates[1]}
                alt="YumLab styled food moment two"
                className="h-40 w-full rounded-[24px] shadow-[0_18px_45px_rgba(154,79,20,0.14)]"
              />
              <ImageTile
                candidates={imageCandidates[3]}
                alt="YumLab styled food moment four"
                className="h-72 w-full rounded-[32px] shadow-[0_28px_70px_rgba(154,79,20,0.2)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-orange-100 bg-white/85 p-5 shadow-[0_24px_80px_rgba(154,79,20,0.12)] sm:p-8">
          <div className="grid gap-4 md:grid-cols-4">
            {galleryCopy.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[24px] bg-[#fff8ef] p-5 transition duration-200 hover:-translate-y-1 hover:bg-orange-50"
              >
                <p className="font-serif text-3xl font-bold text-orange-400">
                  0{index + 1}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-bold text-[#1a1008]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#7a6148]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
              Our Mood
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#1a1008] sm:text-5xl">
              Pretty enough to pause for, simple enough to make again.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-[0_18px_50px_rgba(154,79,20,0.1)]">
              <h3 className="font-serif text-2xl font-bold text-[#1a1008]">
                Gentle Flavor
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#755943]">
                We keep the food bright, balanced, and comforting with a focus on
                ingredients that feel fresh and familiar.
              </p>
            </div>
            <div className="rounded-[28px] border border-orange-100 bg-[#1a1008] p-6 text-white shadow-[0_18px_50px_rgba(26,16,8,0.2)]">
              <h3 className="font-serif text-2xl font-bold">Soft Luxury</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                YumLab's style is cute but composed: warm light, creamy tones,
                elegant details, and food that looks as lovely as it tastes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </main>
  )
}

export default About
