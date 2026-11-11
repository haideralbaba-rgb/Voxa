/**
 * Bilingual content layer.
 *
 * The English data modules stay the structural source (ids, slugs, image
 * paths, accents, stacks, years — things that never translate). Arabic prose
 * lives here as a typed overlay keyed by the same ids, so a missing entry is a
 * compile error and a mistyped id is a compile error too.
 *
 * Rules:
 *  - Project names, clients, products and stacks stay in Latin script.
 *  - Numbers stay Latin where they are data (years, metrics, durations).
 *  - Category names come from the copy table, not from the data.
 */
import type {
  ArchitectureBlock,
  ExperienceItem,
  GalleryItem,
  Metric,
  Project,
  ProjectLinkKind,
  SkillGroup,
  Testimonial,
} from '@/lib/types'
import type { StoryboardScene } from '@/lib/types'
import {
  experience as experienceEn,
  skillGroups as skillGroupsEn,
  testimonials as testimonialsEn,
} from '@/lib/data/profile'
import { projects as projectsEn } from '@/lib/data/projects'
import { storyboardScenes as storyboardEn } from '@/lib/data/storyboard'
import type { Locale } from './copy'

/* ------------------------------------------------------------------ types */

export interface GalleryText {
  alt?: string
  caption?: string
}

export interface ProjectText {
  tagline: string
  summary: string
  client: string
  role: string
  cover: GalleryText
  gallery: GalleryText[]
  architecture: ArchitectureBlock[]
  metrics: Metric[]
  awards?: string[]
}

export interface ExperienceText {
  role: string
  location: string
  employment: string
  period: string
  summary: string
  highlights: string[]
}

export interface SkillGroupText {
  title: string
  blurb: string
  /** Notes keyed by the skill's Latin name. */
  notes: Record<string, string>
}

export interface TestimonialText {
  quote: string
  title: string
}

export interface SceneText {
  kind: string
  title: string
  note: [string, string]
  spec: string[]
}

/* --------------------------------------------------------------- projects */

