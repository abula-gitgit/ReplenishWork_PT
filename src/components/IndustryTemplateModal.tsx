import React, { useState } from 'react';
import {
  X,
  Briefcase,
  Stethoscope,
  UtensilsCrossed,
  Scissors,
  Wrench,
  Hotel,
  PlusCircle,
} from 'lucide-react';
import { INDUSTRY_TEMPLATES } from '../data/industryTemplates';
import { ConsumableItem } from '../types/consumable';

interface IndustryTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (items: Omit<ConsumableItem, 'id' | 'history'>[]) => void;
}

export const IndustryTemplateModal: React.FC<IndustryTemplateModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
}) => {
  const [selectedId, setSelectedId] = useState<string>(INDUSTRY_TEMPLATES[0].id);

  if (!isOpen) return null;

  const currentTemplate = INDUSTRY_TEMPLATES.find((t) => t.id === selectedId) || INDUSTRY_TEMPLATES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      case 'Hotel':
        return <Hotel className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const handleApply = () => {
    const today = new Date().toISOString().split('T')[0];
    const itemsToAdd = currentTemplate.items.map((item) => ({
      ...item,
      lastReplacedDate: today,
    }));
    onApplyTemplate(itemsToAdd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Modelos de setor para empresas
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adicione consumíveis habituais da sua área de negócio com um só clique
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* Industry tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {INDUSTRY_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedId;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedId(tmpl.id)}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {getIcon(tmpl.icon)}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-bold text-xs truncate">{tmpl.name}</div>
                    <div className="text-[10px] text-slate-400">{tmpl.items.length} artigos</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{currentTemplate.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{currentTemplate.description}</p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
                Artigos incluídos no modelo:
              </span>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {currentTemplate.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-white rounded-lg border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{it.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {it.category} · {it.location} · Ciclo: {it.cycleDays} dias
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-slate-700">
                        {it.quantity} {it.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
          <span className="text-xs text-slate-500">
            Serão adicionados {currentTemplate.items.length} artigos à sua lista.
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg font-medium transition text-xs sm:text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Adicionar modelo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
