import { Card } from '../components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from "lucide-react"; // ใช้ type-only import

import { cn } from '../../lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  color: 'blue' | 'success' | 'warning' | 'cyan' | 'pink' | 'orange' | 'purple';
}

const colorClasses = {
  blue: 'text-dashboard-blue bg-dashboard-blue/10',
  success: 'text-dashboard-success bg-dashboard-success/10',
  warning: 'text-dashboard-warning bg-dashboard-warning/10',
  cyan: 'text-dashboard-cyan bg-dashboard-cyan/10',
  pink: 'text-dashboard-pink bg-dashboard-pink/10',
  orange: 'text-dashboard-orange bg-dashboard-orange/10',
  purple: 'text-dashboard-purple bg-dashboard-purple/10',
};

export const MetricCard = ({ title, value, icon: Icon, trend, trendLabel, color }: MetricCardProps) => {
  const isPositiveTrend = trend && trend > 0;
  
  return (
    <Card className="dashboard-card p-4 hover:scale-105 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className={cn('p-2 rounded-lg', colorClasses[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={isPositiveTrend ? 'dashboard-trend-positive' : 'dashboard-trend-negative'}>
            {isPositiveTrend ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div className="dashboard-metric text-xl mb-1">{value}</div>
      <p className="dashboard-label">{title}</p>
      {trendLabel && (
        <p className="text-xs text-slate-500 mt-1">{trendLabel}</p>
      )}
    </Card>
  );
};
