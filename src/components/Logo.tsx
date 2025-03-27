
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className={cn('font-bold tracking-tight text-primary flex items-center', sizeClasses[size], className)}>
      <span className="mr-1">Share</span>
      <span className="bg-primary text-white px-2 py-1 rounded-md">Plate</span>
    </div>
  );
};

export default Logo;
