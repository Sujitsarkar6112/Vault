import { useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Camera, X, Check } from 'lucide-react';
import { toast } from 'sonner';

const ProfileUpload = () => {
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!previewUrl || !user) return;

    setIsUploading(true);
    try {
      // Convert preview to blob
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      
      // Create optimized image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = async () => {
        // Calculate dimensions for square crop
        const size = Math.min(img.width, img.height);
        canvas.width = 200;
        canvas.height = 200;
        
        // Draw cropped and resized image
        ctx?.drawImage(
          img,
          (img.width - size) / 2,
          (img.height - size) / 2,
          size,
          size,
          0,
          0,
          200,
          200
        );
        
        // Convert to blob with compression
        canvas.toBlob(async (optimizedBlob) => {
          if (optimizedBlob) {
            try {
              await user.setProfileImage({ file: optimizedBlob });
              toast.success('Profile picture updated successfully!');
              setPreviewUrl(null);
            } catch (error) {
              console.error('Error uploading profile picture:', error);
              toast.error('Failed to update profile picture');
            }
          }
        }, 'image/jpeg', 0.8);
      };
      
      img.src = previewUrl;
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image');
    } finally {
      setIsUploading(false);
    }
  };

  const clearPreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Camera className="h-5 w-5 text-blue-400" />
          Profile Picture
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage 
              src={previewUrl || user?.imageUrl} 
              alt={user?.fullName || 'Profile'} 
            />
            <AvatarFallback className="bg-gray-700 text-white text-lg">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <p className="text-gray-300 text-sm mb-2">
              Upload a new profile picture. Images will be automatically cropped to a square and optimized.
            </p>
            <p className="text-gray-500 text-xs">
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </p>
          </div>
        </div>

        {previewUrl ? (
          <div className="flex gap-2">
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
            >
              <Check className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Save Picture'}
            </Button>
            <Button
              onClick={clearPreview}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileUpload;