import Link from 'next/link';
import type { Category } from '@/types';
import { getMetafieldValue } from '@/types';

interface CategoryBadgeProps {
  category: Category;
  linked?: boolean;
  size?: 'sm' | 'md';
}

const categoryColors: Record<string, string> = {
  programming: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
  design: 'bg-accent-purple/20 text-accent-purple border-accent-purple/30',
  technology: 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30',
  'digital-marketing': 'bg-accent-pink/20 text-accent-pink border-accent-pink/30',
  'ai-machine-learning': 'bg-accent-green/20 text-accent-green border-accent-green/30',
  default: 'bg-slate-700/50 text-slate-300 border-slate-600/50',
};

function getCategoryColor(slug: string): string {
  return categoryColors[slug] || categoryColors['default'] || 'bg-slate-700/50 text-slate-300 border-slate-600/50';
}

export default function CategoryBadge({ category, linked = false, size = 'sm' }: CategoryBadgeProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const colorClass = getCategoryColor(category.slug);
  const sizeClass = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  const badge = (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${colorClass} ${sizeClass} transition-colors`}
    >
      {name}
    </span>
  );

  if (linked) {
    return (
      <Link href={`/categories/${category.slug}`} className="hover:opacity-80 transition-opacity">
        {badge}
      </Link>
    );
  }

  return badge;
}