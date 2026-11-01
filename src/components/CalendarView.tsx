import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { CalculatedItem } from '../types/consumable';
import { getCalendarGrid, formatDatePortuguese } from '../utils/dateCalc';

interface CalendarViewProps {
  items: CalculatedItem[];
  onQuickReplace: (item: CalculatedItem) => void;
  onEdit: (item: CalculatedItem) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  items,
  onQuickReplace,
  onEdit,
}) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    today.toISOString().split('T')[0]
  );

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const weekDayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  const daysGrid = getCalendarGrid(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const selectedItems = items.filter(
    (item) => item.nextReplacementDate === selectedDateStr
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              {monthNames[currentMonth]} {currentYear}
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCurrentYear(today.getFullYear());
                setCurrentMonth(today.getMonth());
                setSelectedDateStr(today.toISOString().split('T')[0]);
              }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
            >
              Hoje
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs text-slate-400 mb-1">
          {weekDayNames.map((d, i) => (
            <div key={d} className={`py-1.5 ${i >= 5 ? 'text-amber-500' : ''}`}>
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-1">
          {daysGrid.map((cell, idx) => {
            const dateItems = items.filter(
              (it) => it.nextReplacementDate === cell.dateStr
            );
            const isSelected = cell.dateStr === selectedDateStr;
            const isToday = cell.dateStr === today.toISOString().split('T')[0];

            return (
              <button
                key={idx}
                onClick={() => setSelectedDateStr(cell.dateStr)}
                className={`min-h-[64px] sm:min-h-[80px] p-1.5 rounded-xl border text-left flex flex-col justify-between transition ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/50'
                    : cell.isCurrentMonth
                    ? 'border-slate-100 bg-white hover:bg-slate-50'
                    : 'border-transparent bg-slate-50/50 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${
                      isToday
                        ? 'bg-blue-600 text-white'
                        : cell.isCurrentMonth
                        ? 'text-slate-700'
                        : 'text-slate-300'
                    }`}
                  >
                    {cell.day}
                  </span>
                  {dateItems.length > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                      {dateItems.length}
                    </span>
                  )}
                </div>

                <div className="space-y-0.5 mt-1 overflow-hidden">
                  {dateItems.slice(0, 2).map((it) => (
                    <div
                      key={it.id}
                      className="text-[10px] truncate px-1 py-0.2 rounded bg-slate-100 text-slate-700 font-medium"
                    >
                      {it.name}
                    </div>
                  ))}
                  {dateItems.length > 2 && (
                    <div className="text-[9px] text-slate-400 pl-1">
                      +{dateItems.length - 2} mais
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Details */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center justify-between">
          <span>Artigos previstos para {formatDatePortuguese(selectedDateStr)}</span>
          <span className="text-xs font-semibold text-slate-500">
            {selectedItems.length} artigos
          </span>
        </h3>

        {selectedItems.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">
            Sem substituições previstas para este dia.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-800 text-sm">{item.name}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    {item.category} · {item.location} · Stock: {item.quantity} {item.unit}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onQuickReplace(item)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition"
                  >
                    Repor
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
