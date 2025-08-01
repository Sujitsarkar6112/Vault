
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

const StatsCard = ({ title, value, change, icon: Icon, trend = 'neutral' }: StatsCardProps) => {
  const trendColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {change && (
              <p className={`text-sm ${trendColor[trend]}`}>
                {change}
              </p>
            )}
          </div>
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
