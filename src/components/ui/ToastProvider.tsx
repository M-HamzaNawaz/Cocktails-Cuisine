import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

type ToastVariant = 'success' | 'info';

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const toastStyles: Record<ToastVariant, string> = {
  success:
    'border-red-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,250,247,0.98)_100%)] text-slate-700 shadow-[0_14px_34px_rgba(255,76,59,0.12)]',
  info: 'border-slate-200 bg-white/95 text-slate-700 shadow-[0_14px_34px_rgba(15,23,42,0.08)]',
};

const toastIcons = {
  success: FiCheckCircle,
  info: FiInfo,
} satisfies Record<ToastVariant, React.ComponentType<{ className?: string }>>;

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, variant: ToastVariant = 'success') => {
    const id = Date.now() + Math.floor(Math.random() * 1000);

    setToasts((current) => [...current, { id, message, variant }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2600);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-3 top-3 z-[100] flex w-[min(90vw,300px)] flex-col gap-2">
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.variant];
          const iconClass =
            toast.variant === 'success'
              ? 'bg-red-50 text-red-500 ring-1 ring-red-100'
              : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 backdrop-blur ${toastStyles[toast.variant]}`}
              role="status"
              aria-live="polite"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${iconClass}`}
              >
                <Icon className="text-sm" />
              </span>
              <p className="flex-1 text-xs font-medium leading-5">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="rounded-full p-1 text-slate-300 transition hover:bg-slate-100 hover:text-slate-500"
                aria-label="Dismiss notification"
              >
                <FiX className="text-xs" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
