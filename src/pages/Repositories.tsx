
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Database, 
  Search, 
  Filter, 
  Plus, 
  GitBranch, 
  Eye,
  Download,
  ExternalLink,
  Globe,
  Lock
} from 'lucide-react';
import { mockAssets } from '@/lib/mockData';
import { Asset } from '@/types';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const Repositories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCloneForm, setShowCloneForm] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [repoName, setRepoName] = useState('');
  const [repoDescription, setRepoDescription] = useState('');
  const [isCloning, setIsCloning] = useState(false);

  // Mock repositories data (extending existing mockAssets)
  const repositories = [
    ...mockAssets.filter(asset => asset.type === 'repo'),
    // Add some mock repositories
    {
      id: 'repo-1',
      project_id: 'proj-2',
      name: 'react-dashboard',
      type: 'repo' as const,
      size: 45000000,
      checksum: 'sha256:xyz789...',
      storage_path: '/vault/repos/react-dashboard.git',
      version: 1,
      created_by: 'user-1',
      created_at: '2024-07-20T10:00:00Z',
      updated_at: '2024-07-25T14:30:00Z',
      tags: ['react', 'dashboard', 'typescript'],
      description: 'Modern React dashboard with TypeScript',
      metadata: {
        repoUrl: 'https://github.com/user/react-dashboard',
        isPrivate: false,
        lastCommit: '2024-07-25T14:30:00Z',
        branches: ['main', 'develop', 'feature/auth']
      }
    },
    {
      id: 'repo-2',
      project_id: 'proj-2',
      name: 'api-gateway',
      type: 'repo' as const,
      size: 12000000,
      checksum: 'sha256:abc123...',
      storage_path: '/vault/repos/api-gateway.git',
      version: 2,
      created_by: 'user-1',
      created_at: '2024-07-15T08:00:00Z',
      updated_at: '2024-07-28T12:00:00Z',
      tags: ['nodejs', 'api', 'microservices'],
      description: 'Node.js API Gateway with authentication',
      metadata: {
        repoUrl: 'https://github.com/company/api-gateway',
        isPrivate: true,
        lastCommit: '2024-07-28T12:00:00Z',
        branches: ['main', 'staging']
      }
    }
  ];

  const filteredRepos = repositories.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const extractRepoName = (url: string) => {
    const match = url.match(/\/([^\/]+)\.git$/) || url.match(/\/([^\/]+)\/?$/);
    return match ? match[1] : '';
  };

  const handleCloneRepo = async () => {
    if (!repoUrl) {
      toast.error('Please enter a repository URL');
      return;
    }

    setIsCloning(true);
    
    // Simulate cloning process
    setTimeout(() => {
      toast.success('Repository cloned successfully!');
      setShowCloneForm(false);
      setRepoUrl('');
      setRepoName('');
      setRepoDescription('');
      setIsCloning(false);
    }, 3000);
  };

  const handleUrlChange = (url: string) => {
    setRepoUrl(url);
    if (url && !repoName) {
      setRepoName(extractRepoName(url));
    }
  };

  const handleView = (repo: Asset) => {
    toast.info(`Viewing repository: ${repo.name}`);
  };

  const handleDownload = (repo: Asset) => {
    toast.success(`Downloading: ${repo.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Repositories</h1>
          <p className="text-gray-400">{filteredRepos.length} repositories found</p>
        </div>
        
        <Button 
          onClick={() => setShowCloneForm(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Clone Repository
        </Button>
      </div>

      {showCloneForm && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <GitBranch className="h-5 w-5" />
              <span>Clone Repository</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Repository URL *</label>
              <Input
                value={repoUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://github.com/username/repository.git"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <p className="text-xs text-gray-400 mt-1">
                Supports GitHub, GitLab, Bitbucket, and other Git repositories
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Repository Name</label>
              <Input
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="Auto-filled from URL"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Description</label>
              <Textarea
                value={repoDescription}
                onChange={(e) => setRepoDescription(e.target.value)}
                placeholder="Enter repository description"
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleCloneRepo}
                disabled={isCloning}
                className="flex-1"
              >
                {isCloning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Cloning...
                  </>
                ) : (
                  <>
                    <GitBranch className="h-4 w-4 mr-2" />
                    Clone Repository
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCloneForm(false)}
                disabled={isCloning}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white"
          />
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo) => (
          <Card key={repo.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{repo.name}</h3>
                    <p className="text-sm text-gray-400">v{repo.version}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                    Repository
                  </Badge>
                  {repo.metadata?.isPrivate ? (
                    <Lock className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Globe className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>

              {repo.description && (
                <p className="text-sm text-gray-300 mb-4">{repo.description}</p>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {repo.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Size: {formatSize(repo.size)}</span>
                  {repo.metadata?.branches && (
                    <span>{repo.metadata.branches.length} branches</span>
                  )}
                </div>
                
                {repo.metadata?.repoUrl && (
                  <div className="flex items-center space-x-2">
                    <a
                      href={repo.metadata.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal-400 hover:text-teal-300 flex items-center space-x-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>View Original</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  size="sm"
                  onClick={() => handleView(repo)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Browse
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(repo)}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>

              <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
                Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="text-center py-12">
          <Database className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No repositories found</h3>
          <p className="text-gray-500">Clone your first repository to get started</p>
        </div>
      )}
    </div>
  );
};

export default Repositories;
