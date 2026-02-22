"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ToastType = "default" | "success" | "error";

type ToastItem = {
  id: string;
  message: string;
  type?: ToastType;
};

type ToastShow = (message: string, type?: ToastType) => void;

const ToastContext = createContext<ToastShow | null>(null);

export function useToast(): ToastShow {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    return () => console.warn("useToast must be used within a ToastProvider");
  }

  return toastContext;
}

export const ToastProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback<ToastShow>((message, type = "default") => {
    setToasts((prev) => [
      ...prev,
      { id: String(Date.now()) + Math.random(), message, type },
    ]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;

    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 4000);

    return () => clearTimeout(timer);
  }, [toasts]);

  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`max-w-sm w-full rounded-md px-4 py-2 shadow-md border ${
                t.type === "error"
                  ? "bg-red-50 border-red-200 text-red-900"
                  : t.type === "success"
                    ? "bg-green-50 border-green-200 text-green-900"
                    : "bg-white border-border text-foreground"
              }`}
            >
              {t.message}
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};
