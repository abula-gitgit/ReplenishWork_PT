import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { MasterOptions } from '../utils/masterOptions';

interface MasterOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: MasterOptions;
  onSave: (options: MasterOptions) => void;
}

export const MasterOptionModal: React.FC<MasterOptionModalProps> = ({
  isOpen,
  onClose,
  options,
  onSave,
}) => {
  const [locations, setLocations] = useState<string[]>(options.locations);
  const [units, setUnits] = useState<string[]>(options.units);

  const [newLocation, setNewLocation] = useState('');
  const [newUnit, setNewUnit] = useState('');

  if (!isOpen) return null;

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocation.trim() && !locations.includes(newLocation.trim())) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (loc: string) => {
    setLocations(locations.filter((l) => l !== loc));
  };

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUnit.trim() && !units.includes(newUnit.trim())) {
      setUnits([...units, newUnit.trim()]);
      setNewUnit('');
    }
  };

  const handleRemoveUnit = (u: string) => {
    setUnits(units.filter((unit) => unit !== u));
  };

  const handleSave = () => {
    onSave({ locations, units });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Opções mestres da empresa
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalize os locais de armazenamento e unidades de medida
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Locations */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-700 text-sm flex items-center gap-1.5">
              <span>Locais de armazenamento</span>
              <span className="text-xs text-slate-400 font-normal">
                ({locations.length})
              </span>
            </h3>

            <form onSubmit={handleAddLocation} className="flex gap-2">
              <input
                type="text"
                placeholder="Novo local (ex. Piso 1, Zona de caixas...)"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar
              </button>
            </form>

            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200/70">
              {locations.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                >
                  {loc}
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(loc)}
                    className="text-slate-400 hover:text-rose-600 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Units */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-700 text-sm flex items-center gap-1.5">
              <span>Unidades de medida</span>
              <span className="text-xs text-slate-400 font-normal">
                ({units.length})
              </span>
            </h3>

            <form onSubmit={handleAddUnit} className="flex gap-2">
              <input
                type="text"
                placeholder="Nova unidade (ex. rolos, litros, caixas...)"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar
              </button>
            </form>

            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200/70">
              {units.map((u) => (
                <span
                  key={u}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                >
                  {u}
                  <button
                    type="button"
                    onClick={() => handleRemoveUnit(u)}
                    className="text-slate-400 hover:text-rose-600 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end gap-2 shrink-0 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg font-medium transition text-xs sm:text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <Check className="w-4 h-4" />
            <span>Guardar alterações</span>
          </button>
        </div>
      </div>
    </div>
  );
};
