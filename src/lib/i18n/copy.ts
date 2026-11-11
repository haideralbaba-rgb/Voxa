/**
 * Bilingual copy.
 *
 * Arabic is the primary language, so the Arabic strings are the source of
 * truth and English is a translation layer beside them — typed so a missing
 * key is a compile error rather than a blank space in production.
 *
 * Rules this file keeps:
 *  - No marketing filler. Every line says something a hiring manager can act on.
 *  - Brand names, stack names and studio names stay in Latin script (they are
 *    product names, not prose).
 *  - Numbers, dates and metrics stay Latin where they are data, and Arabic
 *    where they are prose.
 */

export type Locale = 'ar' | 'en'

export interface Copy {
  /* chrome */
  skipToContent: string
  menu: string
  close: string
  search: string
  searchLabel: string
  themeToDark: string
  themeToLight: string
  soundOn: string
  soundOff: string
  soundEnable: string
  soundMute: string
  languageToggle: string
  backToTop: string
  top: string
  letsTalk: string

  /* ⌘K palette */
  palette: {
    open: string
    title: string
    search: string
    close: string
    placeholder: string
    nothing: string
    switchTheme: string
    themeHint: string
    sound: string
    soundHint: string
    emailHint: string
    navigate: string
    results: string
    groups: { jump: string; work: string; storyboard: string; actions: string; elsewhere: string }
  }

  /* 404 */
  notFound: {
    eyebrow: string
    titleA: string
    titleB: string
    titleC: string
    body: string
    back: string
    tryCase: string
  }

  /* nav */
  nav: Array<{ label: string; href: string }>

  /* hero */
  availability: string
  heroBefore: string
  heroAccent: string
  heroLede: string
  ctaPrimary: string
  ctaSecondary: string
  resume: string
  scrollHint: string
  stats: Array<{ value: string; label: string }>
  basedIn: string
  remote: string
  yearsCraft: string
  trustedBy: string

  /* sections */
  work: {
    index: string
    eyebrow: string
    titleA: string
    titleB: string
    description: string
    filter: string
    empty: string
    haveSimilar: string
    swipe: string
    openCase: string
    filters: Record<string, string>
  }
  about: {
    eyebrow: string
    title: string
    body: string[]
  }
  experience: {
    index: string
    eyebrow: string
    titleA: string
    titleB: string
    description: string
    current: string
    showDetails: string
    showLess: string
    resume: string
    footnote: string
    openTo: string
  }
  skills: {
    index: string
    eyebrow: string
    titleA: string
    titleB: string
    description: string
    howIWork: string
    years: string
    year: string
  }
  testimonials: {
    index: string
    eyebrow: string
    titleA: string
    titleB: string
    description: string
    upNext: string
    previous: string
    next: string
    swipeHint: string
  }
  craft: {
    index: string
    eyebrow: string
    titleA: string
    titleB: string
    description: string
  }
  contact: {
    index: string
    eyebrow: string
    titleA: string
    titleB: string
    lede: string
    copied: string
    copyEmail: string
    availability: string
    availabilityValue: string
    slots: string
    location: string
    name: string
    email: string
    company: string
    budget: string
    message: string
    optional: string
    required: string
    send: string
    sending: string
    successTitle: string
    successBody: string
    sendAnother: string
    namePlaceholder: string
    emailPlaceholder: string
    companyPlaceholder: string
    messagePlaceholder: string
    errors: {
      name: string
      email: string
      messageMin: string
      messageMax: string
      checkFields: string
      body: string
      unreachable: string
      success: string
      successFallback: string
      network: string
    }
  }
  footer: {
    sections: string
    elsewhere: string
    localTime: string
    builtWith: string
    designedBy: string
    rights: string
  }
  storyboard: {
    title: string
    hud: string
    scroll: string
    meta: string
    volume: string
    mechanic: string
    via: string
    scenes: string
    scene: string
    staticTitle: string
  }
  principle: {
    text: string
    label: string
    annotation: string
  }
  marquee: string[]
  caseStudy: {
    openLabel: string
    backToWork: string
    process: string
    metrics: string
    stack: string
    recognition: string
    screens: string
    startProject: string
    startProjectBody: string
    openPage: string
    close: string
    previous: string
    next: string
    built: string
    builtTitle: string
    notFound: string
    allWork: string
    metadataSuffix: string
  }
}

