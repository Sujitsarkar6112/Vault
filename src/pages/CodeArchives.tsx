
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileCode, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye,
  Upload,
  Archive
} from 'lucide-react';
import { mockAssets } from '@/lib/mockData';
import { Asset } from '@/types';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const CodeArchives = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const codeArchives = mockAssets.filter(asset => asset.type === 'code_zip');

  const filteredArchives = codeArchives.filter(archive => 
    archive.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    archive.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    archive.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast.success('File selected successfully');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      toast.success('File dropped successfully');
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }
    
    toast.success('Code archive uploaded successfully!');
    setFile(null);
  };

  const handleView = (archive: Asset) => {
    toast.info(`Viewing archive: ${archive.name}`);
  };

  const handleDownload = (archive: Asset) => {
    toast.success(`Downloading: ${archive.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Code Archives</h1>
          <p className="text-gray-400">{filteredArchives.length} archives found</p>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Archive className="h-5 w-5 text-teal-400" />
            <h3 className="text-lg font-semibold text-white">Upload Code Archive</h3>
          </div>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-teal-500 bg-teal-500/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            {file ? (
              <div className="space-y-3">
                <FileCode className="h-12 w-12 text-teal-400 mx-auto" />
                <div>
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Archive
                  </Button>
                  <Button variant="outline" onClick={() => setFile(null)}>
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-300 text-lg">
                    Drag and drop your code archive here, or{' '}
                    <label className="text-teal-400 hover:text-teal-300 cursor-pointer">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".zip,.tar,.gz,.rar"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports .zip, .tar, .gz, .rar files up to 20MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search code archives..."
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
        {filteredArchives.map((archive) => (
          <Card key={archive.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                    <FileCode className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{archive.name}</h3>
                    <p className="text-sm text-gray-400">v{archive.version}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                  Code Archive
                </Badge>
              </div>

              {archive.description && (
                <p className="text-sm text-gray-300 mb-4">{archive.description}</p>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {archive.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>Size: {formatSize(archive.size)}</span>
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  size="sm"
                  onClick={() => handleView(archive)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(archive)}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>

              <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
                Updated {formatDistanceToNow(new Date(archive.updated_at), { addSuffix: true })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArchives.length === 0 && (
        <div className="text-center py-12">
          <FileCode className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No code archives found</h3>
          <p className="text-gray-500">Upload your first code archive to get started</p>
        </div>
      )}
    </div>
  );
};

export default CodeArchives;
