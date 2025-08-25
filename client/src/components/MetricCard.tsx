import { Card } from '../components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from "lucide-react"; // Use type-only import

import { cn } from '../../lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  color: 'blue' | 'success' | 'warning' | 'cyan' | 'pink' | 'orange' | 'purple';
  className?: string; // Add className here to allow it
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

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  color,
  className, // Destructure className
}: MetricCardProps) => {
  const isPositiveTrend = trend && trend > 0;

  return (
    <Card className={cn('dashboard-card p-4 hover:scale-105 transition-all duration-200', className)}>
      <div className="flex items-start justify-between mb-1">
        <div className="dashboard-metric text-xl">{value}</div>
        <div className={cn('p-2 rounded-lg', colorClasses[color])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <p className="dashboard-label mb-6 mt-1">{title}</p> {/* Added margin-top to push the title up */}

      <div className="flex items-center justify-between">
        {trendLabel && (
          <p className="text-xs text-slate-500">{trendLabel}</p>
        )}
        {trend && (
          <div className={isPositiveTrend ? 'dashboard-trend-positive' : 'dashboard-trend-negative'}>
            {isPositiveTrend ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </Card>
  );
};
