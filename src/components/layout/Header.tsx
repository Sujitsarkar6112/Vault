
import { Shield, User, Bell, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser, useClerk } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockTenant } from '@/lib/mockData';

const Header = () => {
  const { user } = useUser();

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-500">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Secure Vault</h1>
            </div>
          </div>
          <Badge variant="outline" className="border-teal-500/50 text-teal-400">
            {mockTenant.plan}
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            <Bell className="h-4 w-4" />
          </Button>

          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
                userButtonPopoverCard: "bg-gray-800 border-gray-700",
                userButtonPopoverActions: "bg-gray-800",
                userButtonPopoverActionButton: "text-gray-300 hover:bg-gray-700 hover:text-white",
                userButtonPopoverActionButtonText: "text-gray-300",
                userButtonPopoverFooter: "hidden",
                userPreviewTextContainer: "text-white",
                userPreviewSecondaryIdentifier: "text-gray-400"
              }
            }}
            showName={true}
            userProfileProps={{
              appearance: {
                elements: {
                  card: "bg-gray-800 border-gray-700",
                  headerTitle: "text-white",
                  headerSubtitle: "text-gray-400",
                  formButtonPrimary: "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600",
                  formFieldInput: "bg-gray-700 border-gray-600 text-white",
                  formFieldLabel: "text-gray-300"
                }
              }
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
