export interface WorkCategoryOption {
  id: string
  label: string
  code: string
}

export interface WorkPaletteSwatch {
  name: string
  hex: string
}

export interface WorkProject {
  index: string
  slug: string
  title: string
  latinTitle: string
  categoryId: 'identity' | 'editorial' | 'digital' | 'packaging'
  categoryLabel: string
  categoryCode: string
  year: string
  scope: string
  nature: string
  summary: string
  image: string
  imageAlt: string
  aspect: 'portrait' | 'landscape'
  deliverables: string[]
  challenge: string
  approach: string
  outcome: string
  specs: { label: string; value: string }[]
  palette: WorkPaletteSwatch[]
  typography: string
}

export interface ServiceItem {
  index: string
  code: string
  title: string
  summary: string
  details: string
  deliverables: string[]
  timeline: string
}

export interface ProcessStep {
  index: string
  code: string
  title: string
  body: string
  artifact: string
}

export const STUDIO = {
  name: 'VOXA',
  arabicName: 'فوكسـا',
  tagline: 'استوديو تصميم مستقل للهويات والتجارب الرقمية.',
  city: 'كربلاء، العراق',
  cityLatin: 'KARBALA, IRAQ',
  coordinates: '32.6160° N · 44.0249° E',
  timezone: 'Asia/Baghdad',
  timezoneLabel: 'GMT+3',
  email: 'hello@voxa.studio',
  availability: 'متاحون لمشاريع مختارة — الربع القادم',
  socials: [
    { label: 'Instagram', handle: '@voxa.studio', href: 'https://instagram.com' },
    { label: 'Behance', handle: 'behance.net/voxa', href: 'https://behance.net' },
    { label: 'GitHub', handle: '@haideralbaba-rgb', href: 'https://github.com/haideralbaba-rgb' },
    { label: 'X / Twitter', handle: '@voxa_studio', href: 'https://x.com' },
  ],
} as const

export const NAV_LINKS = [
  { id: 'work', label: 'أعمالنا', href: '/#work', code: '01' },
  { id: 'services', label: 'الخدمات', href: '/#services', code: '02' },
  { id: 'process', label: 'المنهجية', href: '/#process', code: '03' },
  { id: 'studio', label: 'الاستوديو', href: '/#studio', code: '04' },
  { id: 'contact', label: 'تواصل', href: '/#contact', code: '05' },
] as const

export const TICKER_ITEMS = [
  { ar: 'هوية بصرية', en: 'BRAND IDENTITY' },
  { ar: 'تصميم رقمي', en: 'DIGITAL CRAFT' },
  { ar: 'تحرير ومطبوعات', en: 'EDITORIAL SYSTEMS' },
  { ar: 'توجيه فني', en: 'ART DIRECTION' },
  { ar: 'تغليف ومنتجات', en: 'PACKAGING' },
  { ar: 'أنظمة تصميم', en: 'DESIGN SYSTEMS' },
  { ar: 'طباعة عربية', en: 'ARABIC TYPOGRAPHY' },
  { ar: 'تجارب ويب', en: 'INTERACTIVE WEB' },
] as const

export const WORK_CATEGORIES: WorkCategoryOption[] = [
  { id: 'all', label: 'الكل', code: 'ALL' },
  { id: 'identity', label: 'هوية بصرية', code: 'IDENTITY' },
  { id: 'editorial', label: 'تحرير ومطبوعات', code: 'EDITORIAL' },
  { id: 'digital', label: 'تصميم رقمي', code: 'DIGITAL' },
  { id: 'packaging', label: 'تغليف وهوية', code: 'PACKAGING' },
]

