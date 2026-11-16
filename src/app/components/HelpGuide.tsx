import { X, BookOpen, Target, MessageSquare, FileSpreadsheet, CheckCircle, FileText, Award, ArrowRight, Lightbulb, Play } from 'lucide-react';

interface HelpGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpGuide({ isOpen, onClose }: HelpGuideProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="help-overlay" onClick={onClose}>
        <div className="help-content" onClick={(e) => e.stopPropagation()}>
          <button className="help-close-btn" onClick={onClose}>
            <X size={24} />
          </button>

          <div className="help-header">
            <div className="help-icon">
              <BookOpen size={32} color="#666" />
            </div>
            <h1 className="help-title">Excel Learning Simulator - User Guide</h1>
            <p className="help-subtitle">Complete Guide to Using the Prototype</p>
          </div>

          <div className="help-body">
            {/* Quick Start */}
            <section className="help-section">
              <div className="section-header">
                <Play size={20} color="#666" />
                <h2>Quick Start Guide</h2>
              </div>
              <div className="section-content">
                <ol className="numbered-list">
                  <li>Click <strong>"Import Data"</strong> in the toolbar to load the sample retail inventory dataset</li>
                  <li>Review the <strong>Scenario</strong> panel (left sidebar) to understand your project objectives</li>
                  <li>Follow the <strong>11 tasks</strong> in order, checking them off as you complete each one</li>
                  <li>Use the <strong>AI Tutor</strong> (right panel) whenever you need guidance or have questions</li>
                  <li>Complete your <strong>methodology reflection</strong> (100-150 words) at the bottom</li>
                  <li>Click <strong>"Turn In Lesson"</strong> to submit your completed assignment</li>
                </ol>
              </div>
            </section>

            {/* Interface Overview */}
            <section className="help-section">
              <div className="section-header">
                <Target size={20} color="#666" />
                <h2>Interface Overview</h2>
              </div>
              <div className="section-content">
                <div className="interface-grid">
                  <div className="interface-item">
                    <h4>📚 Left Panel: Scenario & Tasks</h4>
                    <p>Access project description, task list with 11 steps, and contextual hints. Click icons to open floating panels. Pin panels to keep them visible while you work.</p>
                  </div>
                  <div className="interface-item">
                    <h4>📊 Center Panel: Spreadsheet</h4>
                    <p>Your Excel workspace with toolbar, formula bar, grid (18 columns × 30 rows), worksheet tabs, and reflection area at the bottom.</p>
                  </div>
                  <div className="interface-item">
                    <h4>🤖 Right Panel: AI Tutor</h4>
                    <p>Interactive Excel tutor. Ask questions to get clear explanations, formula examples, and help applying concepts to your worksheet.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Working with the Spreadsheet */}
            <section className="help-section">
              <div className="section-header">
                <FileSpreadsheet size={20} color="#666" />
                <h2>Working with the Spreadsheet</h2>
              </div>
              <div className="section-content">
                <h4 className="subsection-title">Toolbar Actions:</h4>
                <ul className="bullet-list">
                  <li><strong>Import Data:</strong> Loads the retail inventory dataset into your spreadsheet</li>
                  <li><strong>Reset:</strong> Clears everything (workbook, tasks, chat, reflection) - fresh start</li>
                  <li><strong>Default Data:</strong> Resets only the current worksheet to sample data</li>
                  <li><strong>Help:</strong> Opens the welcome modal with quick instructions</li>
                </ul>

                <h4 className="subsection-title">Cell Operations:</h4>
                <ul className="bullet-list">
                  <li><strong>Select a cell:</strong> Click any cell to select it</li>
                  <li><strong>Edit a cell:</strong> Double-click the cell OR select it and type in the formula bar</li>
                  <li><strong>Enter data:</strong> Type values or formulas, press <kbd>Enter</kbd> to confirm</li>
                  <li><strong>Formulas:</strong> Always start with <code>=</code> (e.g., <code>=A2*B2</code>)</li>
                </ul>

                <h4 className="subsection-title">Supported Excel Functions:</h4>
                <div className="formula-grid">
                  <div className="formula-item">
                    <code>=SUM(A1:A10)</code>
                    <span>Sum of range</span>
                  </div>
                  <div className="formula-item">
                    <code>=AVERAGE(A1:A10)</code>
                    <span>Average/mean</span>
                  </div>
                  <div className="formula-item">
                    <code>=MAX(A1:A10)</code>
                    <span>Maximum value</span>
                  </div>
                  <div className="formula-item">
                    <code>=MIN(A1:A10)</code>
                    <span>Minimum value</span>
                  </div>
                  <div className="formula-item">
                    <code>=COUNT(A1:A10)</code>
                    <span>Count numbers</span>
                  </div>
                  <div className="formula-item">
                    <code>=STDEV.S(A1:A10)</code>
                    <span>Standard deviation</span>
                  </div>
                  <div className="formula-item">
                    <code>=MEDIAN(A1:A10)</code>
                    <span>Median value</span>
                  </div>
                  <div className="formula-item">
                    <code>=MONTH(A1)</code>
                    <span>Extract month from date</span>
                  </div>
                  <div className="formula-item">
                    <code>=DAY(A1)</code>
                    <span>Extract day from date</span>
                  </div>
                  <div className="formula-item">
                    <code>=YEAR(A1)</code>
                    <span>Extract year from date</span>
                  </div>
                </div>

                <h4 className="subsection-title">Worksheet Management:</h4>
                <ul className="bullet-list">
                  <li><strong>Switch worksheets:</strong> Click worksheet tabs at the bottom</li>
                  <li><strong>Add worksheet:</strong> Click the <strong>+</strong> button next to worksheet tabs</li>
                  <li><strong>Rename worksheet:</strong> Double-click a worksheet tab, type new name, press <kbd>Enter</kbd></li>
                  <li><strong>Delete worksheet:</strong> Click the <strong>X</strong> button on a worksheet tab (must have 2+ worksheets)</li>
                  <li><strong>Reference other sheets:</strong> Use syntax like <code>=Sheet1!A1</code> in formulas</li>
                </ul>
              </div>
            </section>

            {/* Task System */}
            <section className="help-section">
              <div className="section-header">
                <CheckCircle size={20} color="#666" />
                <h2>Understanding the Task System</h2>
              </div>
              <div className="section-content">
                <p className="section-intro">The project is organized into <strong>5 main tasks</strong> containing <strong>11 total steps</strong>:</p>
                
                <div className="task-breakdown">
                  <div className="task-group">
                    <h4>Task 1: Import the Data (2 steps)</h4>
                    <ul>
                      <li>Step 1.1: Import the data into spreadsheet</li>
                      <li>Step 1.2: Organize data for analysis</li>
                    </ul>
                  </div>

                  <div className="task-group">
                    <h4>Task 2: Prepare and Clean the Dataset (2 steps)</h4>
                    <ul>
                      <li>Step 2.1: Examine for missing values and inconsistencies</li>
                      <li>Step 2.2: Apply cleaning methods</li>
                    </ul>
                  </div>

                  <div className="task-group">
                    <h4>Task 3: Create Derived Variables (1 step)</h4>
                    <ul>
                      <li>Step 3.1: Create calculated fields (Total Sales, Cost, Profit, Month, Day, Year, Quarter)</li>
                    </ul>
                  </div>

                  <div className="task-group">
                    <h4>Task 4: Produce Descriptive Statistics (4 steps)</h4>
                    <ul>
                      <li>Step 4.1: Create table structure</li>
                      <li>Step 4.2: Calculate statistics (Mean, Median, SD, Min, Max, Range, Count, Sum)</li>
                      <li>Step 4.3: Summarize key variables</li>
                      <li>Step 4.4: Organize on "Descriptives" worksheet</li>
                    </ul>
                  </div>

                  <div className="task-group">
                    <h4>Task 5: Format the Workbook (2 steps)</h4>
                    <ul>
                      <li>Step 5.1: Prepare for printing</li>
                      <li>Step 5.2: Format for professional presentation</li>
                    </ul>
                  </div>
                </div>

                <div className="info-box">
                  <strong>💡 Tip:</strong> Check off tasks manually by clicking the checkbox next to each step. This helps track your progress and unlocks the reflection area.
                </div>
              </div>
            </section>

            {/* Using the AI Tutor */}
            <section className="help-section">
              <div className="section-header">
                <MessageSquare size={20} color="#666" />
                <h2>Using the AI Tutor</h2>
              </div>
              <div className="section-content">
                <p className="section-intro">The AI Tutor teaches Excel concepts with clear explanations, worked examples, and practical guidance for your project.</p>
                
                <h4 className="subsection-title">How It Works:</h4>
                <ul className="bullet-list">
                  <li>Type your question in the chat input at the bottom of the right panel</li>
                  <li>Click "show me examples" to see sample questions you can ask</li>
                  <li>The AI provides contextual guidance based on your current task</li>
                  <li>The AI automatically detects certain actions (like importing data) and offers tips</li>
                </ul>

                <h4 className="subsection-title">Example Questions:</h4>
                <div className="example-questions">
                  <div className="question-badge">How should I check for missing data?</div>
                  <div className="question-badge">What formulas calculate Total_Sales?</div>
                  <div className="question-badge">How do I extract the month from a date?</div>
                  <div className="question-badge">What's the best way to organize descriptive statistics?</div>
                  <div className="question-badge">How do I reference data from another worksheet?</div>
                  <div className="question-badge">How do I calculate standard deviation?</div>
                </div>
              </div>
            </section>

            {/* Reflection & Submission */}
            <section className="help-section">
              <div className="section-header">
                <FileText size={20} color="#666" />
                <h2>Methodology Reflection & Submission</h2>
              </div>
              <div className="section-content">
                <h4 className="subsection-title">Writing Your Reflection:</h4>
                <ul className="bullet-list">
                  <li>The reflection area appears at the bottom of the spreadsheet after completing all 11 tasks</li>
                  <li>Click the reflection header to expand the text area</li>
                  <li>Write 100-150 words describing your methodology and approach</li>
                  <li>Include: data cleaning decisions, formula choices, statistical methods, and presentation strategies</li>
                  <li>The word count updates in real-time as you type</li>
                </ul>

                <h4 className="subsection-title">Submitting Your Assignment:</h4>
                <ul className="bullet-list">
                  <li>The <strong>"Turn In Lesson"</strong> button becomes enabled when:</li>
                  <ul className="nested-list">
                    <li>✓ All 11 tasks are marked complete</li>
                    <li>✓ Reflection is 100-150 words</li>
                  </ul>
                  <li>Click the button to submit your assignment</li>
                  <li>You'll be redirected to a congratulations page showing your achievements</li>
                  <li>Click <strong>"Return to Simulator"</strong> to start a fresh practice session</li>
                </ul>

                <div className="warning-box">
                  <strong>⚠️ Important:</strong> The "Return to Simulator" button performs a complete reset - all data, tasks, chat history, and reflection will be cleared for a fresh start.
                </div>
              </div>
            </section>

            {/* Scenario Panel Features */}
            <section className="help-section">
              <div className="section-header">
                <Lightbulb size={20} color="#666" />
                <h2>Scenario Panel Features</h2>
              </div>
              <div className="section-content">
                <h4 className="subsection-title">Desktop View (Left Sidebar):</h4>
                <ul className="bullet-list">
                  <li><strong>Scenario Icon:</strong> Opens project description and objectives</li>
                  <li><strong>Tasks Icon:</strong> Opens complete task list with progress bar (shows remaining task count)</li>
                  <li><strong>Hints Icon:</strong> Opens contextual hints for your current task</li>
                </ul>

                <h4 className="subsection-title">Popup Panel Controls:</h4>
                <ul className="bullet-list">
                  <li><strong>Pin button:</strong> Click to pin a panel so it stays open while you work</li>
                  <li><strong>Drag handle:</strong> When pinned, drag the header to reposition the panel anywhere on screen</li>
                  <li><strong>Close button (X):</strong> Close the panel</li>
                  <li><strong>Click outside:</strong> Unpinned panels close automatically when clicking elsewhere</li>
                </ul>

                <h4 className="subsection-title">Mobile View:</h4>
                <ul className="bullet-list">
                  <li>Use toggle buttons at the top to open <strong>Scenario</strong> or <strong>AI Tutor</strong> panels</li>
                  <li>Panels appear as full overlays</li>
                  <li>Click outside or use toggle buttons to close</li>
                </ul>
              </div>
            </section>

            {/* Tips & Best Practices */}
            <section className="help-section">
              <div className="section-header">
                <Award size={20} color="#666" />
                <h2>Tips & Best Practices</h2>
              </div>
              <div className="section-content">
                <div className="tips-grid">
                  <div className="tip-card">
                    <h4>💾 Auto-Save</h4>
                    <p>Your work automatically saves to your browser's local storage. You can close the tab and return later.</p>
                  </div>
                  <div className="tip-card">
                    <h4>📝 Formula Tips</h4>
                    <p>Always start formulas with <code>=</code>. Use cell references like <code>A2</code> instead of hard-coding values.</p>
                  </div>
                  <div className="tip-card">
                    <h4>🎯 Follow the Order</h4>
                    <p>Complete tasks in sequence. Each task builds on the previous one for the best learning experience.</p>
                  </div>
                  <div className="tip-card">
                    <h4>💬 Ask Questions</h4>
                    <p>Use the AI Tutor frequently! It's designed to help you learn through guided discovery.</p>
                  </div>
                  <div className="tip-card">
                    <h4>📊 Organize Data</h4>
                    <p>Keep headers in row 1, use consistent formatting, and create separate worksheets for different analyses.</p>
                  </div>
                  <div className="tip-card">
                    <h4>✅ Check Your Work</h4>
                    <p>Manually verify formulas by checking a few calculations. Make sure results make sense!</p>
                  </div>
                  <div className="tip-card">
                    <h4>📱 Responsive Design</h4>
                    <p>The simulator works on desktop, tablet, and mobile devices. Desktop recommended for best experience.</p>
                  </div>
                  <div className="tip-card">
                    <h4>🔄 Practice Multiple Times</h4>
                    <p>Use the Reset button to practice the entire project again from scratch. Repetition builds mastery!</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section className="help-section">
              <div className="section-header">
                <ArrowRight size={20} color="#666" />
                <h2>Troubleshooting</h2>
              </div>
              <div className="section-content">
                <div className="troubleshooting-list">
                  <div className="trouble-item">
                    <h4>Formula not calculating?</h4>
                    <p>Make sure your formula starts with <code>=</code> and uses valid cell references. Press <kbd>Enter</kbd> to confirm.</p>
                  </div>
                  <div className="trouble-item">
                    <h4>Can't turn in assignment?</h4>
                    <p>Check that all 11 tasks are marked complete AND your reflection is 100-150 words.</p>
                  </div>
                  <div className="trouble-item">
                    <h4>Lost your work?</h4>
                    <p>Work is auto-saved to browser storage. If you cleared browser data or switched browsers, your work may be gone. Use the same browser consistently.</p>
                  </div>
                  <div className="trouble-item">
                    <h4>Popup panels won't move?</h4>
                    <p>Only pinned panels can be dragged. Click the pin button first, then drag the header area.</p>
                  </div>
                  <div className="trouble-item">
                    <h4>Can't see all columns?</h4>
                    <p>Scroll horizontally in the spreadsheet grid. There are 18 columns (A-R) available.</p>
                  </div>
                  <div className="trouble-item">
                    <h4>Need to start over?</h4>
                    <p>Click the <strong>Reset</strong> button in the toolbar. This clears everything for a fresh start.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Keyboard Shortcuts */}
            <section className="help-section">
              <div className="section-header">
                <Target size={20} color="#666" />
                <h2>Keyboard Shortcuts</h2>
              </div>
              <div className="section-content">
                <div className="shortcuts-grid">
                  <div className="shortcut-item">
                    <kbd>Enter</kbd>
                    <span>Confirm cell entry or formula</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>Escape</kbd>
                    <span>Cancel cell editing or close dialogs</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>Click cell</kbd>
                    <span>Select cell</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>Double-click cell</kbd>
                    <span>Edit cell directly</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>Double-click tab</kbd>
                    <span>Rename worksheet</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="help-footer">
            <button className="close-help-btn" onClick={onClose}>
              Close Help Guide
            </button>
            <p className="footer-text">
              Need more assistance? Ask the AI Tutor in the right panel!
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .help-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10001;
          padding: 20px;
          overflow-y: auto;
        }

        .help-content {
          background-color: white;
          border-radius: 20px;
          max-width: 1000px;
          width: 100%;
          max-height: 95vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
          position: relative;
          animation: helpSlideIn 0.4s ease-out;
          margin: auto;
        }

        @keyframes helpSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .help-close-btn {
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

        .help-close-btn:hover {
          background-color: #999;
          border-color: #999;
          color: white;
          transform: rotate(90deg);
        }

        .help-header {
          text-align: center;
          padding: 50px 40px 30px 40px;
          background: #f5f5f5;
          color: #333;
          border-radius: 20px 20px 0 0;
          border-bottom: 2px solid #e0e0e0;
        }

        .help-icon {
          width: 70px;
          height: 70px;
          background-color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .help-title {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: #333;
        }

        .help-subtitle {
          font-size: 16px;
          margin: 0;
          opacity: 0.8;
          font-weight: 400;
          color: #666;
        }

        .help-body {
          padding: 40px 50px;
          overflow-y: auto;
          flex: 1;
        }

        .help-section {
          margin-bottom: 40px;
        }

        .help-section:last-child {
          margin-bottom: 0;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 3px solid #f0f0f0;
        }

        .section-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }

        .section-content {
          color: #555;
          line-height: 1.7;
        }

        .section-intro {
          font-size: 16px;
          margin-bottom: 20px;
          color: #666;
        }

        .subsection-title {
          font-size: 17px;
          font-weight: 600;
          color: #444;
          margin: 24px 0 12px 0;
        }

        .numbered-list {
          padding-left: 24px;
          margin: 16px 0;
        }

        .numbered-list li {
          margin-bottom: 12px;
          font-size: 15px;
          line-height: 1.7;
        }

        .bullet-list {
          list-style: disc;
          padding-left: 24px;
          margin: 12px 0;
        }

        .bullet-list li {
          margin-bottom: 10px;
          font-size: 15px;
          line-height: 1.7;
        }

        .nested-list {
          list-style: circle;
          padding-left: 24px;
          margin-top: 8px;
        }

        .nested-list li {
          margin-bottom: 6px;
        }

        .interface-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 20px;
        }

        .interface-item {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #999;
        }

        .interface-item h4 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 10px 0;
        }

        .interface-item p {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        .formula-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 16px 0;
        }

        .formula-item {
          background-color: #f8f9fa;
          padding: 12px 16px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-left: 3px solid #4caf50;
        }

        .formula-item code {
          font-family: 'Courier New', monospace;
          font-size: 14px;
          font-weight: 600;
          color: #d32f2f;
          background-color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
        }

        .formula-item span {
          font-size: 12px;
          color: #666;
        }

        .task-breakdown {
          margin: 20px 0;
        }

        .task-group {
          background-color: #f9f9f9;
          padding: 16px 20px;
          border-radius: 10px;
          margin-bottom: 12px;
          border-left: 4px solid #9c27b0;
        }

        .task-group h4 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 12px 0;
        }

        .task-group ul {
          list-style: disc;
          padding-left: 24px;
          margin: 0;
        }

        .task-group li {
          margin-bottom: 6px;
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        .info-box {
          background-color: var(--magma-info-bg);
          border-left: 4px solid var(--magma-info-border);
          padding: 14px 18px;
          border-radius: 8px;
          margin-top: 20px;
          font-size: 14px;
          color: var(--magma-info-text);
          line-height: 1.6;
        }

        .warning-box {
          background-color: var(--magma-warning-bg);
          border-left: 4px solid var(--magma-warning-border);
          padding: 14px 18px;
          border-radius: 8px;
          margin-top: 20px;
          font-size: 14px;
          color: var(--magma-warning-text);
          line-height: 1.6;
        }

        .example-questions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }

        .question-badge {
          background-color: #f3e5f5;
          color: #6a1b9a;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          border: 2px solid #9c27b0;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 20px;
        }

        .tip-card {
          background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
          padding: 18px;
          border-radius: 12px;
          border: 2px solid #e0e0e0;
          transition: all 0.3s;
        }

        .tip-card:hover {
          border-color: #1a73e8;
          box-shadow: 0 4px 12px rgba(26, 115, 232, 0.2);
          transform: translateY(-2px);
        }

        .tip-card h4 {
          font-size: 15px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
        }

        .tip-card p {
          font-size: 13px;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        .troubleshooting-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }

        .trouble-item {
          background-color: #fef5f5;
          padding: 16px 20px;
          border-radius: 10px;
          border-left: 4px solid #f44336;
        }

        .trouble-item h4 {
          font-size: 15px;
          font-weight: 600;
          color: #c62828;
          margin: 0 0 8px 0;
        }

        .trouble-item p {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        .shortcuts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 16px;
        }

        .shortcut-item {
          background-color: #f8f9fa;
          padding: 12px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .shortcut-item kbd {
          background-color: #333;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          font-weight: 600;
          min-width: 80px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .shortcut-item span {
          font-size: 13px;
          color: #666;
          flex: 1;
        }

        code {
          background-color: #f5f5f5;
          padding: 3px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: #d32f2f;
        }

        strong {
          color: #333;
          font-weight: 600;
        }

        .help-footer {
          padding: 24px 50px 32px 50px;
          border-top: 2px solid #e0e0e0;
          text-align: center;
          background-color: #fafafa;
          border-radius: 0 0 20px 20px;
        }

        .close-help-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 14px 32px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          margin-bottom: 12px;
        }

        .close-help-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .close-help-btn:active {
          transform: translateY(0);
        }

        .footer-text {
          font-size: 13px;
          color: #999;
          margin: 0;
        }

        /* Tablet Responsive */
        @media (max-width: 1024px) {
          .help-content {
            max-width: 90%;
          }

          .help-body {
            padding: 30px 40px;
          }

          .interface-grid {
            grid-template-columns: 1fr;
          }

          .tips-grid {
            grid-template-columns: 1fr;
          }

          .formula-grid {
            grid-template-columns: 1fr;
          }

          .shortcuts-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .help-overlay {
            padding: 10px;
          }

          .help-content {
            max-width: 100%;
            max-height: 98vh;
            border-radius: 15px;
          }

          .help-header {
            padding: 40px 30px 24px 30px;
            border-radius: 15px 15px 0 0;
          }

          .help-icon {
            width: 60px;
            height: 60px;
          }

          .help-title {
            font-size: 24px;
          }

          .help-subtitle {
            font-size: 14px;
          }

          .help-close-btn {
            top: 15px;
            right: 15px;
            width: 36px;
            height: 36px;
          }

          .help-body {
            padding: 24px 24px;
          }

          .section-header h2 {
            font-size: 20px;
          }

          .subsection-title {
            font-size: 16px;
          }

          .numbered-list li,
          .bullet-list li {
            font-size: 14px;
          }

          .help-footer {
            padding: 20px 24px 24px 24px;
          }

          .close-help-btn {
            width: 100%;
            padding: 12px 24px;
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .help-header {
            padding: 30px 20px 20px 20px;
          }

          .help-icon {
            width: 50px;
            height: 50px;
          }

          .help-icon svg {
            width: 24px;
            height: 24px;
          }

          .help-title {
            font-size: 20px;
          }

          .help-subtitle {
            font-size: 13px;
          }

          .help-close-btn {
            width: 32px;
            height: 32px;
          }

          .help-close-btn svg {
            width: 20px;
            height: 20px;
          }

          .help-body {
            padding: 20px 16px;
          }

          .section-header {
            gap: 8px;
          }

          .section-header svg {
            width: 18px;
            height: 18px;
          }

          .section-header h2 {
            font-size: 18px;
          }

          .subsection-title {
            font-size: 15px;
            margin: 20px 0 10px 0;
          }

          .help-footer {
            padding: 16px 16px 20px 16px;
          }

          .close-help-btn {
            padding: 11px 20px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
