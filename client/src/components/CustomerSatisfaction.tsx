import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { TrendingUp, MoreHorizontal } from 'lucide-react';

const satisfactionData = [
  { label: 'Excellent', value: 1029, percentage: 42, color: 'bg-dashboard-blue' },
  { label: 'Very Good', value: 426, percentage: 18, color: 'bg-dashboard-success' },
  { label: 'Good', value: 326, percentage: 14, color: 'bg-dashboard-cyan' },
  { label: 'Poor', value: 395, percentage: 17, color: 'bg-dashboard-warning' },
  { label: 'Very Poor', value: 129, percentage: 9, color: 'bg-dashboard-danger' },
];

export const CustomerSatisfaction = () => {
  return (
    <Card className="dashboard-card p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Customer Satisfaction</h3>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center mb-6">
        <div className="dashboard-metric text-4xl mb-2">9.7</div>
        <div className="dashboard-trend-positive justify-center mb-1">
          <TrendingUp className="w-4 h-4" />
          +2.1%
        </div>
        <p className="dashboard-label">Performance score</p>
      </div>

      {/* Progress bars visualization */}
      <div className="mb-6">
        <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
          {satisfactionData.map((item, index) => (
            <div
              key={index}
              className={`${item.color} transition-all duration-1000 ease-out`}
              style={{ width: `${item.percentage}%` }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {satisfactionData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`status-indicator ${item.color}`} />
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-800">{item.value}</span>
              <span className="text-sm text-slate-500 w-8 text-right">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