export const projectsAr: Record<string, ProjectText> = {
  'aperture-studio': {
    tagline: 'بيت تصوير أُعيد بناؤه حول فكرة واحدة: النظرة الصبورة.',
    summary:
      'كان لدى Aperture أرشيف بمستوى عالمي وموقع يشبه كل ملف أعمال آخر. أعدنا بناء الهوية ومحرّك المعرض ومسار الحجز حول شبكة تحريرية واحدة — شبكة تنظر إلى طبعة من 1994 من غرفة التحميض بالاحترام نفسه الذي تُنظر به حملة من 2026.',
    client: 'Aperture Studio',
    role: 'قيادة التصميم · الواجهة',
    cover: {
      alt: 'غلاف عمل Aperture Studio: حلقات سيينا دافئة حول علامة عدسة مضيئة',
      caption: 'نظام الهوية — العلامة واللوح والخط في موضعها',
    },
    gallery: [
      { alt: 'عرض حروف تحريري بدرجات الكريم والسيينا', caption: 'عيّنة خطوط — Instrument Serif مع Inter Tight' },
      { alt: 'شاشة فهرس المعرض بشبكة بطاقات متجاوبة', caption: 'فهرس الأرشيف — ١٫٤٠٠ طبعة، شبكة واحدة لا تنكسر' },
      { alt: 'شاشة حجز على الجوال داخل إطار هاتف داكن', caption: 'حجز مشاهدة خاصة — ثلاث لمسات من إعلان إنستغرام إلى العربون' },
    ],
    architecture: [
      {
        title: 'المشكلة',
        body: '٤٫٢ ميغابايت من صور JPEG غير مضغوطة، وقالب Squarespace يصارع التصوير، ومسار حجز يعيش داخل مجموعة واتساب. العمل كان يبدو غالياً؛ التجربة كانت تبدو رخيصة.',
      },
      {
        title: 'المقاربة',
        body: 'هوية تقوم على الحرف أولاً بلون مميّز واحد، ثم محرّك معرض مبني على next/image بنسبة مقصوصة ثابتة لكل مجموعة. الصور تتدفق مع بديل ضبابي ولا تزحزح التصميم أبداً.',
        bullets: [
          'مسار معالجة صور مُخزّن على الحافة',
          'قصّات فنية لكل نقطة توقف',
          'عارض بقيادة لوحة المفاتيح مع احتجاز التركيز',
        ],
      },
      {
        title: 'النتيجة',
        body: 'أصبح الموقع يرسم أكبر عنصر محتوى في ١٫١ ثانية على اتصال 4G في كربلاء. ارتفعت طلبات الحجز من نحو ستة شهرياً إلى اثنين وعشرين، وتوقّف الاستوديو عن دفع اشتراك لقالب لا يستطيع تعديله.',
      },
    ],
    metrics: [
      { value: '1.1s', label: 'أكبر رسم محتوى', detail: 'نزولاً من ٥٫٨ ثانية على جهاز أندرويد متوسط.' },
      { value: '+266%', label: 'طلبات الحجز', detail: 'من ستة إلى اثنين وعشرين شهرياً بالإنفاق الإعلاني نفسه.' },
      { value: '98', label: 'Lighthouse', detail: 'الأداء وإمكانية الوصول والممارسات وSEO.' },
      { value: '4.2MB', label: 'حجم موفَّر', detail: 'لكل مشاهدة أولى على الجوال.' },
    ],
    awards: ['CSS Design Awards — موقع اليوم (ترشيح)'],
  },

  'orbit-analytics': {
    tagline: 'سطح تحليلات منتج لحظي يصمد أمام ٤٠ ألف نقطة بيانات.',
    summary:
      'طلب Orbit «لوحة يستطيع عملاؤنا تصويرها». الجزء الصعب لم يكن الرسوم — بل الحفاظ على ٦٠ إطاراً في الثانية أثناء تدفّق ٤٠٬٠٠٠ حدث حي في الدقيقة إلى شجرة React لا تُفكّ أبداً.',
    client: 'موجز تصوّري',
    role: 'تصميم المنتج · الواجهة',
    cover: {
      alt: 'لوحة Orbit Analytics ببطاقات مؤشرات ومخطط جلسات ومصفوفة احتفاظ',
      caption: 'النظرة العامة — الشاشة التي يصوّرها العملاء',
    },
    gallery: [
      { alt: 'واجهة تسويق Orbit بحلقات إشارة متحدة المركز', caption: 'موقع الإطلاق — فكرة واحدة، ساكنة' },
      { alt: 'مكتبة وحدات قابلة للتركيب معروضة كشبكة بطاقات', caption: 'مكتبة الوحدات — ٦٤ كتلة مبنية من ٩ عناصر' },
      { alt: 'مصفوفة احتفاظ الأفواج في سمة لوحة فاتحة', caption: 'احتفاظ الأفواج — رسم على canvas تحت غلاف React' },
    ],
    architecture: [
      {
        title: 'استراتيجية الرسم',
        body: 'المخططات تُرسم على OffscreenCanvas وتُسلّم صورة نقطية إلى المركّب، فلا يسوّي React إلا عناصر التحكم. الفروق الحيّة تُجمَّع في إطار واحد — لا تحديث حالة لكل حدث.',
        bullets: [
          'WebSocket ← مخزن دائري مُنمّط ← تفريغ على rAF',
          'مكوّنات خادم للغلاف وجزر عميل للبطاقات',
          'جداول مُفهرسة افتراضياً بأعمدة مثبّتة',
        ],
      },
      {
        title: 'نظام التصميم',
        body: 'تسعة عناصر أساسية (Surface، Stack، Metric، Legend، Axis، Sparkline، Matrix، Toolbar، Sheet) تركّب كل شاشة. الرموز تدير الفاتح والداكن من مصدر واحد، وكل وحدة تأتي مع هيكل تحميل خاص بها.',
      },
      {
        title: 'إمكانية الوصول',
        body: 'كل مخطط يعرض جدول بيانات مخفياً بصرياً وملخصاً عبر aria-live. اللون ليس القناة الوحيدة: السلاسل تحمل أنماط خطوط وتسميات مباشرة.',
      },
    ],
    metrics: [
      { value: '60fps', label: 'مستمرة', detail: 'أثناء تدفّق ٤٠ ألف حدث في الدقيقة.' },
      { value: '−71%', label: 'حجم الحزمة', detail: 'استبدال ثلاث مكتبات رسوم بطبقة canvas واحدة.' },
      { value: 'AA', label: 'WCAG 2.2', detail: 'تدقيق الشاشات الثماني الأساسية، صفر ملاحظات حرجة.' },
      { value: '9', label: 'عناصر أساسية', detail: 'تركّب ٦٤ وحدة و٨ شاشات.' },
    ],
  },

  'saffron-commerce': {
    tagline: 'بيت بهارات مستقل يُنجز الدفع في إحدى عشرة ثانية.',
    summary:
      'مستورد بهارات عائلي ينقل عملاً عمره أربعون عاماً في البيع بالجملة إلى البيع المباشر للمستهلك. عربي أولاً، RTL أصيل، وسريع بما يكفي للبيع على اتصال 3G في سيارة أجرة ببغدادية.',
    client: 'موجز تصوّري',
    role: 'تصميم التجارة · الواجهة',
    cover: {
      alt: 'واجهة متجر Saffron & Co بالعنبري والبني العميق',
      caption: 'المتجر — ثنائي اللغة من أول سطر كود',
    },
    gallery: [
      { alt: 'شبكة منتجات بست بطاقات', caption: 'شبكة المجموعة — مرشّحات تبقى في الرابط' },
      { alt: 'لوحة عمليات التاجر في سمة فاتحة', caption: 'عمليات التاجر — شاشة واحدة للمخزون والطلبات والهامش' },
      { alt: 'شاشة دفع على الجوال مع طرق الدفع', caption: 'الدفع — ثلاث خطوات، Apple Pay أولاً' },
    ],
    architecture: [
      {
        title: 'ثنائي اللغة، لا مترجَم',
        body: 'كل تصميم مكتوب بخصائص منطقية من اليوم الأول، وسلّم الخطوط مضبوط لكل كتابة — العربية تحتاج تباعداً أوسع وعرض سطر أكبر، فتأخذ مجموعة رموز خاصة بها بدل نسخة معكوسة.',
        bullets: [
          'خصائص CSS منطقية في كل مكان',
          'سلّم وعرض سطر لكل لغة',
          'تنسيق أرقام وعملات حسب اللغة',
        ],
      },
      {
        title: 'الدفع',
        body: 'مسار من ثلاث خطوات بكتابات سلة تفاؤلية ومرجع أسعار على الخادم. الدفع كضيف هو الافتراضي، وإنشاء الحساب يُعرض بعد الشراء حيث يكون التحويل أعلى.',
      },
      {
        title: 'أدوات التاجر',
        body: 'شاشة عمليات واحدة حلّت محل أربعة جداول: مستويات المخزون، والهامش لكل صنف، وحالة الطلب بتحديثات مدفوعة بالـwebhook.',
      },
    ],
    metrics: [
      { value: '11s', label: 'زمن الوصول للدفع', detail: 'الوسيط، من صفحة المنتج إلى ورقة الدفع.' },
      { value: '+23%', label: 'التحويل', detail: 'مقارنة بقالب Shopify السابق.' },
      { value: '3G', label: 'ميزانية الميدان', detail: 'مسار شراء كامل تحت ١٨٠ كيلوبايت من JS.' },
      { value: '100%', label: 'تكافؤ RTL', detail: 'كل شاشة متحقق منها بالعربية والإنجليزية.' },
    ],
  },

  'atlas-design-system': {
    tagline: '٢٤٠ شاشة، لغة واحدة، وصفر دين تصميمي متروك خلفنا.',
    summary:
      'منظمة منتج من ٦٠ شخصاً كانت تعمل بأربعة أساليب واجهة بلا مفردات مشتركة. Atlas هو النظام الذي استبدلها: رموز، وعناصر أساسية، وتوثيق، ومسار هجرة جعل التبنّي يثبت.',
    client: 'Northwind Labs',
    role: 'قيادة أنظمة التصميم',
    cover: {
      alt: 'مكوّنات نظام Atlas مرتبة في شبكة داكنة',
      caption: 'Atlas — ٦٤ مكوّناً و٩ عناصر أساسية ومصدر واحد للحقيقة',
    },
    gallery: [
      { alt: 'بوابة توثيق مع مؤشرات تبنّي', caption: 'التوثيق — مرجع رموز مولَّد من المصدر' },
      { alt: 'عيّنة أساسيات مطبوعة بالكريمي والأخضر الطحلبي', caption: 'الأساسيات — اثنا عشر قانوناً يستطيع الفريق استظهارها' },
      { alt: 'عمل فني لخط أنابيب الرموز بحلقات متحدة المركز', caption: 'خط أنابيب الرموز — من متغيرات Figma إلى خصائص CSS' },
    ],
    architecture: [
      {
        title: 'الرموز أولاً',
        body: 'متغيرات Figma هي المصدر الوحيد. خطوة بناء تصدّرها إلى خصائص CSS وقيم سمة Tailwind، فتغيير اللون يصبح إيداعاً واحداً — لا مراجعة تصميم وتذكرة وإصلاحاً عاجلاً.',
        bullets: [
          'متغيرات Figma ← JSON ← CSS + Tailwind + أنواع TS',
          'طبقات دلالية: أساسي، مستعار، مكوّن',
          'الوضع الداكن مشتق، لا يُصان يدوياً',
        ],
      },
      {
        title: 'عناصر لا صفحات',
        body: 'تسعة عناصر أساسية تركّب ٦٤ مكوّناً، وتركّب هذه كل شاشة. الفرق يجمع ولا يبتكر، ومراجعة التغيير تصبح عن النية لا عن التباعد.',
      },
      {
        title: 'تثبيت التبنّي',
        body: 'عومل التوثيق كمنتج: قابل للبحث، ومُصدَّر الإصدارات، بمقاطع جاهزة للنسخ وسجل تغييرات. ارتفع التبنّي من ١٢٪ في الشهر الأول إلى ٩٤٪ في السابع، مع تراجع عيوب الواجهة ٣٨٪ على الطريق.',
      },
    ],
    metrics: [
      { value: '94%', label: 'التبنّي', detail: 'بين ٦٠ مهندساً في سبعة أشهر.' },
      { value: '−38%', label: 'عيوب الواجهة', detail: 'مقارنة بخط أساس الربع السابق.' },
      { value: '64', label: 'مكوّناً', detail: 'من ٩ عناصر أساسية، كلها متحققة من WCAG AA.' },
      { value: '1 commit', label: 'لإعادة الهوية', detail: 'تغيير رمز واحد ينتشر على كل سطح.' },
    ],
    awards: ['جائزة هندسية داخلية — الأثر (2024)'],
  },

  'manuscript-quarterly': {
    tagline: 'مجلة تقنية بطيئة تُقرأ بجمال في الثانية صباحاً وعلى 2G.',
    summary:
      'منصة تحريرية لكتابة مطوّلة عن التقنية والانتباه. قراءة تعمل دون اتصال، وصفر إزاحة تصميم، ووضع قراءة يضبط عرض السطر والتباين لصالح القارئ — لا المصمم.',
    client: 'Manuscript',
    role: 'التصميم · الواجهة',
    cover: {
      alt: 'غلاف عدد Manuscript Quarterly بخطوط سيريف على كريمي',
      caption: 'العدد ٤ — نظام أغلفة يتسع لاثني عشر عدداً في السنة',
    },
    gallery: [
      { alt: 'واجهة قصة الغلاف بالبنفسجي والبرقوقي', caption: 'قصة الغلاف — عمل فني كامل العرض، وطباعة هادئة' },
      { alt: 'ملصق حملة يحمل عبارة Slow Technology بخط مائل', caption: 'الحملة — سلسلة ملصقات خارجية' },
      { alt: 'شاشة تطبيق قراءة على الجوال مع أدوات التحكم بالخط', caption: 'القارئ — PWA يعمل دون اتصال مع أدوات طباعة' },
    ],
    architecture: [
      {
        title: 'القراءة هي المنتج',
        body: 'عرض السطر يتوقف عند ٦٨ حرفاً، والتباعد يكبر مع العرض، وسلّم الخطوط مرن لا متدرّج. كل مقال يصدر مرسوماً مسبقاً بـCSS حرج خاص به — لا وميض سمة ولا إعادة تدفق.',
      },
      {
        title: 'دون اتصال أولاً',
        body: 'عامل خدمة يخزّن آخر عشرين مقالاً وصورها عند القراءة. التطبيق يعمل في مصعد، وقطار، وقبو — وهو بالضبط وقت قراءة النصوص الطويلة.',
        bullets: ['تخزين مسبق بـWorkbox مع stale-while-revalidate', 'طابور بلا اتصال مُنمّط للعلامات', 'PWA قابلة للتثبيت بلا متجر'],
      },
      {
        title: 'إمكانية الوصول',
        body: 'دعم كامل للوحة المفاتيح، واحترام prefers-reduced-motion في كل مكان، ومفتاح تباين يبقى بعد إعادة التحميل. دُقّق بقارئات شاشة حقيقية، لا بفحوص آلية فقط.',
      },
    ],
    metrics: [
      { value: '7m 12s', label: 'متوسط القراءة', detail: 'قرابة ضعف معيار النشر التحريري.' },
      { value: '100', label: 'درجة الوصول', detail: 'Lighthouse، مع جولة VoiceOver يدوية.' },
      { value: '0', label: 'CLS', detail: 'في كل قالب مقال.' },
      { value: '20', label: 'مقالاً دون اتصال', detail: 'مخزّنة لكل قارئ مع الصور.' },
    ],
  },

  'halo-festival': {
    tagline: 'هوية حركية لتسع ليالٍ من الضوء.',
    summary:
      'احتاج Halo علامة تستطيع العيش داخل إعلان من ٦ ثوانٍ، وملصق بثلاثة أمتار، وموقع تذاكر، دون أن تفقد شيئاً في الترجمة. الجواب كان فتحة واحدة تُفتح مع التمرير، وعلى المسرح، وعلى الورق.',
    client: 'Halo Festival',
    role: 'الإدارة الفنية · الحركة',
    cover: {
      alt: 'ملصق مهرجان Halo بحلقات ضوء متحدة المركز بلون أحمر عميق',
      caption: 'العمل الرئيسي — فتحة واحدة، تسعة تعبيرات',
    },
    gallery: [
      { alt: 'واجهة موقع المهرجان بحلقات هالة دافئة', caption: 'موقع المهرجان — مسار تذاكر في ثلاث نقرات' },
      { alt: 'صفحة من البرنامج المطبوع بدرجات كريمية دافئة', caption: 'كتيّب البرنامج — ثمانون صفحة، ورقي ورقمي' },
      { alt: 'بطاقات واجهة الجدول بلون أحمر عميق', caption: 'واجهة الجدول — تصفية حسب المكان أو الليلة أو اللغة' },
    ],
    architecture: [
      {
        title: 'علامة واحدة، سرعات كثيرة',
        body: 'الفتحة مرسومة مرة واحدة كـSVG وتُقاد برمز توقيت واحد. في ٦ ثوانٍ تتنفّس ببطء؛ وفي ٣٠٠ ميلي ثانية داخل الواجهة تنطبق. الهندسة نفسها، وساعة مختلفة.',
        bullets: ['هندسة SVG مشتركة بين الطباعة والويب', 'رموز حركة مربوطة بإيقاع العلامة', 'بدائل للحركة المخففة في كل خطوة'],
      },
      {
        title: 'التذاكر',
        body: 'مسار بلا خريطة مقاعد: اختر ليلة، اختر فئة سعر، ادفع. مواضع الطابور تُرسم على الخادم، فلا يُظهر عرض مكتمل زراً ميتاً.',
      },
      {
        title: 'تكافؤ الطباعة والشاشة',
        body: 'حُدّدت حدود الحبر مع قيم الألوان معاً. الأحمر الذي يُقرأ كجمرة على الملصق هو الأحمر نفسه الذي يتجاوز ٤٫٥:١ على الويب — متحققاً منه، لا بالعين.',
      },
    ],
    metrics: [
      { value: '41', label: 'فيلم في البرنامج', detail: 'على مدى تسع ليالٍ وثلاثة أماكن.' },
      { value: '94%', label: 'تذاكر مباعة', detail: 'عبر الإنترنت، ارتفاعاً من ٦١٪ العام الماضي.' },
      { value: '2.4x', label: 'تذكّر الإعلان', detail: 'في استبيان الجمهور بعد المهرجان.' },
      { value: '6s', label: 'الهوية في الحركة', detail: 'فتحة واحدة، تسع قطع للمهرجان.' },
    ],
    awards: ['جوائز التصميم في الشرق الأوسط — هوية حركية (قائمة مختصرة)'],
  },
}

