import { Category } from '../types/consumable';

export const CATEGORIES: Category[] = [
  'Escritório e Papelaria',
  'Higiene e Limpeza',
  'Cozinha e Copa',
  'Saúde e Medicina',
  'Beleza e Estética',
  'Oficina e Manutenção',
  'Hotelaria e Alojamento',
  'Outros e Especiais',
];

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string; accent: string }> = {
  'Escritório e Papelaria': {
    bg: 'bg-blue-50 text-blue-700',
    text: 'text-blue-700',
    border: 'border-blue-200',
    accent: '#2563eb',
  },
  'Higiene e Limpeza': {
    bg: 'bg-emerald-50 text-emerald-700',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    accent: '#059669',
  },
  'Cozinha e Copa': {
    bg: 'bg-amber-50 text-amber-700',
    text: 'text-amber-700',
    border: 'border-amber-200',
    accent: '#d97706',
  },
  'Saúde e Medicina': {
    bg: 'bg-cyan-50 text-cyan-700',
    text: 'text-cyan-700',
    border: 'border-cyan-200',
    accent: '#0891b2',
  },
  'Beleza e Estética': {
    bg: 'bg-rose-50 text-rose-700',
    text: 'text-rose-700',
    border: 'border-rose-200',
    accent: '#e11d48',
  },
  'Oficina e Manutenção': {
    bg: 'bg-orange-50 text-orange-700',
    text: 'text-orange-700',
    border: 'border-orange-200',
    accent: '#ea580c',
  },
  'Hotelaria e Alojamento': {
    bg: 'bg-indigo-50 text-indigo-700',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    accent: '#4f46e5',
  },
  'Outros e Especiais': {
    bg: 'bg-purple-50 text-purple-700',
    text: 'text-purple-700',
    border: 'border-purple-200',
    accent: '#7c3aed',
  },
};
