import React from "react";
import { Card } from "antd";

const Dashboard: React.FC = () => (
  <Card className="font-sans w-full bg-white rounded-xl flex items-center justify-start  border-none shadow-sm">
    <h1 className="text-xl font-bold mb-4">Dashboard</h1>
    <p className="text-gray-600">This is your dashboard content.</p>
  </Card>
);

export default Dashboard;