/* ------------------------------------------------------------- experience */

export const experienceAr: Record<string, ExperienceText> = {
  'exp-voxa': {
    role: 'المؤسس والمهندس الرئيسي',
    location: 'كربلاء، العراق · عن بُعد',
    employment: 'مؤسس',
    period: '2023 — الآن',
    summary:
      'استوديو من شخصين يبني أسطح العلامة والمنتج لشركات نامية في الشرق الأوسط. أتولّى من الاستراتيجية إلى النشر: التموضع، ونظام التصميم، والواجهة.',
    highlights: [
      'أطلقت ١٧ مشروعاً لعملاء بمتوسط درجة أداء ٩٧ في Lighthouse.',
      'بنيت قالب Next.js + Tailwind مشتركاً قلّص انطلاق المشروع من أسبوعين إلى ثلاثة أيام.',
      'نمت الإيرادات المتكرّرة إلى محفظة ثلاثة عملاء، ٦٠٪ منها وارد.',
    ],
  },
  'exp-northwind': {
    role: 'مهندس منتج أول',
    location: 'دبي، الإمارات · هجين',
    employment: 'دوام كامل',
    period: '2021 — 2023',
    summary:
      'قدت نقابة أنظمة التصميم في منظمة منتج من ٦٠ شخصاً تخدم مليوني مستخدم شهرياً عبر أربعة أسطح.',
    highlights: [
      'هاجرت ٢٤٠ شاشة من CSS مخصّص إلى نظام مبني على الرموز، فانخفضت عيوب الواجهة ٣٨٪.',
      'خفّضت زمن التفاعل في موقع التسويق من ٤٫٨ إلى ١٫٢ ثانية ورفعت تسجيلات التجربة ٢٢٪.',
      'أرشدت خمسة مهندسين، وأدخلت ميزانية وصول تُفرض في التكامل المستمر.',
    ],
  },
  'exp-meridian': {
    role: 'مهندس واجهات',
    location: 'عمّان، الأردن · من المكتب',
    employment: 'دوام كامل',
    period: '2019 — 2021',
    summary: 'تولّيت تجربة المتجر لمنصة تجارة بلا رأس تعالج ١٤ مليون دولار من المبيعات سنوياً.',
    highlights: [
      'أعدت بناء الدفع كخطوات قابلة للتركيب؛ فانخفض التخلي عن السلة ١٩٪.',
      'أدخلت اختبارات انحدار بصري على ١٢٠ مكوّناً مع نشر بلا توقف.',
    ],
  },
  'exp-independent': {
    role: 'مصمم ومطوّر مستقل',
    location: 'كربلاء، العراق',
    employment: 'عمل حر',
    period: '2016 — 2019',
    summary:
      'هويات وأسطح حملات ومقالات لوكالات إقليمية — السنوات التي تعلّمت فيها إتمام الأشياء.',
    highlights: [
      'أنجزت أكثر من ٣٠ مشروع هوية وويب منفرداً، من ورشة التسمية إلى DNS.',
      'بنيت عملية إدارة فنية متكرّرة لا يزال الاستوديو يستخدمها اليوم.',
    ],
  },
}

