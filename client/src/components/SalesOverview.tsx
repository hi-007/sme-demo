import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Download } from 'lucide-react';

const data = [
  { name: 'Jan', value1: 2400, value2: 1800 },
  { name: 'Feb', value1: 3200, value2: 2400 },
  { name: 'Mar', value1: 1800, value2: 1200 },
  { name: 'Apr', value1: 4200, value2: 3200 },
  { name: 'May', value1: 2800, value2: 1800 },
  { name: 'Jun', value1: 5200, value2: 4200 },
  { name: 'Jul', value1: 2400, value2: 1600 },
  { name: 'Aug', value1: 6200, value2: 4800 },
  { name: 'Sep', value1: 3200, value2: 2200 },
  { name: 'Oct', value1: 4800, value2: 3600 },
  { name: 'Nov', value1: 3600, value2: 2400 },
  { name: 'Dec', value1: 5800, value2: 4200 },
];

export const SalesOverview = () => {
  return (
    <Card className="dashboard-card p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-14">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Sales Overview</h3>
          <div className="flex items-center gap-4">
            <div className="dashboard-metric">$6,556.55</div>
            <div className="dashboard-trend-positive">
              <TrendingUp className="w-4 h-4" />
              3.2%
            </div>
          </div>
          <p className="dashboard-label mt-1">This month</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-slate-600 hover:text-dashboard-primary">
            Last month
          </Button>
          <Button variant="outline" size="sm" className="text-slate-600 hover:text-dashboard-primary">
            Last year
          </Button>
          <Button variant="outline" size="sm" className="text-slate-600 hover:text-dashboard-primary">
            <Download className="w-4 h-4 mr-1" />
            Download Report
          </Button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis hide />
            <Bar dataKey="value1" radius={[4, 4, 0, 0]} fill="url(#gradient1)" />
            <Bar dataKey="value2" radius={[4, 4, 0, 0]} fill="url(#gradient2)" />
            <defs>
              <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(244 63% 69%)" />
                <stop offset="100%" stopColor="hsl(244 81% 81%)" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(188 94% 68%)" />
                <stop offset="100%" stopColor="hsl(199 89% 48%)" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
