import { SignUp } from '@clerk/clerk-react';
import { Shield, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const Signup = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  const features = [
    'Enterprise-grade security',
    'Unlimited asset storage',
    'Team collaboration tools',
    'Advanced search capabilities',
    'API access',
    '24/7 support'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8">
        {/* Left side - Features */}
        <div className="hidden lg:flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Join Thousands of Engineering Teams
            </h1>
            <p className="text-gray-300 text-lg">
              Secure your technical assets with enterprise-grade protection and seamless collaboration.
            </p>
          </div>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-400" />
            </div>
            <h1 className="text-2xl text-white font-bold">Create Your Account</h1>
            <p className="text-gray-400 mt-2">
              Start your free trial today - no credit card required
            </p>
          </div>
          
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white",
                card: "bg-gray-800/50 border-gray-700",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton: "border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors",
                socialButtonsBlockButtonText: "text-gray-300 font-medium",
                dividerLine: "bg-gray-600",
                dividerText: "text-gray-400",
                formFieldInput: "bg-gray-700 border-gray-600 text-white",
                formFieldLabel: "text-gray-300",
                identityPreviewText: "text-gray-300",
                identityPreviewEditButton: "text-blue-400 hover:text-blue-300"
              },
              layout: {
                socialButtonsPlacement: "top",
                socialButtonsVariant: "blockButton"
              }
            }}
            redirectUrl="/dashboard"
            signInUrl="/login"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
