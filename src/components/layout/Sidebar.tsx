
import { useState } from 'react';
import { 
  Home, 
  Key, 
  FileCode, 
  FolderOpen, 
  FileText, 
  Shield, 
  Users, 
  Activity,
  Search,
  Plus,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'assets', label: 'All Assets', icon: Shield },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'code-archives', label: 'Code Archives', icon: FileCode },
    { id: 'repositories', label: 'Repositories', icon: Database },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
  ];

  const bottomItems = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'audit', label: 'Audit Logs', icon: Activity },
    { id: 'search', label: 'Search', icon: Search },
  ];

  return (
    <div className={cn(
      "flex flex-col border-r border-gray-800 bg-gray-900/30 backdrop-blur-sm transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={() => onTabChange('upload')}
        >
          <Plus className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Upload Asset</span>}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start",
                  isActive 
                    ? "bg-gray-800 text-white border-l-2 border-teal-500" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t border-gray-800 p-3">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start",
                  isActive 
                    ? "bg-gray-800 text-white" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
