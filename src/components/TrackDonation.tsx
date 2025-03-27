
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export interface DonationStatus {
  id: string;
  status: 'pending' | 'accepted' | 'pickedup' | 'completed';
  foodItems: string[];
  donor: string;
  receiver?: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TrackDonationProps {
  donation: DonationStatus;
  onStatusUpdate?: (donation: DonationStatus, newStatus: DonationStatus['status']) => void;
}

const TrackDonation: React.FC<TrackDonationProps> = ({ 
  donation, 
  onStatusUpdate = () => {} 
}) => {
  const getStatusColor = (status: DonationStatus['status']) => {
    switch (status) {
      case 'pending': return 'bg-amber-500';
      case 'accepted': return 'bg-blue-500';
      case 'pickedup': return 'bg-purple-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getNextStatus = (currentStatus: DonationStatus['status']): DonationStatus['status'] | null => {
    switch (currentStatus) {
      case 'pending': return 'accepted';
      case 'accepted': return 'pickedup';
      case 'pickedup': return 'completed';
      default: return null;
    }
  };

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus(donation.status);
    if (nextStatus) {
      onStatusUpdate(donation, nextStatus);
      toast.success(`Donation status updated to ${nextStatus}`);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Donation #{donation.id.substring(0, 8)}</CardTitle>
          <Badge className={getStatusColor(donation.status)}>
            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>
          {new Date(donation.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{donation.location}</span>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Items:</h4>
            <ul className="list-disc text-sm ml-5 text-muted-foreground">
              {donation.foodItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">From</p>
              <p className="text-sm font-medium">{donation.donor}</p>
            </div>
            {donation.receiver && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">To</p>
                <p className="text-sm font-medium">{donation.receiver}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {getNextStatus(donation.status) && (
          <Button onClick={handleStatusUpdate} className="w-full">
            Update to {getNextStatus(donation.status)}
            <ArrowUp className="ml-2 h-4 w-4" />
          </Button>
        )}
        {!getNextStatus(donation.status) && (
          <Badge className="bg-green-500 w-full py-2 flex justify-center">
            Donation Complete <ArrowDown className="ml-2 h-4 w-4" />
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default TrackDonation;
