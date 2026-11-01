import React, { useState } from 'react';
import { X, Bell, BellRing } from 'lucide-react';
import { requestNotificationPermission, notifyUrgentItems } from '../utils/notifications';
import { CalculatedItem } from '../types/consumable';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CalculatedItem[];
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'default'
  );

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const res = await requestNotificationPermission();
    setPermission(res);
  };

  const handleTestNotification = () => {
    if (permission !== 'granted') {
      alert('Por favor, ative primeiro as permissões de notificação.');
      return;
    }
    notifyUrgentItems(items);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">
              Notificações de reposição
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs sm:text-sm">
          <p className="text-slate-600">
            Receba avisos no seu navegador quando os consumíveis da empresa atingirem o prazo de substituição ou o stock de segurança.
          </p>

          <div className="p-4 rounded-xl border bg-slate-50 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-700 block">
                Estado da permissão:
              </span>
              <span
                className={`text-xs font-semibold ${
                  permission === 'granted'
                    ? 'text-emerald-600'
                    : permission === 'denied'
                    ? 'text-rose-600'
                    : 'text-amber-600'
                }`}
              >
                {permission === 'granted'
                  ? 'Ativo (Permitido)'
                  : permission === 'denied'
                  ? 'Bloqueado pelo navegador'
                  : 'Não configurado'}
              </span>
            </div>

            {permission !== 'granted' && (
              <button
                onClick={handleRequestPermission}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Ativar
              </button>
            )}
          </div>

          {permission === 'granted' && (
            <div className="space-y-2">
              <button
                onClick={handleTestNotification}
                className="w-full p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 font-semibold transition flex items-center justify-center gap-2"
              >
                <BellRing className="w-4 h-4 text-blue-600" />
                <span>Enviar notificação de teste</span>
              </button>
            </div>
          )}

          <div className="text-[11px] text-slate-400 leading-relaxed">
            * Nota: Nos telemóveis, as notificações web funcionam idealmente quando a aplicação é adicionada ao ecrã principal (PWA).
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
