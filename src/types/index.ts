
export interface Tenant {
  id: string;
  name: string;
  plan: 'starter' | 'professional' | 'enterprise';
  created_at: string;
}

export interface User {
  id: string;
  tenant_id: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  name: string;
  avatar?: string;
}

export interface Project {
  id: string;
  tenant_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  project_id: string;
  name: string;
  type: 'api_key' | 'code_zip' | 'repo' | 'document';
  size: number;
  checksum: string;
  storage_path: string;
  version: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  description?: string;
  metadata?: {
    repoUrl?: string;
    isPrivate?: boolean;
    lastCommit?: string;
    branches?: string[];
  };
}

export interface AccessLog {
  id: string;
  asset_id: string;
  user_id: string;
  action: 'view' | 'download' | 'rotate' | 'upload' | 'delete';
  ip: string;
  timestamp: string;
  details?: string;
}

export interface SearchResult {
  id: string;
  name: string;
  type: Asset['type'];
  description?: string;
  tags: string[];
  project_id: string;
  relevance_score: number;
}
