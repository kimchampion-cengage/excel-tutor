import { X, Upload, FileSpreadsheet } from 'lucide-react';

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: () => void;
}

export default function ImportDialog({ isOpen, onClose, onImport }: ImportDialogProps) {
  if (!isOpen) return null;

  const handleImport = () => {
    onImport();
    onClose();
  };

  return (
    <>
      <div className="import-backdrop" onClick={onClose} />
      <div className="import-dialog">
        <div className="import-header">
          <h2 className="import-title">Import Data</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="import-content">
          <div className="import-option">
            <div className="option-icon">
              <FileSpreadsheet size={48} color="#1a73e8" />
            </div>
            <h3 className="option-title">Sample Retail Inventory Dataset</h3>
            <p className="option-description">
              Import a pre-configured dataset with 9 transactions from 3 retail stores. 
              Includes inventory numbers, product details, pricing, quantities, costs, dates, and store information.
              <strong> Note: You will need to add calculated columns for analysis.</strong>
            </p>
            
            <div className="dataset-preview">
              <div className="preview-header">Dataset Preview:</div>
              <ul className="preview-list">
                <li><strong>9 columns:</strong> Inv_Number, Store_Num, Description, Category, Price, Sold, Unit_Cost, Date, Store_Name</li>
                <li><strong>9 rows</strong> of retail transaction data</li>
                <li><strong>3 store locations</strong> tracked</li>
                <li><strong>4 product categories</strong> represented</li>
              </ul>
              <div className="preview-note">
                <strong>Students will calculate:</strong> Total_Sales, Total_Cost, Total_Profit, Month, Day, Year, Quarter
              </div>
            </div>

            <button className="import-btn" onClick={handleImport}>
              <Upload size={16} />
              Import Sample Data
            </button>
          </div>

          <div className="import-note">
            <strong>Note:</strong> This is a simulated import. In a real application, you would upload a CSV or Excel file.
          </div>
        </div>
      </div>

      <style>{`
        .import-backdrop {
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

        .import-dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
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

        .import-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          border-bottom: 1px solid #e0e0e0;
          background-color: #f8f9fa;
        }

        .import-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0;
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
        }

        .close-btn:hover {
          background-color: #e0e0e0;
          color: #333;
        }

        .import-content {
          padding: 24px;
          overflow-y: auto;
        }

        .import-option {
          padding: 24px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          text-align: center;
          transition: all 0.2s;
        }

        .import-option:hover {
          border-color: #1a73e8;
          background-color: #f8f9fa;
        }

        .option-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .option-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
        }

        .option-description {
          font-size: 14px;
          line-height: 1.6;
          color: #666;
          margin-bottom: 20px;
        }

        .dataset-preview {
          background-color: #f0f4f8;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: left;
        }

        .preview-header {
          font-size: 13px;
          font-weight: 600;
          color: #1a73e8;
          margin-bottom: 12px;
        }

        .preview-list {
          margin: 0 0 12px 0;
          padding-left: 20px;
          font-size: 13px;
          line-height: 1.8;
          color: #555;
        }

        .preview-list li {
          margin-bottom: 8px;
        }

        .preview-list strong {
          color: #333;
        }

        .preview-note {
          padding: 12px;
          background-color: #e3f2fd;
          border-left: 4px solid #1a73e8;
          border-radius: 4px;
          font-size: 12px;
          color: #1565c0;
          line-height: 1.5;
          margin-top: 12px;
        }

        .preview-note strong {
          display: block;
          margin-bottom: 4px;
        }

        .preview-header {
          font-size: 13px;
          font-weight: 600;
          color: #1a73e8;
          margin-bottom: 12px;
        }

        .preview-list {
          margin: 0;
          padding-left: 20px;
          font-size: 13px;
          line-height: 1.8;
          color: #555;
        }

        .preview-list li {
          margin-bottom: 8px;
        }

        .preview-list strong {
          color: #333;
        }

        .import-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background-color: #1a73e8;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .import-btn:hover {
          background-color: #1557b0;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
        }

        .import-note {
          margin-top: 20px;
          padding: 12px;
          background-color: #fff3e0;
          border-left: 4px solid #ff9800;
          border-radius: 4px;
          font-size: 13px;
          color: #e65100;
          line-height: 1.5;
        }

        .import-note strong {
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .import-dialog {
            width: 95%;
            max-height: 90vh;
          }

          .import-header {
            padding: 16px;
          }

          .import-title {
            font-size: 18px;
          }

          .import-content {
            padding: 16px;
          }

          .import-option {
            padding: 20px;
          }

          .option-title {
            font-size: 16px;
          }

          .option-description {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}