export const WORK_PROJECTS: WorkProject[] = [
  {
    index: '01',
    slug: 'sadeem-identity',
    title: 'سَديم للمعمار',
    latinTitle: 'Sadeem Architecture',
    categoryId: 'identity',
    categoryLabel: 'هوية بصرية',
    categoryCode: 'IDENTITY',
    year: '2026',
    scope: 'الهوية البصرية والمطبوعات المؤسسية',
    nature: 'دراسة اتجاه بصري · استوديو فوكسـا',
    summary:
      'نظام هوية بصرية لمكتب عمارة معاصر، مبني على الصمت البصري، الحفر البارز على الورق القطني، وحافة كوبالت دقيقة تكسر رتابة الأحادي.',
    image: '/images/work/identity.jpg',
    imageAlt: 'نظام مطبوعات وهوية بصرية لسديم على ورق قطني وحجر ترافرتين مع حواف زرقاء كوبالت',
    aspect: 'portrait',
    deliverables: ['العلامة والرمز الهندسي', 'نظام المطبوعات الورقية', 'دليل استخدام الهوية', 'اختيار الخامات والطباعة'],
    challenge:
      'أراد المكتب لغة بصرية تشبه مبانيه: هادئة، واثقة، لا تعتمد على الزخرفة أو الصخب اللوني، وتبقى صالحة لعقد قادم دون أن تتقادم.',
    approach:
      'اشتققنا الرمز من تقاطع الكتلة والفراغ في المخططات المعمارية. اعتمدنا الحفر الأعمى على ورق قطني ثقيل مع تلوين حواف البطاقات بالأزرق الكوبالت كتوقيع لا يُلاحظ إلا عن قرب.',
    outcome:
      'هوية ملموسة تتحوّل فيها البطاقة والملف إلى قطعة معمارية صغيرة تختصر فلسفة المكتب قبل أن يبدأ الاجتماع.',
    specs: [
      { label: 'التخصص', value: 'هوية بصرية ومطبوعات' },
      { label: 'السنة', value: '2026' },
      { label: 'الخامات', value: 'ورق قطني 600g · حفر أعمى' },
      { label: 'الحالة', value: 'دراسة اتجاه بصري' },
    ],
    palette: [
      { name: 'Cotton Paper', hex: '#EFEBE1' },
      { name: 'Charcoal Ink', hex: '#141416' },
      { name: 'Cobalt Edge', hex: '#2626FF' },
      { name: 'Warm Limestone', hex: '#C7B8A1' },
    ],
    typography: 'Alexandria · IBM Plex Sans Arabic · JetBrains Mono',
  },
  {
    index: '02',
    slug: 'madar-editorial',
    title: 'مَدار الفصلية',
    latinTitle: 'Madar Monograph',
    categoryId: 'editorial',
    categoryLabel: 'تحرير ومطبوعات',
    categoryCode: 'EDITORIAL',
    year: '2026',
    scope: 'التصميم التحريري والشبكة الطباعية',
    nature: 'إصدار تصوري · استوديو فوكسـا',
    summary:
      'إصدار مطبوع حول الضوء والفراغ المعماري في المنطقة؛ شبكة سويسرية منضبطة، هوامش سخية، وشريط قراءة فوسفوري يحدد إيقاع الصفحات.',
    image: '/images/work/editorial.jpg',
    imageAlt: 'كتاب معماري مطبوع مفتوح يعرض صوراً أحادية وتخطيطات هندسية على سطح حجري دافئ',
    aspect: 'landscape',
    deliverables: ['شبكة تحريرية من 12 عموداً', 'تصميم الغلاف والتجليد', 'تنسيق الصور والمخططات', 'الإشراف الطباعي'],
    challenge:
      'المطبوعات المعمارية غالباً ما تزدحم بالنصوص والصور المتزاحمة. الهدف كان ابتكار تجربة قراءة بطيئة تمنح كل صورة ومخطط وزنه الحقيقي.',
    approach:
      'بنينا إيقاعاً متناوباً بين الصفحات الممتلئة والهوامش الواسعة، مع فصل كامل بين الفوتوغرافيا الأحادية والرسوم الخطية الرقيقة للمقاطع الهندسية.',
    outcome:
      'إصدار يُقتنى كمرجع بصري بقدر ما يُقرأ، بوضوح قرائي عالٍ وتوازن دقيق بين الكتلة النصية والفراغ.',
    specs: [
      { label: 'التخصص', value: 'تصميم تحريري ومطبوعات' },
      { label: 'السنة', value: '2026' },
      { label: 'التجليد', value: 'غلاف مقوى · خياطة مسطحة' },
      { label: 'الحالة', value: 'دراسة اتجاه بصري' },
    ],
    palette: [
      { name: 'Uncoated Off-White', hex: '#F4F1EA' },
      { name: 'Graphite Type', hex: '#1E1E20' },
      { name: 'Acid Bookmark', hex: '#A5C938' },
      { name: 'Concrete Grey', hex: '#7A7974' },
    ],
    typography: 'Alexandria · Instrument Serif · VoxMono',
  },
  {
    index: '03',
    slug: 'aether-digital',
    title: 'منصة أثير',
    latinTitle: 'Aether Studio Web',
    categoryId: 'digital',
    categoryLabel: 'تصميم رقمي',
    categoryCode: 'DIGITAL',
    year: '2026',
    scope: 'تصميم الواجهة وتجربة الويب',
    nature: 'نموذج تجربة رقمية · استوديو فوكسـا',
    summary:
      'موقع تحريري وتجربة عرض رقمية تجمع صرامة الشبكة المعمارية وسرعة الاستجابة الفائقة، مع انتقالات مدروسة تخدم السرد لا التشتيت.',
    image: '/images/work/digital.jpg',
    imageAlt: 'شاشة عرض رقمية داكنة على قاعدة حجرية تعرض موقعاً معمارياً بتصميم شبكي ولمسة زرقاء كوبالت',
    aspect: 'landscape',
    deliverables: ['تخطيط تجربة المستخدم UX', 'نظام الواجهات والمكونات', 'التطوير بـ Next.js', 'هندسة الحركة والأداء'],
    challenge:
      'معظم مواقع الاستوديوهات إما ثقيلة وبطيئة بسبب مؤثرات مبالغ فيها، أو باردة ومتشابهة تفقد الشخصية والهوية.',
    approach:
      'صممنا بنية عرض تقوم على تباين المساحات الداكنة والكتل اللونية الجريئة، مع طباعة واضحة وحركة سريعة الاستجابة تحافظ على 60 إطاراً في الثانية.',
    outcome:
      'تجربة تصفح خفيفة ومباشرة تضع الأعمال في الصدارة وتترك انطباعاً احترافياً من الثانية الأولى.',
    specs: [
      { label: 'التخصص', value: 'تصميم وتطوير ويب' },
      { label: 'السنة', value: '2026' },
      { label: 'التقنية', value: 'Next.js · TypeScript · Motion' },
      { label: 'الحالة', value: 'نموذج تجربة رقمية' },
    ],
    palette: [
      { name: 'Obsidian Surface', hex: '#101011' },
      { name: 'Electric Cobalt', hex: '#2626FF' },
      { name: 'Paper White', hex: '#EFEBE1' },
      { name: 'Stone Shadow', hex: '#4E4D49' },
    ],
    typography: 'Alexandria · PlexArabic · VoxMono',
  },
  {
    index: '04',
    slug: 'qatra-packaging',
    title: 'قَطرة للحِرَف',
    latinTitle: 'Qatra Craft Objects',
    categoryId: 'packaging',
    categoryLabel: 'تغليف وهوية',
    categoryCode: 'PACKAGING',
    year: '2025',
    scope: 'تغليف المنتجات والهوية الملموسة',
    nature: 'دراسة تغليف وهوية · استوديو فوكسـا',
    summary:
      'هوية وتغليف لدار خزف ومنتجات حرفية؛ علبة ورقية غير مطلية بختم هندسي أزرق داكن يحوّل لحظة الفتح إلى طقس هادئ.',
    image: '/images/work/packaging.jpg',
    imageAlt: 'إناء خزفي أسود مطفي بجانب علبة تغليف ورقية كريمية مختومة بشريط أزرق هندسي على حجر جيري',
    aspect: 'portrait',
    deliverables: ['تصميم العبوة الهيكلية', 'نظام الأختام والملصقات', 'التوجيه الفني للتصوير', 'مواصفات الإنتاج الصديق للبيئة'],
    challenge:
      'ابتكار تغليف يحمي القطع الخزفية المصنوعة يدوياً ويعكس قيمتها دون إفراط في البلاستيك أو اللمعان التجاري المألوف.',
    approach:
      'اعتمدنا ورقاً طبيعياً غير مطلي بملمس دافئ، واقتصرنا على شريط ختم واحد يحمل رمز العلامة المختزل ليعمل كقفل أمان وهوية في آنٍ واحد.',
    outcome:
      'عبوة قابلة لإعادة الاستخدام والاحتفاظ بها، تتكامل بصرياً مع الخامة الخزفية وتبرز فوراً على الرف أو في الصور.',
    specs: [
      { label: 'التخصص', value: 'تغليف وهوية بصرية' },
      { label: 'السنة', value: '2025' },
      { label: 'الخامات', value: 'ورق معاد تدويره · ختم أزرق مطفي' },
      { label: 'الحالة', value: 'دراسة اتجاه بصري' },
    ],
    palette: [
      { name: 'Raw Paper', hex: '#EAE5D9' },
      { name: 'Matte Ceramic', hex: '#232325' },
      { name: 'Deep Seal Blue', hex: '#1F3A7A' },
      { name: 'Travertine Sand', hex: '#B9A990' },
    ],
    typography: 'Alexandria · PlexArabic',
  },
]

