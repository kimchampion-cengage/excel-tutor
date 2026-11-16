import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { useSearchParams } from 'react-router';
import ScenarioPanel from './components/ScenarioPanel';
import Spreadsheet from './components/Spreadsheet';
import AITutorChat from './components/AITutorChat';
import WelcomeModal from './components/WelcomeModal';

export default function Main() {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [userActions, setUserActions] = useState<string[]>([]);
  const [showScenario, setShowScenario] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [resetChatTrigger, setResetChatTrigger] = useState(0);
  const [resetAllTrigger, setResetAllTrigger] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // Check if we should reset everything (coming back from completion page)
  useEffect(() => {
    if (searchParams.get('reset') === 'true') {
      // Clear all state
      setCompletedTasks([]);
      setResetChatTrigger(prev => prev + 1);
      setResetAllTrigger(prev => prev + 1);
      setShowWelcome(true);
      
      // Clear the search params
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  const handleCellAction = (action: string) => {
    setUserActions(prev => [...prev, action]);
    if (action.startsWith('Imported sample retail inventory dataset')) {
      handleAutoCompleteTasks([1, 2]);
    }
  };

  const handleAutoCompleteTasks = (taskIds: number[]) => {
    setCompletedTasks(prev => Array.from(new Set([...prev, ...taskIds])));
  };

  const handleToggleTask = (taskId: number) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleResetTasks = () => {
    setCompletedTasks([]);
  };

  const handleResetChat = () => {
    setResetChatTrigger(prev => prev + 1);
  };

  return (
    <div className="app-container">
      {/* Welcome Modal */}
      <WelcomeModal isOpen={showWelcome} onClose={handleCloseWelcome} />

      {/* Mobile Header */}
      <div className="mobile-header">
        <button 
          className="mobile-toggle-btn"
          onClick={() => setShowScenario(!showScenario)}
        >
          {showScenario ? <X size={20} /> : <Menu size={20} />}
          <span>Scenario</span>
        </button>
        <span className="mobile-title">Excel Learning Simulator</span>
        <button 
          className="mobile-toggle-btn"
          onClick={() => setShowChat(!showChat)}
        >
          <MessageSquare size={20} />
          <span>AI Tutor</span>
        </button>
      </div>

      <div className="main-layout">
        {/* Left Panel - Scenario Sidebar */}
        <div className={`scenario-panel ${showScenario ? 'show' : ''}`}>
          <ScenarioPanel 
            isCollapsed={false}
            onToggleCollapse={() => {}}
            completedTasks={completedTasks}
            onToggleTask={handleToggleTask}
          />
        </div>
        
        {/* Center Panel - Spreadsheet */}
        <div className="spreadsheet-panel">
          <Spreadsheet 
            selectedCell={selectedCell}
            onCellSelect={setSelectedCell}
            onAction={handleCellAction}
            onCompleteTasks={handleAutoCompleteTasks}
            onShowHelp={() => setShowWelcome(true)}
            completedTasks={completedTasks}
            totalTasks={11}
            onResetTasks={handleResetTasks}
            onResetChat={handleResetChat}
            resetAllTrigger={resetAllTrigger}
          />
        </div>
        
        {/* Right Panel - AI Tutor */}
        <div className={`chat-panel ${showChat ? 'show' : ''}`}>
          <AITutorChat 
            userActions={userActions}
            selectedCell={selectedCell}
            completedTasks={completedTasks}
            resetTrigger={resetChatTrigger}
          />
        </div>
      </div>

      {/* Mobile Overlays */}
      {showScenario && (
        <div 
          className="mobile-overlay"
          onClick={() => setShowScenario(false)}
        />
      )}
      {showChat && (
        <div 
          className="mobile-overlay"
          onClick={() => setShowChat(false)}
        />
      )}

      <style>{`
        .app-container {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background-color: #f5f5f5;
        }

        .mobile-header {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background-color: #1a73e8;
          color: white;
          border-bottom: 1px solid #1557b0;
        }

        .mobile-title {
          font-size: 14px;
          font-weight: 600;
        }

        .mobile-toggle-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 13px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .mobile-toggle-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }

        .main-layout {
          display: grid;
          grid-template-columns: 60px 1fr 350px;
          flex: 1;
          overflow: hidden;
        }

        .scenario-panel,
        .spreadsheet-panel,
        .chat-panel {
          height: 100%;
          overflow: hidden;
        }

        .mobile-overlay {
          display: none;
        }

        /* Tablet (768px - 1024px) */
        @media (max-width: 1024px) {
          .main-layout {
            grid-template-columns: 55px 1fr 320px;
          }
        }

        /* Mobile & Small Tablet (below 768px) */
        @media (max-width: 768px) {
          .mobile-header {
            display: flex;
          }

          .main-layout {
            grid-template-columns: 1fr;
            position: relative;
          }

          .scenario-panel,
          .chat-panel {
            position: fixed;
            top: 53px;
            bottom: 0;
            width: 85%;
            max-width: 320px;
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            background-color: white;
            box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
          }

          .scenario-panel.show {
            transform: translateX(0);
          }

          .chat-panel {
            left: auto;
            right: 0;
            transform: translateX(100%);
            box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
          }

          .chat-panel.show {
            transform: translateX(0);
          }

          .spreadsheet-panel {
            height: calc(100vh - 53px);
          }

          .mobile-overlay {
            display: block;
            position: fixed;
            top: 53px;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }
        }

        /* Small Mobile (below 480px) */
        @media (max-width: 480px) {
          .scenario-panel,
          .chat-panel {
            width: 100%;
            max-width: 100%;
          }

          .mobile-title {
            font-size: 12px;
          }

          .mobile-toggle-btn span {
            display: none;
          }

          .mobile-toggle-btn {
            padding: 6px 8px;
          }
        }
      `}</style>
    </div>
  );
}
