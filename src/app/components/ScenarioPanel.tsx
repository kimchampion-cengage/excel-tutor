import { useState, useRef, useEffect } from 'react';
import { BookOpen, ListTodo, Lightbulb, Pin, X, GripVertical } from 'lucide-react';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Badge, BadgeColor, BadgeVariant, Checkbox } from 'react-magma-dom';

interface Task {
  id: string; // Changed to string to support "1.1", "1.2" format
  taskNumber: number; // Main task number (1-5)
  stepNumber: number; // Step within task (1, 2, 3, etc.)
  description: string;
  completed: boolean;
  hint: string;
  isTaskHeader?: boolean;
  taskTitle?: string;
}

type PopupSection = 'scenario' | 'tasks' | 'hints' | null;

interface Position {
  x: number;
  y: number;
}

interface ScenarioPanelProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  completedTasks: number[];
  onToggleTask: (taskId: number) => void;
}

export default function ScenarioPanel({ isCollapsed, onToggleCollapse, completedTasks, onToggleTask }: ScenarioPanelProps) {
  const [activePopup, setActivePopup] = useState<PopupSection>('scenario'); // Changed from null to 'scenario' to show scenario description by default
  const [pinnedSections, setPinnedSections] = useState<Set<PopupSection>>(new Set());
  const [positions, setPositions] = useState<Record<string, Position>>({
    scenario: { x: 70, y: 60 },
    tasks: { x: 70, y: 140 },
    hints: { x: 70, y: 220 }
  });
  const [dragging, setDragging] = useState<PopupSection>(null);
  const dragRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragOffset = useRef<Position>({ x: 0, y: 0 });

  const tasks: Task[] = [
    // Task 1: Import the Data
    { 
      id: "1", 
      taskNumber: 1, 
      stepNumber: 0, 
      description: 'Import the Data', 
      completed: false,
      hint: '',
      isTaskHeader: true,
      taskTitle: 'Task 1: Import the Data'
    },
    { 
      id: "1.1", 
      taskNumber: 1, 
      stepNumber: 1, 
      description: 'Import the data into the spreadsheet', 
      completed: completedTasks.includes(1),
      hint: 'Click the "Import Data" button in the toolbar. This loads the raw retail inventory data into your spreadsheet.'
    },
    { 
      id: "1.2", 
      taskNumber: 1, 
      stepNumber: 2, 
      description: 'Organize the data in a way that allows it to be analyzed efficiently', 
      completed: completedTasks.includes(2),
      hint: 'You may use Excel tables or other features that support data analysis. Think about organizing headers and ensuring data is in columns.'
    },
    
    // Task 2: Prepare and Clean the Dataset
    { 
      id: "2", 
      taskNumber: 2, 
      stepNumber: 0, 
      description: 'Prepare and Clean the Dataset', 
      completed: false,
      hint: '',
      isTaskHeader: true,
      taskTitle: 'Task 2: Prepare and Clean the Dataset'
    },
    { 
      id: "2.1", 
      taskNumber: 2, 
      stepNumber: 1, 
      description: 'Examine the dataset for missing values, inconsistent entries, and formatting problems', 
      completed: completedTasks.includes(3),
      hint: 'Scroll through all rows and columns. Look for blank cells, unusual values, inconsistent formatting, or data that doesn\'t make sense. Document what you find.'
    },
    { 
      id: "2.2", 
      taskNumber: 2, 
      stepNumber: 2, 
      description: 'Apply appropriate methods to clean the data and address missing values', 
      completed: completedTasks.includes(4),
      hint: 'If you choose to impute or modify data values, clearly note the method used. Consider your options: delete, fill, or document the issue.'
    },
    
    // Task 3: Create Derived Variables
    { 
      id: "3", 
      taskNumber: 3, 
      stepNumber: 0, 
      description: 'Create Derived Variables', 
      completed: false,
      hint: '',
      isTaskHeader: true,
      taskTitle: 'Task 3: Create Derived Variables'
    },
    { 
      id: "3.1", 
      taskNumber: 3, 
      stepNumber: 1, 
      description: 'Create calculated fields: Total Sales, Total Cost, Total Profit, Month, Day, Year, Quarter', 
      completed: completedTasks.includes(5),
      hint: 'Total Sales = Price × Sold; Total Cost = Unit_Cost × Sold; Total Profit = Total Sales - Total Cost. For dates: use MONTH(), DAY(), YEAR() functions. For Quarter, use conditional logic based on month.'
    },
    
    // Task 4: Produce Descriptive Statistics
    { 
      id: "4", 
      taskNumber: 4, 
      stepNumber: 0, 
      description: 'Produce Descriptive Statistics', 
      completed: false,
      hint: '',
      isTaskHeader: true,
      taskTitle: 'Task 4: Produce Descriptive Statistics'
    },
    { 
      id: "4.1", 
      taskNumber: 4, 
      stepNumber: 1, 
      description: 'Create a table structure for descriptive statistics', 
      completed: completedTasks.includes(6),
      hint: 'Plan out your table structure before adding formulas. Consider: rows for statistics, columns for variables.'
    },
    { 
      id: "4.2", 
      taskNumber: 4, 
      stepNumber: 2, 
      description: 'Calculate these statistics: Mean, Median, Standard Deviation, Minimum, Maximum, Range, Count, Sum', 
      completed: completedTasks.includes(7),
      hint: 'Use Excel functions: AVERAGE(), MEDIAN(), STDEV.S(), MIN(), MAX(), COUNT(), SUM(). Range = MAX - MIN.'
    },
    { 
      id: "4.3", 
      taskNumber: 4, 
      stepNumber: 3, 
      description: 'Summarize variables: Price, Sold, Unit Cost, Total Sales, Total Cost, Total Profit', 
      completed: completedTasks.includes(8),
      hint: 'Your table should have these six variables as columns, with the eight statistics as rows. Reference Sheet1 data in your formulas.'
    },
    { 
      id: "4.4", 
      taskNumber: 4, 
      stepNumber: 4, 
      description: 'Organize results in a clear table on a separate worksheet titled "Descriptives"', 
      completed: completedTasks.includes(9),
      hint: 'Click the + button to add a new worksheet. Double-click the tab to rename it "Descriptives". Make sure your table is well-organized and easy to read.'
    },
    
    // Task 5: Format the Workbook for Presentation
    { 
      id: "5", 
      taskNumber: 5, 
      stepNumber: 0, 
      description: 'Format the Workbook for Presentation', 
      completed: false,
      hint: '',
      isTaskHeader: true,
      taskTitle: 'Task 5: Format the Workbook for Presentation'
    },
    { 
      id: "5.1", 
      taskNumber: 5, 
      stepNumber: 1, 
      description: 'Prepare the workbook so the Descriptive Statistics table prints clearly on a single page with headers and footers', 
      completed: completedTasks.includes(10),
      hint: 'Apply appropriate formatting, headers, footers, and print settings to ensure professional presentation.'
    },
    { 
      id: "5.2", 
      taskNumber: 5, 
      stepNumber: 2, 
      description: 'Organize the workbook so another analyst could easily understand the data and results', 
      completed: completedTasks.includes(11),
      hint: 'Use bold headers, aligned columns, appropriate number formatting, and clear labels. Think about readability and professional appearance.'
    }
  ];

  // Filter out task headers when counting for mobile display
  const actualSteps = tasks.filter(t => !t.isTaskHeader);
  const currentHintStep = actualSteps.find(step => !step.completed);
  const currentHintStepNumber = currentHintStep ? actualSteps.indexOf(currentHintStep) + 1 : actualSteps.length;
  const allTasksComplete = !currentHintStep;

  // Helper function to convert step ID to numeric task ID
  const getNumericTaskId = (stepId: string): number => {
    const step = actualSteps.find(t => t.id === stepId);
    if (!step) return 0;
    return actualSteps.indexOf(step) + 1;
  };

  const renderTaskAccordion = () => (
    <Accordion className="tasks-accordion" isMulti defaultIndex={[0, 1]}>
      {tasks.filter(task => task.isTaskHeader).map((header, index) => {
        const steps = tasks.filter(task => !task.isTaskHeader && task.taskNumber === header.taskNumber);
        return (
          <AccordionItem className="task-accordion-item" index={index} key={header.id}>
            <AccordionButton className="task-accordion-button">
              <span>{header.taskTitle?.replace(/^Task\s+\d+:\s*/i, `${header.taskNumber}. `)}</span>
            </AccordionButton>
            <AccordionPanel className="task-accordion-panel">
              <div className="task-accordion-steps">
                {steps.map((step, stepIndex) => (
                  <div className={`task-accordion-step ${step.completed ? 'completed' : ''}`} key={step.id}>
                    <Checkbox
                      labelText={step.description}
                      isTextVisuallyHidden
                      ariaLabel={step.description}
                      checked={step.completed}
                      onChange={() => onToggleTask(getNumericTaskId(step.id))}
                    />
                    <div className="task-accordion-step-copy">
                      <span className="task-accordion-step-description">{step.description}</span>
                    </div>
                    {step.completed && <span className="complete-badge">Complete</span>}
                  </div>
                ))}
              </div>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );

  const handleIconClick = (section: PopupSection) => {
    if (pinnedSections.has(section)) {
      const newPinned = new Set(pinnedSections);
      newPinned.delete(section);
      setPinnedSections(newPinned);
    } else {
      setActivePopup(section);
    }
  };

  const handlePin = (section: PopupSection) => {
    const newPinned = new Set(pinnedSections);
    newPinned.add(section);
    setPinnedSections(newPinned);
    setActivePopup(null);
  };

  const handleClose = (section: PopupSection) => {
    const newPinned = new Set(pinnedSections);
    newPinned.delete(section);
    setPinnedSections(newPinned);
    if (activePopup === section) {
      setActivePopup(null);
    }
  };

  const handlePopupClose = () => {
    setActivePopup(null);
  };

  const handleMouseDown = (e: React.MouseEvent, section: PopupSection) => {
    if (!pinnedSections.has(section)) return;
    
    const target = e.target as HTMLElement;
    if (!target.closest('.popup-header')) return;

    e.preventDefault();
    setDragging(section);

    const panel = dragRefs.current[section as string];
    if (panel) {
      const rect = panel.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;

      const panel = dragRefs.current[dragging];
      if (!panel) return;

      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      const rect = panel.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;

      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));

      setPositions(prev => ({
        ...prev,
        [dragging]: { x: constrainedX, y: constrainedY }
      }));
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const getDefaultPosition = (section: PopupSection) => {
    const defaultPositions = {
      scenario: { top: '60px', left: '70px' },
      tasks: { top: '140px', left: '70px' },
      hints: { top: '220px', left: '70px' }
    };
    return defaultPositions[section as keyof typeof defaultPositions] || { top: '60px', left: '70px' };
  };

  const renderPopupPanel = (section: PopupSection, title: string, icon: React.ReactNode, content: React.ReactNode) => {
    const isPinned = pinnedSections.has(section);
    const isActive = activePopup === section;
    
    if (!isPinned && !isActive) return null;

    const position = isPinned 
      ? { left: `${positions[section].x}px`, top: `${positions[section].y}px` }
      : getDefaultPosition(section);

    return (
      <div 
        ref={(el) => { dragRefs.current[section] = el; }}
        className={`popup-panel ${isPinned ? 'pinned' : ''} ${dragging === section ? 'dragging' : ''}`}
        style={position}
        onMouseDown={(e) => handleMouseDown(e, section)}
      >
        <div className={`popup-header ${isPinned ? 'draggable' : ''}`}>
          {isPinned && (
            <div className="drag-handle">
              <GripVertical size={16} />
            </div>
          )}
          <h3 className="popup-title">
            {icon}
            {title}
          </h3>
          <div className="popup-actions">
            {!isPinned && (
              <button 
                className="popup-btn"
                onClick={() => handlePin(section)}
                title="Pin this panel"
              >
                <Pin size={14} />
              </button>
            )}
            <button 
              className="popup-btn"
              onClick={() => handleClose(section)}
              title="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        <div className="popup-content">
          {content}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="scenario-sidebar">
        <button 
          className={`sidebar-icon ${pinnedSections.has('scenario') ? 'pinned' : ''}`}
          onClick={() => handleIconClick('scenario')}
          title="Scenario Description"
        >
          <BookOpen size={20} />
          <span className="icon-label">Scenario</span>
        </button>

        <button 
          className={`sidebar-icon ${pinnedSections.has('tasks') ? 'pinned' : ''}`}
          onClick={() => handleIconClick('tasks')}
          title="Tasks to Complete"
        >
          <ListTodo size={20} />
          <span className="icon-label">Tasks</span>
          <Badge className="task-badge" color={BadgeColor.primary} variant={BadgeVariant.counter}>
            {actualSteps.filter(t => !t.completed).length}
          </Badge>
        </button>

        <button 
          className={`sidebar-icon ${pinnedSections.has('hints') ? 'pinned' : ''}`}
          onClick={() => handleIconClick('hints')}
          title="Hints"
        >
          <Lightbulb size={20} />
          <span className="icon-label">Hints</span>
        </button>
      </div>

      {/* Mobile Full Panel */}
      <div className="scenario-mobile">
        <div className="scenario-header">
          <h2 className="scenario-title">Retail Inventory Analysis</h2>
          <p className="scenario-subtitle">Learning Module: Data Preparation & Analysis</p>
        </div>

        <div className="scenario-section">
          <h3 className="section-heading">📊 Scenario Description</h3>
          <p className="scenario-description">
            Welcome to the Excel Learning Simulator! You are a data analyst tasked with preparing and analyzing 
            retail transaction data from three store locations. Your project includes: examining data quality, 
            creating derived variables, extracting date components, producing descriptive statistics on a separate 
            worksheet, and formatting the workbook for professional presentation.
          </p>
          <div className="scenario-goals">
            <h4 className="goals-title">Project Objectives:</h4>
            <ul className="goals-list">
              <li>Import and examine data for quality issues</li>
              <li>Clean data and address missing values or inconsistencies</li>
              <li>Create derived variables (Total_Sales, Total_Cost, Total_Profit)</li>
              <li>Extract date components (Month, Day, Year, Quarter)</li>
              <li>Build comprehensive descriptive statistics table (Mean, Median, Std Dev, Min, Max, Range, Count, Sum)</li>
              <li>Organize results on separate "Descriptives" worksheet</li>
              <li>Format workbook for clear presentation</li>
            </ul>
          </div>
        </div>

        <div className="scenario-section">
          <h3 className="section-heading">✓ Tasks ({actualSteps.filter(t => t.completed).length}/{actualSteps.length})</h3>
          <div className="tasks-list">
            {renderTaskAccordion()}
          </div>
        </div>

        <div className="scenario-hint">
          <h3 className="hint-heading">{allTasksComplete ? '✓ Session Complete' : '💡 Current Hint'}</h3>
          {currentHintStep && (
            <Badge className="hint-badge" color={BadgeColor.warning} variant={BadgeVariant.label}>
              Step {currentHintStepNumber} of {actualSteps.length}
            </Badge>
          )}
          <p className="hint-text">
            {currentHintStep?.hint || 'Excellent work! All tasks completed! 🎉'}
          </p>
        </div>
      </div>

      {/* Desktop Popup Panels */}
      {renderPopupPanel(
        'scenario',
        'Scenario Description',
        <BookOpen size={16} />,
        <>
          <div className="scenario-badge">Learning Module: Data Preparation & Analysis</div>
          <h4 className="popup-content-title">Retail Inventory Analysis Project</h4>
          <p className="popup-text">
            You are a data analyst tasked with preparing and analyzing retail transaction data from three store 
            locations. Your objective is to examine and clean the raw data, create derived variables using Excel 
            formulas and functions, produce comprehensive descriptive statistics, and format the workbook for 
            professional presentation.
          </p>
          <div className="goals-section">
            <h5 className="popup-subtitle">Project Objectives:</h5>
            <ol className="goals-list-popup">
              <li>Import and examine the retail inventory dataset</li>
              <li>Identify and address data quality issues (missing values, inconsistencies, formatting)</li>
              <li>Create derived variables: Total_Sales, Total_Cost, Total_Profit</li>
              <li>Extract date components: Month, Day, Year, Quarter</li>
              <li>Produce descriptive statistics table on separate worksheet</li>
              <li>Format workbook for clear presentation and analysis</li>
              <li>Document your methodology and approach</li>
            </ol>
          </div>
        </>
      )}

      {renderPopupPanel(
        'tasks',
        'Tasks to Complete',
        <ListTodo size={16} />,
        <>
          <div className="task-progress">
            <span className="progress-text">{actualSteps.filter(t => t.completed).length} of {actualSteps.length} completed</span>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${(actualSteps.filter(t => t.completed).length / actualSteps.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="tasks-list">{renderTaskAccordion()}</div>
        </>
      )}

      {renderPopupPanel(
        'hints',
        allTasksComplete ? 'Session Complete' : 'Current Hint',
        <Lightbulb size={16} />,
        <div className="hint-content-wrapper">
          {currentHintStep && (
            <Badge className="hint-badge" color={BadgeColor.warning} variant={BadgeVariant.label}>
              Step {currentHintStepNumber} of {actualSteps.length}
            </Badge>
          )}
          <p className="popup-text hint-text-content">
            {currentHintStep?.hint || 'Excellent work! All tasks completed! 🎉'}
          </p>
        </div>
      )}

      {/* Backdrop for unpinned popups */}
      {activePopup && !pinnedSections.has(activePopup) && (
        <div className="popup-backdrop" onClick={handlePopupClose} />
      )}

      <style>{`
        .scenario-sidebar {
          background-color: #f5f5f5;
          border-right: 1px solid #d0d0d0;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 60px;
          padding: 12px 0;
          gap: 8px;
          align-items: center;
        }

        .scenario-mobile {
          display: none;
        }

        .sidebar-icon {
          position: relative;
          width: 48px;
          height: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          background-color: rgba(0, 0, 0, 0.05);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: #666;
          transition: all 0.2s;
        }

        .sidebar-icon:hover {
          background-color: rgba(0, 0, 0, 0.1);
          transform: translateX(2px);
        }

        .sidebar-icon.pinned {
          background-color: rgba(0, 0, 0, 0.15);
          box-shadow: 0 0 0 2px #ccc;
        }

        .icon-label {
          font-size: 9px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .task-badge {
          position: absolute;
          top: -4px;
          right: -4px;
        }

        .popup-panel {
          position: fixed;
          width: 380px;
          max-height: 500px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.2s ease;
        }

        .popup-panel.pinned {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25), 0 0 0 2px #1a73e8;
        }

        .popup-panel.dragging {
          cursor: grabbing;
          user-select: none;
          transition: none;
        }

        .popup-panel.dragging * {
          cursor: grabbing !important;
          user-select: none;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .popup-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 52px;
          min-height: 52px;
          padding: 0 16px;
          border-bottom: 1px solid #e0e0e0;
          background-color: #f8f9fa;
          border-radius: 12px 12px 0 0;
          gap: 8px;
        }

        .popup-header.draggable {
          cursor: grab;
        }

        .popup-header.draggable:active {
          cursor: grabbing;
        }

        .drag-handle {
          display: flex;
          align-items: center;
          color: #999;
          cursor: grab;
        }

        .drag-handle:active {
          cursor: grabbing;
        }

        .popup-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          flex: 1;
        }

        .popup-actions {
          display: flex;
          gap: 4px;
        }

        .popup-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: 1px solid #d0d0d0;
          border-radius: 6px;
          cursor: pointer;
          color: #666;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .popup-btn:hover {
          background-color: #1a73e8;
          border-color: #1a73e8;
          color: white;
        }

        .popup-content {
          padding: 16px;
          overflow-y: auto;
          max-height: 440px;
        }

        .scenario-badge {
          display: inline-block;
          padding: 6px 12px;
          background-color: #e3f2fd;
          color: #1a73e8;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .popup-content-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
        }

        .popup-text {
          font-size: 13px;
          line-height: 1.6;
          color: #666;
          margin-bottom: 16px;
        }

        .goals-section {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e0e0e0;
        }

        .popup-subtitle {
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .goals-list-popup {
          margin: 0;
          padding-left: 20px;
          font-size: 12px;
          line-height: 1.8;
          color: #666;
          list-style-type: decimal;
        }

        .goals-list-popup li {
          margin-bottom: 4px;
        }

        .hint-content-wrapper {
          background: transparent;
          padding: 0;
          border: 0;
        }

        .hint-badge {
          display: inline-block;
          margin-bottom: 8px;
        }

        .hint-text-content {
          color: #0b1f3a;
          margin-bottom: 0;
        }

        .task-progress {
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e0e0e0;
        }

        .progress-text {
          font-size: 12px;
          font-weight: 600;
          color: #1a73e8;
          display: block;
          margin-bottom: 8px;
        }

        .progress-bar-container {
          width: 100%;
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #1a73e8, #4caf50);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .tasks-list {
          display: block;
          width: 100%;
        }

        .tasks-accordion {
          width: 100%;
          border-bottom: 1px solid #dee5ee;
        }

        .task-accordion-item {
          width: 100%;
          border-top: 1px solid #dee5ee;
          background: #fff;
        }

        .task-accordion-button {
          width: 100%;
          min-height: 48px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          color: #0b1f3a;
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
          letter-spacing: 0.16px;
          background: #fff;
          border: 0;
          cursor: pointer;
        }

        .task-accordion-button:hover {
          background: #f8fafc;
        }

        .task-accordion-panel {
          width: 100%;
          padding: 8px 16px 16px;
          background: #fff;
        }

        .task-accordion-steps {
          width: 100%;
        }

        .task-accordion-step {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
          padding: 16px 8px 16px 16px;
          color: #0b1f3a;
          border-bottom: 1px solid #dee5ee;
        }

        .task-accordion-step:last-child {
          border-bottom: 0;
        }

        .task-accordion-step-copy {
          display: flex;
          flex: 1;
          min-width: 0;
          flex-direction: column;
          gap: 4px;
          justify-content: center;
        }

        .task-accordion-step-number {
          color: #0b1f3a;
          font-size: 12px;
          font-weight: 600;
          line-height: 16px;
        }

        .task-accordion-step-description {
          color: #0b1f3a;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.16px;
          overflow-wrap: anywhere;
        }

        .task-accordion-step.completed .task-accordion-step-description {
          color: #334155;
        }

        .task-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background-color: #f5f5f5;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          transition: all 0.2s;
        }

        .task-item:hover {
          background-color: #eeeeee;
          border-color: #d0d0d0;
        }

        .task-item.completed {
          background-color: #e8f5e9;
          border-color: #4caf50;
        }

        .task-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .task-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .task-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .task-number {
          font-size: 10px;
          font-weight: 600;
          color: #1a73e8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .task-item.completed .task-number {
          color: #4caf50;
        }

        .task-text {
          font-size: 12px;
          line-height: 1.6;
          color: #333;
        }

        .task-item.completed .task-text {
          color: #2e7d32;
        }

        /* Task Header Styles */
        .task-header-item {
          background-color: #e3f2fd;
          border: 2px solid #1a73e8;
          padding: 10px 16px;
          cursor: default;
        }

        .task-header-item:hover {
          background-color: #e3f2fd;
          border-color: #1a73e8;
        }

        .task-header-content {
          padding: 0;
          margin: 0;
        }

        .task-header-title {
          font-size: 13px;
          font-weight: 700;
          color: #1a73e8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Task Step Styles */
        .task-step-item {
          margin-left: 20px;
        }

        .complete-badge {
          display: inline-block;
          padding: 2px 6px;
          background-color: #4caf50;
          color: white;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          margin-left: 8px;
        }

        .popup-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 999;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .scenario-sidebar {
            display: none;
          }

          .scenario-mobile {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow-y: auto;
            background-color: white;
          }

          .scenario-header {
            padding: 20px;
            background-color: #1a73e8;
            color: white;
            border-bottom: 1px solid #1557b0;
          }

          .scenario-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .scenario-subtitle {
            font-size: 14px;
            opacity: 0.9;
          }

          .scenario-section {
            padding: 20px;
            border-bottom: 1px solid #e0e0e0;
          }

          .section-heading {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #333;
          }

          .scenario-description {
            font-size: 14px;
            line-height: 1.6;
            color: #666;
            margin-bottom: 16px;
          }

          .scenario-goals {
            background-color: #f5f7fa;
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #1a73e8;
          }

          .goals-title {
            font-size: 13px;
            font-weight: 600;
            color: #1a73e8;
            margin-bottom: 8px;
          }

          .goals-list {
            margin: 0;
            padding-left: 20px;
            font-size: 13px;
            line-height: 1.8;
            color: #555;
          }

          .goals-list li {
            margin-bottom: 6px;
          }

          .scenario-hint {
            padding: 20px;
            background-color: transparent;
            border-top: 1px solid #dee5ee;
          }

          .hint-heading {
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #0b1f3a;
          }

          .hint-text {
            font-size: 13px;
            line-height: 1.6;
            color: #0b1f3a;
          }

          .popup-panel {
            display: none;
          }

          .popup-backdrop {
            display: none;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .sidebar-icon {
            width: 44px;
            height: 44px;
          }

          .icon-label {
            font-size: 8px;
          }

          .popup-panel {
            width: 340px;
          }
        }
      `}</style>
    </>
  );
}