export const ar: Copy = {
  skipToContent: 'تخطَّ إلى المحتوى',
  menu: 'القائمة',
  close: 'إغلاق',
  search: 'بحث',
  searchLabel: 'افتح لوحة الأوامر',
  themeToDark: 'الوضع الليلي',
  themeToLight: 'الوضع النهاري',
  soundOn: 'الصوت مُفعّل',
  soundOff: 'الصوت مُغلق',
  soundEnable: 'تشغيل أصوات الواجهة',
  soundMute: 'إسكات أصوات الواجهة',
  languageToggle: 'تغيير اللغة',
  backToTop: 'إلى الأعلى',
  top: 'أعلى',
  letsTalk: 'لنتحدث',

  palette: {
    open: 'افتح لوحة الأوامر',
    title: 'لوحة الأوامر',
    search: 'ابحث في الموقع',
    close: 'أغلق البحث',
    placeholder: 'اقفز إلى قسم، أو دراسة حالة، أو تقنية…',
    nothing: 'لا شيء يطابق',
    switchTheme: 'بدّل السمة',
    themeHint: 'فاتح / داكن',
    sound: 'أصوات الواجهة',
    soundHint: 'مغلقة افتراضياً',
    emailHint: 'بريد',
    navigate: '↑ ↓ تنقّل · ↵ افتح',
    results: 'نتيجة',
    groups: {
      jump: 'الانتقال إلى',
      work: 'أعمال',
      storyboard: 'ستوري بورد',
      actions: 'إجراءات',
      elsewhere: 'في مكان آخر',
    },
  },

  notFound: {
    eyebrow: 'خارج الشبكة',
    titleA: 'هذه الصفحة لم تتجاوز',
    titleB: 'المراجعة',
    titleC: '.',
    body: 'قد يكون الرابط قديماً، أو انتقلت دراسة الحالة. من هنا أبدأ عادةً.',
    back: 'العودة إلى الملف',
    tryCase: 'جرّب دراسة حالة',
  },

  nav: [
    { label: 'الأعمال', href: '#work' },
    { label: 'ستوري بورد', href: '#story' },
    { label: 'الخبرة', href: '#experience' },
    { label: 'المهارات', href: '#skills' },
    { label: 'آراء', href: '#testimonials' },
    { label: 'تواصل', href: '#contact' },
  ],

  availability: 'متاح لمشروعين في الربع الأول ٢٠٢٧',
  heroBefore: 'أصمّم وأبني منتجات رقمية يتذكّرها',
  heroAccent: 'الناس.',
  heroLede:
    'واجهات وهويات ومتاجر لعلامات ترفض أن تشبه غيرها. عشر سنوات بين هندسة المنتج والحركة وأنظمة التصميم — أُنجزت لفرق في الشرق الأوسط وأوروبا.',
  ctaPrimary: 'شاهد الأعمال',
  ctaSecondary: 'تواصل معي',
  resume: 'السيرة الذاتية',
  scrollHint: 'مرّر للأسفل',
  stats: [
    { value: '+١٠', label: 'سنوات من الإنجاز' },
    { value: '+٤٠', label: 'إطلاق منتج' },
    { value: '٢٫١ث', label: 'وسيط LCP' },
    { value: '٩', label: 'أنظمة تصميم' },
  ],
  basedIn: 'مقرّي',
  remote: 'عن بُعد',
  yearsCraft: 'سنوات خبرة',
  trustedBy: 'عملت مع',

  work: {
    index: '٠١',
    eyebrow: 'أعمال مختارة',
    titleA: 'ستة مشاريع،',
    titleB: 'وهوس واحد.',
    description:
      'افتح أي بطاقة لتقرأ دراسة الحالة كاملة — الموجز، قرارات المعمارية، وما تحرّك فعلاً بعد الإطلاق.',
    filter: 'تصفية',
    empty: 'لا مشاريع في هذا التصنيف.',
    haveSimilar: 'عندك مشروع مشابه؟',
    swipe: 'اسحب',
    openCase: 'افتح دراسة الحالة',
    filters: {
      All: 'الكل',
      Brand: 'هوية',
      Product: 'منتج',
      Commerce: 'تجارة',
      Editorial: 'تحرير',
      Motion: 'حركة',
    },
  },

  about: {
    eyebrow: 'نبذة',
    title: 'عشر سنوات بين ملف التصميم والنسخة الحيّة.',
    body: [
      'كبرت وأنا أفكّ الأشياء لأعرف كيف تعمل، ولم أتوقّف. اليوم أقسّم وقتي بين هندسة المنتج وتصميم التفاعل: أكتب الـTypeScript، وأهتم بمنحنى الحركة، وأحضر الجلسة التي تُتخذ فيها قرارات الاستراتيجية.',
      'معظم عملي يقف على الحدّ بين التصميم والهندسة — أنظمة تصميم تصمد أمام خطة طريق حقيقية، ومواقع تحمّل في أقل من ثانية، وحركة تشرح ولا تُزيّن.',
    ],
  },

  experience: {
    index: '٠٢',
    eyebrow: 'المسار',
    titleA: 'عشر سنوات من',
    titleB: 'إنجاز الأشياء.',
    description:
      'وكالات، شركات منتج، واستوديو خاص. اختر أي دور لتوسيع التفاصيل — كل مدخل هو النسخة التي أدافع عنها في مقابلة.',
    current: 'الحالي',
    showDetails: 'التفاصيل',
    showLess: 'إخفاء',
    resume: 'السيرة الذاتية الكاملة',
    footnote: 'متاح لأدوار هندسة المنتج وهندسة التصميم بمستوى أول.',
    openTo: 'متاح لأدوار أولى في هندسة المنتج وهندسة التصميم.',
  },

  skills: {
    index: '٠٣',
    eyebrow: 'القدرات',
    titleA: 'التقنيات،',
    titleB: 'بتقييم صادق.',
    description:
      'لا «خبير في كل شيء». كل مستوى يعكس عملاً أُطلق وصمد أمام مستخدمين حقيقيين.',
    howIWork: 'كيف أعمل',
    years: 'سنوات',
    year: 'سنة',
  },

  testimonials: {
    index: '٠٤',
    eyebrow: 'آراء',
    titleA: 'ما يقوله',
    titleB: 'من عملت معهم.',
    description:
      'لا توصيات مكتوبة بيدي. كل سطر هنا وصل على بريد بعد إطلاق، وما زلت أحتفظ به.',
    upNext: 'التالي',
    previous: 'السابق',
    next: 'التالي',
    swipeHint: 'اسحب أو استخدم الأسهم',
  },

  craft: {
    index: '٠٥',
    eyebrow: 'الصنعة',
    titleA: 'الصنعة هي',
    titleB: 'الميزانية.',
    description:
      'التقنية لا تستحق العرض إن لم تصمد على اتصال بطيء، وقارئ شاشة، وشخص لا يريد حركة. أربعة التزامات تحمل هذه الصفحة.',
  },

  contact: {
    index: '٠٨',
    eyebrow: 'تواصل',
    titleA: 'لنبنِ شيئاً',
    titleB: 'يستحق التذكّر.',
    lede: 'هوية أو واجهة منتج أو موقع إطلاق يجب أن يصل. احكِ لي شكل المشكلة — أرد خلال يوم عمل، وأقول لا بسرعة إن لم يكن المشروع مناسباً.',
    namePlaceholder: 'اسمك',
    emailPlaceholder: 'name@company.com',
    companyPlaceholder: 'الاستوديو أو الشركة',
    messagePlaceholder: 'ما الذي تبنيه، ولمن، ومتى يجب أن يُطلق؟',
    errors: {
      name: 'اكتب اسمك من فضلك.',
      email: 'يبدو هذا البريد غير صالح.',
      messageMin: 'سياق أوسع يساعد — عشرون حرفاً على الأقل.',
      messageMax: 'أبقِها تحت ٢٠٠٠ حرف من فضلك.',
      checkFields: 'راجع الحقول المعلَّمة من فضلك.',
      body: 'طلب غير صالح.',
      unreachable: 'تعذّر الوصول إلى صندوق البريد. راسلني مباشرة على البريد.',
      success: 'وصلت رسالتك — أرد خلال يوم عمل واحد.',
      successFallback:
        'شكراً، استلمت ملاحظتك. إن لم يصلك رد خلال يوم، راسلني مباشرة على البريد.',
      network: 'انقطاع في الشبكة. حاول مرة أخرى، أو راسلني على البريد مباشرة.',
    },
    copied: 'تم نسخ البريد',
    copyEmail: 'انسخ البريد الإلكتروني',
    availability: 'التوفّر',
    availabilityValue: 'أستقبل الربع الأول ٢٠٢٧',
    slots: 'مقعدان كل ربع',
    location: 'الموقع',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    company: 'الشركة',
    budget: 'الميزانية',
    message: 'الرسالة',
    optional: 'اختياري',
    required: 'مطلوب',
    send: 'أرسل الرسالة',
    sending: 'جارٍ الإرسال',
    successTitle: 'وصلت الرسالة',
    successBody: 'شكراً — وصلتني. أرد خلال يوم عمل.',
    sendAnother: 'أرسل رسالة أخرى',
  },

  footer: {
    sections: 'الأقسام',
    elsewhere: 'في مكان آخر',
    localTime: 'الوقت المحلي',
    builtWith: 'بُني بـ Next.js وTailwind وmotion',
    designedBy: 'صُمّم وكُتب يدوياً',
    rights: 'جميع الحقوق محفوظة',
  },

  storyboard: {
    title: 'ستوري بورد',
    hud: 'ستوري بورد',
    scroll: 'مرّر لتتقدّم اللقطات',
    meta: '١٠ لقطات · ٤٢ ثانية · قابلة للفرك بالاتجاهين',
    volume: 'المجلّد ٠١ — الفيلم',
    mechanic: 'الآلية',
    via: 'عبر',
    scenes: 'لقطات الستوري بورد',
    scene: 'لقطة',
    staticTitle: 'عشر لقطات، حركة واحدة متصلة.',
  },


  principle: {
    text: 'التصميم هو كيف يُحسّ عندما يتحرّك.',
    label: 'مبدأ عمل · ٠١',
    annotation:
      'كل انتقال هنا يجيب سؤالاً كان الزائر يطرحه أصلاً: من أين جاءت البطاقة، ما الذي تغيّر، وهل أستطيع الرجوع. الحركة تستحق مكانها أو تُحذف.',
  },
  marquee: ['هندسة المنتج', 'تصميم التفاعل', 'أنظمة التصميم', 'الحركة', 'الهوية'],
  caseStudy: {
    openLabel: 'افتح دراسة الحالة',
    backToWork: 'كل الأعمال',
    process: 'العملية',
    metrics: 'النتائج',
    stack: 'التقنيات',
    recognition: 'التقدير',
    screens: 'شاشات مختارة',
    startProject: 'محتاج شيئاً مثل هذا؟',
    startProjectBody: 'مقعدان كل ربع — احكِ لي شكل المشكلة.',
    openPage: 'افتح الصفحة',
    close: 'إغلاق',
    previous: 'السابق',
    next: 'التالي',
    built: 'كيف بُني',
    builtTitle: 'الموجز، والقرارات، والنتيجة.',
    notFound: 'دراسة الحالة غير موجودة',
    allWork: 'كل الأعمال',
    metadataSuffix: 'دراسة حالة',
  },
}

