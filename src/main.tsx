import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Import your publishable key - You'll need to add this to your environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      baseTheme: undefined,
      variables: {
        colorPrimary: "#3b82f6",
        colorBackground: "#1f2937",
        colorInputBackground: "#374151",
        colorInputText: "#ffffff",
        colorText: "#ffffff",
        colorTextSecondary: "#9ca3af",
        borderRadius: "0.5rem"
      },
      elements: {
        formButtonPrimary: 
          "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-medium",
        card: "bg-gray-800/90 backdrop-blur-sm border-gray-700 shadow-2xl",
        headerTitle: "text-white font-bold",
        headerSubtitle: "text-gray-300",
        socialButtonsBlockButton: "border-gray-600 text-gray-300 hover:bg-gray-700/50",
        formFieldInput: "bg-gray-700/50 border-gray-600 text-white focus:border-blue-500",
        formFieldLabel: "text-gray-300 font-medium",
        footerActionText: "text-gray-400",
        footerActionLink: "text-blue-400 hover:text-blue-300",
        identityPreviewText: "text-gray-300",
        identityPreviewEditButton: "text-blue-400 hover:text-blue-300"
      }
    }}
  >
    <App />
  </ClerkProvider>
);
