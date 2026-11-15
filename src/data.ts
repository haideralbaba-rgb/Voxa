export type Kind = "video" | "photo" | "graphic";

export interface Work {
  id: string;
  kind: Kind;
  title: string;
  meta: string;
  year: string;
  desc: string;
  src: string;
  video?: string;
  /** span in the "all" view */
  span: string;
  /** span when a filter is active */
  fspan: string;
}

export const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const VIDEO_LENS = "https://videos.pexels.com/video-files/2512876/2512876-hd_1920_1080_30fps.mp4";
export const VIDEO_FOREST = "https://videos.pexels.com/video-files/33780469/14338729_1920_1080_30fps.mp4";
export const POSTER_LENS = "https://images.pexels.com/videos/2512876/free-video-2512876.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200";
export const POSTER_FOREST = "https://images.pexels.com/videos/33780469/william-purgert-2-33780469.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200";

export const works: Work[] = [
  {
    id: "w1",
    kind: "video",
    title: "خلف العدسة",
    meta: "فيلم قصير · ٤K",
    year: "٢٠٢٦",
    desc: "رحلة هادئة داخل عالم المصوّر: ضوء، حركة، وتفاصيل صغيرة تصنع الهيبة. أُنتج بالكامل من الفكرة إلى التلوين السينمائي.",
    src: POSTER_LENS,
    video: VIDEO_LENS,
    span: "col-span-2 row-span-2",
    fspan: "col-span-2 row-span-2",
  },
  {
    id: "w2",
    kind: "photo",
    title: "هالة نيون",
    meta: "بورتريه · إضاءة مباشرة",
    year: "٢٠٢٥",
    desc: "سلسلة بورتريه تعتمد على ضوء واحد قاسٍ وخلفية سوداء، لتبقى الملامح هي البطل الوحيد.",
    src: px(10040315, 900, 1300),
    span: "row-span-2",
    fspan: "row-span-2",
  },
  {
    id: "w3",
    kind: "graphic",
    title: "هندسة الأزرق",
    meta: "فن رقمي ثلاثي الأبعاد",
    year: "٢٠٢٥",
    desc: "تكوين تجريدي ثلاثي الأبعاد يختبر التباين بين البارد والدافئ بأشكال هندسية جريئة.",
    src: px(29506601, 900, 900),
    span: "col-span-1 row-span-1",
    fspan: "col-span-2 row-span-2",
  },
  {
    id: "w4",
    kind: "photo",
    title: "شارع لا ينام",
    meta: "تصوير ليلي",
    year: "٢٠٢٥",
    desc: "لقطات ليلية من شوارع مضيئة، التقطت بعدسة مفتوحة وحبيبات فيلم طبيعية.",
    src: px(16061367, 900, 900),
    span: "col-span-1 row-span-1",
    fspan: "col-span-2 row-span-1",
  },
  {
    id: "w5",
    kind: "graphic",
    title: "وردي × سماوي",
    meta: "ملصق · هوية حملة",
    year: "٢٠٢٦",
    desc: "ملصق لحملة إطلاق يعتمد على تدرجات حيّة وأشكال سائلة تلفت العين من أول نظرة.",
    src: px(29450014, 1200, 700),
    span: "col-span-2 row-span-1",
    fspan: "col-span-2 row-span-1",
  },
  {
    id: "w6",
    kind: "photo",
    title: "ظل أحمر",
    meta: "تصوير أزياء",
    year: "٢٠٢٤",
    desc: "جلسة أزياء بإضاءة حمراء مرتدّة، قوام الصورة قائم على الظل أكثر من الضوء.",
    src: px(8108557, 900, 1300),
    span: "row-span-2",
    fspan: "row-span-2",
  },
  {
    id: "w7",
    kind: "video",
    title: "صانع المشاهد",
    meta: "فيديو وثائقي · ريل",
    year: "٢٠٢٥",
    desc: "فيديو وثائقي قصير يتتبع مخرجًا في الطبيعة، بتقطيع إيقاعي ومونتاج مضبوط على الموسيقى.",
    src: POSTER_FOREST,
    video: VIDEO_FOREST,
    span: "col-span-2 row-span-1",
    fspan: "col-span-2 row-span-2",
  },
  {
    id: "w8",
    kind: "graphic",
    title: "موجة برتقالية",
    meta: "رسوم تعبيرية",
    year: "٢٠٢٤",
    desc: "عمل تعبيري يمزج الشكل العضوي بالدقة الرقمية على خلفية دافئة.",
    src: px(9999716, 900, 900),
    span: "col-span-1 row-span-1",
    fspan: "col-span-2 row-span-1",
  },
  {
    id: "w9",
    kind: "photo",
    title: "هونغ كونغ ٣ ص",
    meta: "تصوير شوارع",
    year: "٢٠٢٤",
    desc: "عند الثالثة فجرًا تتحول المدينة إلى لوحة نيون صامتة. لقطة واحدة وانتظار طويل.",
    src: px(40019067, 900, 900),
    span: "col-span-1 row-span-1",
    fspan: "col-span-2 row-span-1",
  },
];

