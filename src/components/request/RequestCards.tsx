
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import FadeIn from '@/components/FadeIn';
import { toast } from 'sonner';

const RequestCards = ({ onNavigateToTrack }: { onNavigateToTrack: () => void }) => {
  return (
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
            <Button className="w-full" onClick={onNavigateToTrack}>
              View My Pickups
            </Button>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  );
};

export default RequestCards;
