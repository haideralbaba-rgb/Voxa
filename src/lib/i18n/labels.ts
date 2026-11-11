import type { ProjectCategory } from '@/lib/types'
import type { Locale } from './copy'

/** Category names live in one place: cards, filters, chips and pages share them. */
const categories: Record<Locale, Record<ProjectCategory, string>> = {
  ar: {
    Brand: 'هوية',
    Editorial: 'تحريري',
    Product: 'منتج',
    Motion: 'حركة',
    Commerce: 'تجارة',
  },
  en: {
    Brand: 'Brand',
    Editorial: 'Editorial',
    Product: 'Product',
    Motion: 'Motion',
    Commerce: 'Commerce',
  },
}

export function categoryLabel(category: ProjectCategory, locale: Locale): string {
  return categories[locale][category] ?? category
}

export const filterLabel: Record<Locale, string> = { ar: 'الكل', en: 'All' }
