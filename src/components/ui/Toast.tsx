import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-right-8 duration-300 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 text-white border-emerald-500/30 shadow-emerald-950/20'
              : toast.type === 'error'
              ? 'bg-rose-950/90 text-white border-rose-500/30 shadow-rose-950/20'
              : 'bg-slate-900/90 text-white border-slate-700/50 shadow-slate-950/20'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />}

          <div className="flex-1">
            <h4 className="text-sm font-semibold">{toast.title}</h4>
            {toast.message && <p className="text-xs text-slate-300 mt-0.5">{toast.message}</p>}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white transition p-0.5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
