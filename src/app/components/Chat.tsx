import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
}

interface ChatProps {
  lastAction: string;
}

export function Chat({ lastAction }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hi! I'm your Excel coach. Let's start by calculating total revenue. Try using the SUM function!",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let response = '';
      const lower = input.toLowerCase();

      if (lower.includes('sum')) {
        response = "Great! To use SUM, type =SUM(E2:E11) in a cell. This adds up all revenue values.";
      } else if (lower.includes('max')) {
        response = "Perfect! Use =MAX(E2:E11) to find the highest revenue. This identifies the top product.";
      } else if (lower.includes('help')) {
        response = "Start by clicking cell E12 and type =SUM(E2:E11) to calculate total revenue.";
      } else {
        response = "I'm here to help! Ask me about SUM, MAX, or any Excel formulas you need.";
      }

      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: response,
      }]);
    }, 500);

    setInput('');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm">AI</span>
          </div>
          <div>
            <h3 className="font-medium">Excel Coach</h3>
            <p className="text-xs text-gray-500">Always here to help</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about Excel formulas..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
