import { Save, Printer, Undo, Redo, Upload, RotateCcw, HelpCircle, FileText, BookOpen } from 'lucide-react';
import SettingsMenu from './SettingsMenu';
import { Button, ButtonColor, ButtonSize } from 'react-magma-dom';

interface SpreadsheetToolbarProps {
  onImportClick: () => void;
  onResetClick: () => void;
  onResetToDefaultClick: () => void;
  onHelpClick: () => void;
  onUserGuideClick?: () => void;
  onPrintClick?: () => void;
}

export default function SpreadsheetToolbar({ onImportClick, onResetClick, onResetToDefaultClick, onHelpClick, onUserGuideClick, onPrintClick = () => window.print() }: SpreadsheetToolbarProps) {
  
  return (
    <>
      <div className="spreadsheet-toolbar">
        <Button size={ButtonSize.small} color={ButtonColor.primary} onClick={onImportClick}>
          <Upload size={14} />
          <span className="toolbar-btn-text">Import Data</span>
        </Button>
        
        <Button size={ButtonSize.small} color={ButtonColor.subtle} onClick={onResetClick}>
          <RotateCcw size={14} />
          <span className="toolbar-btn-text">Reset</span>
        </Button>

        <Button size={ButtonSize.small} color={ButtonColor.subtle} onClick={onResetToDefaultClick} title="Reset current worksheet to default sample data">
          <FileText size={14} />
          <span className="toolbar-btn-text">Default Data</span>
        </Button>
        
        <div className="toolbar-divider" />
        
        <div className="auto-save-indicator" title="Your work is automatically saved">
          <Save size={14} />
          <span className="toolbar-btn-text">Auto-saved</span>
        </div>
        
        <div className="toolbar-divider" />
        
        <Button size={ButtonSize.small} color={ButtonColor.subtle} aria-label="Undo" title="Undo">
          <Undo size={14} />
        </Button>
        
        <Button size={ButtonSize.small} color={ButtonColor.subtle} aria-label="Redo" title="Redo">
          <Redo size={14} />
        </Button>
        
        <div className="toolbar-divider" />
        
        <Button size={ButtonSize.small} color={ButtonColor.subtle} aria-label="Print" title="Print" onClick={onPrintClick}>
          <Printer size={14} />
        </Button>
        
        <div style={{ flex: 1 }} />
        
        <span className="toolbar-title">Excel Learning Simulator</span>
        
        <SettingsMenu 
          onHelpClick={onHelpClick}
          onUserGuideClick={onUserGuideClick || (() => {})}
        />
      </div>

      <style>{`
        .spreadsheet-toolbar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-bottom: 1px solid #e0e0e0;
          background-color: #fafafa;
        }

        .toolbar-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px;
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          background-color: #ffffff;
          cursor: pointer;
          color: #666;
          transition: background-color 0.2s;
        }

        .toolbar-btn:hover {
          background-color: #f5f5f5;
        }

        .toolbar-btn-primary {
          padding: 6px 12px;
          color: #333;
          font-size: 13px;
        }

        .toolbar-btn-secondary {
          padding: 6px 12px;
          color: #d32f2f;
          font-size: 13px;
          border-color: #d32f2f;
        }

        .toolbar-btn-secondary:hover {
          background-color: #d32f2f;
          color: white;
          border-color: #d32f2f;
        }

        .toolbar-btn-help {
          background-color: #f0f7ff;
          color: #1a73e8;
          border: 1px solid #1a73e8;
          padding: 6px 12px;
          font-size: 13px;
        }

        .toolbar-btn-help:hover {
          background-color: #1a73e8;
          color: white;
        }

        .toolbar-btn-guide {
          background-color: #fff9c4;
          color: #f57c00;
          border: 1px solid #f57c00;
          padding: 6px 12px;
          font-size: 13px;
        }

        .toolbar-btn-guide:hover {
          background-color: #f57c00;
          color: white;
        }

        .toolbar-btn-text {
          display: inline;
        }

        .auto-save-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: #e8f5e9;
          color: #2e7d32;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: default;
        }

        .toolbar-divider {
          width: 1px;
          height: 24px;
          background-color: #e0e0e0;
        }

        .toolbar-title {
          font-size: 12px;
          color: #666;
        }

        @media (max-width: 768px) {
          .spreadsheet-toolbar {
            padding: 6px 8px;
            gap: 6px;
          }

          .toolbar-btn {
            padding: 5px;
          }

          .toolbar-btn-primary {
            padding: 5px 8px;
            font-size: 12px;
          }

          .toolbar-btn-secondary {
            padding: 5px 8px;
            font-size: 12px;
          }

          .auto-save-indicator {
            padding: 5px 8px;
            font-size: 12px;
          }

          .toolbar-title {
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .spreadsheet-toolbar {
            padding: 4px 6px;
            gap: 4px;
          }

          .toolbar-btn-text {
            display: none;
          }

          .toolbar-btn-primary {
            padding: 4px 6px;
          }

          .toolbar-btn-secondary {
            padding: 4px 6px;
          }

          .toolbar-divider {
            display: none;
          }

          .toolbar-title {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
