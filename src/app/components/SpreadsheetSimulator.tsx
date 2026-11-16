import { useState, useEffect } from 'react';
import { FormulaBar } from './FormulaBar';
import { SpreadsheetToolbar } from './SpreadsheetToolbar';
import { 
  Type, 
  Bold, 
  Italic, 
  Underline,
  AlignLeft,
  ChevronDown
} from 'lucide-react';

interface SpreadsheetSimulatorProps {
  onCellChange: (action: string) => void;
  onTaskComplete: (taskId: string) => void;
}

interface CellData {
  value: string;
  displayValue: string;
  isFormula: boolean;
}

const INITIAL_DATA = [
  ['Product', 'Region', 'Units Sold', 'Unit Price', 'Revenue'],
  ['Laptop', 'North', '45', '899', '40455'],
  ['Mouse', 'South', '230', '25', '5750'],
  ['Keyboard', 'East', '167', '79', '13193'],
  ['Monitor', 'West', '89', '349', '31061'],
  ['Headphones', 'North', '156', '129', '20124'],
  ['Webcam', 'South', '92', '79', '7268'],
  ['USB Cable', 'East', '445', '12', '5340'],
  ['Desk Lamp', 'West', '73', '45', '3285'],
  ['Mouse Pad', 'North', '312', '15', '4680'],
  ['HDMI Cable', 'South', '198', '18', '3564'],
];

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ROWS = 20;

