
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 100 assets',
        '5 team members',
        'Basic encryption',
        'Email support',
        'Basic search',
        'Standard templates'
      ],
      notIncluded: [
        'Advanced security features',
        'Custom integrations',
        'Priority support',
        'Advanced analytics'
      ],
      cta: 'Get Started Free',
      link: '/signup',
      popular: false
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per user/month',
      description: 'For growing teams with advanced needs',
      features: [
        'Unlimited assets',
        'Unlimited team members',
        'Advanced encryption',
        'Priority support',
        'Advanced search & filters',
        'Custom templates',
        'API access',
        'Audit logs',
        'SSO integration',
        'Custom roles'
      ],
      notIncluded: [
        'White-label options',
        'Dedicated account manager'
      ],
      cta: 'Start Free Trial',
      link: '/signup',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations with specific requirements',
      features: [
        'Everything in Professional',
        'Custom security policies',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options',
        'SLA guarantees',
        'Advanced compliance features',
        'Custom deployment options',
        'Training & onboarding',
        'Custom contract terms'
      ],
      notIncluded: [],
      cta: 'Contact Sales',
      link: '/contact',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free and scale as your team grows. All plans include enterprise-grade security.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-gray-800/50 border rounded-lg p-8 relative ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <X className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-500">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                } text-white`}
                asChild
              >
                <Link to={plan.link}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-300">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-300">We accept all major credit cards, PayPal, and can arrange invoicing for enterprise customers.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Is there a free trial?</h3>
              <p className="text-gray-300">Yes! Professional plans come with a 14-day free trial. No credit card required.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What happens to my data if I cancel?</h3>
              <p className="text-gray-300">You can export all your data before canceling. We retain data for 30 days after cancellation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