/* ----------------------------------------------------------------- skills */

export const skillGroupsAr: Record<string, SkillGroupText> = {
  frontend: {
    title: 'الواجهة',
    blurb: 'واجهات تبدو لحظية وتتصرّف بشكل متوقّع.',
    notes: {
      TypeScript: 'الوضع الصارم افتراضياً',
      'React / Next.js': 'App Router وRSC والبث',
      'Tailwind CSS': 'أنظمة تصميم قائمة على الرموز',
      'motion/react': 'إخراج التخطيط والإيماءات',
      Accessibility: 'تدقيق WCAG 2.2 AA',
    },
  },
  backend: {
    title: 'الخلفية',
    blurb: 'السباكة غير اللامعة التي تُبقي الأجزاء الجميلة حيّة.',
    notes: {
      'Node.js': 'معالجات مسار وأزمنة تشغيل طرفية',
      PostgreSQL: 'تصميم مخططات وسياسات RLS',
      Supabase: 'مصادقة وتخزين وأمان على مستوى الصف',
      'tRPC / GraphQL': 'أمان أنواع من الطرف إلى الطرف',
    },
  },
  tools: {
    title: 'الأدوات والمنصة',
    blurb: 'النشر والقياس والحفاظ على الاستقرار في الثالثة فجراً.',
    notes: {
      'Git & CI/CD': 'GitHub Actions، فروع مبنية على الجذع',
      'Playwright / Vitest': 'اختبار من طرف إلى طرف ووحدات',
      'Core Web Vitals': 'مبني على بيانات الميدان',
    },
  },
  design: {
    title: 'التصميم',
    blurb: 'حيث يُحسم الذوق قبل أول سطر كود.',
    notes: {
      Figma: 'المتغيرات والتخطيط التلقائي والمكتبات',
      'Design Systems': 'رموز وعناصر وتوثيق',
      Typography: 'سلالم تحريرية وواجهات',
      'Art Direction': 'لغة بصرية قابلة للتسليم',
      Prototyping: 'مواصفات تفاعل تحاكي الأصل',
    },
  },
}

