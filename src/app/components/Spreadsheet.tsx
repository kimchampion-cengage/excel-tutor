import { useState, useEffect, useRef } from 'react';
import ExcelGrid from './ExcelGrid';
import FormulaBar from './FormulaBar';
import SpreadsheetToolbar from './SpreadsheetToolbar';
import ImportDialog from './ImportDialog';
import ResetDialog from './ResetDialog';
import ReflectionArea from './ReflectionArea';
import WorksheetTabs, { Worksheet } from './WorksheetTabs';
import Toast, { ToastMessage } from './Toast';
import HelpGuide from './HelpGuide';

interface SpreadsheetProps {
  selectedCell: string | null;
  onCellSelect: (cell: string | null) => void;
  onAction: (action: string) => void;
  onCompleteTasks: (taskIds: number[]) => void;
  onShowHelp?: () => void;
  completedTasks: number[];
  totalTasks: number;
  onResetTasks?: () => void;
  onResetChat?: () => void;
  onReflectionChange?: (text: string) => void;
  resetAllTrigger?: number;
}

interface CellData {
  value: string;
  formula: string;
  displayValue: string;
}

type CellMap = { [key: string]: CellData };

const emptyData: CellMap = {};

const sampleData: CellMap = {
  // Headers - Row 1 (Only base fields, students will add calculated columns)
  'A1': { value: 'Inv_Number', formula: '', displayValue: 'Inv_Number' },
  'B1': { value: 'Store_Num', formula: '', displayValue: 'Store_Num' },
  'C1': { value: 'Description', formula: '', displayValue: 'Description' },
  'D1': { value: 'Category', formula: '', displayValue: 'Category' },
  'E1': { value: 'Price', formula: '', displayValue: 'Price' },
  'F1': { value: 'Sold', formula: '', displayValue: 'Sold' },
  'G1': { value: 'Unit_Cost', formula: '', displayValue: 'Unit_Cost' },
  'H1': { value: 'Date', formula: '', displayValue: 'Date' },
  'I1': { value: 'Store_Name', formula: '', displayValue: 'Store_Name' },
  
  // Row 2 - Wireless Mouse
  'A2': { value: 'INV-1001', formula: '', displayValue: 'INV-1001' },
  'B2': { value: '101', formula: '', displayValue: '101' },
  'C2': { value: 'Wireless Mouse', formula: '', displayValue: 'Wireless Mouse' },
  'D2': { value: 'Electronics', formula: '', displayValue: 'Electronics' },
  'E2': { value: '29.99', formula: '', displayValue: '29.99' },
  'F2': { value: '45', formula: '', displayValue: '45' },
  'G2': { value: '12.50', formula: '', displayValue: '12.50' },
  'H2': { value: '2024-01-15', formula: '', displayValue: '2024-01-15' },
  'I2': { value: 'Downtown Store', formula: '', displayValue: 'Downtown Store' },
  
  // Row 3 - USB Cable
  'A3': { value: 'INV-1002', formula: '', displayValue: 'INV-1002' },
  'B3': { value: '102', formula: '', displayValue: '102' },
  'C3': { value: 'USB Cable', formula: '', displayValue: 'USB Cable' },
  'D3': { value: 'Electronics', formula: '', displayValue: 'Electronics' },
  'E3': { value: '12.99', formula: '', displayValue: '12.99' },
  'F3': { value: '120', formula: '', displayValue: '120' },
  'G3': { value: '4.25', formula: '', displayValue: '4.25' },
  'H3': { value: '2024-01-22', formula: '', displayValue: '2024-01-22' },
  'I3': { value: 'Westside Mall', formula: '', displayValue: 'Westside Mall' },
  
  // Row 4 - Mechanical Keyboard
  'A4': { value: 'INV-1003', formula: '', displayValue: 'INV-1003' },
  'B4': { value: '101', formula: '', displayValue: '101' },
  'C4': { value: 'Mechanical Keyboard', formula: '', displayValue: 'Mechanical Keyboard' },
  'D4': { value: 'Electronics', formula: '', displayValue: 'Electronics' },
  'E4': { value: '89.99', formula: '', displayValue: '89.99' },
  'F4': { value: '28', formula: '', displayValue: '28' },
  'G4': { value: '45.00', formula: '', displayValue: '45.00' },
  'H4': { value: '2024-02-05', formula: '', displayValue: '2024-02-05' },
  'I4': { value: 'Downtown Store', formula: '', displayValue: 'Downtown Store' },
  
  // Row 5 - Office Chair
  'A5': { value: 'INV-1004', formula: '', displayValue: 'INV-1004' },
  'B5': { value: '103', formula: '', displayValue: '103' },
  'C5': { value: 'Office Chair', formula: '', displayValue: 'Office Chair' },
  'D5': { value: 'Furniture', formula: '', displayValue: 'Furniture' },
  'E5': { value: '199.99', formula: '', displayValue: '199.99' },
  'F5': { value: '15', formula: '', displayValue: '15' },
  'G5': { value: '95.00', formula: '', displayValue: '95.00' },
  'H5': { value: '2024-02-14', formula: '', displayValue: '2024-02-14' },
  'I5': { value: 'Northside Plaza', formula: '', displayValue: 'Northside Plaza' },
  
  // Row 6 - Desk Lamp
  'A6': { value: 'INV-1005', formula: '', displayValue: 'INV-1005' },
  'B6': { value: '102', formula: '', displayValue: '102' },
  'C6': { value: 'Desk Lamp', formula: '', displayValue: 'Desk Lamp' },
  'D6': { value: 'Furniture', formula: '', displayValue: 'Furniture' },
  'E6': { value: '45.99', formula: '', displayValue: '45.99' },
  'F6': { value: '32', formula: '', displayValue: '32' },
  'G6': { value: '18.50', formula: '', displayValue: '18.50' },
  'H6': { value: '2024-03-01', formula: '', displayValue: '2024-03-01' },
  'I6': { value: 'Westside Mall', formula: '', displayValue: 'Westside Mall' },
  
  // Row 7 - Monitor Stand
  'A7': { value: 'INV-1006', formula: '', displayValue: 'INV-1006' },
  'B7': { value: '101', formula: '', displayValue: '101' },
  'C7': { value: 'Monitor Stand', formula: '', displayValue: 'Monitor Stand' },
  'D7': { value: 'Electronics', formula: '', displayValue: 'Electronics' },
  'E7': { value: '34.99', formula: '', displayValue: '34.99' },
  'F7': { value: '52', formula: '', displayValue: '52' },
  'G7': { value: '15.00', formula: '', displayValue: '15.00' },
  'H7': { value: '2024-03-10', formula: '', displayValue: '2024-03-10' },
  'I7': { value: 'Downtown Store', formula: '', displayValue: 'Downtown Store' },
  
  // Row 8 - Webcam HD
  'A8': { value: 'INV-1007', formula: '', displayValue: 'INV-1007' },
  'B8': { value: '103', formula: '', displayValue: '103' },
  'C8': { value: 'Webcam HD', formula: '', displayValue: 'Webcam HD' },
  'D8': { value: 'Electronics', formula: '', displayValue: 'Electronics' },
  'E8': { value: '69.99', formula: '', displayValue: '69.99' },
  'F8': { value: '38', formula: '', displayValue: '38' },
  'G8': { value: '32.00', formula: '', displayValue: '32.00' },
  'H8': { value: '2024-03-18', formula: '', displayValue: '2024-03-18' },
  'I8': { value: 'Northside Plaza', formula: '', displayValue: 'Northside Plaza' },
  
  // Row 9 - Notebook Set
  'A9': { value: 'INV-1008', formula: '', displayValue: 'INV-1008' },
  'B9': { value: '102', formula: '', displayValue: '102' },
  'C9': { value: 'Notebook Set', formula: '', displayValue: 'Notebook Set' },
  'D9': { value: 'Office Supplies', formula: '', displayValue: 'Office Supplies' },
  'E9': { value: '15.99', formula: '', displayValue: '15.99' },
  'F9': { value: '85', formula: '', displayValue: '85' },
  'G9': { value: '6.50', formula: '', displayValue: '6.50' },
  'H9': { value: '2024-03-25', formula: '', displayValue: '2024-03-25' },
  'I9': { value: 'Westside Mall', formula: '', displayValue: 'Westside Mall' },
  
  // Row 10 - Pen Pack
  'A10': { value: 'INV-1009', formula: '', displayValue: 'INV-1009' },
  'B10': { value: '101', formula: '', displayValue: '101' },
  'C10': { value: 'Pen Pack', formula: '', displayValue: 'Pen Pack' },
  'D10': { value: 'Office Supplies', formula: '', displayValue: 'Office Supplies' },
  'E10': { value: '9.99', formula: '', displayValue: '9.99' },
  'F10': { value: '150', formula: '', displayValue: '150' },
  'G10': { value: '3.75', formula: '', displayValue: '3.75' },
  'H10': { value: '2024-03-28', formula: '', displayValue: '2024-03-28' },
  'I10': { value: 'Downtown Store', formula: '', displayValue: 'Downtown Store' },
};

