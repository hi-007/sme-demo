import React from "react";
import { Card } from "antd";

const Settings: React.FC = () => (
  <Card className="font-sans w-full bg-white rounded-xl flex items-center justify-start  border-none shadow-sm">
    <h1 className="text-xl font-bold mb-4">ตั้งค่าบัญชีผู้ใช้งาน</h1>
    <p className="text-gray-600">แก้ไขการตั้งค่าบัญชีผู้ใช้งานของคุณ</p>
  </Card>
);

export default Settings;
