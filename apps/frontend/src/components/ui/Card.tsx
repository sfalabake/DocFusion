import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({ variant = 'default', className, children, ...props }) => {
  const variants = {
    default: 'bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-800',
    elevated:
      'bg-white dark:bg-secondary-900 rounded-lg shadow-lg shadow-secondary-200/50 dark:shadow-secondary-900/50',
    outlined: 'bg-transparent rounded-lg border-2 border-primary-500',
  };

  return (
    <div className={clsx(variants[variant], className)} {...props}>
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, className, children, ...props }) => {
  return (
    <div className={clsx('px-6 py-4 border-b border-secondary-200 dark:border-secondary-800', className)} {...props}>
      {title && <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{title}</h3>}
      {subtitle && <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">{subtitle}</p>}
      {children}
    </div>
  );
};

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={clsx('px-6 py-4', className)} {...props} />;
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={clsx('px-6 py-4 border-t border-secondary-200 dark:border-secondary-800', className)} {...props} />;
};

export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={clsx(sizes[size], 'animate-spin')}>
      <svg className="w-full h-full text-primary-500" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'default' | 'success' | 'error' | 'warning' }> = ({
  children,
  variant = 'default',
}) => {
  const variants = {
    default: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };

  return <span className={clsx('inline-block px-3 py-1 rounded-full text-xs font-medium', variants[variant])}>{children}</span>;
};

export const Alert: React.FC<{
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  onClose?: () => void;
}> = ({ type, title, message, onClose }) => {
  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
  };

  return (
    <div className={clsx('rounded-lg border p-4', colors[type])}>
      <div className="flex">
        <div className="flex-grow">
          {title && <h3 className="font-semibold">{title}</h3>}
          <p className={title ? 'text-sm mt-1' : 'text-sm'}>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-4 flex-shrink-0 text-lg font-bold opacity-70 hover:opacity-100">
            ×
          </button>
        )}
      </div>
    </div>
  );
};
