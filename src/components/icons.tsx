import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P): P => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...p,
});

/** VOXA mark — a "V" whose tip is a lens. */
export function VoxaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M1 3h9.6L16 17.2 21.4 3H31L20.6 29H11.4z" fill="currentColor" />
      <circle cx="16" cy="23.2" r="2.3" fill="#050506" />
    </svg>
  );
}

/** Video: viewfinder corners + play. */
export const IconVideo = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 9V6a2 2 0 0 1 2-2h3M15 4h3a2 2 0 0 1 2 2v3M20 15v3a2 2 0 0 1-2 2h-3M9 20H6a2 2 0 0 1-2-2v-3" />
    <path d="M10 9l5 3-5 3z" fill="currentColor" />
  </svg>
);

/** Photo: aperture. */
export const IconPhoto = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m14.31 8 5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16 3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
  </svg>
);

/** Graphic: vector pen tool. */
export const IconGraphic = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 19 7-7 3 3-7 7-3-3z" />
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="m2 2 7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

/** Reel: portrait frame + play. */
export const IconReel = (p: P) => (
  <svg {...base(p)}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
    <path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor" />
  </svg>
);

export const IconGrid = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);

/** Motion: orbit curve. */
export const IconMotion = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 17c4 0 4-10 9-10s5 10 9 10" />
    <circle cx="3" cy="17" r="1.4" fill="currentColor" />
    <circle cx="21" cy="17" r="1.4" fill="currentColor" />
  </svg>
);

/** Arrow pointing up-left (forward direction in RTL). */
export const IconArrow = (p: P) => (
  <svg {...base(p)}>
    <path d="M17 17 7 7M7 17V7h10" />
  </svg>
);

export const IconPlay = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 8h16M4 16h10" />
  </svg>
);

export const IconEye = (p: P) => (
  <svg {...base(p)}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconInstagram = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
  </svg>
);

export const IconBehance = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 6h5a3 3 0 0 1 0 6H3zM3 12h6a3 3 0 0 1 0 6H3zM14 8h6M14.5 15a3 3 0 0 0 5.5 1M14.5 15a3 3 0 1 1 5.9-.9" />
  </svg>
);

export const IconYoutube = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" />
  </svg>
);
