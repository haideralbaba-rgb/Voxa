"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpLeft,
  ArrowLeft,
  Plus,
  Minus,
  Asterisk,
  Fingerprint,
  Globe2,
  Layers3,
  MoveUpRight,
} from "lucide-react";
import { WORK_PROJECTS, SERVICES, PROCESS_STEPS } from "@/lib/voxa-data";
import { Contact } from "./Contact";

const filters = [
  { id: "all", label: "كل الأعمال" },
  { id: "identity", label: "هويات بصرية" },
  { id: "digital", label: "تجارب رقمية" },
  { id: "editorial", label: "مطبوعات وتغليف" },
];

function Sculpture() {
  return (
    <div className="vx-sculpture" aria-hidden="true">
      <svg viewBox="0 0 600 600" fill="none">
        <defs>
          <linearGradient
            id="petal"
            x1="180"
            y1="90"
            x2="370"
            y2="350"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffca9c" />
            <stop offset=".22" stopColor="#ff793e" />
            <stop offset=".55" stopColor="#f34b19" />
            <stop offset=".82" stopColor="#aa280e" />
            <stop offset="1" stopColor="#48160f" />
          </linearGradient>
          <radialGradient id="core">
            <stop stopColor="#ffad78" />
            <stop offset=".55" stopColor="#f7632d" />
            <stop offset="1" stopColor="#bd381c" />
          </radialGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="18" stdDeviation="13" floodOpacity=".32" />
          </filter>
        </defs>
        <g filter="url(#shadow)">
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              transform={`rotate(${i * 45} 300 300)`}
              d="M300 310 C264 273 222 218 223 154 C224 98 268 57 300 59 C329 61 357 104 353 149 C349 209 318 263 300 310Z"
              fill="url(#petal)"
              stroke="#ffae74"
              strokeOpacity=".25"
              strokeWidth=".7"
            />
          ))}
          <circle cx="300" cy="300" r="41" fill="url(#core)" />
        </g>
      </svg>
    </div>
  );
}

