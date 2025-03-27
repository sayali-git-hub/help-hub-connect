
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import FadeIn from '@/components/FadeIn';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const DonateFood = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Donate Food</h1>
            <p className="text-xl text-muted-foreground">
              Share your extra food with those in need
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <Card>
                <CardHeader>
                  <CardTitle>Post Available Food</CardTitle>
                  <CardDescription>
                    List food items you're willing to donate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-secondary rounded-md flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">Food listing form will go here</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.success('This feature will be implemented soon!')}>
                    Create Listing
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Pickup</CardTitle>
                  <CardDescription>
                    Arrange times for recipients to collect food
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-secondary rounded-md flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">Scheduling calendar will go here</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.success('This feature will be implemented soon!')}>
                    Set Availability
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>

            <FadeIn delay={300}>
              <Card>
                <CardHeader>
                  <CardTitle>Track Donations</CardTitle>
                  <CardDescription>
                    See the impact of your contributions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-secondary rounded-md flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">Donation statistics will go here</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.success('This feature will be implemented soon!')}>
                    View History
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

export default DonateFood;