interface WorksheetData {
  id: string;
  name: string;
  cells: CellMap;
  reflectionText: string;
}

interface Workbook {
  worksheets: WorksheetData[];
  activeWorksheetId: string;
}

const STORAGE_KEY = 'excelSimulator_workbook';

export default function Spreadsheet({ selectedCell, onCellSelect, onAction, onCompleteTasks, onShowHelp, completedTasks, totalTasks, onResetTasks, onResetChat, onReflectionChange, resetAllTrigger }: SpreadsheetProps) {
  const [workbook, setWorkbook] = useState<Workbook>(() => {
    // Load from localStorage or create default
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading workbook:', e);
      }
    }
    // Default workbook with one worksheet
    return {
      worksheets: [{
        id: 'sheet1',
        name: 'Sheet1',
        cells: emptyData,
        reflectionText: ''
      }],
      activeWorksheetId: 'sheet1'
    };
  });

  const [formulaInput, setFormulaInput] = useState('');
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showHelpGuide, setShowHelpGuide] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const inspectedCells = useRef(new Set<string>());
  const derivedFormulaColumns = useRef(new Set<string>());
  const statisticFunctions = useRef(new Set<string>());

  // Get current worksheet
  const currentWorksheet = workbook.worksheets.find(ws => ws.id === workbook.activeWorksheetId);
  const cells = currentWorksheet?.cells || emptyData;
  const reflectionText = currentWorksheet?.reflectionText || '';

  // Save workbook to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workbook));
    const descriptivesSheet = workbook.worksheets.find(sheet => sheet.name.trim().toLowerCase() === 'descriptives');
    if (descriptivesSheet && Object.keys(descriptivesSheet.cells).length > 0) onCompleteTasks([9]);
    if (workbook.worksheets.some(sheet => hasDescriptiveTableStructure(sheet.cells))) onCompleteTasks([6]);
    const activeCells = workbook.worksheets.find(sheet => sheet.id === workbook.activeWorksheetId)?.cells ?? {};
    const enteredValues = Object.values(activeCells).map(cell => cell.displayValue.trim().toLowerCase());
    const summaryVariables = ['price', 'sold', 'unit cost', 'total sales', 'total cost', 'total profit'];
    if (summaryVariables.every(variable => enteredValues.some(value => value.replace(/[_\s]/g, '').includes(variable.replace(/[_\s]/g, ''))))) {
      onCompleteTasks([8]);
    }
  }, [workbook]);

  // Handle reset from completion page
  useEffect(() => {
    if (resetAllTrigger !== undefined && resetAllTrigger > 0) {
      inspectedCells.current.clear();
      derivedFormulaColumns.current.clear();
      statisticFunctions.current.clear();
      // Reset to empty workbook
      setWorkbook({
        worksheets: [{
          id: 'sheet1',
          name: 'Sheet1',
          cells: emptyData,
          reflectionText: ''
        }],
        activeWorksheetId: 'sheet1'
      });
      onCellSelect(null);
      setFormulaInput('');
      localStorage.removeItem('excelSimulator_hasSeenWelcome');
    }
  }, [resetAllTrigger, onCellSelect]);

  // Update cells for current worksheet
  const setCells = (newCells: CellMap | ((prev: CellMap) => CellMap)) => {
    setWorkbook(prev => ({
      ...prev,
      worksheets: prev.worksheets.map(ws =>
        ws.id === prev.activeWorksheetId
          ? { ...ws, cells: typeof newCells === 'function' ? newCells(ws.cells) : newCells }
          : ws
      )
    }));
  };

  // Update reflection text for current worksheet
  const setReflectionText = (text: string) => {
    setWorkbook(prev => ({
      ...prev,
      worksheets: prev.worksheets.map(ws =>
        ws.id === prev.activeWorksheetId
          ? { ...ws, reflectionText: text }
          : ws
      )
    }));
    if (onReflectionChange) {
      onReflectionChange(text);
    }
  };

  // Toast helper
  const showToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Worksheet management functions
  const handleSelectWorksheet = (id: string) => {
    setWorkbook(prev => ({ ...prev, activeWorksheetId: id }));
    onCellSelect(null);
  };

  const handleAddWorksheet = () => {
    const newId = `sheet${Date.now()}`;
    const newName = `Sheet${workbook.worksheets.length + 1}`;
    setWorkbook(prev => ({
      worksheets: [...prev.worksheets, {
        id: newId,
        name: newName,
        cells: emptyData,
        reflectionText: ''
      }],
      activeWorksheetId: newId
    }));
    onAction(`Created new worksheet: ${newName}`);
    showToast(`Created ${newName}`, 'success');
  };

  const handleRenameWorksheet = (id: string, newName: string) => {
    setWorkbook(prev => ({
      ...prev,
      worksheets: prev.worksheets.map(ws =>
        ws.id === id ? { ...ws, name: newName } : ws
      )
    }));
    if (newName.trim().toLowerCase() === 'descriptives') {
      const worksheet = workbook.worksheets.find(sheet => sheet.id === id);
      if (worksheet && Object.keys(worksheet.cells).length > 0) onCompleteTasks([9]);
    }
  };

  const handleDeleteWorksheet = (id: string) => {
    if (workbook.worksheets.length === 1) return;
    
    const deletedSheet = workbook.worksheets.find(ws => ws.id === id);
    const index = workbook.worksheets.findIndex(ws => ws.id === id);
    const newWorksheets = workbook.worksheets.filter(ws => ws.id !== id);
    
    // If deleting active worksheet, switch to another
    let newActiveId = workbook.activeWorksheetId;
    if (id === workbook.activeWorksheetId) {
      newActiveId = index > 0 ? newWorksheets[index - 1].id : newWorksheets[0].id;
    }

    setWorkbook({
      worksheets: newWorksheets,
      activeWorksheetId: newActiveId
    });
    onAction(`Deleted worksheet: ${deletedSheet?.name}`);
    showToast(`Deleted ${deletedSheet?.name}`, 'info');
  };

  const handleResetToDefault = () => {
    setCells(sampleData);
    setReflectionText('');
    onAction('Reset current worksheet to default data');
    showToast('Loaded default sample data', 'success');
  };

  useEffect(() => {
    if (selectedCell && cells[selectedCell]) {
      setFormulaInput(cells[selectedCell].formula || cells[selectedCell].value);
    } else {
      setFormulaInput('');
    }
  }, [selectedCell, cells]);

  const handleImportData = () => {
    setCells(sampleData);
    onAction('Imported sample retail inventory dataset');
    showToast('Sample data imported successfully', 'success');
  };

  const handleResetData = () => {
    inspectedCells.current.clear();
    derivedFormulaColumns.current.clear();
    statisticFunctions.current.clear();
    setCells(emptyData);
    onCellSelect(null);
    setFormulaInput('');
    setReflectionText('');
    onAction('Reset current worksheet to empty state');
    showToast('Worksheet cleared', 'info');
    
    // Clear completed tasks
    if (onResetTasks) {
      onResetTasks();
    }
    
    // Clear AI Tutor chat
    if (onResetChat) {
      onResetChat();
    }
    
    // Clear the welcome modal flag so it shows again
    localStorage.removeItem('excelSimulator_hasSeenWelcome');
    
    // Trigger the welcome modal to show again
    if (onShowHelp) {
      setTimeout(() => onShowHelp(), 300); // Small delay for better UX
    }
  };

  const handleFormulaSubmit = (formula: string) => {
    if (!selectedCell) return;

    onAction(`Entered formula in ${selectedCell}: ${formula}`);

    const column = selectedCell.match(/^[A-Z]+/)?.[0];
    if (column && /^=/.test(formula.trim()) && ['J', 'K', 'L', 'M', 'N', 'O', 'P'].includes(column)) {
      derivedFormulaColumns.current.add(column);
      if (derivedFormulaColumns.current.size === 7) onCompleteTasks([5]);
    }
    const statisticalFunction = formula.toUpperCase().match(/\b(AVERAGE|MEDIAN|STDEV\.S|STDEV|MIN|MAX|COUNT|SUM)\s*\(/)?.[1];
    if (statisticalFunction) {
      statisticFunctions.current.add(statisticalFunction);
      if (statisticFunctions.current.size >= 8) onCompleteTasks([7]);
    }

    const result = evaluateFormula(formula, cells);
    
    setCells(prev => ({
      ...prev,
      [selectedCell]: {
        value: result,
        formula: formula,
        displayValue: result
      }
    }));
  };

  const handleCellEdit = (cellId: string, value: string) => {
    setCells(prev => ({
      ...prev,
      [cellId]: {
        value: value,
        formula: '',
        displayValue: value
      }
    }));
    if (value.trim()) onCompleteTasks([4]);
  };

  const handleGridCellSelect = (cellId: string | null) => {
    onCellSelect(cellId);
    if (!cellId || !cells[cellId]?.displayValue) return;
    inspectedCells.current.add(cellId);
    if (inspectedCells.current.size >= 5) onCompleteTasks([3]);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ffffff'
    }}>
      <SpreadsheetToolbar 
        onImportClick={() => setShowImportDialog(true)} 
        onResetClick={() => setShowResetDialog(true)}
        onResetToDefaultClick={handleResetToDefault}
        onHelpClick={() => onShowHelp?.()}
        onUserGuideClick={() => setShowHelpGuide(true)}
        onPrintClick={() => {
          const readyToPrint = window.confirm('Have you set up the Descriptives table to fit on one page with headers and footers? Select OK to mark this step complete and open print.');
          if (!readyToPrint) return;
          onCompleteTasks([10]);
          onAction('Confirmed print layout preparation');
          window.print();
        }}
      />
      <FormulaBar 
        selectedCell={selectedCell}
        formula={formulaInput}
        onFormulaChange={setFormulaInput}
        onFormulaSubmit={handleFormulaSubmit}
      />
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ExcelGrid 
          cells={cells}
          selectedCell={selectedCell}
          onCellSelect={handleGridCellSelect}
          onCellEdit={handleCellEdit}
        />
      </div>

      <WorksheetTabs
        worksheets={workbook.worksheets.map(ws => ({ id: ws.id, name: ws.name }))}
        activeWorksheetId={workbook.activeWorksheetId}
        onSelectWorksheet={handleSelectWorksheet}
        onAddWorksheet={handleAddWorksheet}
        onRenameWorksheet={handleRenameWorksheet}
        onDeleteWorksheet={handleDeleteWorksheet}
      />
      
      <ReflectionArea 
        value={reflectionText}
        onChange={setReflectionText}
        allTasksComplete={completedTasks.length >= 11}
        completedCount={completedTasks.length}
        totalCount={totalTasks}
      />
      
      <ImportDialog 
        isOpen={showImportDialog}
        onClose={() => setShowImportDialog(false)}
        onImport={handleImportData}
      />

      <ResetDialog 
        isOpen={showResetDialog}
        onClose={() => setShowResetDialog(false)}
        onConfirm={handleResetData}
      />

      <Toast messages={toasts} onDismiss={dismissToast} />
      <HelpGuide isOpen={showHelpGuide} onClose={() => setShowHelpGuide(false)} />
    </div>
  );
}

