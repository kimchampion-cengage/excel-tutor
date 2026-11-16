import { useState } from 'react';
import ExcelCell from './ExcelCell';

interface CellData {
  value: string;
  formula: string;
  displayValue: string;
}

interface ExcelGridProps {
  cells: { [key: string]: CellData };
  selectedCell: string | null;
  onCellSelect: (cell: string) => void;
  onCellEdit: (cell: string, value: string) => void;
}

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
const ROWS = Array.from({ length: 30 }, (_, i) => i + 1);

export default function ExcelGrid({ cells, selectedCell, onCellSelect, onCellEdit }: ExcelGridProps) {
  return (
    <div className="excel-grid-container">
      <div className="excel-grid-content">
        {/* Header Row */}
        <div style={{ display: 'flex' }}>
          <div className="row-header corner-cell" />
          {COLUMNS.map(col => (
            <div key={col} className="column-header">
              {col}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {ROWS.map(row => (
          <div key={row} style={{ display: 'flex' }}>
            {/* Row Number */}
            <div className="row-header">
              {row}
            </div>

            {/* Cells */}
            {COLUMNS.map(col => {
              const cellId = `${col}${row}`;
              const cellData = cells[cellId];
              
              return (
                <ExcelCell
                  key={cellId}
                  cellId={cellId}
                  value={cellData?.displayValue || ''}
                  isSelected={selectedCell === cellId}
                  isHeader={row === 1}
                  onSelect={() => onCellSelect(cellId)}
                  onEdit={(value) => onCellEdit(cellId, value)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <style>{`
        .excel-grid-container {
          flex: 1;
          overflow: auto;
          backgroundColor: #ffffff;
          -webkit-overflow-scrolling: touch;
        }

        .excel-grid-content {
          display: inline-block;
          min-width: 100%;
        }

        .row-header {
          width: 50px;
          min-width: 50px;
          height: 28px;
          backgroundColor: #f5f5f5;
          border: 1px solid #d0d0d0;
          border-top: none;
          border-left: none;
          display: flex;
          align-items: center;
          justify-content: center;
          fontSize: 13px;
          font-weight: 600;
          color: #333;
          flex-shrink: 0;
        }

        .corner-cell {
          height: 32px;
        }

        .column-header {
          width: 120px;
          min-width: 120px;
          height: 32px;
          backgroundColor: #f5f5f5;
          border: 1px solid #d0d0d0;
          border-top: none;
          border-left: none;
          display: flex;
          align-items: center;
          justify-content: center;
          fontSize: 13px;
          font-weight: 600;
          color: #333;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .row-header {
            width: 35px;
            min-width: 35px;
            font-size: 11px;
          }

          .column-header {
            width: 90px;
            min-width: 90px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .row-header {
            width: 30px;
            min-width: 30px;
            font-size: 10px;
          }

          .column-header {
            width: 80px;
            min-width: 80px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}