export function SpreadsheetSimulator({ onCellChange, onTaskComplete }: SpreadsheetSimulatorProps) {
  const [cells, setCells] = useState<CellData[][]>(() => {
    const grid: CellData[][] = [];
    for (let i = 0; i < ROWS; i++) {
      const row: CellData[] = [];
      for (let j = 0; j < COLUMNS.length; j++) {
        const initialValue = INITIAL_DATA[i]?.[j] || '';
        row.push({
          value: initialValue,
          displayValue: initialValue,
          isFormula: false,
        });
      }
      grid.push(row);
    }
    return grid;
  });

  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [formulaBarValue, setFormulaBarValue] = useState('');

  useEffect(() => {
    if (selectedCell) {
      const cell = cells[selectedCell.row][selectedCell.col];
      setFormulaBarValue(cell.value);
    }
  }, [selectedCell, cells]);

  const evaluateFormula = (formula: string, row: number, col: number): string => {
    try {
      // Remove the = sign
      const expr = formula.substring(1).toUpperCase();

      // Handle SUM function
      if (expr.startsWith('SUM(')) {
        const rangeMatch = expr.match(/SUM\(([A-Z])(\d+):([A-Z])(\d+)\)/);
        if (rangeMatch) {
          const [, startCol, startRow, endCol, endRow] = rangeMatch;
          const startColIndex = startCol.charCodeAt(0) - 65;
          const endColIndex = endCol.charCodeAt(0) - 65;
          const startRowIndex = parseInt(startRow) - 1;
          const endRowIndex = parseInt(endRow) - 1;

          let sum = 0;
          for (let r = startRowIndex; r <= endRowIndex; r++) {
            for (let c = startColIndex; c <= endColIndex; c++) {
              const value = parseFloat(cells[r][c].displayValue);
              if (!isNaN(value)) {
                sum += value;
              }
            }
          }

          // Check if this is a revenue total calculation
          if (startColIndex === 4 && startRowIndex === 1 && endRowIndex === 10) {
            onTaskComplete('revenueCalculated');
          }

          return sum.toString();
        }
      }

      // Handle MAX function
      if (expr.startsWith('MAX(')) {
        const rangeMatch = expr.match(/MAX\(([A-Z])(\d+):([A-Z])(\d+)\)/);
        if (rangeMatch) {
          const [, startCol, startRow, endCol, endRow] = rangeMatch;
          const startColIndex = startCol.charCodeAt(0) - 65;
          const endColIndex = endCol.charCodeAt(0) - 65;
          const startRowIndex = parseInt(startRow) - 1;
          const endRowIndex = parseInt(endRow) - 1;

          let max = -Infinity;
          for (let r = startRowIndex; r <= endRowIndex; r++) {
            for (let c = startColIndex; c <= endColIndex; c++) {
              const value = parseFloat(cells[r][c].displayValue);
              if (!isNaN(value) && value > max) {
                max = value;
              }
            }
          }

          if (max === -Infinity) return '0';

          // Check if this is finding the max revenue
          if (startColIndex === 4 && startRowIndex === 1 && endRowIndex === 10) {
            onTaskComplete('topProductFound');
          }

          return max.toString();
        }
      }

      // Handle AVERAGE function
      if (expr.startsWith('AVERAGE(')) {
        const rangeMatch = expr.match(/AVERAGE\(([A-Z])(\d+):([A-Z])(\d+)\)/);
        if (rangeMatch) {
          const [, startCol, startRow, endCol, endRow] = rangeMatch;
          const startColIndex = startCol.charCodeAt(0) - 65;
          const endColIndex = endCol.charCodeAt(0) - 65;
          const startRowIndex = parseInt(startRow) - 1;
          const endRowIndex = parseInt(endRow) - 1;

          let sum = 0;
          let count = 0;
          for (let r = startRowIndex; r <= endRowIndex; r++) {
            for (let c = startColIndex; c <= endColIndex; c++) {
              const value = parseFloat(cells[r][c].displayValue);
              if (!isNaN(value)) {
                sum += value;
                count++;
              }
            }
          }

          return count > 0 ? (sum / count).toString() : '0';
        }
      }

      // Handle cell references like =A1
      const cellRefMatch = expr.match(/^([A-Z])(\d+)$/);
      if (cellRefMatch) {
        const [, refCol, refRow] = cellRefMatch;
        const refColIndex = refCol.charCodeAt(0) - 65;
        const refRowIndex = parseInt(refRow) - 1;
        return cells[refRowIndex][refColIndex].displayValue;
      }

      // Handle simple arithmetic
      const arithmeticMatch = expr.match(/^([A-Z]\d+)([\+\-\*\/])([A-Z]\d+)$/);
      if (arithmeticMatch) {
        const [, cell1, operator, cell2] = arithmeticMatch;
        const val1 = getCellValue(cell1);
        const val2 = getCellValue(cell2);
        
        switch (operator) {
          case '+': return (val1 + val2).toString();
          case '-': return (val1 - val2).toString();
          case '*': return (val1 * val2).toString();
          case '/': return val2 !== 0 ? (val1 / val2).toString() : '#DIV/0!';
        }
      }

      return '#ERROR!';
    } catch (error) {
      return '#ERROR!';
    }
  };

  const getCellValue = (cellRef: string): number => {
    const match = cellRef.match(/([A-Z])(\d+)/);
    if (match) {
      const [, col, row] = match;
      const colIndex = col.charCodeAt(0) - 65;
      const rowIndex = parseInt(row) - 1;
      return parseFloat(cells[rowIndex][colIndex].displayValue) || 0;
    }
    return 0;
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    setEditingCell(null);
  };

  const handleCellDoubleClick = (row: number, col: number) => {
    setEditingCell({ row, col });
    setSelectedCell({ row, col });
  };

  const handleCellEdit = (row: number, col: number, value: string) => {
    const newCells = [...cells];
    const isFormula = value.startsWith('=');
    
    newCells[row][col] = {
      value: value,
      displayValue: isFormula ? evaluateFormula(value, row, col) : value,
      isFormula: isFormula,
    };
    
    setCells(newCells);

    if (isFormula) {
      const formulaType = value.toUpperCase();
      if (formulaType.includes('SUM')) {
        onCellChange('Used SUM function');
      } else if (formulaType.includes('MAX')) {
        onCellChange('Used MAX function');
      } else if (formulaType.includes('AVERAGE')) {
        onCellChange('Used AVERAGE function');
      }
    }
  };

  const handleFormulaBarChange = (value: string) => {
    setFormulaBarValue(value);
    if (selectedCell) {
      handleCellEdit(selectedCell.row, selectedCell.col, value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === 'Enter') {
      setEditingCell(null);
      // Move down
      if (row < ROWS - 1) {
        setSelectedCell({ row: row + 1, col });
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setEditingCell(null);
      // Move right
      if (col < COLUMNS.length - 1) {
        setSelectedCell({ row, col: col + 1 });
      }
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <SpreadsheetToolbar />
      
      <FormulaBar
        value={formulaBarValue}
        onChange={handleFormulaBarChange}
        selectedCell={selectedCell}
      />

      {/* Formatting toolbar */}
      <div className="border-b border-gray-200 px-4 py-2 flex items-center gap-1 bg-gray-50">
        <select className="text-sm border border-gray-300 rounded px-2 py-1 mr-2">
          <option>Calibri</option>
          <option>Arial</option>
          <option>Times New Roman</option>
        </select>
        <select className="text-sm border border-gray-300 rounded px-2 py-1 mr-3">
          <option>11</option>
          <option>12</option>
          <option>14</option>
        </select>
        <button className="p-1.5 hover:bg-gray-200 rounded">
          <Bold className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded">
          <Italic className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded">
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <button className="p-1.5 hover:bg-gray-200 rounded">
          <AlignLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Spreadsheet grid */}
      <div className="flex-1 overflow-auto">
        <div className="inline-block min-w-full">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 left-0 z-20 bg-gray-100 border border-gray-300 w-12 h-8 text-xs text-gray-600"></th>
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="sticky top-0 z-10 bg-gray-100 border border-gray-300 min-w-[120px] h-8 text-xs text-gray-600"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cells.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="sticky left-0 z-10 bg-gray-100 border border-gray-300 text-center text-xs text-gray-600 w-12 h-8">
                    {rowIndex + 1}
                  </td>
                  {row.map((cell, colIndex) => {
                    const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                    const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;
                    const isHeader = rowIndex === 0;

                    return (
                      <td
                        key={colIndex}
                        className={`border border-gray-300 min-w-[120px] h-8 px-2 cursor-cell ${
                          isSelected ? 'ring-2 ring-blue-600 ring-inset bg-white' : ''
                        } ${isHeader ? 'bg-blue-50' : 'bg-white'}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        onDoubleClick={() => handleCellDoubleClick(rowIndex, colIndex)}
                      >
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-full h-full outline-none bg-transparent text-sm"
                            value={cell.value}
                            onChange={(e) => handleCellEdit(rowIndex, colIndex, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                            onBlur={() => setEditingCell(null)}
                            autoFocus
                          />
                        ) : (
                          <div className={`text-sm ${isHeader ? '' : ''} ${!isNaN(parseFloat(cell.displayValue)) && !isHeader ? 'text-right' : ''}`}>
                            {cell.displayValue}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sheet tabs */}
      <div className="border-t border-gray-300 bg-gray-50 px-4 py-2 flex items-center gap-2">
        <button className="px-4 py-1 bg-white border-t-2 border-blue-600 text-sm">
          Sheet1
        </button>
        <button className="px-2 py-1 text-gray-500 hover:bg-gray-200 rounded text-sm">
          +
        </button>
      </div>
    </div>
  );
}
