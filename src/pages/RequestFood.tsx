
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import FadeIn from '@/components/FadeIn';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const RequestFood = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error('Please login to access this page');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto py-12">
          <FadeIn className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Request Food</h1>
            <p className="text-xl text-muted-foreground">
              Find available food donations in your area
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <Card>
                <CardHeader>
                  <CardTitle>Search Available Food</CardTitle>
                  <CardDescription>
                    Browse food donations near you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-secondary rounded-md flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">Food search interface will go here</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.success('This feature will be implemented soon!')}>
                    Browse Donations
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card>
                <CardHeader>
                  <CardTitle>Request Specific Items</CardTitle>
                  <CardDescription>
                    Let donors know what you need
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-secondary rounded-md flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">Request form will go here</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.success('This feature will be implemented soon!')}>
                    Create Request
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>

            <FadeIn delay={300}>
              <Card>
                <CardHeader>
                  <CardTitle>Pickup Information</CardTitle>
                  <CardDescription>
                    Arrange to collect your food items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-secondary rounded-md flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">Pickup scheduler will go here</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.success('This feature will be implemented soon!')}>
                    Schedule Pickup
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={400} className="mt-12 text-center">
            <Button variant="outline" onClick={() => navigate('/purpose')}>
              Back to Purpose Selection
            </Button>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default RequestFood;
