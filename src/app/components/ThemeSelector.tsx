import { Palette, Check, X } from 'lucide-react';
import { useState } from 'react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textLight: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  gradients: {
    primary: string;
    header: string;
    button: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Modern Purple',
    description: 'Original vibrant purple gradient theme',
    colors: {
      primary: '#667eea',
      primaryDark: '#5568d3',
      primaryLight: '#7c8ef0',
      secondary: '#764ba2',
      accent: '#e91e63',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#333333',
      textLight: '#666666',
      border: '#e0e0e0',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#d32f2f',
      info: '#2196f3',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      header: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      button: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }
  },
  {
    id: 'professional',
    name: 'Professional Blue',
    description: 'Clean corporate blue theme',
    colors: {
      primary: '#1a73e8',
      primaryDark: '#1557b0',
      primaryLight: '#4285f4',
      secondary: '#0d47a1',
      accent: '#ff6f00',
      background: '#ffffff',
      surface: '#f5f7fa',
      text: '#212121',
      textLight: '#5f6368',
      border: '#dadce0',
      success: '#34a853',
      warning: '#fbbc04',
      error: '#ea4335',
      info: '#4285f4',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
      header: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
      button: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    }
  },
  {
    id: 'educational',
    name: 'Educational Green',
    description: 'Fresh and friendly learning theme',
    colors: {
      primary: '#43a047',
      primaryDark: '#2e7d32',
      primaryLight: '#66bb6a',
      secondary: '#00897b',
      accent: '#ffa726',
      background: '#ffffff',
      surface: '#f1f8f4',
      text: '#1b5e20',
      textLight: '#558b2f',
      border: '#c8e6c9',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#e53935',
      info: '#00acc1',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #43a047 0%, #00897b 100%)',
      header: 'linear-gradient(135deg, #66bb6a 0%, #26a69a 100%)',
      button: 'linear-gradient(135deg, #4caf50 0%, #009688 100%)',
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    description: 'Calm blue-teal ocean theme',
    colors: {
      primary: '#0288d1',
      primaryDark: '#01579b',
      primaryLight: '#03a9f4',
      secondary: '#00acc1',
      accent: '#ff5722',
      background: '#ffffff',
      surface: '#e1f5fe',
      text: '#01579b',
      textLight: '#0277bd',
      border: '#b3e5fc',
      success: '#26c6da',
      warning: '#ffa726',
      error: '#ef5350',
      info: '#29b6f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0288d1 0%, #00acc1 100%)',
      header: 'linear-gradient(135deg, #03a9f4 0%, #00bcd4 100%)',
      button: 'linear-gradient(135deg, #29b6f6 0%, #26c6da 100%)',
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    description: 'Warm and energetic sunset theme',
    colors: {
      primary: '#f57c00',
      primaryDark: '#e65100',
      primaryLight: '#fb8c00',
      secondary: '#d84315',
      accent: '#8e24aa',
      background: '#ffffff',
      surface: '#fff3e0',
      text: '#bf360c',
      textLight: '#e64a19',
      border: '#ffe0b2',
      success: '#7cb342',
      warning: '#ffa726',
      error: '#e53935',
      info: '#29b6f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #f57c00 0%, #d84315 100%)',
      header: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
      button: 'linear-gradient(135deg, #fb8c00 0%, #f4511e 100%)',
    }
  },
  {
    id: 'corporate',
    name: 'Corporate Gray',
    description: 'Sophisticated neutral theme',
    colors: {
      primary: '#546e7a',
      primaryDark: '#37474f',
      primaryLight: '#78909c',
      secondary: '#607d8b',
      accent: '#ff6f00',
      background: '#ffffff',
      surface: '#eceff1',
      text: '#263238',
      textLight: '#546e7a',
      border: '#cfd8dc',
      success: '#66bb6a',
      warning: '#ffa726',
      error: '#ef5350',
      info: '#42a5f5',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #546e7a 0%, #37474f 100%)',
      header: 'linear-gradient(135deg, #607d8b 0%, #455a64 100%)',
      button: 'linear-gradient(135deg, #78909c 0%, #546e7a 100%)',
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Dark',
    description: 'Elegant dark mode theme',
    colors: {
      primary: '#7c4dff',
      primaryDark: '#651fff',
      primaryLight: '#b388ff',
      secondary: '#536dfe',
      accent: '#ff4081',
      background: '#121212',
      surface: '#1e1e1e',
      text: '#ffffff',
      textLight: '#b0b0b0',
      border: '#333333',
      success: '#69f0ae',
      warning: '#ffd54f',
      error: '#ff5252',
      info: '#448aff',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #7c4dff 0%, #536dfe 100%)',
      header: 'linear-gradient(135deg, #9575cd 0%, #7986cb 100%)',
      button: 'linear-gradient(135deg, #b388ff 0%, #8c9eff 100%)',
    }
  },
  {
    id: 'forest',
    name: 'Forest Nature',
    description: 'Earthy green and brown theme',
    colors: {
      primary: '#558b2f',
      primaryDark: '#33691e',
      primaryLight: '#7cb342',
      secondary: '#6d4c41',
      accent: '#ff6f00',
      background: '#ffffff',
      surface: '#f1f8e9',
      text: '#33691e',
      textLight: '#689f38',
      border: '#dcedc8',
      success: '#8bc34a',
      warning: '#ffb300',
      error: '#d32f2f',
      info: '#0288d1',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #558b2f 0%, #6d4c41 100%)',
      header: 'linear-gradient(135deg, #7cb342 0%, #8d6e63 100%)',
      button: 'linear-gradient(135deg, #689f38 0%, #795548 100%)',
    }
  },
  {
    id: 'rose',
    name: 'Rose Pink',
    description: 'Elegant pink and purple theme',
    colors: {
      primary: '#c2185b',
      primaryDark: '#880e4f',
      primaryLight: '#e91e63',
      secondary: '#8e24aa',
      accent: '#ff6f00',
      background: '#ffffff',
      surface: '#fce4ec',
      text: '#880e4f',
      textLight: '#ad1457',
      border: '#f8bbd0',
      success: '#66bb6a',
      warning: '#ffb300',
      error: '#e53935',
      info: '#42a5f5',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #c2185b 0%, #8e24aa 100%)',
      header: 'linear-gradient(135deg, #ec407a 0%, #ab47bc 100%)',
      button: 'linear-gradient(135deg, #f06292 0%, #ba68c8 100%)',
    }
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    description: 'Classic Excel green theme',
    colors: {
      primary: '#217346',
      primaryDark: '#0e5c2f',
      primaryLight: '#33a357',
      secondary: '#107c41',
      accent: '#d83b01',
      background: '#ffffff',
      surface: '#f2f2f2',
      text: '#323130',
      textLight: '#605e5c',
      border: '#d2d0ce',
      success: '#107c41',
      warning: '#ffb900',
      error: '#d83b01',
      info: '#0078d4',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #217346 0%, #107c41 100%)',
      header: 'linear-gradient(135deg, #33a357 0%, #107c41 100%)',
      button: 'linear-gradient(135deg, #217346 0%, #0e5c2f 100%)',
    }
  }
];

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

export default function ThemeSelector({ currentTheme, onThemeChange, onClose, isOpen: externalIsOpen }: ThemeSelectorProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleThemeSelect = (themeId: string) => {
    onThemeChange(themeId);
    setInternalIsOpen(false);
    onClose?.();
  };

  const handleClose = () => {
    setInternalIsOpen(false);
    onClose?.();
  };

  const handleButtonClick = () => {
    if (externalIsOpen === undefined) {
      setInternalIsOpen(true);
    }
  };

  return (
    <>
      {externalIsOpen === undefined && (
        <button 
          className="theme-toggle-btn"
          onClick={handleButtonClick}
          title="Change Theme"
        >
          <Palette size={16} />
          <span className="theme-toggle-text">Theme</span>
        </button>
      )}

      {isOpen && (
        <div className="theme-modal-overlay" onClick={handleClose}>
          <div className="theme-modal" onClick={(e) => e.stopPropagation()}>
            <button className="theme-modal-close" onClick={handleClose}>
              <X size={24} />
            </button>

            <div className="theme-modal-header">
              <Palette size={28} />
              <h2>Choose Your Theme</h2>
              <p>Select a style template to customize the app's appearance</p>
            </div>

            <div className="theme-grid">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`theme-card ${currentTheme === theme.id ? 'active' : ''}`}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  {currentTheme === theme.id && (
                    <div className="theme-check">
                      <Check size={20} />
                    </div>
                  )}
                  
                  <div 
                    className="theme-preview"
                    style={{ background: theme.gradients.primary }}
                  >
                    <div className="theme-preview-content">
                      <div 
                        className="preview-button"
                        style={{ background: theme.gradients.button }}
                      />
                      <div className="preview-elements">
                        <div 
                          className="preview-element"
                          style={{ backgroundColor: theme.colors.success }}
                        />
                        <div 
                          className="preview-element"
                          style={{ backgroundColor: theme.colors.warning }}
                        />
                        <div 
                          className="preview-element"
                          style={{ backgroundColor: theme.colors.info }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="theme-info">
                    <h3>{theme.name}</h3>
                    <p>{theme.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .theme-toggle-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          background-color: #ffffff;
          cursor: pointer;
          color: #666;
          transition: background-color 0.2s;
          font-size: 13px;
        }

        .theme-toggle-btn:hover {
          background-color: #f5f5f5;
        }

        .theme-toggle-text {
          display: inline;
        }

        .theme-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10002;
          padding: 20px;
          overflow-y: auto;
        }

        .theme-modal {
          background-color: white;
          border-radius: 20px;
          max-width: 1100px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
          position: relative;
          animation: themeModalSlideIn 0.3s ease-out;
        }

        @keyframes themeModalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .theme-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: white;
          border: 2px solid #e0e0e0;
          cursor: pointer;
          color: #666;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
          width: 40px;
          height: 40px;
        }

        .theme-modal-close:hover {
          background-color: #f44336;
          border-color: #f44336;
          color: white;
          transform: rotate(90deg);
        }

        .theme-modal-header {
          text-align: center;
          padding: 50px 40px 30px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 20px 20px 0 0;
        }

        .theme-modal-header svg {
          margin-bottom: 16px;
        }

        .theme-modal-header h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 12px 0;
        }

        .theme-modal-header p {
          font-size: 15px;
          margin: 0;
          opacity: 0.95;
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
          padding: 40px;
        }

        .theme-card {
          position: relative;
          border: 3px solid #e0e0e0;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
          background: white;
        }

        .theme-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          border-color: #999;
        }

        .theme-card.active {
          border-color: #4caf50;
          box-shadow: 0 8px 24px rgba(76, 175, 80, 0.3);
        }

        .theme-check {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: #4caf50;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .theme-preview {
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .theme-preview-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .preview-button {
          height: 32px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .preview-elements {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .preview-element {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .theme-info {
          padding: 20px;
          background-color: #fafafa;
        }

        .theme-info h3 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 6px 0;
        }

        .theme-info p {
          font-size: 13px;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .theme-toggle-text {
            display: none;
          }

          .theme-toggle-btn {
            padding: 6px;
          }

          .theme-modal {
            max-height: 95vh;
            border-radius: 15px;
          }

          .theme-modal-header {
            padding: 40px 30px 24px 30px;
            border-radius: 15px 15px 0 0;
          }

          .theme-modal-header h2 {
            font-size: 24px;
          }

          .theme-modal-header p {
            font-size: 14px;
          }

          .theme-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 16px;
            padding: 24px;
          }

          .theme-preview {
            height: 120px;
          }

          .theme-info {
            padding: 16px;
          }

          .theme-info h3 {
            font-size: 15px;
          }

          .theme-info p {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .theme-modal {
            margin: 10px;
          }

          .theme-modal-header {
            padding: 30px 20px 20px 20px;
          }

          .theme-modal-header h2 {
            font-size: 20px;
          }

          .theme-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 20px 16px;
          }

          .theme-card {
            border-width: 2px;
          }

          .preview-element {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </>
  );
}