// Formula evaluation function
function evaluateFormula(formula: string, cells: CellMap): string {
  if (!formula.startsWith('=')) {
    return formula;
  }

  try {
    const expression = formula.substring(1).toUpperCase();

    // Handle SUM function
    if (expression.startsWith('SUM(')) {
      const range = expression.match(/SUM\(([A-Z0-9:]+)\)/);
      if (range) {
        const cellRefs = expandRange(range[1]);
        const sum = cellRefs.reduce((acc, ref) => {
          const cellValue = cells[ref]?.value || '0';
          return acc + parseFloat(cellValue) || 0;
        }, 0);
        return sum.toFixed(2);
      }
    }

    // Handle AVERAGE function
    if (expression.startsWith('AVERAGE(')) {
      const range = expression.match(/AVERAGE\(([A-Z0-9:]+)\)/);
      if (range) {
        const cellRefs = expandRange(range[1]);
        const values = cellRefs.map(ref => parseFloat(cells[ref]?.value || '0')).filter(v => !isNaN(v));
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        return avg.toFixed(2);
      }
    }

    // Handle MAX function
    if (expression.startsWith('MAX(')) {
      const range = expression.match(/MAX\(([A-Z0-9:]+)\)/);
      if (range) {
        const cellRefs = expandRange(range[1]);
        const values = cellRefs.map(ref => parseFloat(cells[ref]?.value || '0')).filter(v => !isNaN(v));
        const max = Math.max(...values);
        return max.toFixed(2);
      }
    }

    // Handle MIN function
    if (expression.startsWith('MIN(')) {
      const range = expression.match(/MIN\(([A-Z0-9:]+)\)/);
      if (range) {
        const cellRefs = expandRange(range[1]);
        const values = cellRefs.map(ref => parseFloat(cells[ref]?.value || '0')).filter(v => !isNaN(v));
        const min = Math.min(...values);
        return min.toFixed(2);
      }
    }

    // Handle COUNT function
    if (expression.startsWith('COUNT(')) {
      const range = expression.match(/COUNT\(([A-Z0-9:]+)\)/);
      if (range) {
        const cellRefs = expandRange(range[1]);
        const count = cellRefs.filter(ref => cells[ref]?.value && !isNaN(parseFloat(cells[ref].value))).length;
        return count.toString();
      }
    }

    // Handle MONTH function (extracts month from date)
    if (expression.startsWith('MONTH(')) {
      const cellMatch = expression.match(/MONTH\(([A-Z]+[0-9]+)\)/);
      if (cellMatch) {
        const dateStr = cells[cellMatch[1]]?.value || '';
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return (date.getMonth() + 1).toString();
        }
      }
    }

    // Handle DAY function (extracts day from date)
    if (expression.startsWith('DAY(')) {
      const cellMatch = expression.match(/DAY\(([A-Z]+[0-9]+)\)/);
      if (cellMatch) {
        const dateStr = cells[cellMatch[1]]?.value || '';
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return date.getDate().toString();
        }
      }
    }

    // Handle YEAR function (extracts year from date)
    if (expression.startsWith('YEAR(')) {
      const cellMatch = expression.match(/YEAR\(([A-Z]+[0-9]+)\)/);
      if (cellMatch) {
        const dateStr = cells[cellMatch[1]]?.value || '';
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return date.getFullYear().toString();
        }
      }
    }

    // Handle simple arithmetic (e.g., =E2*F2 or =H2-I2)
    const arithmeticMatch = expression.match(/([A-Z]+[0-9]+)\s*([\+\-\*\/])\s*([A-Z]+[0-9]+)/);
    if (arithmeticMatch) {
      const [, cell1, operator, cell2] = arithmeticMatch;
      const val1 = parseFloat(cells[cell1]?.value || '0');
      const val2 = parseFloat(cells[cell2]?.value || '0');
      
      let result = 0;
      switch (operator) {
        case '+': result = val1 + val2; break;
        case '-': result = val1 - val2; break;
        case '*': result = val1 * val2; break;
        case '/': return val2 !== 0 ? (val1 / val2).toFixed(2) : '#DIV/0!';
        default: return '#ERROR!';
      }
      return result.toFixed(2);
    }

    return '#ERROR!';
  } catch (error) {
    return '#ERROR!';
  }
}