export const en: Copy = {
  skipToContent: 'Skip to content',
  menu: 'Menu',
  close: 'Close',
  search: 'Search',
  searchLabel: 'Open the command palette',
  themeToDark: 'Dark mode',
  themeToLight: 'Light mode',
  soundOn: 'Sound on',
  soundOff: 'Sound off',
  soundEnable: 'Enable interface sounds',
  soundMute: 'Mute interface sounds',
  languageToggle: 'Switch language',
  backToTop: 'Back to top',
  top: 'Top',
  letsTalk: "Let's talk",

  palette: {
    open: 'Open command palette',
    title: 'Command palette',
    search: 'Search the site',
    close: 'Close search',
    placeholder: 'Jump to a section, a case study, a technique…',
    nothing: 'Nothing matches',
    switchTheme: 'Switch theme',
    themeHint: 'Light / dark',
    sound: 'Toggle interface sound',
    soundHint: 'Off by default',
    emailHint: 'Email',
    navigate: '↑ ↓ navigate · ↵ open',
    results: 'results',
    groups: {
      jump: 'Jump to',
      work: 'Work',
      storyboard: 'Storyboard',
      actions: 'Actions',
      elsewhere: 'Elsewhere',
    },
  },

  notFound: {
    eyebrow: 'Off the grid',
    titleA: 'This page never made it past',
    titleB: 'review',
    titleC: '.',
    body: 'The link may be old, or the case study may have moved. Here is where I would start.',
    back: 'Back to the portfolio',
    tryCase: 'Try a case study',
  },

  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Storyboard', href: '#story' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],

  availability: 'Available for select projects — Q1 2027',
  heroBefore: 'I design and build digital products people actually',
  heroAccent: 'remember.',
  heroLede:
    'Interfaces, identities and storefronts for brands who refuse to look like everyone else. Ten years of craft across product engineering, motion and design systems — shipped for teams in MENA and Europe.',
  ctaPrimary: 'See the work',
  ctaSecondary: 'Get in touch',
  resume: 'Résumé',
  scrollHint: 'Scroll',
  stats: [
    { value: '10+', label: 'Years shipping' },
    { value: '40+', label: 'Launches' },
    { value: '2.1s', label: 'Median LCP' },
    { value: '9', label: 'Design systems' },
  ],
  basedIn: 'Based in',
  remote: 'remote friendly',
  yearsCraft: 'years of craft',
  trustedBy: 'Trusted by',

  work: {
    index: '01',
    eyebrow: 'Selected work',
    titleA: 'Six builds,',
    titleB: 'one obsession.',
    description:
      'Open any card for the full case study — the brief, the architecture decisions, and what actually moved after launch.',
    filter: 'Filter',
    empty: 'No projects in this category.',
    haveSimilar: 'Have something similar?',
    swipe: 'Swipe',
    openCase: 'Open case study',
    filters: {
      All: 'All',
      Brand: 'Brand',
      Product: 'Product',
      Commerce: 'Commerce',
      Editorial: 'Editorial',
      Motion: 'Motion',
    },
  },

  about: {
    eyebrow: 'About',
    title: 'Ten years between the Figma file and the production build.',
    body: [
      'I grew up taking things apart to see how they worked, and I never really stopped. Today I split my time between product engineering and interaction design: writing the TypeScript, obsessing over the easing curve, and sitting in the room when the strategy gets decided.',
      'Most of my work lives at the seam between design and engineering — design systems that survive a real roadmap, marketing sites that load in under a second, and motion that explains rather than decorates.',
    ],
  },

  experience: {
    index: '02',
    eyebrow: 'Career',
    titleA: 'A decade of',
    titleB: 'finishing things.',
    description:
      'Agency sprints, product orgs, and a studio of my own. Select a role to expand the detail — every entry is the version I would defend in an interview.',
    current: 'Current',
    showDetails: 'Details',
    showLess: 'Hide',
    resume: 'Full résumé',
    footnote: 'Open to senior product-engineering and design-engineering roles.',
    openTo: 'Open to senior product-engineering and design-engineering roles.',
  },

  skills: {
    index: '03',
    eyebrow: 'Capabilities',
    titleA: 'The stack,',
    titleB: 'honestly rated.',
    description:
      'No “expert in everything”. Each level reflects work that shipped and survived contact with real users.',
    howIWork: 'How I work',
    years: 'years',
    year: 'year',
  },

  testimonials: {
    index: '04',
    eyebrow: 'Testimonials',
    titleA: 'What the people',
    titleB: 'I worked with said.',
    description:
      'Nothing here was written by me. Every line arrived by email after a launch, and I still have them.',
    upNext: 'Up next',
    previous: 'Previous',
    next: 'Next',
    swipeHint: 'Swipe or use the arrow keys',
  },

  craft: {
    index: '05',
    eyebrow: 'Craft',
    titleA: 'The craft is the',
    titleB: 'budget.',
    description:
      'Technique is only worth showing if it survives a slow connection, a screen reader and a person who does not want animation. Four commitments hold this page together.',
  },

  contact: {
    index: '08',
    eyebrow: 'Contact',
    titleA: "Let's build something",
    titleB: 'worth remembering.',
    lede: 'Brand systems, product interfaces, or a launch site that has to land. Tell me the shape of the problem — I reply within one working day, and I say no quickly when it is not a fit.',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@company.com',
    companyPlaceholder: 'Studio or company',
    messagePlaceholder: 'What are you building, who is it for, and when does it need to ship?',
    errors: {
      name: 'Please share your name.',
      email: 'That email looks invalid.',
      messageMin: 'A little more context helps — at least 20 characters.',
      messageMax: 'Please keep it under 2000 characters.',
      checkFields: 'Please check the highlighted fields.',
      body: 'Invalid request body.',
      unreachable: 'Could not reach the inbox. Please email me directly.',
      success: 'Thanks — your note landed. I reply within one working day.',
      successFallback:
        'Thanks — I received your note. If you do not hear back within a day, please email me directly.',
      network: 'Network hiccup. Try again, or email me directly.',
    },
    copied: 'Email copied',
    copyEmail: 'Copy the email address',
    availability: 'Availability',
    availabilityValue: 'Booking Q1 2027',
    slots: 'Two slots per quarter',
    location: 'Location',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    budget: 'Budget',
    message: 'Message',
    optional: 'optional',
    required: 'required',
    send: 'Send message',
    sending: 'Sending',
    successTitle: 'Message sent',
    successBody: 'Thanks — your note landed. I reply within one working day.',
    sendAnother: 'Send another',
  },

  footer: {
    sections: 'Sections',
    elsewhere: 'Elsewhere',
    localTime: 'Local time',
    builtWith: 'Built with Next.js, Tailwind & motion',
    designedBy: 'Designed & coded by hand',
    rights: 'All rights reserved',
  },

  storyboard: {
    title: 'Storyboard',
    hud: 'Storyboard',
    scroll: 'Scroll to advance the film',
    mechanic: 'Mechanic',
    via: 'via',
    scenes: 'Storyboard scenes',
    scene: 'Scene',
    staticTitle: 'Ten frames, one continuous move.',
    meta: '10 scenes · 42s · scrubbable both ways',
    volume: 'vol. 01 — the reel',
  },


  principle: {
    text: 'Design is how it feels when it moves.',
    label: 'Working principle · 01',
    annotation:
      'Every transition here answers a question the visitor was already asking: where did that card come from, what changed, and can I go back. Motion earns its place or it gets cut.',
  },
  marquee: ['Product engineering', 'Interaction design', 'Design systems', 'Motion', 'Brand'],
  caseStudy: {
    openLabel: 'Open case study',
    backToWork: 'All work',
    process: 'Process',
    metrics: 'Results',
    stack: 'Stack',
    recognition: 'Recognition',
    screens: 'Selected screens',
    startProject: 'Need something like this?',
    startProjectBody: 'Two project slots per quarter — tell me the shape of the problem.',
    openPage: 'Open page',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    built: 'How it was built',
    builtTitle: 'The brief, the decisions, the outcome.',
    notFound: 'Case study not found',
    allWork: 'All work',
    metadataSuffix: 'case study',
  },
}

export const COPY: Record<Locale, Copy> = { ar, en }