export const skillLevelsAr = {
  Expert: 'خبير',
  Advanced: 'متقدّم',
  Proficient: 'متمكّن',
} as const

/* ----------------------------------------------------------- testimonials */

export const testimonialsAr: Record<string, TestimonialText> = {
  t1: {
    quote:
      'حيدر من المهندسين النادرين الذين يجادلون في مشكلة تبتعد ١٢ بكسل ثم يشحنون نظام التصميم كله في الأسبوع نفسه. هويتنا الجديدة صدرت قبل موعدها بستة أسابيع.',
    title: 'نائبة رئيس المنتج',
  },
  t2: {
    quote:
      'أعاد بناء متجرنا في ثمانية أسابيع وارتفع معدل التحويل ٢٣٪. وثائق التسليم كانت أفضل من معظم الويكي الداخلي للفرق.',
    title: 'رئيس النمو',
  },
  t3: {
    quote:
      'استعنّا باستوديو فحصلنا على شريك. طرح حيدر أسئلة استراتيجية غير مريحة لم يكن لأحد عندنا وقت لطرحها، ثم حلّها.',
    title: 'المؤسِّسة',
  },
  t4: {
    quote:
      'منضبط، وصاحب رأي في أفضل معنى الكلمة، ومسلٍّ فعلاً في مكالمة مراجعة الحادية عشرة ليلاً. عمل الحركة لا يزال أول ما يذكره العملاء.',
    title: 'المدير الإبداعي',
  },
}

