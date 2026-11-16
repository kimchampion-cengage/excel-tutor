import { useState, useEffect } from 'react';
import { FileText, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useNavigate } from 'react-router';

interface ReflectionAreaProps {
  value: string;
  onChange: (value: string) => void;
  allTasksComplete: boolean;
  completedCount: number;
  totalCount: number;
}

export default function ReflectionArea({ value, onChange, allTasksComplete, completedCount, totalCount }: ReflectionAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  
  // Auto-expand when all tasks are completed
  useEffect(() => {
    if (allTasksComplete) {
      setIsExpanded(true);
    }
  }, [allTasksComplete]);
  
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const minWords = 100;
  const maxWords = 150;
  
  const canSubmit = allTasksComplete && wordCount >= minWords && wordCount <= maxWords;
  
  const getProgressColor = () => {
    if (wordCount < minWords) return '#d32f2f';
    if (wordCount > maxWords) return '#ff9800';
    return '#4caf50';
  };

  const handleTurnIn = () => {
    if (canSubmit) {
      navigate('/completion');
    }
  };

  return (
    <>
      <div className="reflection-area">
        <div 
          className="reflection-header clickable" 
          onClick={() => setIsExpanded(!isExpanded)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <div className="reflection-title-section">
            <FileText size={18} color="#1a73e8" />
            <h3 className="reflection-title">Methodology Reflection</h3>
            {!isExpanded && wordCount > 0 && (
              <span className="reflection-preview-badge">
                {wordCount} words
              </span>
            )}
          </div>
          <div className="reflection-header-right">
            {isExpanded && (
              <div className="reflection-word-count" style={{ color: getProgressColor() }}>
                {wordCount} / {minWords}-{maxWords} words
              </div>
            )}
            {isExpanded ? <ChevronUp size={20} color="#666" /> : <ChevronDown size={20} color="#666" />}
          </div>
        </div>
        
        {isExpanded && (
          <div className="reflection-content">
            {!allTasksComplete && (
              <div className="reflection-locked-message">
                <div className="locked-icon">🔒</div>
                <div className="locked-text">
                  <strong>Complete all 11 steps</strong>
                  <p>You've completed {completedCount} of 11 steps. Finish all steps before writing your methodology reflection.</p>
                </div>
              </div>
            )}
            
            <div className="reflection-instructions">
              <p>
                <strong>Required:</strong> Write a brief methodology reflection (100-150 words) explaining your data preparation approach. Address:
              </p>
              <ul>
                <li><strong>Data Cleaning:</strong> What data quality issues did you identify? How did you address missing values, inconsistencies, or formatting problems?</li>
                <li><strong>Derived Variables:</strong> Explain the formulas and methods you used to create Total_Sales, Total_Cost, Total_Profit, and date components.</li>
                <li><strong>Descriptive Statistics:</strong> Which Excel functions did you use to calculate the statistics? How did you organize the Descriptives worksheet?</li>
                <li><strong>Methodology Choices:</strong> If you imputed or modified data values, clearly note the method used and your reasoning.</li>
              </ul>
            </div>

            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={allTasksComplete ? "Explain your data preparation methodology: data cleaning approach, formulas used for derived variables, statistical functions applied, and any data modifications made..." : "Complete all tasks to unlock this section..."}
              className={`reflection-textarea ${isFocused ? 'focused' : ''} ${!allTasksComplete ? 'disabled' : ''}`}
              disabled={!allTasksComplete}
            />
            
            {wordCount > 0 && wordCount < minWords && (
              <div className="reflection-hint warning">
                ⚠️ Your response is too short. Please provide more detail ({minWords - wordCount} more words needed).
              </div>
            )}
            
            {wordCount > maxWords && (
              <div className="reflection-hint warning">
                ⚠️ Your response is too long. Please be more concise ({wordCount - maxWords} words over limit).
              </div>
            )}
            
            {wordCount >= minWords && wordCount <= maxWords && (
              <div className="reflection-hint success">
                ✓ Good length! Make sure you've addressed all three required points.
              </div>
            )}
            
            {canSubmit && (
              <button
                className="reflection-turn-in-button"
                onClick={handleTurnIn}
              >
                <Send size={16} />
                <span>Turn In Lesson</span>
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        .reflection-area {
          background-color: #ffffff;
          border-top: 2px solid #1a73e8;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
        }

        .reflection-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          transition: background-color 0.2s;
        }

        .reflection-header.clickable {
          cursor: pointer;
          user-select: none;
        }

        .reflection-header.clickable:hover {
          background-color: #f8f9fa;
        }

        .reflection-header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .reflection-title-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .reflection-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .reflection-preview-badge {
          font-size: 12px;
          color: #666;
          background-color: #e8f5e9;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 500;
        }

        .reflection-word-count {
          font-size: 13px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
          background-color: #f5f5f5;
        }

        .reflection-content {
          padding: 0 20px 20px 20px;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .reflection-locked-message {
          background: var(--magma-warning-bg);
          border: 2px solid var(--magma-warning-border);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 2px 8px color-mix(in srgb, var(--magma-warning-border) 20%, transparent);
        }

        .locked-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .locked-text strong {
          display: block;
          font-size: 15px;
          color: var(--magma-warning-text);
          margin-bottom: 4px;
        }

        .locked-text p {
          margin: 0;
          font-size: 13px;
          color: #555;
          line-height: 1.5;
        }

        .reflection-instructions {
          background-color: #f8f9fa;
          border-left: 3px solid #1a73e8;
          padding: 12px 16px;
          margin-bottom: 16px;
          border-radius: 4px;
        }

        .reflection-instructions p {
          margin: 0 0 10px 0;
          font-size: 13px;
          color: #333;
          line-height: 1.5;
        }

        .reflection-instructions strong {
          color: #1a73e8;
        }

        .reflection-instructions ul {
          margin: 8px 0 0 0;
          padding-left: 20px;
        }

        .reflection-instructions li {
          font-size: 13px;
          color: #555;
          margin-bottom: 6px;
          line-height: 1.4;
        }

        .reflection-textarea {
          width: 100%;
          min-height: 140px;
          padding: 12px;
          border: 2px solid #d0d0d0;
          border-radius: 8px;
          font-size: 14px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.6;
          color: #333;
          resize: vertical;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s, opacity 0.2s;
        }

        .reflection-textarea.disabled {
          background-color: #f5f5f5;
          color: #999;
          cursor: not-allowed;
          border-color: #e0e0e0;
          opacity: 0.6;
        }

        .reflection-textarea::placeholder {
          color: #999;
          font-style: italic;
        }

        .reflection-textarea.focused {
          border-color: #1a73e8;
          box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
        }

        .reflection-hint {
          margin-top: 10px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .reflection-hint.warning {
          background-color: var(--magma-warning-bg);
          color: var(--magma-warning-text);
          border: 1px solid var(--magma-warning-border);
        }

        .reflection-hint.success {
          background-color: var(--magma-success-bg);
          color: var(--magma-success-text);
          border: 1px solid var(--magma-success-border);
        }

        .reflection-turn-in-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #1a73e8 0%, #1557b0 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 16px;
          box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
        }

        .reflection-turn-in-button:hover {
          background: linear-gradient(135deg, #1557b0 0%, #0d47a1 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(26, 115, 232, 0.4);
        }

        .reflection-turn-in-button:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .reflection-area {
            /* No padding change needed - already handled by header/content */
          }

          .reflection-header {
            padding: 12px 16px;
          }

          .reflection-content {
            padding: 0 16px 16px 16px;
          }

          .reflection-header-right {
            gap: 8px;
          }

          .reflection-title {
            font-size: 15px;
          }

          .reflection-preview-badge {
            font-size: 11px;
            padding: 2px 6px;
          }

          .reflection-word-count {
            font-size: 12px;
          }

          .reflection-locked-message {
            padding: 12px;
            gap: 12px;
          }

          .locked-icon {
            font-size: 28px;
          }

          .locked-text strong {
            font-size: 14px;
          }

          .locked-text p {
            font-size: 12px;
          }

          .reflection-instructions {
            padding: 10px 12px;
          }

          .reflection-instructions p,
          .reflection-instructions li {
            font-size: 12px;
          }

          .reflection-textarea {
            min-height: 120px;
            font-size: 13px;
          }

          .reflection-hint {
            font-size: 11px;
          }

          .reflection-turn-in-button {
            font-size: 13px;
            padding: 6px 14px;
          }
        }
      `}</style>
    </>
  );
}
