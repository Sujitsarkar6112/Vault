import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import AssetCard from '@/components/assets/AssetCard';
import AssetUpload from '@/components/assets/AssetUpload';
import ApiKeys from '@/pages/ApiKeys';
import CodeArchives from '@/pages/CodeArchives';
import Documents from '@/pages/Documents';
import Repositories from '@/pages/Repositories';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterBadge } from '@/components/ui/filter-badge';
import { 
  Shield, 
  Key, 
  FileCode, 
  FileText, 
  Search,
  Filter,
  Grid3X3,
  List,
  Database
} from 'lucide-react';
import { mockAssets, mockProjects } from '@/lib/mockData';
import { Asset } from '@/types';
import { toast } from 'sonner';

const Index = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/login');
    }
  }, [isSignedIn, isLoaded, navigate]);

  // Show loading while Clerk is determining auth state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not signed in (will redirect via useEffect)
  if (!isSignedIn) {
    return null;
  }

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleAssetView = (asset: Asset) => {
    toast.info(`Viewing asset: ${asset.name}`);
  };

  const handleAssetDownload = (asset: Asset) => {
    toast.success(`Downloading: ${asset.name}`);
  };

  const handleAssetRotate = (asset: Asset) => {
    toast.success(`Rotating API key: ${asset.name}`);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your secure technical assets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Assets"
          value={mockAssets.length}
          change="+12% this month"
          icon={Shield}
          trend="up"
        />
        <StatsCard
          title="API Keys"
          value={mockAssets.filter(a => a.type === 'api_key').length}
          change="+2 new"
          icon={Key}
          trend="up"
        />
        <StatsCard
          title="Code Archives"
          value={mockAssets.filter(a => a.type === 'code_zip').length}
          change="3 updated"
          icon={FileCode}
          trend="neutral"
        />
        <StatsCard
          title="Repositories"
          value={mockAssets.filter(a => a.type === 'repo').length + 2}
          change="+1 new"
          icon={Database}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                onClick={() => setActiveTab('upload')}
              >
                <Shield className="mr-2 h-4 w-4" />
                Upload New Asset
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => setActiveTab('repositories')}
              >
                <Database className="mr-2 h-4 w-4" />
                Clone Repository
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => setActiveTab('search')}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Assets
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssetsList = (title: string, filterType?: string) => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">{filteredAssets.length} assets found</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white w-64"
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          <div className="flex border border-gray-600 rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <FilterBadge 
          type='all'
          selected_type={selectedType}
          on_select={setSelectedType}
          label='All'
          count={mockAssets.length}
        />
        <FilterBadge 
          type='api_key'
          selected_type={selectedType}
          on_select={setSelectedType}
          label='API Keys'
          count={mockAssets.filter(a => a.type === 'api_key').length}
        />
        <FilterBadge 
          type='code_zip'
          selected_type={selectedType}
          on_select={setSelectedType}
          label='Code'
          count={mockAssets.filter(a => a.type === 'code_zip').length}
        />
        <FilterBadge 
          type='repo'
          selected_type={selectedType}
          on_select={setSelectedType}
          label='Repositories'
          count={mockAssets.filter(a => a.type === 'repo').length + 2}
        />
        <FilterBadge 
          type='document'
          selected_type={selectedType}
          on_select={setSelectedType}
          label='Documents'
          count={mockAssets.filter(a => a.type === 'document').length}
        />
      </div>

      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredAssets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onView={handleAssetView}
            onDownload={handleAssetDownload}
            onRotate={asset.type === 'api_key' ? handleAssetRotate : undefined}
          />
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No assets found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'upload':
        return <AssetUpload />;
      case 'assets':
        return renderAssetsList('All Assets');
      case 'api-keys':
        return <ApiKeys />;
      case 'code-archives':
        return <CodeArchives />;
      case 'repositories':
        return <Repositories />;
      case 'documents':
        return <Documents />;
      case 'projects':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProjects.map((project) => (
                <div key={project.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="text-xs text-gray-500">
                    Assets: {mockAssets.filter(a => a.project_id === project.id).length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'search':
        return renderAssetsList('Search Results');
      case 'audit':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Audit Logs</h1>
            <p className="text-gray-400">Access and activity monitoring for all assets</p>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <p className="text-gray-300">Audit log functionality would be implemented here with detailed activity tracking.</p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-gray-400">Manage team members and their permissions</p>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <p className="text-gray-300">User management interface would be implemented here.</p>
            </div>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