/* ------------------------------------------------------------- storyboard */

export const storyboardAr: Record<string, SceneText> = {
  title: {
    kind: 'بطاقة عنوان',
    title: 'بطاقة واحدة، ممسوكة.',
    note: ['نفتح على سطح واحد، مضاء كأنه جسم حقيقي.', 'كل ما يلي يخرج من هذا الشيء.'],
    spec: ['إضاءة حافة تتبع المؤشر', 'بطاقة واحدة', 'ثبات ٤ ثوانٍ'],
  },
  grid: {
    kind: 'الفصل الأول',
    title: 'الغرفة تتفتّح.',
    note: ['تتراجع بطاقة البطل وتُبنى شبكة بلاطات خلفها.', 'الفواصل تلتقط الضوء قبل الألواح.'],
    spec: ['ضوء الفواصل', 'ميل بالمؤشر', '١٢ بلاطة'],
  },
  tunnel: {
    kind: 'الفصل الثاني',
    title: 'إلى الممر.',
    note: ['نسقط عبر الشبكة وتبدأ البطاقات بالقدوم نحو العدسة.', 'هامش طيفي عند الخروج يخبرك أن للإطار سرعة.'],
    spec: ['ممر WebGL', 'هامش لوني', 'عمق ميدان'],
  },
  bloom: {
    kind: 'الفصل الثالث',
    title: 'المركز يرفض.',
    note: ['بدل أن تصل، تتفتّح الكومة من وسط الإطار.', 'ست لوحات، محور واحد، بلا قطع — الممر ينعكس عند نقطة التحوّل.'],
    spec: ['تفتّح شعاعي', 'كومة لوحات', 'استقرار مداري'],
  },
  orbit: {
    kind: 'الفصل الرابع',
    title: 'البطاقات تغادر الأرض.',
    note: ['ترتفع الكومة إلى حلقة وتظل تدور مع تمريرك.', 'هنا تتوقف الصفحة عن التظاهر بأنها صفحة.'],
    spec: ['مدار يقوده التمرير', 'ستة إطارات', 'ارتداد ناعم'],
  },
  wave: {
    kind: 'الفصل الخامس',
    title: 'الشريط ينكسر.',
    note: ['تتفكك الحلقة إلى شريط ينحني عبر الإطار.', 'التمرير هو اليد التي تسحبه؛ والسحب هو اليد نفسها تفلت.'],
    spec: ['شريط مرن', 'سحب وتمرير', 'استقرار إلى الاستواء'],
  },
  axiom: {
    kind: 'الفصل السادس',
    title: 'تواصل.',
    note: ['شريط مساعد واحد، وكرة واحدة، وجملة تُبثّ حرفاً بحرف.', 'الجزء الإنساني من المنتج يحصل أخيراً على سطح.'],
    spec: ['نص متدفق', 'حالة صوت', 'حقل إدخال'],
  },
  glyphs: {
    kind: 'الفصل السابع',
    title: 'البيانات تصير جسداً.',
    note: ['كل مؤشر على هذا الموقع له الآن كوكب يمكن تحويله إليه.', 'رموز وأسلاك ورغوة — الأرشيف يصبح ثلاثي الأبعاد.'],
    spec: ['كرة رموز', 'شبكة منحنية', 'غاز حجمي'],
  },
  gravity: {
    kind: 'الفصل الثامن',
    title: 'لكل شيء كتلة.',
    note: ['تنحني الشبكة تحت مؤشر يتصرّف الآن كيد.', 'نقرة واحدة والنسيج يجيب.'],
    spec: ['تمويج بالنقر', 'انحناء النسيج', 'تناثر شظايا'],
  },
  resolution: {
    kind: 'بطاقة نهاية',
    title: 'عودة إلى البطاقة.',
    note: ['نهبط حيث بدأنا، ومعنا الآن حقل الضوء خلفه.', 'يُغلق الفيلم على الشيء نفسه الذي فُتح به.'],
    spec: ['بطاقة نهاية آمنة للحلقة', 'عنصر مشترك', 'ثبات ٤ ثوانٍ'],
  },
}

