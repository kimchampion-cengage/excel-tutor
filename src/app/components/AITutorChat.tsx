import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface AITutorChatProps {
  userActions: string[];
  selectedCell: string | null;
  completedTasks: number[];
  resetTrigger?: number;
}

export default function AITutorChat({ userActions, selectedCell, completedTasks, resetTrigger }: AITutorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'ai',
      content: "Hi! I'm your AI Excel tutor. I can explain Excel concepts, walk you through formulas, and help you practice each step. Your project is to prepare retail inventory data and create descriptive statistics. Start by importing the data, then examine it for quality issues. Ask me whenever you'd like an explanation or example.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevCompletedTasksRef = useRef<number[]>([]);

  // Reset messages when resetTrigger changes
  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      setMessages([
        {
          id: 1,
          role: 'ai',
          content: "Hi! I'm your AI Excel tutor. I can explain Excel concepts, walk you through formulas, and help you practice each step. Your project is to prepare retail inventory data and create descriptive statistics. Start by importing the data, then examine it for quality issues. Ask me whenever you'd like an explanation or example.",
          timestamp: new Date()
        }
      ]);
      prevCompletedTasksRef.current = [];
    }
  }, [resetTrigger]);

  const exampleQuestions = [
    "How should I check for missing data?",
    "What formulas calculate Total_Sales?",
    "How do I extract the month from a date?",
    "What's the best way to organize descriptive statistics?",
    "How do I reference data from another worksheet?",
    "What should I include in my methodology reflection?",
    "How do I calculate standard deviation?",
    "What functions work for date components?"
  ];

  const handleExampleClick = (question: string) => {
    setInputValue(question);
    setShowExamples(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Provide contextual hints based on user actions
  useEffect(() => {
    if (userActions.length > 0) {
      const lastAction = userActions[userActions.length - 1];
      
      // Check if user imported data
      if (lastAction.includes('Imported sample retail inventory dataset')) {
        setTimeout(() => {
          addAIMessage("Excellent! The data is now loaded. Notice you have 9 columns with raw data. Your next step is to add calculated columns. Start by clicking on cell J1 and typing 'Total_Sales' as the header for your first calculated column.");
        }, 1000);
      }

      // Check if user created a formula
      if (lastAction.includes('formula') && lastAction.includes('=')) {
        setTimeout(() => {
          addAIMessage("Great work on that formula! Remember to copy it down to the other rows in that column. You can click on the cell and drag the formula down, or copy and paste it to each row.");
        }, 1000);
      }
    }
  }, [userActions]);

  // Track completed tasks and provide guidance for the next task
  useEffect(() => {
    const prevCompleted = prevCompletedTasksRef.current;
    const newlyCompleted = completedTasks.filter(task => !prevCompleted.includes(task));
    
    if (newlyCompleted.length > 0) {
      const latestCompletedTask = Math.max(...newlyCompleted);
      const nextTask = latestCompletedTask + 1;
      
      // Update ref for next comparison
      prevCompletedTasksRef.current = completedTasks;
      
      // Messages for each task completion
      const taskGuidance: { [key: number]: string } = {
        1: "🎉 Wonderful! You've imported the data into the spreadsheet. Now for Step 1.2: Take a moment to organize your data efficiently. Consider: Are your headers clearly labeled? Is the data arranged in columns? How can you structure it to make analysis easier?",
        2: "✓ Great job organizing the data! Moving to Step 2.1: Now carefully examine the entire dataset. Look through each column and row systematically. Are there any blank cells? Do you see any values that seem unusual or don't make sense? Any formatting inconsistencies? Document what you find.",
        3: "👀 Excellent examination work! For Step 2.2: Now it's time to address those data quality issues. What methods could you use to handle missing values? Should you delete them, fill them, or document the issue? If you modify any data, be sure to note your approach and reasoning.",
        4: "💪 Nice work cleaning the data! Moving to Step 3.1: Now create your calculated fields. Start with Total Sales (Price × Sold), then Total Cost (Unit_Cost × Sold), then Total Profit (Total Sales - Total Cost). For dates, you'll need Month, Day, Year, and Quarter. What Excel functions work with dates? For Quarter, think about conditional logic based on the month number.",
        5: "🔥 Fantastic! You've created all your derived variables. Now Step 4.1: Time to plan your descriptive statistics table. Before adding formulas, think about the structure: Should statistics be rows or columns? Which variables will you analyze? Where will you put this table? Sketch out your plan.",
        6: "📊 Great planning! Moving to Step 4.2: Now calculate these 8 statistics for each variable: Mean, Median, Standard Deviation, Minimum, Maximum, Range, Count, and Sum. Which Excel functions perform these calculations? Remember: Range = MAX - MIN. Take your time and build the table systematically.",
        7: "⭐ Excellent statistics work! For Step 4.3: Make sure your table includes all 6 required variables as columns: Price, Sold, Unit Cost, Total Sales, Total Cost, and Total Profit. Each should have all 8 statistics calculated. Are you referencing the Sheet1 data correctly in your formulas?",
        8: "✨ Amazing table! Now Step 4.4: Organize your statistics table on a separate worksheet named 'Descriptives'. Click the + button at the bottom to add a new worksheet, then double-click the tab to rename it. Why is separating analysis onto another sheet considered good practice?",
        9: "🎨 Perfect! You've created the Descriptives worksheet. Moving to Step 5.1: Now format your workbook for presentation. Ensure the Descriptives table prints clearly on a single page with appropriate headers and footers. Apply professional formatting - think about what makes data easy to read and understand.",
        10: "👔 Excellent formatting! Final step 5.2: Make sure another analyst could easily understand your workbook. Use bold headers, align columns properly, apply appropriate number formatting (decimals, currency), and add clear labels. Is everything organized logically? Would someone unfamiliar with your project understand what they're looking at?",
        11: "🌟 OUTSTANDING WORK! You've completed all 11 steps of the data preparation and analysis project! The Methodology Reflection section is now unlocked at the bottom of the spreadsheet. Write a 100-150 word reflection explaining: your data cleaning approach, the formulas and Excel functions you used, your statistical methods, and any decisions you made about handling missing data. This demonstrates your complete understanding of the data analysis process!"
      };
      
      if (taskGuidance[latestCompletedTask] && nextTask <= 12) {
        setTimeout(() => {
          addAIMessage(taskGuidance[latestCompletedTask]);
        }, 800);
      }
    }
  }, [completedTasks]);

  const addAIMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'ai',
      content,
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Generate AI response based on user question
    setTimeout(() => {
      let response = generateAIResponse(inputValue, selectedCell);
      addAIMessage(response);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="ai-tutor-container">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-content">
            <div className="chat-avatar">
              <Bot size={20} color="white" />
            </div>
            <div>
              <h3 className="chat-title">AI Tutor</h3>
              <span className="chat-status">● Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(message => (
            <div key={message.id} className="message-wrapper">
              <div className={`message-avatar ${message.role}`}>
                {message.role === 'ai' ? (
                  <Bot size={18} color="#1a73e8" />
                ) : (
                  <User size={18} color="#666" />
                )}
              </div>
              <div className={`message-bubble ${message.role}`}>
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-container">
          {showExamples && (
            <div className="examples-dropdown">
              <div className="examples-header">Example questions you can ask:</div>
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  className="example-question"
                  onClick={() => handleExampleClick(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          <div className="chat-input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowExamples(true)}
              onBlur={() => setTimeout(() => setShowExamples(false), 200)}
              placeholder="Ask me about Excel functions and techniques..."
              className="chat-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`chat-send-btn ${inputValue.trim() ? 'active' : ''}`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .ai-tutor-container {
          background-color: #ffffff;
          border-left: 1px solid #e0e0e0;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .chat-header {
          padding: 16px;
          border-bottom: 1px solid #e0e0e0;
          background-color: #f5f5f5;
        }

        .chat-header-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .chat-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #1a73e8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-title {
          font-size: 15px;
          font-weight: 600;
          color: #333;
          margin-bottom: 2px;
        }

        .chat-status {
          font-size: 12px;
          color: #4caf50;
        }

        .chat-messages {
          flex: 1;
          overflow: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          -webkit-overflow-scrolling: touch;
        }

        .message-wrapper {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message-avatar.ai {
          background-color: #e3f2fd;
        }

        .message-avatar.user {
          background-color: #f5f5f5;
        }

        .message-bubble {
          flex: 1;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.5;
          color: #333;
        }

        .message-bubble.ai {
          background-color: #f8f9fa;
        }

        .message-bubble.user {
          background-color: #e8f5e9;
        }

        .chat-input-container {
          padding: 16px;
          border-top: 1px solid #e0e0e0;
          position: relative;
        }

        .examples-dropdown {
          position: absolute;
          bottom: 100%;
          left: 16px;
          right: 16px;
          background-color: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
          max-height: 300px;
          overflow-y: auto;
          z-index: 10;
          margin-bottom: 8px;
        }

        .examples-header {
          padding: 12px 12px 8px 12px;
          font-size: 11px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #f0f0f0;
          background-color: #f8f9fa;
          border-radius: 8px 8px 0 0;
        }

        .example-question {
          display: block;
          width: 100%;
          padding: 10px 12px;
          text-align: left;
          background-color: white;
          border: none;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          font-size: 12px;
          color: #333;
          transition: background-color 0.2s;
        }

        .example-question:last-child {
          border-bottom: none;
        }

        .example-question:hover {
          background-color: #f0f7ff;
          color: #1a73e8;
        }

        .chat-input-wrapper {
          display: flex;
          gap: 8px;
        }

        .chat-input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #d0d0d0;
          border-radius: 8px;
          font-size: 13px;
          outline: none;
        }

        .chat-send-btn {
          padding: 10px 16px;
          background-color: #e0e0e0;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: not-allowed;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .chat-send-btn.active {
          background-color: #1a73e8;
          cursor: pointer;
        }

        .chat-send-btn.active:hover {
          background-color: #1557b0;
        }

        @media (max-width: 768px) {
          .chat-header {
            padding: 12px;
          }

          .chat-avatar {
            width: 32px;
            height: 32px;
          }

          .chat-title {
            font-size: 14px;
          }

          .chat-status {
            font-size: 11px;
          }

          .chat-messages {
            padding: 12px;
            gap: 12px;
          }

          .message-avatar {
            width: 28px;
            height: 28px;
          }

          .message-bubble {
            font-size: 12px;
            padding: 8px 10px;
          }

          .chat-input-container {
            padding: 12px;
          }

          .examples-dropdown {
            left: 12px;
            right: 12px;
            max-height: 250px;
          }

          .examples-header {
            padding: 10px;
            font-size: 10px;
          }

          .example-question {
            padding: 9px 10px;
            font-size: 11px;
          }

          .chat-input {
            font-size: 12px;
            padding: 8px 10px;
          }

          .chat-send-btn {
            padding: 8px 12px;
          }
        }
      `}</style>
    </>
  );
}

function generateAIResponse(userQuestion: string, selectedCell: string | null): string {
  const question = userQuestion.toLowerCase();

  // Date and time function tutoring
  if (question.includes('month') && (question.includes('extract') || question.includes('get') || question.includes('function'))) {
    return "Great question! Let's think about this together. What kind of information is stored in a date cell? If you have a full date like '1/15/2024', what part of it represents the month? Once you know what you need to extract, what do you think a function that extracts just that piece might be called in Excel?";
  }

  if (question.includes('day') && (question.includes('extract') || question.includes('get') || question.includes('function'))) {
    return "Interesting! When you look at a date value, what are the different pieces of information it contains? If you wanted to pull out just the day of the month (like getting '15' from '1/15/2024'), what would be a logical name for a function that does that? How might it be similar to extracting other parts of a date?";
  }

  if (question.includes('year') && (question.includes('extract') || question.includes('get') || question.includes('function'))) {
    return "Let's explore this! A date contains several components - can you identify what they are? If you needed to get just the year portion, what pattern do you notice in how Excel names its date functions? Try thinking about what you've learned about extracting other date parts.";
  }

  if (question.includes('quarter') && (question.includes('calculate') || question.includes('extract') || question.includes('get'))) {
    return "Excellent thinking! Here's a puzzle: A quarter represents 3 months. Q1 is Jan-Mar, Q2 is Apr-Jun, etc. If you have the month number (1-12), what mathematical operation could you use to figure out which quarter it belongs to? Consider: what happens if you divide the month number by 3?";
  }

  // Arithmetic operation tutoring
  if ((question.includes('total sales') || question.includes('total_sales') || question.includes('revenue')) && 
      (question.includes('calculate') || question.includes('formula') || question.includes('how'))) {
    return "Let's think about what 'total sales' means in a business context. If you sold 50 units of a product at $10 each, what calculation would tell you the total money received? Now, looking at your data - which column shows the price per item, and which shows how many were sold? What mathematical operation connects these two values?";
  }

  if ((question.includes('total cost') || question.includes('total_cost')) && 
      (question.includes('calculate') || question.includes('formula') || question.includes('how'))) {
    return "Think about this scenario: If each item costs you $5 to produce, and you made 100 items, how would you calculate your total cost? Now examine your dataset - which column represents the cost per unit? Which column shows the quantity? How are these related?";
  }

  if ((question.includes('profit') || question.includes('total_profit')) && 
      (question.includes('calculate') || question.includes('formula') || question.includes('how'))) {
    return "Let's reason through this: Profit is what you keep after expenses. If you made $1000 in sales and paid $600 in costs, what's left over? Looking at the columns you've created, which one represents money coming in, and which represents money going out? What operation would show the difference?";
  }

  if (question.includes('multiply') || question.includes('multiplication')) {
    return "Good question! In mathematics, we use × for multiplication. But on a keyboard, we don't have that symbol. What symbols DO we have on a keyboard that might represent multiplication? Think about common symbols you've seen in calculators or programming. What would make sense?";
  }

  if (question.includes('subtract') || question.includes('subtraction') || question.includes('difference')) {
    return "Think about basic math - if you want to find the difference between two numbers, what operation do you use? When you write that in Excel with cell references, how do you think you'd structure it? If A has 100 and B has 30, what would '=A-B' give you? What about '=B-A'? Does order matter?";
  }

  // Statistical function tutoring
  if (question.includes('median')) {
    return "Interesting question! Imagine you have a list of numbers: 10, 20, 25, 30, 100. The average would be pulled up by that 100, right? But what if you wanted to find the 'middle' value instead - the one right in the center? What do we call that in statistics? Why might that be more useful than an average when you have outliers?";
  }

  if (question.includes('sum') || question.includes('total') || question.includes('add up')) {
    return "Let's think about aggregating data. If you have multiple values and want to combine them into one total, what mathematical operation does that? If I said 'add these numbers together: 10 + 20 + 30', what would be a function name that describes that action? How would you tell Excel which cells to add?";
  }

  if (question.includes('average') || question.includes('mean')) {
    return "Consider this: You have 5 test scores - 80, 85, 90, 75, 95. To find the typical score, you'd add them up and divide by how many there are, right? That's called the average or mean. What do you think Excel would call a function that does this calculation automatically? How is this different from just adding them up?";
  }

  if (question.includes('max') || question.includes('maximum') || question.includes('highest') || question.includes('largest')) {
    return "Think about analyzing your data: If you wanted to find your best-performing transaction or highest profit, what are you really looking for? What word describes the 'top' or 'largest' value in a set? What would be a logical name for a function that finds that value?";
  }

  if (question.includes('min') || question.includes('minimum') || question.includes('lowest') || question.includes('smallest')) {
    return "Here's a scenario: You want to identify your lowest cost item or smallest transaction. What's the opposite of 'maximum'? If there's a MAX function, what do you think its counterpart would be called? Why would finding the smallest value be useful in business analysis?";
  }

  if (question.includes('count') && !question.includes('countif')) {
    return "Let me pose a question: If you need to know how many transactions you have in your dataset, what are you trying to do? You're trying to... what? If you're tallying up the number of entries, what verb describes that action? What might Excel call that function?";
  }

  // Data organization tutoring
  if (question.includes('insert') && question.includes('column')) {
    return "Think about the structure of your spreadsheet - you have columns A through I filled with imported data. Where could you put new calculated columns? Do you need to insert them between existing ones, or could you use the empty columns to the right? What would be simpler?";
  }

  if (question.includes('insert') && question.includes('row')) {
    return "Consider the layout: Your data occupies rows 1-10. If you need space for a summary table, could you place it in the empty rows below? What row number would keep it separate from your data but still visible? How might you organize it?";
  }

  if (question.includes('copy') && (question.includes('formula') || question.includes('down'))) {
    return "Here's a puzzle: You created a formula in J2 that says =E2*F2. If you copy that to J3, what should it become? Should it still reference E2 and F2, or should those numbers change? What pattern do you notice? How does Excel know to adjust the references?";
  }

  // Descriptive statistics tutoring
  if (question.includes('descriptive') || question.includes('summary') || (question.includes('statistics') && question.includes('create'))) {
    return "Let's think about summarizing data: What kinds of information would a manager want to know about sales? Would they want the total? The average? The highest and lowest? How might you organize these different statistics in a table format? What would make it easy to read?";
  }

  if (question.includes('summarize') && (question.includes('data') || question.includes('sales'))) {
    return "Imagine you're presenting to your manager. You have 9 transactions of raw data. What summary information would tell the story? Would you show every individual transaction, or calculate key metrics? What numbers would give a quick overview of performance? Think about totals, averages, and ranges.";
  }

  // Data cleaning tutoring
  if (question.includes('missing') && (question.includes('data') || question.includes('value'))) {
    return "Great observation! Data quality is crucial. Let's think about this: When you examine each column, what would indicate a 'missing' value? Would it be an empty cell, or could it also be something like 'N/A' or '0' where you'd expect a real number? Once you identify missing values, what are your options - delete the row, fill it with a calculated value, or leave a note?";
  }

  if (question.includes('clean') && question.includes('data')) {
    return "Data cleaning is a critical first step! Let me guide you: What types of problems should you look for? Consider: blank cells, inconsistent formatting (like dates or numbers), duplicate entries, or values that don't make sense (like negative quantities sold). What would you check first? How would you systematically examine each column?";
  }

  if (question.includes('inconsistent') || question.includes('formatting')) {
    return "Inconsistent data can cause calculation errors. Think about: Are all your numbers stored as numbers, or might some be text? Are dates in a consistent format? Do text entries have consistent spelling/capitalization? What tools does Excel have to help you identify these issues? How might you test if a cell contains a number vs text?";
  }

  if (question.includes('standard deviation') || question.includes('std dev')) {
    return "Standard deviation measures spread or variability! Here's a thought experiment: If all your values are clustered close together, is the spread large or small? What would indicate more variability? Excel has a function for this - if it calculates 'STandard DEViation', what might the function be abbreviated as? Try thinking about common function naming patterns.";
  }

  if (question.includes('median')) {
    return "The median is the middle value! Imagine lining up your numbers from smallest to largest - which one is right in the center? Why might this be more useful than the mean when you have outliers? Excel has a MEDIAN function - how would you tell it which range of cells to examine? Is it similar to AVERAGE?";
  }

  if (question.includes('range') && question.includes('statistic')) {
    return "The range shows spread from lowest to highest! Think about it: If your minimum value is 10 and maximum is 100, what's the range? What mathematical operation gives you the difference? Do you need a special function, or can you create this using MAX and MIN together? What would that formula look like?";
  }

  if ((question.includes('new') || question.includes('create')) && question.includes('worksheet')) {
    return "Excellent organizational thinking! Look at the bottom of your spreadsheet - do you see the worksheet tabs? What button would logically add a new sheet? Once you create it, how might you rename it to 'Descriptives'? Why is organizing statistics on a separate sheet good practice?";
  }

  if (question.includes('reference') && (question.includes('sheet') || question.includes('worksheet'))) {
    return "Cross-sheet references are powerful! Think about this: If you're in the Descriptives sheet and need data from Sheet1, how would Excel know which sheet to look at? The pattern is SheetName!CellReference. So if you want cell A2 from Sheet1, what would that look like? Try: Sheet1!A2. Make sense?";
  }

  // Reflection guidance
  if (question.includes('reflection') || question.includes('methodology') || question.includes('write') && (question.includes('explanation') || question.includes('approach'))) {
    return "Your reflection should tell the story of your data preparation journey. Consider these questions: What data quality issues did you find and how did you address them? Why did you choose specific formulas for derived variables? Which Excel functions did you use for statistics and why? If you modified any data values, what method did you use and what was your reasoning? Be specific and honest about your process.";
  }

  // General tutoring guidance
  if (question.includes('next') || question.includes('what should i do')) {
    return "Let's assess where you are: Have you imported the data yet? If yes, looking at the tasks list, which columns exist and which calculated columns are missing? What would be the logical first calculation to add - something simple that uses just two columns? Start with what seems most straightforward.";
  }

  if (question.includes('stuck') || question.includes('help')) {
    if (selectedCell) {
      return `You're in cell ${selectedCell}. ${getContextualHelp(selectedCell)} What's blocking your progress right now - is it understanding what calculation to do, or how to write the formula syntax? Let's break it down together.`;
    }
    return "I can help you get unstuck. Tell me which task you’re working on, and I’ll explain the next step with a formula or example you can use in your worksheet.";
  }

  if (question.includes('formula') || question.includes('function')) {
    return "Let's explore formulas together: You know they start with =, right? What do you think comes after that - the operation you want to perform? How do you tell Excel which cells to use? Think about the structure: = [what to do] ( [what to do it to] ). What formula are you trying to build?";
  }

  // Default tutoring response
  return "I can help with that. Tell me which part you’re working on, and I’ll explain the Excel concept, show a relevant example, and help you apply it to your worksheet.";
}

function getContextualHelp(cellId: string): string {
  const col = cellId.match(/[A-Z]+/)?.[0];
  const row = parseInt(cellId.match(/[0-9]+/)?.[0] || '0');

  if (col === 'J' && row >= 2 && row <= 10) {
    return "This cell is in the Total_Sales column. Think about it: what two pieces of information multiply together to give you total sales revenue? Look at columns E and F - what do they represent?";
  }
  if (col === 'K' && row >= 2 && row <= 10) {
    return "You're working on Total_Cost. If you know the cost per unit and how many units were sold, what calculation gives you the total cost? Which columns contain those values?";
  }
  if (col === 'L' && row >= 2 && row <= 10) {
    return "This is for Total_Profit. Profit is revenue minus expenses. Which columns represent your revenue (money in) and costs (money out)? What operation finds the difference?";
  }
  if (col === 'M' && row >= 2 && row <= 10) {
    return "You're extracting the month from a date. Dates have three components - which one do you need? If Excel has a function to extract that component, what might it be called?";
  }
  if (col === 'N' && row >= 2 && row <= 10) {
    return "For the day extraction: if you need the day portion of a date (1-31), and Excel names functions logically, what would you call a function that gets the DAY?";
  }
  if (col === 'O' && row >= 2 && row <= 10) {
    return "Year extraction is needed here. Following the pattern of date functions, what would extract the year? The date is in column H - how would you reference that?";
  }
  if (row === 1) {
    return "This is a header row for labeling your columns. What descriptive name would you give to make it clear what data is in this column?";
  }
  if (row > 12) {
    return "This area is perfect for a summary table. What statistics would be meaningful to calculate? Think about totals, averages, and ranges. How would you organize them?";
  }
  return "What are you trying to accomplish in this cell? Think about the bigger picture - what column is this, and what calculation or label belongs here?";
}
