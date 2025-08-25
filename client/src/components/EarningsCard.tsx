import { Card } from '../components/ui/card';

export const EarningsCard = () => {
    return (
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 pt-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-4 right-4 opacity-20">
                <div className="w-24 h-24 rounded-full border-2 border-white/30"></div>
            </div>

            {/* Chart line decoration */}
            <div className="absolute top-8 left-6 right-20">
                <svg width="200" height="60" viewBox="0 0 200 60" className="text-white/40">
                    <path
                        d="M10 40 Q30 20, 50 30 T90 25 T130 35 T170 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse"
                    />
                </svg>
            </div>

            <div className="relative z-10">
                <h3 className="text-lg font-medium mb-7 opacity-90 font-sans">คำขอทั้งหมด</h3>

                <div className="mb-4">
                    <div className="text-3xl font-bold mb-2">365</div>
                    <div className="text-sm opacity-80 font-sans mb-6">รายการ</div>
                </div>
            </div>
        </Card>
    );
};
