
import { Asset } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Key, 
  FileCode, 
  FileText, 
  Database,
  Eye, 
  Download, 
  RotateCcw,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

interface AssetCardProps {
  asset: Asset;
  onView: (asset: Asset) => void;
  onDownload: (asset: Asset) => void;
  onRotate?: (asset: Asset) => void;
}

const AssetCard = ({ asset, onView, onDownload, onRotate }: AssetCardProps) => {
  const getIcon = () => {
    switch (asset.type) {
      case 'api_key': return Key;
      case 'code_zip': return FileCode;
      case 'repo': return Database;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = () => {
    switch (asset.type) {
      case 'api_key': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'code_zip': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'repo': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'document': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const formatSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const Icon = getIcon();

  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/10">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white truncate">{asset.name}</h3>
              <p className="text-sm text-gray-400">v{asset.version}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem 
                onClick={() => onView(asset)}
                className="text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDownload(asset)}
                className="text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              {asset.type === 'api_key' && onRotate && (
                <DropdownMenuItem 
                  onClick={() => onRotate(asset)}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Rotate Key
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getTypeColor()}>
              {asset.type.replace('_', ' ')}
            </Badge>
            <span className="text-xs text-gray-400">{formatSize(asset.size)}</span>
          </div>

          {asset.description && (
            <p className="text-sm text-gray-300 line-clamp-2">{asset.description}</p>
          )}

          <div className="flex flex-wrap gap-1">
            {asset.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                {tag}
              </Badge>
            ))}
            {asset.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                +{asset.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
            Updated {formatDistanceToNow(new Date(asset.updated_at), { addSuffix: true })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
