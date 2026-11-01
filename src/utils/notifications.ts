import { CalculatedItem } from '../types/consumable';

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    alert('Este navegador não suporta notificações de secretária.');
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  return permission;
}

export function notifyUrgentItems(items: CalculatedItem[]) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const criticalItems = items.filter((i) => i.urgency === 'critical');
  const warningItems = items.filter((i) => i.urgency === 'warning');

  if (criticalItems.length > 0) {
    new Notification('Atenção: Consumíveis para reposição urgente!', {
      body: `${criticalItems.length} artigos requerem substituição ou encomenda imediata (ex. ${criticalItems[0].name}).`,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
    });
  } else if (warningItems.length > 0) {
    new Notification('Aviso: Próxima data de reposição', {
      body: `${warningItems.length} artigos aproximam-se da data de substituição (ex. ${warningItems[0].name}).`,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
    });
  }
}
