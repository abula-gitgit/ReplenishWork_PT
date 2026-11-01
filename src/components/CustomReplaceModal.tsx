import React, { useState } from 'react';
import { X, Check, Calendar, Euro, FileText } from 'lucide-react';
import { CalculatedItem } from '../types/consumable';

interface CustomReplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CalculatedItem | null;
  onConfirm: (
    itemId: string,
    replacedDate: string,
    cost?: number,
    note?: string
  ) => void;
}

export const CustomReplaceModal: React.FC<CustomReplaceModalProps> = ({
  isOpen,
  onClose,
  item,
  onConfirm,
}) => {
  const [replacedDate, setReplacedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [cost, setCost] = useState<number | undefined>(item?.cost || 0);
  const [note, setNote] = useState<string>('');

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(item.id, replacedDate, cost, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Registar substituição / reposição
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              Data efetiva da substituição
            </label>
            <input
              type="date"
              required
              value={replacedDate}
              onChange={(e) => setReplacedDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Euro className="w-4 h-4 text-slate-400" />
              Custo desta compra (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={cost ?? ''}
              onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-400" />
              Nota de reposição (opcional)
            </label>
            <input
              type="text"
              placeholder="ex. Promoção no grossista, troca antecipada..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Confirmar reposição</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
