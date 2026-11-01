import React from 'react';
import { History, FileText, Clock } from 'lucide-react';
import { ConsumableItem } from '../types/consumable';
import { formatDatePortuguese } from '../utils/dateCalc';

interface HistoryTimelineViewProps {
  items: ConsumableItem[];
}

export const HistoryTimelineView: React.FC<HistoryTimelineViewProps> = ({
  items,
}) => {
  const allEvents = items.flatMap((item) =>
    (item.history || []).map((h) => ({
      ...h,
      itemName: item.name,
      category: item.category,
      location: item.location,
    }))
  );

  allEvents.sort(
    (a, b) => new Date(b.replacedAt).getTime() - new Date(a.replacedAt).getTime()
  );

  const totalSpent = allEvents.reduce((sum, ev) => sum + (ev.cost || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Histórico global de substituições
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registo cronológico de reposições, compras e despesas operacionais da empresa.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/80 self-start sm:self-auto">
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Total registos</div>
            <div className="text-lg font-bold text-slate-800">{allEvents.length}</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Total investido</div>
            <div className="text-lg font-bold text-emerald-600">
              {totalSpent.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </div>
          </div>
        </div>
      </div>

      {/* Timeline items */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        {allEvents.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Clock className="w-12 h-12 mx-auto mb-2 text-slate-300 stroke-1" />
            <p className="text-sm font-semibold text-slate-600">Sem registos no histórico</p>
            <p className="text-xs text-slate-400 mt-1">
              As substituições registadas aparecerão aqui organizadas por data.
            </p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 py-2">
            {allEvents.map((ev) => (
              <div key={ev.id} className="relative pl-6">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-slate-800 text-sm">
                        {ev.itemName}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        ({ev.category} · {ev.location})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {ev.cost !== undefined && ev.cost > 0 && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded">
                          {ev.cost.toFixed(2)} €
                        </span>
                      )}
                      <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                        {formatDatePortuguese(ev.replacedAt.split('T')[0])}
                      </span>
                    </div>
                  </div>

                  {ev.previousDaysUsed !== undefined && (
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Ciclo de utilização anterior: {ev.previousDaysUsed} dias</span>
                    </div>
                  )}

                  {ev.note && (
                    <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80 flex items-start gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{ev.note}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
