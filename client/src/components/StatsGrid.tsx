import { MetricCard } from '../components/MetricCard';
import { FileWarning, FilePenLine, Clock, CheckSquare, SquareX } from 'lucide-react';


const statsData = [
    {
        title: 'อนุมัติคำขอ',
        value: '56',
        icon: CheckSquare,
        //trend: 6,
        color: 'blue' as const,
    },
    {
        title: 'ปฏิเสธคำขอ',
        value: '10',
        icon: SquareX,
        //trend: 6,
        color: 'orange' as const,
    },
    {
        title: 'รอตรวจสอบ',
        value: '77',
        icon: FileWarning,
        //trend: 10,
        color: 'cyan' as const,
    },
    {
        title: 'อยู่ระหว่างตรวจสอบ',
        value: '324',
        icon: Clock,
        //trend: 6,
        color: 'cyan' as const,
    },
    {
        title: 'แก้ไขคำขอ',
        value: '3',
        icon: FilePenLine,
        //trend: 9,
        color: 'pink' as const,
    },

    {
        title: 'รอตรวจสอบ (มีการแก้ไข)',
        value: '6',
        icon: FileWarning,
        //trend: 10,
        color: 'cyan' as const,
    },


];

export const StatsGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {statsData.map((stat, index) => (
                <MetricCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    //trend={stat.trend}
                    color={stat.color}
                    className="h-20 p-4 " // Custom classes to modify card height, padding, or background

                />
            ))}
        </div>
    );
};