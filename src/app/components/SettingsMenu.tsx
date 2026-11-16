import { Settings, X, HelpCircle, BookOpen, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SettingsMenuProps {
  onHelpClick: () => void;
  onUserGuideClick: () => void;
}

export default function SettingsMenu({ onHelpClick, onUserGuideClick }: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleHelpClick = () => {
    setIsOpen(false);
    onHelpClick();
  };

  const handleUserGuideClick = () => {
    setIsOpen(false);
    onUserGuideClick();
  };

  return (
    <>
      <div className="settings-menu-container" ref={menuRef}>
        <button
          className="settings-button"
          onClick={() => setIsOpen(!isOpen)}
          title="Settings"
        >
          <Settings size={16} />
          <span className="settings-button-text">Settings</span>
        </button>

        {isOpen && (
          <div className="settings-dropdown">
            <div className="settings-dropdown-header">
              <h3>Settings</h3>
              <button className="settings-close" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="settings-dropdown-content">
              <button className="settings-menu-item" onClick={handleHelpClick}>
                <div className="menu-item-icon">
                  <HelpCircle size={20} />
                </div>
                <div className="menu-item-content">
                  <div className="menu-item-title">Help</div>
                  <div className="menu-item-description">Quick start instructions</div>
                </div>
                <ChevronRight size={16} className="menu-item-arrow" />
              </button>

              <button className="settings-menu-item" onClick={handleUserGuideClick}>
                <div className="menu-item-icon">
                  <BookOpen size={20} />
                </div>
                <div className="menu-item-content">
                  <div className="menu-item-title">User Guide</div>
                  <div className="menu-item-description">Complete documentation</div>
                </div>
                <ChevronRight size={16} className="menu-item-arrow" />
              </button>
            </div>

            <div className="settings-dropdown-footer">
              <div className="settings-version">Version 1.0.0</div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .settings-menu-container {
          position: relative;
        }

        .settings-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          background-color: #ffffff;
          cursor: pointer;
          color: #666;
          transition: all 0.2s;
          font-size: 13px;
          font-weight: 500;
        }

        .settings-button:hover {
          background-color: #f5f5f5;
          border-color: #999;
        }

        .settings-button-text {
          display: inline;
        }

        .settings-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
          width: 320px;
          z-index: 1000;
          animation: settingsSlideDown 0.2s ease-out;
          overflow: hidden;
        }

        @keyframes settingsSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .settings-dropdown-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #e0e0e0;
          background: white;
          color: #333;
        }

        .settings-dropdown-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .settings-close {
          background: #f5f5f5;
          border: none;
          color: #666;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .settings-close:hover {
          background: #e0e0e0;
          color: #333;
          transform: rotate(90deg);
        }

        .settings-dropdown-content {
          padding: 8px;
        }

        .settings-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 8px;
          text-align: left;
        }

        .settings-menu-item:hover {
          background-color: #f5f5f5;
        }

        .menu-item-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          flex-shrink: 0;
        }

        .menu-item-content {
          flex: 1;
        }

        .menu-item-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 2px;
        }

        .menu-item-description {
          font-size: 12px;
          color: #999;
        }

        .menu-item-badge {
          padding: 4px 10px;
          background-color: #f5f5f5;
          color: #666;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .menu-item-arrow {
          color: #ccc;
          flex-shrink: 0;
        }

        .settings-dropdown-footer {
          padding: 12px 20px;
          border-top: 1px solid #e0e0e0;
          background-color: white;
        }

        .settings-version {
          font-size: 11px;
          color: #999;
          text-align: center;
        }

        @media (max-width: 768px) {
          .settings-button-text {
            display: none;
          }

          .settings-button {
            padding: 6px;
          }

          .settings-dropdown {
            width: 280px;
            right: -8px;
          }

          .menu-item-badge {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .settings-dropdown {
            position: fixed;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            border-radius: 12px 12px 0 0;
            animation: settingsSlideUp 0.3s ease-out;
          }

          @keyframes settingsSlideUp {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .menu-item-icon {
            width: 36px;
            height: 36px;
          }

          .menu-item-title {
            font-size: 15px;
          }

          .menu-item-description {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}