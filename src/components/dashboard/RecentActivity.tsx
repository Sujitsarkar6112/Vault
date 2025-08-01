
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockAccessLogs, mockUser, mockAssets } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';

const RecentActivity = () => {
  const getActionColor = (action: string) => {
    switch (action) {
      case 'upload': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'view': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'download': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'rotate': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'delete': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAccessLogs.slice(0, 5).map((log) => {
            const asset = mockAssets.find(a => a.id === log.asset_id);
            return (
              <div key={log.id} className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getActionColor(log.action)}>
                      {log.action}
                    </Badge>
                    <span className="text-sm text-gray-300 truncate">
                      {asset?.name || 'Unknown asset'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
