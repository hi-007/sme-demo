// import React from "react";
// import { Card } from "antd";

// const Dashboard: React.FC = () => (
//   <Card className="font-sans w-full bg-white rounded-xl flex items-center justify-start  border-none shadow-sm">
//     <h1 className="text-xl font-bold mb-4">Dashboard</h1>
//     <p className="text-gray-600">This is your dashboard content.</p>
//   </Card>
// );
//
//export default Dashboard;

import { SalesOverview } from '../components/SalesOverview';
import { ProjectStatus } from '../components/ProjectStatus';
import { MetricCard } from '../components/MetricCard';
import { CustomerSatisfaction } from '../components/CustomerSatisfaction';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen p-2 mt-[-42px] ">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Analytics Dashboard</h1>
          <p className="text-slate-600">Monitor your business performance and key metrics</p>
        </div>

        {/* Top Row - Sales Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <SalesOverview />
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Income"
                value="$67.6k"
                icon={DollarSign}
                trend={3.2}
                trendLabel="vs last month"
                color="blue"
              />
              <MetricCard
                title="Completed"
                value="12.6K"
                icon={CheckCircle}
                trend={8.1}
                trendLabel="vs last month"
                color="success"
              />
              <MetricCard
                title="Pending"
                value="143"
                icon={Clock}
                trend={-2.4}
                trendLabel="vs last month"
                color="warning"
              />
              <MetricCard
                title="Dispatch"
                value="651"
                icon={Package}
                trend={5.7}
                trendLabel="vs last month"
                color="cyan"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Products"
                value="46k"
                icon={Package}
                trend={12.3}
                trendLabel="vs last year"
                color="pink"
              />
              <MetricCard
                title="Customers"
                value="8.8k"
                icon={Users}
                trend={4.6}
                trendLabel="vs last year"
                color="orange"
              />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ProjectStatus />
          </div>
          <div>
            <CustomerSatisfaction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;