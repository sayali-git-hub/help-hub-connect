
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import FadeIn from '@/components/FadeIn';
import { toast } from 'sonner';
import { Package, Calendar, MapPin } from 'lucide-react';
import DonationForm from './DonationForm';

const DonationCards = ({ onNavigateToTrack }: { onNavigateToTrack: () => void }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      {!showForm ? (
        <div className="grid md:grid-cols-3 gap-8">
          <FadeIn delay={100}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" /> Post Available Food
                </CardTitle>
                <CardDescription>
                  List food items you're willing to donate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-secondary rounded-md flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">Share your extra food with those in need</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setShowForm(true)}>
                  Create Listing
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>

          <FadeIn delay={200}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Schedule Pickup
                </CardTitle>
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
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> Track Donations
                </CardTitle>
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
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Create Food Donation</h2>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Back to Cards
            </Button>
          </div>
          <DonationForm />
        </div>
      )}
    </div>
  );
};

export default DonationCards;