export function getWorkBySlug(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((item) => item.slug === slug)
}

export function getAdjacentWork(slug: string): { prev: WorkProject; next: WorkProject } {
  const idx = WORK_PROJECTS.findIndex((item) => item.slug === slug)
  const safeIdx = idx === -1 ? 0 : idx
  const prev = WORK_PROJECTS[(safeIdx - 1 + WORK_PROJECTS.length) % WORK_PROJECTS.length]!
  const next = WORK_PROJECTS[(safeIdx + 1) % WORK_PROJECTS.length]!
  return { prev, next }
}

export const SERVICES: ServiceItem[] = [
  {
    index: '01',
    code: 'BRAND SYSTEMS',
    title: 'الهوية البصرية وأنظمة العلامات',
    summary: 'من الشعار والطباعة إلى نظام بصري كامل يتحدث بصوت واحد في كل نقطة تماس.',
    details:
      'نبني هويات لا تعتمد على صيحات عابرة؛ نبدأ بفهم الجوهر والمنافسة، ثم نصيغ لغة بصرية مرنة تعمل على الشاشة والمطبوع والعبوة بنفس الثقة.',
    deliverables: ['الشعار والرموز الفرعية', 'الألوان والطباعة العربية واللاتينية', 'أنظمة الشبكة والتخطيط', 'دليل العلامة الشامل'],
    timeline: '٣ – ٥ أسابيع',
  },
  {
    index: '02',
    code: 'DIGITAL & WEB',
    title: 'المواقع والتجارب الرقمية',
    summary: 'مواقع سريعة، تحريرية الطابع، ومبنية بكود نظيف يحترم التفاصيل والأداء.',
    details:
      'نصمّم ونطوّر مواقع استثنائية للاستوديوهات، الشركات الناشئة، والعلامات التجارية — بواجهات عربية أصيلة (RTL أولاً)، حركة هادفة، وتهيئة كاملة لمحركات البحث.',
    deliverables: ['تصميم الواجهات والتجربة UI/UX', 'تطوير Next.js و Tailwind', 'الحركة التفاعلية المحسوبة', 'تحسين السرعة و Core Web Vitals'],
    timeline: '٣ – ٦ أسابيع',
  },
  {
    index: '03',
    code: 'ART DIRECTION',
    title: 'التوجيه الفني والمطبوعات والتحرير',
    summary: 'مطبوعات وكتالوجات وتوجيه تصوير فوتوغرافي يرفع قيمة المنتج بصرياً.',
    details:
      'نحوّل المحتوى إلى إصدارات مطبوعة أو رقمية متماسكة؛ من الكتب والمجلات وملفات التعريف إلى الإشراف على جلسات التصوير واختيار الورق وتقنيات الطباعة.',
    deliverables: ['الكتب والإصدارات الفصلية', 'ملفات الشركات والعروض', 'التوجيه الفني لجلسات التصوير', 'إعداد الملفات للطباعة'],
    timeline: '٢ – ٤ أسابيع',
  },
  {
    index: '04',
    code: 'PACKAGING & MOTION',
    title: 'التغليف والهوية الحركية',
    summary: 'تجارب ملموسة في اليد، وحركة بصرية سلسة تمنح العلامة حياة على الشاشات.',
    details:
      'سواء كان منتجك يُلمس باليد أو يُشاهد على الهاتف، نصوغ عبوات مقتصدة وذكية، وهويات حركية قصيرة تُعرّف بعلامتك خلال ثوانٍ.',
    deliverables: ['تصميم العبوات والملصقات', 'مواصفات الخامات والأختام', 'مبادئ الحركة للعلامة', 'مقاطع تعريفية قصيرة'],
    timeline: '٢ – ٤ أسابيع',
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    code: 'DISCOVERY',
    title: 'الفهم والتشخيص',
    body: 'نستمع بعمق، نطرح الأسئلة غير المريحة، ونحدّد بوضوح ما الذي يجب أن تقوله علامتك ولمن.',
    artifact: 'وثيقة التموضع والأهداف',
  },
  {
    index: '02',
    code: 'DIRECTION',
    title: 'البنية والاتجاه',
    body: 'نضع اتجاهاً فنياً واضحاً يجمع المراجع، الخامات، الإيقاع الطباعي، وبنية التجربة قبل البدء بالتفاصيل.',
    artifact: 'لوحة الاتجاه الفني والهيكل',
  },
  {
    index: '03',
    code: 'CRAFT',
    title: 'الصياغة والتنفيذ',
    body: 'نحوّل الاتجاه إلى نظام حقيقي: تصاميم دقيقة، نماذج تفاعلية، وكود نظيف نراجعه في كل شاشة وحجم.',
    artifact: 'النظام البصري أو المنتج الرقمي',
  },
  {
    index: '04',
    code: 'HANDOVER',
    title: 'التسليم والنمو',
    body: 'نسلّمك كل الملفات المصدرية والأدلة المنظمة لتستطيع وفريقك الاستمرار بثقة واستقلالية كاملة.',
    artifact: 'الأدلة والملفات المصدرية الكاملة',
  },
]

export const CONTACT_SERVICES = [
  'هوية بصرية',
  'موقع وتجربة رقمية',
  'تحرير ومطبوعات',
  'تغليف ومنتجات',
  'هوية وموقع متكامل',
] as const

export const CONTACT_BUDGETS = [
  'أقل من $1,500',
  '$1,500 – $4,000',
  '$4,000 – $10,000',
  'أكثر من $10,000',
] as const
