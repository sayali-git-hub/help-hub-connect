
import React from 'react';
import { DonationStatus } from '@/components/TrackDonation';
import NearbyNotification from '@/components/NearbyNotification';
import FadeIn from '@/components/FadeIn';

interface RequestNotificationsProps {
  nearbyDonations: DonationStatus[];
  onAccept: (donationId: string) => void;
  onIgnore: (donationId: string) => void;
}

const RequestNotifications: React.FC<RequestNotificationsProps> = ({ 
  nearbyDonations, 
  onAccept, 
  onIgnore 
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nearbyDonations.length > 0 ? (
        nearbyDonations.map((donation) => (
          <FadeIn key={donation.id}>
            <NearbyNotification
              donation={donation}
              onAccept={onAccept}
              onIgnore={onIgnore}
            />
          </FadeIn>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No new notifications</p>
        </div>
      )}
    </div>
  );
};

export default RequestNotifications;
