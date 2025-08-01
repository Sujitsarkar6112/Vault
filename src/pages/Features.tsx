
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Search, Users, Key, FileCode, Lock, Globe, Zap, Eye, RotateCcw, Bell, Activity } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "AES-256 encryption at rest, TLS 1.3 in transit, and multi-factor authentication",
      details: ["Zero-knowledge architecture", "SOC 2 Type II compliant", "GDPR ready", "Quarterly security audits"]
    },
    {
      icon: Search,
      title: "Instant Search",
      description: "Full-text search across all your assets with sub-200ms response times",
      details: ["Natural language queries", "Tag-based filtering", "Advanced search operators", "Real-time indexing"]
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Fine-grained access controls and real-time collaboration features",
      details: ["Role-based permissions", "Project-level access", "Comment threads", "Activity notifications"]
    },
    {
      icon: Key,
      title: "API Key Management",
      description: "Secure storage and rotation of API keys with usage tracking",
      details: ["Automatic rotation", "Usage analytics", "Expiration alerts", "Access logs"]
    },
    {
      icon: FileCode,
      title: "Code Repository Storage",
      description: "Store and version control your source code archives securely",
      details: ["Git integration", "Diff visualization", "Syntax highlighting", "Version history"]
    },
    {
      icon: Activity,
      title: "Audit & Compliance",
      description: "Comprehensive audit trails and compliance reporting",
      details: ["Immutable logs", "Export capabilities", "Compliance dashboards", "Real-time monitoring"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Secure Asset Management
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to securely store, manage, and collaborate on your technical assets
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-colors">
              <feature.icon className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Asset Types Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Support for All Asset Types</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-6 text-center">
              <Key className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">API Keys</h4>
              <p className="text-gray-300 text-sm">Encrypted storage with automatic rotation and usage tracking</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-lg p-6 text-center">
              <FileCode className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Source Code</h4>
              <p className="text-gray-300 text-sm">Repositories, archives, and code snippets with version control</p>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-lg p-6 text-center">
              <Lock className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Secrets</h4>
              <p className="text-gray-300 text-sm">Certificates, tokens, and sensitive configuration files</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6 text-center">
              <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Documents</h4>
              <p className="text-gray-300 text-sm">Technical documentation, specs, and general files</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 border border-blue-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Experience All Features</h2>
          <p className="text-gray-300 mb-6">Start your free trial and see how our platform can transform your asset management.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-8 py-3"
              asChild
            >
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3"
              asChild
            >
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
