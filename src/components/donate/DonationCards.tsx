
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import FadeIn from '@/components/FadeIn';
import { toast } from 'sonner';

const DonationCards = ({ onNavigateToTrack }: { onNavigateToTrack: () => void }) => {
  return (
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
            <Button className="w-full" onClick={onNavigateToTrack}>
              View History
            </Button>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  );
};

export default DonationCards;
