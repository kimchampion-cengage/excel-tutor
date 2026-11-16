interface FormulaBarProps {
  selectedCell: string | null;
  formula: string;
  onFormulaChange: (formula: string) => void;
  onFormulaSubmit: (formula: string) => void;
}

export default function FormulaBar({ selectedCell, formula, onFormulaChange, onFormulaSubmit }: FormulaBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFormulaSubmit(formula);
    }
  };

  return (
    <>
      <div className="formula-bar">
        <div className="formula-bar-cell-info">
          <span className="formula-bar-cell-name">
            {selectedCell || 'A1'}
          </span>
          <div className="formula-bar-divider" />
          <span className="formula-bar-fx">ƒₓ</span>
        </div>
        
        <input
          type="text"
          value={formula}
          onChange={(e) => onFormulaChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter value or formula"
          className="formula-bar-input"
        />
      </div>

      <style>{`
        .formula-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-bottom: 1px solid #e0e0e0;
          background-color: #ffffff;
        }

        .formula-bar-cell-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .formula-bar-cell-name {
          font-size: 13px;
          font-weight: 600;
          color: #333;
          min-width: 40px;
        }

        .formula-bar-divider {
          width: 1px;
          height: 20px;
          background-color: #e0e0e0;
        }

        .formula-bar-fx {
          font-size: 20px;
          color: #666;
          line-height: 1;
        }

        .formula-bar-input {
          flex: 1;
          padding: 6px 8px;
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          font-size: 13px;
          outline: none;
          font-family: monospace;
        }

        @media (max-width: 768px) {
          .formula-bar {
            padding: 6px 8px;
            gap: 8px;
          }

          .formula-bar-cell-name {
            font-size: 12px;
            min-width: 35px;
          }

          .formula-bar-fx {
            font-size: 18px;
          }

          .formula-bar-input {
            font-size: 12px;
            padding: 5px 6px;
          }
        }

        @media (max-width: 480px) {
          .formula-bar {
            padding: 4px 6px;
            gap: 6px;
          }

          .formula-bar-cell-name {
            font-size: 11px;
            min-width: 30px;
          }

          .formula-bar-fx {
            display: none;
          }

          .formula-bar-divider {
            display: none;
          }

          .formula-bar-input {
            font-size: 11px;
            padding: 4px 6px;
          }

          .formula-bar-input::placeholder {
            font-size: 10px;
          }
        }
      `}</style>
    </>
  );
}
