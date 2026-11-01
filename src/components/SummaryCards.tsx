import React from 'react';
import { Package, AlertCircle, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { CalculatedItem } from '../types/consumable';

interface SummaryCardsProps {
  items: CalculatedItem[];
  onFilterChange: (status: 'all' | 'critical' | 'warning' | 'normal') => void;
  activeStatus: 'all' | 'critical' | 'warning' | 'normal';
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  items,
  onFilterChange,
  activeStatus,
}) => {
  const total = items.length;
  const critical = items.filter((i) => i.urgency === 'critical').length;
  const warning = items.filter((i) => i.urgency === 'warning').length;
  const normal = items.filter((i) => i.urgency === 'normal').length;

  const totalCost = items.reduce((sum, item) => {
    return sum + (item.cost || 0) * (item.quantity || 1);
  }, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
      <button
        onClick={() => onFilterChange('all')}
        className={`p-3.5 sm:p-4 rounded-xl text-left border transition ${
          activeStatus === 'all'
            ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-400/20'
            : 'bg-white border-slate-200 hover:border-slate-300'
        } shadow-sm`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-semibold">Total artigos</span>
          <Package className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-slate-800">{total}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">Em controlo</div>
      </button>

      <button
        onClick={() => onFilterChange('critical')}
        className={`p-3.5 sm:p-4 rounded-xl text-left border transition ${
          activeStatus === 'critical'
            ? 'bg-rose-50/80 border-rose-400 ring-2 ring-rose-400/20'
            : 'bg-white border-slate-200 hover:border-slate-300'
        } shadow-sm`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-semibold text-rose-600">Urgente</span>
          <AlertCircle className="w-4 h-4 text-rose-600" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-rose-600">{critical}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">Vencido / Stock baixo</div>
      </button>

      <button
        onClick={() => onFilterChange('warning')}
        className={`p-3.5 sm:p-4 rounded-xl text-left border transition ${
          activeStatus === 'warning'
            ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20'
            : 'bg-white border-slate-200 hover:border-slate-300'
        } shadow-sm`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-semibold text-amber-600">Em breve</span>
          <AlertTriangle className="w-4 h-4 text-amber-600" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-amber-600">{warning}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">Próxima reposição</div>
      </button>

      <button
        onClick={() => onFilterChange('normal')}
        className={`p-3.5 sm:p-4 rounded-xl text-left border transition ${
          activeStatus === 'normal'
            ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-400/20'
            : 'bg-white border-slate-200 hover:border-slate-300'
        } shadow-sm`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-semibold text-emerald-600">Normal</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-emerald-600">{normal}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">Dentro do prazo</div>
      </button>

      <div className="col-span-2 lg:col-span-1 p-3.5 sm:p-4 rounded-xl text-left border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-semibold">Valor inventário</span>
          <TrendingUp className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-slate-800">
          {totalCost > 0 ? `${totalCost.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : '0,00 €'}
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">Estimativa atual</div>
      </div>
    </div>
  );
};
