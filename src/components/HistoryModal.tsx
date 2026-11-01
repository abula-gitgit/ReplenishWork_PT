import React from 'react';
import { X, Calendar, FileText, Clock } from 'lucide-react';
import { CalculatedItem } from '../types/consumable';
import { formatDatePortuguese } from '../utils/dateCalc';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CalculatedItem | null;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen || !item) return null;

  const history = item.history || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Histórico de substituições
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{item.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
          {history.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Clock className="w-10 h-10 mx-auto mb-2 stroke-1 text-slate-300" />
              <p>Ainda não existem registos históricos para este artigo.</p>
              <p className="text-xs text-slate-400 mt-1">
                Ao clicar em "Reposto hoje!" ou registar uma troca, o registo será adicionado aqui.
              </p>
            </div>
          ) : (
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 py-2">
              {history.map((record) => (
                <div key={record.id} className="relative pl-6">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between font-semibold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {formatDatePortuguese(record.replacedAt.split('T')[0])}
                      </span>
                      {record.cost !== undefined && record.cost > 0 && (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                          {record.cost.toFixed(2)} €
                        </span>
                      )}
                    </div>

                    {record.previousDaysUsed !== undefined && (
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Utilizado durante {record.previousDaysUsed} dias antes da substituição</span>
                      </div>
                    )}

                    {record.note && (
                      <div className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100 mt-1 flex items-start gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{record.note}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
