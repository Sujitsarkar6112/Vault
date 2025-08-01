
import { Tenant, User, Project, Asset, AccessLog } from '@/types';

export const mockTenant: Tenant = {
  id: 'tenant-1',
  name: 'Acme Corporation',
  plan: 'professional',
  created_at: '2024-01-15T10:00:00Z'
};

export const mockUser: User = {
  id: 'user-1',
  tenant_id: 'tenant-1',
  email: 'john.doe@acme.com',
  role: 'admin',
  status: 'active',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
};

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    tenant_id: 'tenant-1',
    name: 'Production APIs',
    description: 'Critical production API keys and configurations',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-07-20T15:30:00Z'
  },
  {
    id: 'proj-2',
    tenant_id: 'tenant-1',
    name: 'Mobile App Codebase',
    description: 'React Native mobile application source code',
    created_at: '2024-02-10T14:00:00Z',
    updated_at: '2024-07-25T09:15:00Z'
  },
  {
    id: 'proj-3',
    tenant_id: 'tenant-1',
    name: 'Documentation',
    description: 'Technical specifications and compliance documents',
    created_at: '2024-03-05T11:30:00Z',
    updated_at: '2024-07-28T16:45:00Z'
  }
];

export const mockAssets: Asset[] = [
  {
    id: 'asset-1',
    project_id: 'proj-1',
    name: 'Stripe Payment API Key',
    type: 'api_key',
    size: 64,
    checksum: 'sha256:abc123...',
    storage_path: '/vault/api-keys/stripe-prod.enc',
    version: 3,
    created_by: 'user-1',
    created_at: '2024-07-20T10:00:00Z',
    updated_at: '2024-07-25T14:30:00Z',
    tags: ['payment', 'production', 'critical'],
    description: 'Production Stripe API key for payment processing'
  },
  {
    id: 'asset-2',
    project_id: 'proj-2',
    name: 'mobile-app-v2.1.zip',
    type: 'code_zip',
    size: 15728640,
    checksum: 'sha256:def456...',
    storage_path: '/vault/code/mobile-app-v2.1.zip.enc',
    version: 1,
    created_by: 'user-1',
    created_at: '2024-07-22T16:20:00Z',
    updated_at: '2024-07-22T16:20:00Z',
    tags: ['mobile', 'react-native', 'release'],
    description: 'Mobile app source code archive for v2.1 release'
  },
  {
    id: 'asset-3',
    project_id: 'proj-1',
    name: 'AWS S3 Access Key',
    type: 'api_key',
    size: 128,
    checksum: 'sha256:ghi789...',
    storage_path: '/vault/api-keys/aws-s3-prod.enc',
    version: 1,
    created_by: 'user-1',
    created_at: '2024-07-18T09:15:00Z',
    updated_at: '2024-07-18T09:15:00Z',
    tags: ['aws', 'storage', 'production'],
    description: 'AWS S3 bucket access credentials'
  },
  {
    id: 'asset-4',
    project_id: 'proj-3',
    name: 'Security Compliance Report.pdf',
    type: 'document',
    size: 2048576,
    checksum: 'sha256:jkl012...',
    storage_path: '/vault/docs/security-compliance-2024.pdf.enc',
    version: 2,
    created_by: 'user-1',
    created_at: '2024-07-15T13:45:00Z',
    updated_at: '2024-07-28T16:45:00Z',
    tags: ['compliance', 'security', 'audit'],
    description: 'Annual security compliance documentation'
  }
];

export const mockAccessLogs: AccessLog[] = [
  {
    id: 'log-1',
    asset_id: 'asset-1',
    user_id: 'user-1',
    action: 'view',
    ip: '192.168.1.100',
    timestamp: '2024-07-28T10:30:00Z',
    details: 'Viewed Stripe API key metadata'
  },
  {
    id: 'log-2',
    asset_id: 'asset-2',
    user_id: 'user-1',
    action: 'download',
    ip: '192.168.1.100',
    timestamp: '2024-07-28T09:15:00Z',
    details: 'Downloaded mobile app source code'
  },
  {
    id: 'log-3',
    asset_id: 'asset-1',
    user_id: 'user-1',
    action: 'rotate',
    ip: '192.168.1.100',
    timestamp: '2024-07-25T14:30:00Z',
    details: 'Rotated Stripe API key'
  }
];
