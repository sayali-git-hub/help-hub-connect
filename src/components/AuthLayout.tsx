
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import FadeIn from '@/components/FadeIn';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  className,
  title,
  subtitle 
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/90 to-primary p-12 text-white items-center justify-center">
        <div className="max-w-md">
          <FadeIn delay={200}>
            <Logo className="text-white mb-8" size="lg" />
            <h1 className="text-4xl font-bold mb-6">
              Share food. <br />
              Change lives.
            </h1>
            <p className="text-white/90 text-lg">
              Connect with your community through the gift of food. Whether you're donating or in need, we make sharing simple and dignified.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className={cn("flex-1 flex flex-col p-6 md:p-12", className)}>
        <div className="mb-8 md:hidden">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <FadeIn className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          </FadeIn>
          
          <FadeIn delay={100}>
            {children}
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
