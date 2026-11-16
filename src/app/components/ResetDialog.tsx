import { X, AlertTriangle } from 'lucide-react';

interface ResetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResetDialog({ isOpen, onClose, onConfirm }: ResetDialogProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <div className="reset-backdrop" onClick={onClose} />
      <div className="reset-dialog">
        <div className="reset-header">
          <div className="warning-icon">
            <AlertTriangle size={24} color="var(--magma-danger-border)" />
          </div>
          <h2 className="reset-title">Reset Current Worksheet?</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="reset-content">
          <p className="reset-message">
            This will clear all data and formulas from the <strong>current worksheet</strong> only. 
            Other worksheets will not be affected. This action cannot be undone.
          </p>

          <div className="reset-warning">
            <strong>⚠️ Warning:</strong> All data and formulas in this worksheet will be permanently deleted.
          </div>

          <div className="reset-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="confirm-btn" onClick={handleConfirm}>
              Reset Worksheet
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .reset-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 2000;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .reset-dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 500px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          z-index: 2001;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease;
          overflow: hidden;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .reset-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          border-bottom: 1px solid #e0e0e0;
          background-color: var(--magma-danger-bg);
          gap: 12px;
        }

        .warning-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reset-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--magma-danger-text);
          margin: 0;
          flex: 1;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: #666;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .close-btn:hover {
          background-color: #e0e0e0;
          color: #333;
        }

        .reset-content {
          padding: 24px;
        }

        .reset-message {
          font-size: 14px;
          line-height: 1.6;
          color: #666;
          margin-bottom: 20px;
        }

        .reset-warning {
          background-color: var(--magma-warning-bg);
          border-left: 4px solid var(--magma-warning-border);
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 13px;
          color: var(--magma-warning-text);
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .reset-warning strong {
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }

        .reset-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .cancel-btn {
          padding: 10px 20px;
          background-color: transparent;
          color: #666;
          border: 1px solid #d0d0d0;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-btn:hover {
          background-color: #f5f5f5;
          border-color: #999;
          color: #333;
        }

        .confirm-btn {
          padding: 10px 20px;
          background-color: #d32f2f;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .confirm-btn:hover {
          background-color: #b71c1c;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
        }

        @media (max-width: 768px) {
          .reset-dialog {
            width: 95%;
          }

          .reset-header {
            padding: 16px;
          }

          .reset-title {
            font-size: 18px;
          }

          .reset-content {
            padding: 16px;
          }

          .reset-message {
            font-size: 13px;
          }

          .reset-actions {
            flex-direction: column;
          }

          .cancel-btn,
          .confirm-btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
