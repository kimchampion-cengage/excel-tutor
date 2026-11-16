import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export interface Worksheet {
  id: string;
  name: string;
}

interface WorksheetTabsProps {
  worksheets: Worksheet[];
  activeWorksheetId: string;
  onSelectWorksheet: (id: string) => void;
  onAddWorksheet: () => void;
  onRenameWorksheet: (id: string, newName: string) => void;
  onDeleteWorksheet: (id: string) => void;
}

export default function WorksheetTabs({
  worksheets,
  activeWorksheetId,
  onSelectWorksheet,
  onAddWorksheet,
  onRenameWorksheet,
  onDeleteWorksheet
}: WorksheetTabsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleDoubleClick = (worksheet: Worksheet) => {
    setEditingId(worksheet.id);
    setEditingName(worksheet.name);
  };

  const handleNameSubmit = (id: string) => {
    if (editingName.trim()) {
      onRenameWorksheet(id, editingName.trim());
    }
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleNameSubmit(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (worksheets.length > 1) {
      onDeleteWorksheet(id);
    }
  };

  return (
    <>
      <div className="worksheet-tabs-container" title="Click tabs to switch worksheets • Double-click to rename • Click + to add new">
        <div className="worksheet-tabs-scroll">
          {worksheets.map((worksheet) => (
            <div
              key={worksheet.id}
              className={`worksheet-tab ${activeWorksheetId === worksheet.id ? 'active' : ''}`}
              onClick={() => onSelectWorksheet(worksheet.id)}
              onDoubleClick={() => handleDoubleClick(worksheet)}
            >
              {editingId === worksheet.id ? (
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={() => handleNameSubmit(worksheet.id)}
                  onKeyDown={(e) => handleKeyDown(e, worksheet.id)}
                  className="worksheet-tab-input"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <span className="worksheet-tab-name">{worksheet.name}</span>
                  {worksheets.length > 1 && (
                    <button
                      className="worksheet-tab-delete"
                      onClick={(e) => handleDelete(e, worksheet.id)}
                      title="Delete worksheet"
                    >
                      <X size={14} />
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
          <button className="worksheet-add-btn" onClick={onAddWorksheet} title="Add worksheet">
            <Plus size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .worksheet-tabs-container {
          background-color: #f0f0f0;
          border-top: 1px solid #d0d0d0;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          min-height: 44px;
        }

        .worksheet-tabs-scroll {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: #c0c0c0 #f0f0f0;
        }

        .worksheet-tabs-scroll::-webkit-scrollbar {
          height: 6px;
        }

        .worksheet-tabs-scroll::-webkit-scrollbar-track {
          background: #f0f0f0;
        }

        .worksheet-tabs-scroll::-webkit-scrollbar-thumb {
          background: #c0c0c0;
          border-radius: 3px;
        }

        .worksheet-tab {
          background-color: #d8d8d8;
          border: 1px solid #b0b0b0;
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          padding: 6px 12px;
          cursor: pointer;
          user-select: none;
          font-size: 13px;
          color: #555;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          white-space: nowrap;
          min-width: 80px;
          max-width: 180px;
        }

        .worksheet-tab:hover {
          background-color: #e0e0e0;
        }

        .worksheet-tab.active {
          background-color: #ffffff;
          color: #333;
          font-weight: 600;
          border-bottom: 2px solid #ffffff;
          margin-bottom: -1px;
          z-index: 1;
        }

        .worksheet-tab-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .worksheet-tab-input {
          flex: 1;
          border: 1px solid #1a73e8;
          border-radius: 3px;
          padding: 2px 4px;
          font-size: 13px;
          outline: none;
          background-color: white;
          min-width: 60px;
        }

        .worksheet-tab-delete {
          background: none;
          border: none;
          padding: 2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          border-radius: 3px;
          transition: all 0.2s;
          opacity: 0;
        }

        .worksheet-tab:hover .worksheet-tab-delete {
          opacity: 1;
        }

        .worksheet-tab-delete:hover {
          background-color: #ff4444;
          color: white;
        }

        .worksheet-add-btn {
          background-color: #e8e8e8;
          border: 1px solid #c0c0c0;
          border-radius: 4px;
          padding: 6px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .worksheet-add-btn:hover {
          background-color: #d0d0d0;
          color: #333;
        }

        .worksheet-add-btn:active {
          transform: scale(0.95);
        }

        @media (max-width: 768px) {
          .worksheet-tabs-container {
            padding: 6px 8px;
            min-height: 40px;
          }

          .worksheet-tab {
            padding: 5px 10px;
            font-size: 12px;
            min-width: 70px;
            max-width: 140px;
          }

          .worksheet-add-btn {
            padding: 5px 8px;
          }
        }
      `}</style>
    </>
  );
}
