
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Key, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  RotateCcw, 
  Download,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { mockAssets } from '@/lib/mockData';
import { Asset } from '@/types';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const ApiKeys = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [newKeyDescription, setNewKeyDescription] = useState('');

  const apiKeys = mockAssets.filter(asset => asset.type === 'api_key');

  const filteredKeys = apiKeys.filter(key => 
    key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateKey = () => {
    if (!newKeyName || !newKeyValue) {
      toast.error('Please fill in required fields');
      return;
    }
    
    toast.success('API key created successfully!');
    setShowCreateForm(false);
    setNewKeyName('');
    setNewKeyValue('');
    setNewKeyDescription('');
  };

  const handleRotateKey = (key: Asset) => {
    toast.success(`API key "${key.name}" rotated successfully`);
  };

  const handleRevealKey = (key: Asset) => {
    toast.info(`Revealing key: ${key.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">API Keys</h1>
          <p className="text-gray-400">{filteredKeys.length} API keys found</p>
        </div>
        
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </Button>
      </div>

      {showCreateForm && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>Create New API Key</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Name *</label>
              <Input
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Enter API key name"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">API Key Value *</label>
              <Input
                type="password"
                value={newKeyValue}
                onChange={(e) => setNewKeyValue(e.target.value)}
                placeholder="Enter API key value"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Description</label>
              <Input
                value={newKeyDescription}
                onChange={(e) => setNewKeyDescription(e.target.value)}
                placeholder="Enter description"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCreateKey}>Create Key</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
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
            placeholder="Search API keys..."
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
        {filteredKeys.map((key) => (
          <Card key={key.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Key className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{key.name}</h3>
                    <p className="text-sm text-gray-400">v{key.version}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                  API Key
                </Badge>
              </div>

              {key.description && (
                <p className="text-sm text-gray-300 mb-4">{key.description}</p>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {key.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  size="sm"
                  onClick={() => handleRevealKey(key)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Reveal
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRotateKey(key)}
                  className="flex-1"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Rotate
                </Button>
              </div>

              <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
                Updated {formatDistanceToNow(new Date(key.updated_at), { addSuffix: true })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredKeys.length === 0 && (
        <div className="text-center py-12">
          <Key className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No API keys found</h3>
          <p className="text-gray-500">Create your first API key to get started</p>
        </div>
      )}
    </div>
  );
};

export default ApiKeys;