function hasDescriptiveTableStructure(cells: CellMap): boolean {
  const statistics = new Set(['mean', 'median', 'standard deviation', 'minimum', 'maximum', 'range', 'count', 'sum']);
  const variables = new Set(['price', 'sold', 'unit cost', 'total sales', 'total cost', 'total profit']);
  const variablePositions: Array<{ row: string; column: string }> = [];
  const statisticPositions: Array<{ row: string; column: string }> = [];

  Object.entries(cells).forEach(([address, cell]) => {
    const position = address.match(/^([A-Z]+)(\d+)$/);
    if (!position) return;
    const normalized = cell.displayValue.trim().toLowerCase().replace(/[_\s]+/g, ' ');
    const point = { column: position[1], row: position[2] };
    if (variables.has(normalized)) variablePositions.push(point);
    if (statistics.has(normalized)) statisticPositions.push(point);
  });

  const hasVariableHeaderRow = variablePositions.some(({ row }) =>
    variablePositions.filter(position => position.row === row).length >= 2
  );
  const hasStatisticLabelColumn = statisticPositions.some(({ column }) =>
    statisticPositions.filter(position => position.column === column).length >= 2
  );

  return hasVariableHeaderRow && hasStatisticLabelColumn;
}

// Helper function to expand range notation (e.g., "B2:B6" -> ["B2", "B3", "B4", "B5", "B6"])
function expandRange(rangeStr: string): string[] {
  if (rangeStr.includes(':')) {
    const [start, end] = rangeStr.split(':');
    const startCol = start.match(/[A-Z]+/)?.[0] || 'A';
    const startRow = parseInt(start.match(/[0-9]+/)?.[0] || '1');
    const endCol = end.match(/[A-Z]+/)?.[0] || 'A';
    const endRow = parseInt(end.match(/[0-9]+/)?.[0] || '1');

    const cells: string[] = [];
    
    if (startCol === endCol) {
      // Single column range
      for (let row = startRow; row <= endRow; row++) {
        cells.push(`${startCol}${row}`);
      }
    } else if (startRow === endRow) {
      // Single row range
      for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
        cells.push(`${String.fromCharCode(col)}${startRow}`);
      }
    }
    
    return cells;
  }
  
  return [rangeStr];
}