export const kindMeta: Record<Kind, { label: string }> = {
  video: { label: "فيديو" },
  photo: { label: "تصوير" },
  graphic: { label: "جرافيك" },
};

export interface Reel {
  id: string;
  title: string;
  views: string;
  src: string;
  video?: string;
  tag: string;
}

export const reels: Reel[] = [
  { id: "r1", title: "نيون في الظلام", views: "٢٫٤م", src: px(15079026, 700, 1240), tag: "بورتريه" },
  { id: "r2", title: "خلف الكاميرا", views: "١٫٨م", src: POSTER_LENS, video: VIDEO_LENS, tag: "كواليس" },
  { id: "r3", title: "ليل الأحياء", views: "٩٦٠ألف", src: px(18693523, 700, 1240), tag: "شارع" },
  { id: "r4", title: "ضباب ملوّن", views: "١٫١م", src: px(31583974, 700, 1240), tag: "مود" },
  { id: "r5", title: "في الغابة", views: "٣٫٢م", src: POSTER_FOREST, video: VIDEO_FOREST, tag: "وثائقي" },
  { id: "r6", title: "لافتة مضيئة", views: "٧٤٠ألف", src: px(20640206, 700, 1240), tag: "تصوير" },
];

export const services = [
  {
    n: "٠١",
    title: "تصوير فوتوغرافي",
    desc: "بورتريه، منتجات، أزياء وشوارع — إضاءة محسوبة وكادر يحكي قبل أن تقرأ أي كلمة.",
    tags: ["بورتريه", "منتجات", "أزياء", "ليلي"],
    icon: "photo" as const,
    img: px(10040315, 600, 800),
  },
  {
    n: "٠٢",
    title: "إنتاج فيديو وريلز",
    desc: "من السيناريو إلى التلوين: مقاطع قصيرة بإيقاع حاد تُبقي المشاهد حتى الثانية الأخيرة.",
    tags: ["ريلز", "إعلانات", "وثائقي", "مونتاج"],
    icon: "video" as const,
    img: px(15079026, 600, 800),
  },
  {
    n: "٠٣",
    title: "هوية بصرية وجرافيك",
    desc: "شعارات وأنظمة بصرية وملصقات بشخصية جريئة وتباين لا يمكن تجاهله.",
    tags: ["شعارات", "ملصقات", "سوشيال", "تغليف"],
    icon: "graphic" as const,
    img: px(29450014, 600, 800),
  },
  {
    n: "٠٤",
    title: "تحريك وموشن",
    desc: "حركة نظيفة وسلسة بمعدل ٦٠ إطارًا: شعارات متحركة، انتقالات، وعناصر تفاعلية.",
    tags: ["موشن", "لوجو", "انتقالات", "٣D"],
    icon: "motion" as const,
    img: px(29097440, 600, 800),
  },
];
