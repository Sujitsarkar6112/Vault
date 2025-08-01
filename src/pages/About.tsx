
import { Shield, Users, Award, Target, Clock, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { value: '10,000+', label: 'Assets Secured' },
    { value: '500+', label: 'Companies Trust Us' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '24/7', label: 'Support Available' }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      image: '/placeholder.svg',
      bio: 'Former security architect at Google with 15 years of experience in enterprise security.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      image: '/placeholder.svg',
      bio: 'Ex-Netflix engineer specializing in distributed systems and data protection.'
    },
    {
      name: 'Emma Thompson',
      role: 'Head of Security',
      image: '/placeholder.svg',
      bio: 'Former cybersecurity consultant with expertise in compliance and risk management.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About SecureVault
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to make technical asset security accessible to every engineering team, 
            regardless of size or budget.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4">
              Founded in 2021, SecureVault emerged from a simple observation: most engineering teams 
              struggle with securely managing their technical assets. API keys in Slack messages, 
              source code in unsecured repositories, and sensitive documents scattered across 
              multiple platforms.
            </p>
            <p className="text-gray-300 mb-4">
              Our founders, having experienced these challenges at scale at major tech companies, 
              decided to build a solution that would make enterprise-grade security accessible 
              to teams of all sizes.
            </p>
            <p className="text-gray-300">
              Today, we're proud to serve hundreds of engineering teams worldwide, helping them 
              secure their most valuable technical assets with enterprise-grade encryption and 
              seamless collaboration tools.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300 mb-6">
              To democratize enterprise-grade security for technical assets, making it accessible 
              and affordable for engineering teams of all sizes.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Security-first approach</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-teal-400" />
                <span className="text-gray-300">Team collaboration focused</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-purple-400" />
                <span className="text-gray-300">Global accessibility</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-700"
                />
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Security First</h3>
              <p className="text-gray-300">Every decision we make prioritizes the security and privacy of your assets.</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Team Focused</h3>
              <p className="text-gray-300">We build tools that enhance collaboration without compromising security.</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Excellence</h3>
              <p className="text-gray-300">We strive for the highest standards in everything we build and deliver.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
