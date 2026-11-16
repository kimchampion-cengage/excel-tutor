import { CheckCircle2, Circle } from 'lucide-react';

interface ScenarioProps {
  completed: number;
  total: number;
}

export function Scenario({ completed, total }: ScenarioProps) {
  const tasks = [
    { id: 1, title: 'Calculate total revenue', hint: 'Use SUM function on column E' },
    { id: 2, title: 'Find top product', hint: 'Use MAX function to find highest revenue' },
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-white">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm mb-3">
          Beginner
        </div>
        <h2 className="text-2xl mb-2">Sales Analysis</h2>
        <p className="text-gray-600 text-sm">Scenario 1 of 12</p>
      </div>

      <div className="mb-6">
        <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          Business Context
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          You are a sales analyst at a retail company. Your manager has asked you to analyze 
          monthly sales data to calculate total revenue and identify the best-performing product.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-3">
          Task Objectives
        </h3>
        <div className="space-y-3">
          {tasks.map((task, idx) => (
            <div key={task.id} className="flex items-start gap-3">
              {idx < completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm">{task.title}</p>
                <p className="text-xs text-gray-500">{task.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm">{completed} / {total}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completed / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
