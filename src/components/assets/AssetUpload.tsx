
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Key, FileCode, FileText, Database } from 'lucide-react';
import { mockProjects } from '@/lib/mockData';
import { toast } from 'sonner';

const AssetUpload = () => {
  const [uploadType, setUploadType] = useState<string>('');
  const [projectId, setProjectId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [apiKeyValue, setApiKeyValue] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const assetTypes = [
    { value: 'api_key', label: 'API Key', icon: Key, description: 'Secure API keys and tokens' },
    { value: 'code_zip', label: 'Code Archive', icon: FileCode, description: 'Source code archives (< 20MB)' },
    { value: 'repo', label: 'Repository', icon: Database, description: 'Full codebase repositories' },
    { value: 'document', label: 'Document', icon: FileText, description: 'Files and documentation' },
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!name) {
        setName(selectedFile.name);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      if (!name) {
        setName(droppedFile.name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadType || !projectId || !name) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (uploadType !== 'api_key' && !file) {
      toast.error('Please select a file to upload');
      return;
    }

    if (uploadType === 'api_key' && !apiKeyValue) {
      toast.error('Please enter the API key value');
      return;
    }

    // Mock upload success
    toast.success('Asset uploaded successfully!');
    
    // Reset form
    setUploadType('');
    setProjectId('');
    setName('');
    setDescription('');
    setTags([]);
    setFile(null);
    setApiKeyValue('');
  };

  const selectedType = assetTypes.find(type => type.value === uploadType);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Asset</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="asset-type" className="text-white">Asset Type *</Label>
              <Select value={uploadType} onValueChange={setUploadType}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {assetTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <SelectItem 
                        key={type.value} 
                        value={type.value}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <div>
                            <div>{type.label}</div>
                            <div className="text-xs text-gray-400">{type.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {uploadType && (
              <>
                <div>
                  <Label htmlFor="project" className="text-white">Project *</Label>
                  <Select value={projectId} onValueChange={setProjectId}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {mockProjects.map((project) => (
                        <SelectItem 
                          key={project.id} 
                          value={project.id}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="name" className="text-white">Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter asset name"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter asset description"
                    rows={3}
                  />
                </div>

                {uploadType === 'api_key' ? (
                  <div>
                    <Label htmlFor="api-key" className="text-white">API Key Value *</Label>
                    <Input
                      id="api-key"
                      type="password"
                      value={apiKeyValue}
                      onChange={(e) => setApiKeyValue(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Enter API key value (will be encrypted)"
                    />
                  </div>
                ) : (
                  <div>
                    <Label className="text-white">File Upload *</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
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
                        <div className="space-y-2">
                          <p className="text-white">{file.name}</p>
                          <p className="text-sm text-gray-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setFile(null)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            Remove file
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                          <p className="text-gray-300">
                            Drag and drop your file here, or{' '}
                            <label className="text-teal-400 hover:text-teal-300 cursor-pointer">
                              browse
                              <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept={uploadType === 'document' ? '.pdf,.doc,.docx,.txt,.md' : '.zip,.tar,.gz'}
                              />
                            </label>
                          </p>
                          <p className="text-sm text-gray-500">
                            Maximum file size: 20MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-white">Tags</Label>
                  <div className="flex space-x-2 mb-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Add tags..."
                    />
                    <Button type="button" onClick={handleAddTag} size="sm">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-red-400"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                  Upload {selectedType?.label}
                </Button>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetUpload;
