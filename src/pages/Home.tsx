
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Key, FileCode, Users, Lock, Search, Globe, Zap, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO at TechCorp',
      company: 'TechCorp',
      content: 'SecureVault has transformed how we manage our technical assets. The security features are enterprise-grade, and the collaboration tools are intuitive.',
      rating: 5,
      avatar: '/placeholder.svg'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      company: 'StartupXYZ',
      content: 'Finally, a solution that doesn\'t compromise on security while being easy to use. Our team adopted it in hours, not days.',
      rating: 5,
      avatar: '/placeholder.svg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Security Engineer',
      company: 'DataFlow Inc',
      content: 'The audit trails and compliance features are exactly what we needed. SecureVault helps us stay compliant with industry standards.',
      rating: 5,
      avatar: '/placeholder.svg'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'AES-256 encryption, zero-knowledge architecture, and multi-factor authentication',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Search,
      title: 'Instant Search',
      description: 'Find any asset in milliseconds with our advanced search engine',
      gradient: 'from-teal-500 to-green-500'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share securely with fine-grained permissions and real-time collaboration',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Key,
      title: 'API Key Management',
      description: 'Secure storage with automatic rotation and usage tracking',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FileCode,
      title: 'Code Repository Storage',
      description: 'Version control and secure storage for your source code archives',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Lock,
      title: 'Secret Management',
      description: 'Certificates, tokens, and sensitive configurations in one secure place',
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6
                     md:text-6xl">
            Secure Technical-Asset
            <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Vault
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Enterprise-grade security for your API keys, source code, and sensitive documents. 
            Zero secrets leakage, instant search, and seamless collaboration.
          </p>
          <div className="flex flex-col gap-4 justify-center
                       sm:flex-row">
            <Button 
              size='lg' 
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-3
                         hover:from-blue-600 hover:to-teal-600"
              asChild
            >
              <Link to='/signup'>Get Started Free</Link>
            </Button>
            <Button 
              size='lg' 
              variant='outline' 
              className="border-gray-600 text-gray-300 px-8 py-3
                         hover:bg-gray-800"
              asChild
            >
              <Link to='/login'>Demo Login</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need to Secure Your Assets
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-all group">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Types */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Store All Your Critical Assets</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-800/30 rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
              <Key className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white">API Keys</h4>
              <p className="text-gray-400 text-sm">Encrypted storage with rotation tracking</p>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
              <FileCode className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white">Source Code</h4>
              <p className="text-gray-400 text-sm">Repositories and code archives</p>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
              <Lock className="h-8 w-8 text-red-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white">Secrets</h4>
              <p className="text-gray-400 text-sm">Certificates and sensitive configs</p>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
              <Globe className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white">Documents</h4>
              <p className="text-gray-400 text-sm">Technical docs and specifications</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Trusted by Engineering Teams Worldwide
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full bg-gray-700 mr-3"
                  />
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 border border-blue-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Secure Your Assets?</h2>
          <p className="text-gray-300 mb-6">Join thousands of engineering teams who trust us with their most sensitive assets.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size='lg' 
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-3
                         hover:from-blue-600 hover:to-teal-600"
              asChild
            >
              <Link to='/signup'>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size='lg' 
              variant='outline' 
              className="border-gray-600 text-gray-300 px-8 py-3
                         hover:bg-gray-800"
              asChild
            >
              <Link to='/pricing'>View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
