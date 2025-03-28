
import React from 'react';
import { DonationStatus } from '@/components/TrackDonation';
import TrackDonation from '@/components/TrackDonation';
import FadeIn from '@/components/FadeIn';

interface DonationTrackerProps {
  donations: DonationStatus[];
  onStatusUpdate: (donation: DonationStatus, newStatus: DonationStatus['status']) => void;
}

const DonationTracker: React.FC<DonationTrackerProps> = ({ donations, onStatusUpdate }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {donations.map((donation) => (
        <FadeIn key={donation.id}>
          <TrackDonation
            donation={donation}
            onStatusUpdate={onStatusUpdate}
          />
        </FadeIn>
      ))}

      {donations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No donations found</p>
        </div>
      )}
    </div>
  );
};

export default DonationTracker;