export function NewHome() {
  const [filter, setFilter] = useState("all");
  const [serviceOpen, setServiceOpen] = useState<number | null>(0);
  const visible = WORK_PROJECTS.filter(
    (p) =>
      filter === "all" ||
      (filter === "editorial"
        ? ["editorial", "packaging"].includes(p.categoryId)
        : p.categoryId === filter),
  );
  return (
    <div className="vx-home">
      <section className="vx-hero vx-wrap">
        <div className="vx-hero-overline">
          <span>
            <i /> استوديو مستقل، بطموحٍ بلا حدود
          </span>
          <span className="vx-mono" dir="ltr">
            KARBALA, IRAQ · AVAILABLE WORLDWIDE ↗
          </span>
        </div>
        <div className="vx-hero-grid">
          <div className="vx-hero-copy">
            <div className="vx-eyebrow">
              <span className="vx-small-star">✳</span> حيث تلتقي الاستراتيجية
              بالإبداع
            </div>
            <h1>
              لا نصنع تصميماً.
              <br />
              نصنع <span>فرقاً.</span>
              <svg viewBox="0 0 330 20" aria-hidden="true">
                <path d="M3 13 Q154 -2 327 9 M32 19 Q185 9 295 15" />
              </svg>
            </h1>
            <p>
              نحوّل الأفكار الطموحة إلى هويات تُرى، وتجارب تُحسّ.
              <br className="vx-desktop-break" /> استوديو تصميم يجمع وضوح الفكرة
              وجرأة التنفيذ.
            </p>
            <div className="vx-hero-buttons">
              <a href="#work" className="vx-button vx-button-orange">
                اكتشف أعمالنا <ArrowUpLeft size={20} />
              </a>
              <a href="#contact" className="vx-text-link">
                عندك فكرة؟ لنتحدث <ArrowLeft size={17} />
              </a>
            </div>
            <div className="vx-hero-footnote">
              <span className="vx-mini-orbits">
                <i />
                <i />
                <i />
              </span>
              <span>
                من أول فكرة، إلى آخر تفصيلة.
                <br />
                <b>شريكك الإبداعي، في كل خطوة.</b>
              </span>
            </div>
          </div>
          <div className="vx-hero-art">
            <div className="vx-art-grid" />
            <span className="vx-art-corner vx-mono">
              FIG. 01 — CREATIVE ENERGY
            </span>
            <span className="vx-art-cross">+</span>
            <Sculpture />
            <div className="vx-art-caption">
              <span className="vx-mono">
                A DIFFERENT
                <br />
                POINT OF VIEW.
              </span>
              <span className="vx-art-seal" dir="ltr">
                V<span>↗</span>
              </span>
            </div>
            <div className="vx-art-tag">
              <span className="vx-tag-dot" /> أفكار لا تشبه إلا نفسها
            </div>
          </div>
        </div>
        <div className="vx-hero-bottom">
          <a href="#work">
            <span className="vx-scroll-icon">
              <ArrowDown size={15} />
            </span>{" "}
            مرّر لاستكشاف المزيد
          </a>
          <span className="vx-mono" dir="ltr">
            BRAND STRATEGY · DESIGN · DIGITAL EXPERIENCES
          </span>
          <span className="vx-mono">© VOXA 2026</span>
        </div>
      </section>

      <div className="vx-ticker" aria-label="استراتيجية، هوية، تصميم، تجربة">
        <div>
          {[0, 1, 2, 3].map((n) => (
            <span key={n}>
              أفكار جريئة <Asterisk /> هويات استثنائية <Asterisk /> تجارب لا
              تُنسى <Asterisk />{" "}
            </span>
          ))}
        </div>
      </div>

      <section id="work" className="vx-work vx-wrap vx-section">
        <div className="vx-section-kicker">
          <span>
            <i /> 01 / أعمال مختارة
          </span>
          <span className="vx-mono">SELECTED WORK — 2025/26</span>
        </div>
        <div className="vx-section-heading">
          <h2>
            أعمال تتحدث.
            <br />
            <span>وتترك أثراً.</span>
          </h2>
          <p>
            كل مشروع حكاية مختلفة. هذه بعض الحكايات
            <br />
            التي صغناها بالفكرة، والشكل، والتفاصيل.
          </p>
        </div>
        <div className="vx-work-toolbar">
          <div className="vx-filters" aria-label="تصفية الأعمال">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
              >
                {f.label}
                {f.id === "all" && <sup>04</sup>}
              </button>
            ))}
          </div>
          <span className="vx-mono">
            ({String(visible.length).padStart(2, "0")}) PROJECTS
          </span>
        </div>
        <div className="vx-project-grid">
          {visible.map((p) => (
            <Link
              href={`/work/${p.slug}`}
              key={p.slug}
              className={`vx-project vx-project-${p.categoryId}`}
            >
              <div className="vx-project-image">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  width={1000}
                  height={1000}
                  sizes="(max-width: 700px) 100vw, 50vw"
                />
                <span className="vx-project-index vx-mono">
                  {p.index} / {p.categoryCode}
                </span>
                <span className="vx-project-view">
                  <ArrowUpLeft size={24} />
                  <span>استكشف المشروع</span>
                </span>
                <span className="vx-project-nature">دراسة تصميمية</span>
              </div>
              <div className="vx-project-info">
                <div>
                  <h3>{p.title}</h3>
                  <p>
                    {p.categoryLabel} <span> / </span> {p.latinTitle}
                  </p>
                </div>
                <span className="vx-mono">
                  {p.year}
                  <MoveUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className="vx-work-note">
          <span>✳</span> مساحة للتجريب وصناعة اتجاهات جديدة — المشاريع المعروضة
          دراسات تصورية من الاستوديو.
        </p>
      </section>

      <section id="studio" className="vx-studio">
        <div className="vx-wrap vx-section">
          <div className="vx-section-kicker">
            <span>
              <i /> 02 / الفكرة وراء فوكسـا
            </span>
            <span className="vx-mono">SMALL STUDIO. BIG PICTURE.</span>
          </div>
          <div className="vx-studio-grid">
            <div className="vx-studio-statement">
              <span className="vx-outline-star">✳</span>
              <h2>
                التصميم الجميل
                <br />
                يلفت النظر.
                <br />
                <span>
                  التصميم الذكي
                  <br />
                  يغيّر كل شيء.
                </span>
              </h2>
            </div>
            <div className="vx-studio-copy">
              <span className="vx-mono">LESS NOISE. MORE MEANING.</span>
              <p>
                نحن فوكسـا. استوديو تصميم مستقل من كربلاء، نعمل مع أصحاب الرؤى
                أينما كانوا. نؤمن أن أفضل الأعمال تبدأ بسؤال جيد، وليس بشكل
                جميل.
              </p>
              <p>
                نمزج التفكير الاستراتيجي بالحس الفني لنصنع علامات واضحة، وتجارب
                رقمية بسيطة في استخدامها، استثنائية في حضورها. لا نطارد
                الاتجاهات، بل نبحث عمّا يجعلك مختلفاً.
              </p>
              <a href="#contact" className="vx-text-link">
                لنبنِ شيئاً يستحق <ArrowUpLeft size={20} />
              </a>
              <div className="vx-studio-values">
                <div>
                  <span className="vx-mono">01 / CLARITY</span>
                  <b>وضوح في الفكرة</b>
                </div>
                <div>
                  <span className="vx-mono">02 / CHARACTER</span>
                  <b>شخصية في التنفيذ</b>
                </div>
                <div>
                  <span className="vx-mono">03 / CRAFT</span>
                  <b>إتقان في التفاصيل</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="vx-services vx-wrap vx-section">
        <div className="vx-section-kicker">
          <span>
            <i /> 03 / اختصاصنا
          </span>
          <span className="vx-mono">THOUGHTFULLY CONNECTED SERVICES</span>
        </div>
        <div className="vx-services-layout">
          <div className="vx-services-intro">
            <h2>
              من الجوهر،
              <br />
              إلى <span>كل تفصيلة.</span>
            </h2>
            <p>
              نفكر بالصورة الكبيرة، ونعمل على أدق التفاصيل.
              <br />
              خدمات متكاملة، ولغة واحدة تليق بعلامتك.
            </p>
            <a href="#contact" className="vx-button vx-button-outline">
              احكِ لنا عن مشروعك <ArrowUpLeft size={18} />
            </a>
            <div className="vx-services-mark" aria-hidden="true">
              ✳
            </div>
          </div>
          <div className="vx-service-list">
            {SERVICES.map((s, i) => {
              const Icon =
                [Fingerprint, Globe2, Layers3, Asterisk][i] ?? Asterisk;
              return (
                <article
                  key={s.index}
                  className={`vx-service ${serviceOpen === i ? "is-open" : ""}`}
                >
                  <button
                    onClick={() => setServiceOpen(serviceOpen === i ? null : i)}
                    aria-expanded={serviceOpen === i}
                    aria-controls={`service-${i}`}
                  >
                    <span className="vx-service-number vx-mono">{s.index}</span>
                    <span className="vx-service-title">
                      <span className="vx-mono">{s.code}</span>
                      <h3>{s.title}</h3>
                    </span>
                    <span className="vx-service-toggle">
                      {serviceOpen === i ? (
                        <Minus size={20} />
                      ) : (
                        <Plus size={20} />
                      )}
                    </span>
                  </button>
                  <div
                    id={`service-${i}`}
                    hidden={serviceOpen !== i}
                    className="vx-service-content"
                  >
                    <Icon size={30} strokeWidth={1} />
                    <p>{s.details}</p>
                    <div>
                      {s.deliverables.map((d) => (
                        <span key={d}>{d}</span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="vx-process vx-wrap vx-section">
        <div className="vx-section-kicker">
          <span>
            <i /> 04 / رحلتنا معك
          </span>
          <span className="vx-mono">GOOD PROCESS. GREAT OUTCOMES.</span>
        </div>
        <div className="vx-section-heading">
          <h2>
            بوضوح نبدأ.
            <br />
            <span>وبإتقان نصل.</span>
          </h2>
          <p>
            لا خطوات غامضة، ولا مفاجآت.
            <br />
            تعاون حقيقي من أول محادثة حتى لحظة الإطلاق.
          </p>
        </div>
        <div className="vx-process-grid">
          {PROCESS_STEPS.map((s) => (
            <article key={s.index}>
              <div className="vx-process-number">
                <span dir="ltr">{s.index}</span>
                <ArrowLeft size={25} />
              </div>
              <span className="vx-mono">{s.code}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="vx-process-artifact">
                <span>↳</span> {s.artifact}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="vx-contact-banner">
        <div className="vx-wrap">
          <div>
            <span className="vx-mono">YOUR NEXT CHAPTER STARTS HERE</span>
            <h2>
              الفكرة عندك.
              <br />
              والبداية <span>عندنا ↙</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="vx-contact-orb"
            aria-label="لنبدأ مشروعك"
          >
            <ArrowUpLeft size={52} strokeWidth={1} />
            <span>لنصنع شيئاً مختلفاً</span>
          </a>
        </div>
      </section>
      <div className="vx-contact-section surface-ink">
        <Contact />
      </div>
    </div>
  );
}
