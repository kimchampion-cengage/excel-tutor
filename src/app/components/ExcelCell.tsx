import { useState, useRef, useEffect } from 'react';

interface ExcelCellProps {
  cellId: string;
  value: string;
  isSelected: boolean;
  isHeader: boolean;
  onSelect: () => void;
  onEdit: (value: string) => void;
}

export default function ExcelCell({ cellId, value, isSelected, isHeader, onSelect, onEdit }: ExcelCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onEdit(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onEdit(editValue);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  return (
    <>
      <div
        className={`excel-cell ${isSelected ? 'selected' : ''} ${isHeader ? 'header' : ''}`}
        onClick={onSelect}
        onDoubleClick={handleDoubleClick}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="excel-cell-input"
          />
        ) : (
          <span>{value}</span>
        )}
      </div>

      <style>{`
        .excel-cell {
          width: 120px;
          min-width: 120px;
          height: 28px;
          border: 1px solid #d0d0d0;
          border-top: none;
          border-left: none;
          padding: 4px 8px;
          font-size: 13px;
          background-color: #ffffff;
          font-weight: 400;
          color: #333;
          cursor: default;
          position: relative;
          box-sizing: border-box;
          flex-shrink: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .excel-cell.header {
          background-color: #fafafa;
          font-weight: 600;
        }

        .excel-cell.selected {
          background-color: #e3f2fd;
          outline: 2px solid #1a73e8;
          outline-offset: -2px;
        }

        .excel-cell-input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          padding: 0;
          font-size: 13px;
          font-family: inherit;
          background-color: transparent;
        }

        @media (max-width: 768px) {
          .excel-cell {
            width: 90px;
            min-width: 90px;
            font-size: 12px;
            padding: 3px 6px;
          }

          .excel-cell-input {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .excel-cell {
            width: 80px;
            min-width: 80px;
            font-size: 11px;
            padding: 2px 4px;
          }

          .excel-cell-input {
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
}
