import { CheckCircle, Award, TrendingUp, Home } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function CompletionPage() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/?reset=true');
  };

  return (
    <div className="completion-container">
      <div className="completion-content">
        <div className="icon-wrapper">
          <CheckCircle size={80} color="#4caf50" strokeWidth={2} />
        </div>
        
        <h1 className="completion-title">Assignment Submitted Successfully!</h1>
        
        <p className="completion-message">
          Congratulations! You've completed the Excel Data Preparation and Statistical Analysis project.
        </p>

        <div className="achievement-cards">
          <div className="achievement-card">
            <Award size={32} color="#ff9800" />
            <h3>All Tasks Completed</h3>
            <p>You successfully completed all 11 learning objectives</p>
          </div>
          
          <div className="achievement-card">
            <TrendingUp size={32} color="#2196f3" />
            <h3>Skills Mastered</h3>
            <p>Data cleaning, formulas, statistics, and professional formatting</p>
          </div>
        </div>

        <div className="completion-summary">
          <h2>What You've Accomplished:</h2>
          <ul>
            <li>✓ Imported and organized retail inventory data</li>
            <li>✓ Examined data quality and addressed issues</li>
            <li>✓ Created calculated fields (Total Sales, Cost, Profit)</li>
            <li>✓ Extracted date components (Month, Day, Year, Quarter)</li>
            <li>✓ Built comprehensive descriptive statistics table</li>
            <li>✓ Formatted professional workbook presentation</li>
            <li>✓ Completed methodology reflection</li>
          </ul>
        </div>

        <div className="completion-actions">
          <button className="return-btn" onClick={handleReturnHome}>
            <Home size={18} />
            Return to Simulator
          </button>
        </div>

        <div className="completion-footer">
          <p>Your submission has been recorded. You can now return to the simulator to practice more or review your work.</p>
        </div>
      </div>

      <style>{`
        .completion-container {
          width: 100vw;
          height: 100vh;
          overflow-y: auto;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .completion-content {
          max-width: 800px;
          width: 100%;
          background-color: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 60px 50px;
          text-align: center;
          animation: fadeInScale 0.6s ease-out;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .icon-wrapper {
          margin-bottom: 24px;
          animation: bounceIn 0.8s ease-out 0.3s both;
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .completion-title {
          font-size: 36px;
          font-weight: 700;
          color: #333;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .completion-message {
          font-size: 18px;
          color: #666;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .achievement-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .achievement-card {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 12px;
          padding: 30px 20px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .achievement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .achievement-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 16px 0 8px 0;
        }

        .achievement-card p {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }

        .completion-summary {
          background-color: #f8f9fa;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 40px;
          text-align: left;
        }

        .completion-summary h2 {
          font-size: 22px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }

        .completion-summary ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .completion-summary li {
          font-size: 15px;
          color: #555;
          padding: 10px 0;
          border-bottom: 1px solid #e0e0e0;
          line-height: 1.6;
        }

        .completion-summary li:last-child {
          border-bottom: none;
        }

        .completion-actions {
          margin-bottom: 30px;
        }

        .return-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .return-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .return-btn:active {
          transform: translateY(0);
        }

        .completion-footer {
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .completion-footer p {
          font-size: 14px;
          color: #999;
          line-height: 1.6;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .completion-content {
            padding: 40px 30px;
          }

          .completion-title {
            font-size: 28px;
          }

          .completion-message {
            font-size: 16px;
          }

          .achievement-cards {
            grid-template-columns: 1fr;
          }

          .completion-summary {
            padding: 20px;
          }

          .completion-summary h2 {
            font-size: 20px;
          }

          .completion-summary li {
            font-size: 14px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .completion-container {
            padding: 10px;
          }

          .completion-content {
            padding: 30px 20px;
            border-radius: 15px;
          }

          .icon-wrapper svg {
            width: 60px;
            height: 60px;
          }

          .completion-title {
            font-size: 24px;
          }

          .completion-message {
            font-size: 15px;
            margin-bottom: 30px;
          }

          .achievement-card {
            padding: 20px 15px;
          }

          .achievement-card svg {
            width: 28px;
            height: 28px;
          }

          .achievement-card h3 {
            font-size: 16px;
          }

          .achievement-card p {
            font-size: 13px;
          }

          .completion-summary {
            padding: 15px;
          }

          .completion-summary h2 {
            font-size: 18px;
          }

          .completion-summary li {
            font-size: 13px;
            padding: 8px 0;
          }

          .return-btn {
            padding: 12px 24px;
            font-size: 15px;
          }

          .completion-footer p {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}