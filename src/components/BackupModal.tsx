import React, { useRef } from 'react';
import { X, Download, Upload, RefreshCw } from 'lucide-react';
import { ConsumableItem } from '../types/consumable';
import { exportBackup, importBackup } from '../utils/storage';
import { SAMPLE_ITEMS } from '../utils/sampleData';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ConsumableItem[];
  onRestore: (items: ConsumableItem[]) => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  items,
  onRestore,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    exportBackup(items);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await importBackup(file);
      if (
        confirm(
          `Foram encontrados ${imported.length} artigos. Deseja substituir a lista atual?`
        )
      ) {
        onRestore(imported);
        alert('Cópia de segurança restaurada com sucesso.');
        onClose();
      }
    } catch (err: any) {
      alert(`Erro ao importar: ${err.message || 'Formato inválido'}`);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleResetSample = () => {
    if (
      confirm(
        'Deseja restaurar os dados de exemplo em português? As alterações não guardadas serão perdidas.'
      )
    ) {
      onRestore(SAMPLE_ITEMS);
      alert('Dados de exemplo restaurados.');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            Cópia de segurança e dados
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs sm:text-sm">
          <p className="text-slate-600 text-xs">
            Guarde um ficheiro JSON ou restaure noutro dispositivo. Os dados são guardados localmente no seu navegador com total privacidade.
          </p>

          <div className="space-y-2.5">
            <button
              onClick={handleExport}
              className="w-full p-3 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-xl text-blue-700 font-semibold transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar cópia de segurança (JSON)</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-700 font-semibold transition flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Restaurar de ficheiro JSON</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Restaurar dados de exemplo:
              </span>
              <button
                onClick={handleResetSample}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reiniciar amostra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
