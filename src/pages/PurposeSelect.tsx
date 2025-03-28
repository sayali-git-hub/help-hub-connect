
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import FadeIn from '@/components/FadeIn';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

const PurposeSelect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
      toast.error('Please login to access this page');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSelect = (purpose: 'donate' | 'request') => {
    if (purpose === 'donate') {
      navigate('/donate');
    } else {
      navigate('/request');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full py-16">
          <FadeIn className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">What brings you here today?</h1>
            <p className="text-xl text-muted-foreground">
              We'll customize your experience based on your needs
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeIn delay={100}>
              <div 
                onClick={() => handleSelect('donate')}
                className="bg-white border rounded-xl p-8 shadow-subtle hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
              >
                <div className="h-16 w-16 bg-primary/10 rounded-full mb-6 flex items-center justify-center">
                  <div className="text-2xl">🤲</div>
                </div>
                <h2 className="text-2xl font-bold mb-4">I want to donate food</h2>
                <p className="text-muted-foreground mb-6 flex-1">
                  Share your extra food with those in your community who might need it. 
                  Reduce waste and help others at the same time.
                </p>
                <Button className="w-full group">
                  Donate Food
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div 
                onClick={() => handleSelect('request')}
                className="bg-white border rounded-xl p-8 shadow-subtle hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
              >
                <div className="h-16 w-16 bg-primary/10 rounded-full mb-6 flex items-center justify-center">
                  <div className="text-2xl">🍲</div>
                </div>
                <h2 className="text-2xl font-bold mb-4">I need food assistance</h2>
                <p className="text-muted-foreground mb-6 flex-1">
                  Connect with generous donors in your area who are sharing food. 
                  Request what you need with dignity and ease.
                </p>
                <Button className="w-full group">
                  Request Food
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PurposeSelect;
