import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'
import { SearchPanel } from '@/components/search-panel'

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative min-h-[92vh] w-full overflow-hidden">
        <Image
          src="/images/hero-home.png"
          alt="A modern luxury home glowing at dusk with an infinity pool"
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-5 pt-28 pb-56 sm:px-8 sm:pb-64">
          <div
            className="max-w-2xl text-white"
            style={{ animation: 'float-up 0.9s cubic-bezier(0.16,1,0.3,1) both' }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.28em] uppercase backdrop-blur-md">
              Yiminum Homes
            </span>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Find a place that feels like home.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Discover exceptional homes, apartments and properties designed around the way you
              want to live.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#properties"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground shadow-xl shadow-black/25 transition-transform hover:-translate-y-0.5"
              >
                Explore Properties
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <Phone className="size-4" />
                Contact Yiminum Homes
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/80">
              {[
                '1,200+ buyers guided',
                '4.9/5 client satisfaction',
                '98% closing success',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/20 bg-white/8 px-3 py-1.5 backdrop-blur-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search panel overlapping the hero */}
      <div className="relative z-10 mx-auto -mt-44 max-w-6xl px-5 sm:-mt-52 sm:px-8">
        <SearchPanel />
      </div>
    </section>
  )
}
