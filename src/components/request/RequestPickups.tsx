
import React from 'react';
import { DonationStatus } from '@/components/TrackDonation';
import TrackDonation from '@/components/TrackDonation';
import FadeIn from '@/components/FadeIn';

interface RequestPickupsProps {
  acceptedDonations: DonationStatus[];
  onStatusUpdate: (donation: DonationStatus, newStatus: DonationStatus['status']) => void;
}

const RequestPickups: React.FC<RequestPickupsProps> = ({ 
  acceptedDonations, 
  onStatusUpdate 
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {acceptedDonations.length > 0 ? (
        acceptedDonations.map((donation) => (
          <FadeIn key={donation.id}>
            <TrackDonation
              donation={donation}
              onStatusUpdate={onStatusUpdate}
            />
          </FadeIn>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">You haven't accepted any donations yet</p>
        </div>
      )}
    </div>
  );
};

export default RequestPickups;
