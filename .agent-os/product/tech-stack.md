# Tech Stack

## Project-Specific Stack

This project is a React/TypeScript application with the following stack:

- **App Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1
- **Package Manager**: npm (with bun.lockb also present)
- **CSS Framework**: TailwindCSS 3.4.11
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM 6.26.2
- **State Management**: React Query/TanStack Query 5.56.2
- **Form Handling**: React Hook Form 7.53.0 with Zod validation
- **Styling Utilities**: 
  - class-variance-authority
  - clsx
  - tailwind-merge
- **Icons**: Lucide React 0.462.0
- **Charts**: Recharts 2.12.7
- **Date Handling**: date-fns 4.1.0
- **Toast Notifications**: Sonner 1.5.0
- **Development Tools**:
  - ESLint 9.9.0
  - TypeScript ESLint 8.0.1
  - Vite React SWC plugin
  - Lovable Tagger (for Lovable.dev integration)

## Project Structure

- `src/components/ui/` - shadcn/ui components
- `src/components/layout/` - Layout components (Header, Footer, Sidebar)
- `src/components/dashboard/` - Dashboard-specific components
- `src/components/assets/` - Asset management components
- `src/pages/` - Page components with routing
- `src/lib/` - Utilities and mock data
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions

## Platform Context

This appears to be a Lovable.dev project, which is a web application platform with:
- Marketing pages (Home, Features, About, Pricing, Contact)
- Authentication pages (Login, Signup)
- Dashboard functionality
- Asset management capabilities
- Document management
- Repository/code archive features