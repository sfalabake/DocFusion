'use client';

import { useUIStore } from '@/stores/uiStore';
import { Alert } from '@/components/ui';

export default function NotificationCenter() {
  const { notifications, removeNotification } = useUIStore();

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-2 max-w-sm z-50">
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}
