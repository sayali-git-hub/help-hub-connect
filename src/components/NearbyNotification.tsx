
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { DonationStatus } from './TrackDonation';

interface NearbyNotificationProps {
  donation: DonationStatus;
  onAccept: (donationId: string) => void;
  onIgnore: (donationId: string) => void;
}

const NearbyNotification: React.FC<NearbyNotificationProps> = ({
  donation,
  onAccept,
  onIgnore
}) => {
  const handleAccept = () => {
    onAccept(donation.id);
    toast.success("You've accepted the donation!");
  };

  const handleIgnore = () => {
    onIgnore(donation.id);
    toast("Notification dismissed");
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <Card className="w-full overflow-hidden border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center">
            <Bell className="h-4 w-4 mr-2 text-primary" />
            New Food Available
          </CardTitle>
          <Badge className="bg-amber-500">
            {timeAgo(donation.createdAt)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{donation.location}</span>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">Food items:</h4>
            <p className="text-sm text-muted-foreground">
              {donation.foodItems.join(', ')}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2">
        <Button size="sm" variant="outline" className="flex-1" onClick={handleIgnore}>
          Ignore
        </Button>
        <Button size="sm" className="flex-1" onClick={handleAccept}>
          Accept
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NearbyNotification;