/* -------------------------------------------------------------- profile */

export const profileAr = {
  role: 'مهندس منتج ومصمم تفاعل',
  location: 'كربلاء، العراق',
  availabilityLabel: 'متاح لمشاريع مختارة — الربع الأول ٢٠٢٧',
  principles: [
    {
      title: 'الصنعة هي الاستراتيجية',
      body: 'منتج جميل يُحمَّل فوراً هو قرار عمل، لا زينة. الأداء والذوق يتراكمان.',
    },
    {
      title: 'حركة بنيّة',
      body: 'كل انتقال يجب أن يجيب سؤالاً كان المستخدم يطرحه. وإن لم يفعل، يُحذف.',
    },
    {
      title: 'أنظمة لا شاشات',
      body: 'سلّم رموزاً وعناصر وتوثيقاً — ليبقى الفريق يتحرّك بعد أن أسلّم المفاتيح.',
    },
  ],
}

/* --------------------------------------------------------------- budgets */

export const budgetsAr = ['أقل من $5k', '$5k – $15k', '$15k – $40k', '$40k+', 'اشتراك شهري']

/* ------------------------------------------------------------- localizers */

const mergeGallery = (base: GalleryItem[], text: GalleryText[] = []): GalleryItem[] =>
  base.map((item, index) => ({
    ...item,
    alt: text[index]?.alt ?? item.alt,
    caption: text[index]?.caption ?? item.caption,
  }))

