
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import FadeIn from '@/components/FadeIn';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DonationStatus } from '@/components/TrackDonation';
import { Message } from '@/components/ChatInterface';

import DonationCards from '@/components/donate/DonationCards';
import DonationTracker from '@/components/donate/DonationTracker';
import DonationMessageCenter from '@/components/donate/DonationMessageCenter';

const mockDonations: DonationStatus[] = [
  {
    id: "d123e45f67",
    status: 'pending',
    foodItems: ['Rice (2kg)', 'Canned beans (3)', 'Pasta (1kg)'],
    donor: 'John Doe',
    location: '123 Main St, City',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: "d789a01b23",
    status: 'accepted',
    foodItems: ['Fresh vegetables', 'Bread (2 loaves)'],
    donor: 'John Doe',
    receiver: 'Alice Smith',
    location: '456 Oak Ave, City',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
  },
  {
    id: "d456f78g90",
    status: 'completed',
    foodItems: ['Milk (1L)', 'Eggs (dozen)', 'Cheese (500g)'],
    donor: 'John Doe',
    receiver: 'Bob Johnson',
    location: '789 Elm St, City',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  }
];

const mockMessages: Message[] = [
  {
    id: "m1",
    text: "Hi there! I'm interested in picking up the food you donated.",
    sender: {
      id: "receiver-1",
      name: "Alice Smith",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: "m2",
    text: "Sure! When would you like to pick it up?",
    sender: {
      id: "current-user",
      name: "John Doe",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 25) // 25 minutes ago
  },
  {
    id: "m3",
    text: "I can come by around 5pm today. Would that work for you?",
    sender: {
      id: "receiver-1",
      name: "Alice Smith",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 20) // 20 minutes ago
  }
];

const DonateFood = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [donations, setDonations] = useState<DonationStatus[]>(mockDonations);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  
  // Get the tab from URL query parameter or default to "donate"
  const query = new URLSearchParams(location.search);
  const tabFromQuery = query.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromQuery || "donate");

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/donate?tab=${value}`, { replace: true });
  };

  // Handle authentication check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error('Please login to access this page');
    }
  }, [isAuthenticated, navigate]);

  const handleStatusUpdate = (donation: DonationStatus, newStatus: DonationStatus['status']) => {
    const updatedDonations = donations.map(d => {
      if (d.id === donation.id) {
        return { ...d, status: newStatus, updatedAt: new Date() };
      }
      return d;
    });
    setDonations(updatedDonations);
  };

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      text: message,
      sender: {
        id: "current-user",
        name: user?.user_metadata?.name || user?.email || "Current User",
      },
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto py-6">
          <FadeIn className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Donate Food</h1>
            <p className="text-xl text-muted-foreground">
              Share your extra food with those in need
            </p>
          </FadeIn>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="donate">Post Donation</TabsTrigger>
              <TabsTrigger value="track">Track Donations</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="donate" className="space-y-8">
              <DonationCards onNavigateToTrack={() => handleTabChange('track')} />
            </TabsContent>

            <TabsContent value="track">
              <DonationTracker 
                donations={donations} 
                onStatusUpdate={handleStatusUpdate} 
              />
            </TabsContent>

            <TabsContent value="messages">
              <DonationMessageCenter
                messages={messages}
                onSendMessage={handleSendMessage}
                recipientName="Alice Smith"
                recipientAvatar="https://randomuser.me/api/portraits/women/32.jpg"
              />
            </TabsContent>
          </Tabs>

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
