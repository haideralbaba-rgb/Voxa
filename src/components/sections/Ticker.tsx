import { TICKER_ITEMS } from '@/lib/voxa-data'

export function Ticker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <section
      aria-label="تخصصات فوكسـا"
      className="border-y border-line bg-paper-2/65 py-4 md:py-5"
    >
      <div className="marquee-mask overflow-hidden" dir="ltr">
        <div className="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused]">
          {repeated.map((item, idx) => (
            <div key={`${item.en}-${idx}`} className="flex items-center gap-8">
              <div className="flex items-baseline gap-3">
                <span
                  dir="rtl"
                  className="font-display text-base font-medium text-ink md:text-lg"
                >
                  {item.ar}
                </span>
                <span className="label text-[10px] text-muted">{item.en}</span>
              </div>
              <span
                aria-hidden="true"
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  idx % 2 === 0 ? 'bg-blue' : 'bg-lime ring-1 ring-ink/30'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