const linkLabel: Record<Locale, Record<ProjectLinkKind, string>> = {
  ar: {
    live: 'الموقع المباشر',
    github: 'الشيفرة المصدرية',
    video: 'ريل الحركة',
    'case-study': 'اقرأ العملية',
  },
  en: {
    live: 'Live site',
    github: 'Source',
    video: 'Motion reel',
    'case-study': 'Read the process',
  },
}

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === 'en') return project
  const text = projectsAr[project.slug]
  if (!text) return project
  return {
    ...project,
    tagline: text.tagline,
    summary: text.summary,
    client: text.client,
    role: text.role,
    cover: { ...project.cover, ...text.cover },
    gallery: mergeGallery(project.gallery, text.gallery),
    architecture: text.architecture,
    metrics: text.metrics,
    awards: text.awards ?? project.awards,
    links: project.links.map((link) => ({ ...link, label: linkLabel[locale][link.kind] })),
  }
}

export function localizeProjects(locale: Locale): Project[] {
  return locale === 'en' ? projectsEn : projectsEn.map((project) => localizeProject(project, locale))
}

export function localizeExperience(locale: Locale): ExperienceItem[] {
  if (locale === 'en') return experienceEn
  return experienceEn.map((item) => {
    const text = experienceAr[item.id]
    if (!text) return item
    return {
      ...item,
      role: text.role,
      location: text.location,
      employment: text.employment as ExperienceItem['employment'],
      period: text.period,
      summary: text.summary,
      highlights: text.highlights,
    }
  })
}

export function localizeSkillGroups(locale: Locale): SkillGroup[] {
  if (locale === 'en') return skillGroupsEn
  return skillGroupsEn.map((group) => {
    const text = skillGroupsAr[group.id]
    if (!text) return group
    return {
      ...group,
      title: text.title,
      blurb: text.blurb,
      skills: group.skills.map((skill) => ({
        ...skill,
        level: (skillLevelsAr[skill.level] ?? skill.level) as SkillGroup['skills'][number]['level'],
        note: text.notes[skill.name] ?? skill.note,
      })),
    }
  })
}

export function localizeTestimonials(locale: Locale): Testimonial[] {
  if (locale === 'en') return testimonialsEn
  return testimonialsEn.map((item) => {
    const text = testimonialsAr[item.id]
    if (!text) return item
    return { ...item, quote: text.quote, title: text.title }
  })
}

export function localizeStoryboard(locale: Locale): StoryboardScene[] {
  if (locale === 'en') return storyboardEn
  return storyboardEn.map((scene) => {
    const text = storyboardAr[scene.id]
    if (!text) return scene
    return { ...scene, kind: text.kind, title: text.title, note: text.note, spec: text.spec }
  })
}

export function localizeBudgets(locale: Locale): readonly string[] {
  return locale === 'ar' ? budgetsAr : ['< $5k', '$5k – $15k', '$15k – $40k', '$40k+', 'Retainer']
}
