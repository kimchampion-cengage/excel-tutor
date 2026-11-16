import { X, FileSpreadsheet, MessageSquare, CheckCircle, FileText, Play, BookOpen } from 'lucide-react';
import { Button, Heading, Paragraph } from 'react-magma-dom';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>

          <div className="modal-header">
            <div className="modal-icon">
              <FileSpreadsheet size={28} color="#666" />
            </div>
            <Heading level={1} className="modal-title">Excel Learning Simulator</Heading>
            <Paragraph className="modal-subtitle">
              Data Preparation & Statistical Analysis Project
            </Paragraph>
          </div>

          <div className="modal-body">
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon-wrapper">
                  <FileSpreadsheet size={20} color="#666" />
                </div>
                <h3 className="step-title">1. Import & Clean</h3>
                <p className="step-description">Load data and check for quality issues</p>
              </div>

              <div className="step-card">
                <div className="step-icon-wrapper">
                  <CheckCircle size={20} color="#666" />
                </div>
                <h3 className="step-title">2. Create Variables</h3>
                <p className="step-description">Add formulas for calculated columns</p>
              </div>

              <div className="step-card">
                <div className="step-icon-wrapper">
                  <MessageSquare size={20} color="#666" />
                </div>
                <h3 className="step-title">3. Build Statistics</h3>
                <p className="step-description">Create descriptive stats on new sheet</p>
              </div>

              <div className="step-card">
                <div className="step-icon-wrapper">
                  <FileText size={20} color="#666" />
                </div>
                <h3 className="step-title">4. Write Reflection</h3>
                <p className="step-description">Document your methodology (100-150 words)</p>
              </div>
            </div>

            <div className="tips-box">
              <strong>💡 Quick Tips:</strong> Formulas start with <code>=</code> • Work auto-saves • Create new worksheets with the <strong>+</strong> button
            </div>
          </div>

          <div className="modal-footer">
            <Button className="start-button" onClick={onClose}>
              <Play size={18} />
              Get Started
            </Button>
            <p className="footer-note">
              Click <strong>Help</strong> in the toolbar to see this again
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }

        .modal-content {
          background-color: white;
          border-radius: 16px;
          max-width: 640px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          animation: modalSlideIn 0.3s ease-out;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 1;
          opacity: 0.9;
        }

        .modal-close-btn:hover {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          text-align: center;
          padding: 32px 32px 24px 32px;
          background: #f5f5f5;
          color: #333;
          border-radius: 16px 16px 0 0;
          border-bottom: 2px solid #e0e0e0;
        }

        .modal-icon {
          width: 56px;
          height: 56px;
          background-color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #333;
        }

        .modal-subtitle {
          font-size: 14px;
          margin: 0;
          opacity: 0.8;
          font-weight: 400;
          color: #666;
        }

        .modal-body {
          padding: 24px 32px;
          overflow-y: auto;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .step-card {
          background-color: #f8f9fa;
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          border: 2px solid transparent;
          transition: all 0.2s;
        }

        .step-card:hover {
          border-color: #e0e0e0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .step-icon-wrapper {
          width: 40px;
          height: 40px;
          background-color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px auto;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .step-title {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 6px 0;
          color: #333;
        }

        .step-description {
          margin: 0;
          font-size: 13px;
          line-height: 1.4;
          color: #666;
        }

        .tips-box {
          background-color: var(--magma-info-bg);
          padding: 12px 16px;
          border-radius: 8px;
          border-left: 3px solid var(--magma-info-border);
          font-size: 13px;
          line-height: 1.5;
          color: var(--magma-info-text);
        }

        .tips-box strong {
          color: #333;
        }

        .tips-box code {
          background-color: #fff;
          padding: 2px 5px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #666;
          border: 1px solid #e0e0e0;
        }

        .modal-footer {
          padding: 0 32px 28px 32px;
          text-align: center;
        }

        .footer-note {
          margin: 12px 0 0 0;
          font-size: 11px;
          color: #666;
          line-height: 1.4;
        }

        .footer-note strong {
          color: #666;
        }

        .start-button {
          background: #666;
          color: white;
          border: none;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .start-button:hover {
          background: #555;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .start-button:active {
          transform: translateY(0);
          background: #444;
        }

        @media (max-width: 768px) {
          .modal-content {
            max-height: 95vh;
            margin: 10px;
          }

          .modal-header {
            padding: 28px 24px 20px 24px;
          }

          .modal-icon {
            width: 48px;
            height: 48px;
          }

          .modal-title {
            font-size: 20px;
          }

          .modal-subtitle {
            font-size: 13px;
          }

          .modal-body {
            padding: 20px 24px;
          }

          .steps-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 16px;
          }

          .step-card {
            padding: 14px;
          }

          .step-icon-wrapper {
            width: 36px;
            height: 36px;
          }

          .step-title {
            font-size: 14px;
          }

          .step-description {
            font-size: 12px;
          }

          .tips-box {
            padding: 10px 12px;
            font-size: 12px;
          }

          .modal-footer {
            padding: 0 24px 24px 24px;
          }

          .footer-note {
            font-size: 10px;
            margin-top: 10px;
          }

          .start-button {
            width: 100%;
            justify-content: center;
            padding: 11px 24px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .modal-header {
            padding: 24px 20px 18px 20px;
          }

          .modal-body {
            padding: 16px 20px;
          }

          .modal-footer {
            padding: 0 20px 20px 20px;
          }
        }
      `}</style>
    </>
  );
}
