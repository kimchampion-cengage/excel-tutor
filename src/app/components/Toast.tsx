import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  messages: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ messages, onDismiss }: ToastProps) {
  return (
    <>
      <div className="toast-container">
        {messages.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </div>

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 5000;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .toast-container {
            bottom: 10px;
            right: 10px;
            left: 10px;
          }
        }
      `}</style>
    </>
  );
}

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={18} />;
      case 'error':
        return <XCircle size={18} />;
      case 'info':
        return <Info size={18} />;
    }
  };

  const getColor = () => {
    switch (toast.type) {
      case 'success':
        return 'var(--magma-success-border)';
      case 'error':
        return 'var(--magma-danger-border)';
      case 'info':
        return 'var(--magma-info-border)';
    }
  };

  return (
    <>
      <div className={`toast-item toast-${toast.type} ${isExiting ? 'exiting' : ''}`}>
        <div className="toast-icon" style={{ color: getColor() }}>
          {getIcon()}
        </div>
        <div className="toast-message">{toast.message}</div>
      </div>

      <style>{`
        .toast-item {
          background-color: var(--magma-info-bg);
          border-left: 4px solid var(--magma-info-border);
          border-radius: 8px;
          padding: 12px 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 280px;
          max-width: 400px;
          pointer-events: auto;
          animation: slideIn 0.3s ease-out;
        }

        .toast-item.exiting {
          animation: slideOut 0.3s ease-out forwards;
        }

        .toast-item.toast-success {
          background-color: var(--magma-success-bg);
          border-left-color: var(--magma-success-border);
        }

        .toast-item.toast-error {
          background-color: var(--magma-danger-bg);
          border-left-color: var(--magma-danger-border);
        }

        .toast-item.toast-info {
          background-color: var(--magma-info-bg);
          border-left-color: var(--magma-info-border);
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .toast-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .toast-message {
          font-size: 14px;
          color: var(--magma-semantic-body);
          line-height: 1.4;
          flex: 1;
        }

        @media (max-width: 768px) {
          .toast-item {
            min-width: 0;
            max-width: 100%;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}
