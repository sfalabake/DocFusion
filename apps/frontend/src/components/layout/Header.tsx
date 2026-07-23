'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { useLogout } from '@/hooks/useApi';
import { Button } from '@/components/ui';

export default function Header() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { darkMode, toggleDarkMode } = useUIStore();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 flex items-center justify-between px-6">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">Welcome back!</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors"
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 border-l border-secondary-200 dark:border-secondary-800 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-secondary-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-secondary-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
